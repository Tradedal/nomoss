import {
  Array as Arr,
  Context,
  Data,
  Effect,
  JsonPatch,
  Match,
  Option,
  Schema,
  Stream,
  Struct,
} from "effect";

import {
  ResourceCommandResult,
  ResourceObservation,
} from "../../core/resource/lifecycle.js";
import { ResourceModel, type ResourceNode } from "../../core/resource/model.js";
import {
  AwsCloudControlRequestFailed,
  AwsCloudControlRequestTracker,
} from "./awsCloudControlRequestTracker.js";
import { AwsCloudControlClient } from "./client/awsCloudControlClient.js";

export class AwsCloudControlMetadataMissing extends Data.TaggedError(
  "AwsCloudControlMetadataMissing",
)<{ readonly node: ResourceNode }> {}

export class AwsCloudControlIdentifierMissing extends Data.TaggedError(
  "AwsCloudControlIdentifierMissing",
)<{ readonly node: ResourceNode }> {}

export class AwsCloudControlResourceModelMissing extends Data.TaggedError(
  "AwsCloudControlResourceModelMissing",
)<{ readonly typeName: string }> {}

/**
 * AwsCloudControlResourceLifecycle manages Registry-defined resources through
 * generated Cloud Control operations. Creation and update return validated
 * provider models after stabilization, so saved state and dependent inputs
 * refer to resources whose AWS mutations have completed.
 */
export class AwsCloudControlResourceLifecycle extends Context.Service<AwsCloudControlResourceLifecycle>()(
  "nomoss/providers/aws/awsCloudControlResourceLifecycle",
  {
    make: Effect.gen(function* () {
      const client = yield* AwsCloudControlClient;
      const requestTracker = yield* AwsCloudControlRequestTracker;
      const resourceModel = yield* ResourceModel;

      /**
       * The model read returns the current provider node with its Cloud Control
       * identity and validated outputs. Mutation results and observations use
       * this node so dependent resources receive the provider's actual values.
       */
      const readResourceByIdentifier = Effect.fn(
        "AwsCloudControlResourceLifecycle.readResourceByIdentifier",
      )(function* (node: ResourceNode, cloudControlIdentifier: string) {
        const cloudControl = yield* Option.fromUndefinedOr(
          node.schema.cloudControl,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlMetadataMissing({ node })),
        );

        const response = yield* client
          .getResource({
            TypeName: cloudControl.typeName,
            Identifier: cloudControlIdentifier,
          })
          .pipe(
            Effect.mapError(
              (cause) =>
                new AwsCloudControlRequestFailed({
                  typeName: cloudControl.typeName,
                  cause,
                }),
            ),
          );

        const properties = yield* Effect.fromOption(
          Option.fromUndefinedOr(response.ResourceDescription?.Properties),
        ).pipe(
          Effect.mapError(
            () =>
              new AwsCloudControlResourceModelMissing({
                typeName: cloudControl.typeName,
              }),
          ),
        );

        const providerModel = yield* Schema.decodeEffect(
          Schema.fromJsonString(Schema.Json),
        )(properties);

        const identified: ResourceNode = Struct.assign(node, {
          cloudControlIdentifier,
        });

        const hydratedNode: ResourceNode = yield* resourceModel.withOutputs(
          identified,
          providerModel,
        );

        const result: Extract<
          ResourceCommandResult,
          { readonly _tag: "Observed" }
        > = ResourceCommandResult.Observed({
          observation: ResourceObservation.Present({
            node: hydratedNode,
            observed: providerModel,
          }),
        });

        return result;
      });

      /**
       * Resource discovery matches provider models against desired properties
       * when a declaration has no saved provider identifier. A match produces
       * an observed node; no match produces a missing-resource observation.
       */
      const discoverResource = Effect.fn(
        "AwsCloudControlResourceLifecycle.discoverResource",
      )(function* (node: ResourceNode) {
        const cloudControl = yield* Option.fromUndefinedOr(
          node.schema.cloudControl,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlMetadataMissing({ node })),
        );

        const resources = yield* client
          .listResourceDescriptions({
            TypeName: cloudControl.typeName,
          })
          .pipe(
            Stream.runCollect,
            Effect.mapError(
              (cause) =>
                new AwsCloudControlRequestFailed({
                  typeName: cloudControl.typeName,
                  cause,
                }),
            ),
          );

        const identifiers = Arr.getSomes(
          Arr.map(resources, (description) =>
            Option.fromUndefinedOr(description.Identifier),
          ),
        );

        const candidates = yield* Effect.forEach(identifiers, (identifier) =>
          readResourceByIdentifier(node, identifier),
        );

        const matchedResource = Arr.findFirst(candidates, ({ observation }) =>
          Match.value(observation).pipe(
            Match.when({ _tag: "Present" }, ({ observed }) =>
              Arr.every(
                JsonPatch.get(observed, node.props),
                (patch) => patch.op === "remove",
              ),
            ),
            Match.orElse(() => false),
          ),
        );

        const result: Extract<
          ResourceCommandResult,
          { readonly _tag: "Observed" }
        > = yield* Option.match(matchedResource, {
          onNone: () =>
            Effect.succeed(
              ResourceCommandResult.Observed({
                observation: ResourceObservation.Missing({ node }),
              }),
            ),
          onSome: Effect.succeed,
        });

        return result;
      });

      /**
       * The readResource service method reports whether the resource exists in AWS through its saved
       * identifier when available. Declarations without that identity use
       * discovery. A provider NotFound response becomes a missing observation
       * so reconciliation can distinguish remote deletion from a failed read.
       */
      const readResource = Effect.fn(
        "AwsCloudControlResourceLifecycle.readResource",
      )(
        function* (node: ResourceNode) {
          yield* Effect.spanAnnotations.pipe(
            Effect.flatMap(Effect.annotateCurrentSpan),
          );

          const result: Extract<
            ResourceCommandResult,
            { readonly _tag: "Observed" }
          > = yield* Option.match(
            Option.fromUndefinedOr(node.cloudControlIdentifier),
            {
              onNone: () => discoverResource(node),
              onSome: (identifier) =>
                readResourceByIdentifier(node, identifier).pipe(
                  Effect.catchTag("AwsCloudControlRequestFailed", (failure) =>
                    Match.value(failure.cause).pipe(
                      Match.when(
                        {
                          _tag: "AwsServiceError",
                          code: "ResourceNotFoundException",
                        },
                        () =>
                          Effect.succeed(
                            ResourceCommandResult.Observed({
                              observation: ResourceObservation.Missing({
                                node,
                              }),
                            }),
                          ),
                      ),
                      Match.orElse(() => Effect.fail(failure)),
                    ),
                  ),
                ),
            },
          );

          return result;
        },
        (effect, node) =>
          effect.pipe(
            Effect.annotateSpans({
              "nomoss.resource.logical_id": node.key.logicalId,
              "nomoss.resource.operation": "Read",
              "nomoss.resource.provider": node.schema.provider,
              "nomoss.resource.service": node.schema.service,
              "nomoss.resource.type":
                node.schema.cloudControl?.typeName ?? node.schema.resource,
            }),
          ),
      );

      /**
       * Creation returns the validated provider model and identifier after AWS
       * reports successful completion. An accepted request alone does not make
       * outputs available to dependent resources.
       */
      const createResource = Effect.fn(
        "AwsCloudControlResourceLifecycle.createResource",
      )(function* (node: ResourceNode) {
        const cloudControl = yield* Option.fromUndefinedOr(
          node.schema.cloudControl,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlMetadataMissing({ node })),
        );

        const desiredState = yield* Schema.encodeEffect(
          Schema.fromJsonString(Schema.Json),
        )(node.props).pipe(
          Effect.mapError(
            (cause) =>
              new AwsCloudControlRequestFailed({
                typeName: cloudControl.typeName,
                cause,
              }),
          ),
        );

        const response = yield* client
          .createResource({
            TypeName: cloudControl.typeName,
            DesiredState: desiredState,
          })
          .pipe(
            Effect.mapError(
              (cause) =>
                new AwsCloudControlRequestFailed({
                  typeName: cloudControl.typeName,
                  cause,
                }),
            ),
          );

        const requestToken = yield* Option.fromUndefinedOr(
          response.ProgressEvent?.RequestToken,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlIdentifierMissing({ node })),
        );

        const progress = yield* requestTracker.awaitResourceRequest({
          typeName: cloudControl.typeName,
          requestToken,
        });

        const cloudControlIdentifier = yield* Option.fromUndefinedOr(
          progress.Identifier,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlIdentifierMissing({ node })),
        );

        const observed = yield* readResourceByIdentifier(
          node,
          cloudControlIdentifier,
        );

        const result: ResourceCommandResult = ResourceCommandResult.Created({
          node: observed.observation.node,
        });

        return result;
      });

      /**
       * The updateResource service method uses the saved provider identity to
       * apply desired property changes to the resource. Its result contains the
       * validated model after stabilization for saved state and dependent
       * resource outputs.
       */
      const updateResource = Effect.fn(
        "AwsCloudControlResourceLifecycle.updateResource",
      )(function* (node: ResourceNode, current: ResourceNode) {
        const cloudControl = yield* Option.fromUndefinedOr(
          current.schema.cloudControl,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () => new AwsCloudControlMetadataMissing({ node: current }),
          ),
        );

        const cloudControlIdentifier = yield* Option.fromUndefinedOr(
          current.cloudControlIdentifier,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () => new AwsCloudControlIdentifierMissing({ node: current }),
          ),
        );

        const patchDocument = yield* Schema.encodeEffect(
          Schema.fromJsonString(Schema.Json),
        )(JsonPatch.get(current.props, node.props)).pipe(
          Effect.mapError(
            (cause) =>
              new AwsCloudControlRequestFailed({
                typeName: cloudControl.typeName,
                cause,
              }),
          ),
        );

        const response = yield* client
          .updateResource({
            TypeName: cloudControl.typeName,
            Identifier: cloudControlIdentifier,
            PatchDocument: patchDocument,
          })
          .pipe(
            Effect.mapError(
              (cause) =>
                new AwsCloudControlRequestFailed({
                  typeName: cloudControl.typeName,
                  cause,
                }),
            ),
          );

        const requestToken = yield* Option.fromUndefinedOr(
          response.ProgressEvent?.RequestToken,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () => new AwsCloudControlIdentifierMissing({ node: current }),
          ),
        );

        yield* requestTracker.awaitResourceRequest({
          typeName: cloudControl.typeName,
          requestToken,
        });

        const observed = yield* readResourceByIdentifier(
          node,
          cloudControlIdentifier,
        );

        const result: ResourceCommandResult = ResourceCommandResult.Updated({
          node: observed.observation.node,
        });

        return result;
      });

      /**
       * Destruction reports success once the identified resource is gone.
       * Successful deletion and an accepted request that reports NotFound both
       * establish that result for teardown callers.
       */
      const destroyResource = Effect.fn(
        "AwsCloudControlResourceLifecycle.destroyResource",
      )(function* (node: ResourceNode) {
        const cloudControl = yield* Option.fromUndefinedOr(
          node.schema.cloudControl,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlMetadataMissing({ node })),
        );

        const cloudControlIdentifier = yield* Option.fromUndefinedOr(
          node.cloudControlIdentifier,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlIdentifierMissing({ node })),
        );

        const response = yield* client
          .deleteResource({
            TypeName: cloudControl.typeName,
            Identifier: cloudControlIdentifier,
          })
          .pipe(
            Effect.mapError(
              (cause) =>
                new AwsCloudControlRequestFailed({
                  typeName: cloudControl.typeName,
                  cause,
                }),
            ),
          );

        const requestToken = yield* Option.fromUndefinedOr(
          response.ProgressEvent?.RequestToken,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new AwsCloudControlIdentifierMissing({ node })),
        );

        yield* requestTracker
          .awaitResourceRequest({
            typeName: cloudControl.typeName,
            requestToken,
          })
          .pipe(
            Effect.catchIf(
              (failure) =>
                failure._tag === "AwsCloudControlOperationFailed" &&
                failure.errorCode === "NotFound",
              () => Effect.void,
            ),
          );

        const result: ResourceCommandResult = ResourceCommandResult.Destroyed({
          node,
        });

        return result;
      });

      return {
        readResourceByIdentifier,
        discoverResource,
        readResource,
        createResource,
        updateResource,
        destroyResource,
      };
    }),
  },
) {}
