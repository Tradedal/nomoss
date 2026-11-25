import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schedule,
  Schema,
  Struct,
  Tuple,
} from "effect";
import {
  PlanDecision,
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../../core/resource/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  resourceModelLayer,
} from "../../../core/resource/model.js";
import { ResourceCommandExecutionFailed } from "../../../core/resource/resourceCommandPolicy.js";
import { providerCommandPolicyTag } from "../../resourceCommandPolicyLayer.js";
import { AwsClient } from "../client/awsClient.js";
import { AwsJsonRpcPayload } from "../client/awsClientModel.js";
import type {
  AwsAttributeResourceConfiguration,
  AwsResourceAttributeValues,
  AwsResourceOperation,
  AwsResourceState,
} from "./resourceConfiguration.js";
import {
  AwsResourceMapping,
  AwsResourceMappingFailed,
  awsResourceMappingLayer,
} from "./resourceMapping.js";

/**
 * The AwsResourceStabilizationTimeout reference lets an application limit the
 * wait for observable AWS settings. Its twenty-minute default includes SQS's
 * documented fifteen-minute retention propagation period and request time.
 * A timeout leaves core's pending mutation available for retry.
 */
export const AwsResourceStabilizationTimeout = Context.Reference<number>(
  "nomoss/providers/aws/management/resourcePolicy/stabilizationTimeout",
  { defaultValue: () => 20 * 60 * 1000 },
);

/**
 * The AwsResourcePolicy service completes creation and updates after provider
 * reads confirm the desired attributes and managed tags. Deletion succeeds
 * after a read confirms absence. Core owns persistence, replacement order, and
 * recovery of unfinished stack operations.
 */
export class AwsResourcePolicy extends Context.Service<AwsResourcePolicy>()(
  "nomoss/providers/aws/management/resourcePolicy/AwsResourcePolicy",
  {
    make: Effect.gen(function* () {
      const client = yield* AwsClient;
      const model = yield* ResourceModel;
      const mapping = yield* AwsResourceMapping;
      const equal = Schema.toEquivalence(Schema.Json);

      /**
       * The invoke service method executes a native operation with its generated
       * request, response, and modeled error codecs. Mutation operations can
       * return Unit, represented by None. Object responses are returned as Some
       * so observations can require their body without weakening the codec.
       */
      const invoke = Effect.fn("AwsResourcePolicy.invoke")(function* (
        definition: AwsAttributeResourceConfiguration,
        operation: AwsResourceOperation,
        input: object,
      ) {
        const observed = yield* client.bindOperation(definition.service)(
          operation,
        )(input);
        const body = yield* Schema.decodeUnknownEffect(
          Schema.optional(AwsJsonRpcPayload),
        )(observed);
        const response: Option.Option<AwsJsonRpcPayload> =
          Option.fromUndefinedOr(body);

        return response;
      });

      /**
       * The observe service method returns a complete provider observation or
       * absence for a configured missing-resource error. Permission, transport,
       * and validation failures propagate so reconciliation retains ownership.
       */
      const observe = Effect.fn("AwsResourcePolicy.observe")(
        function* (
          definition: AwsAttributeResourceConfiguration,
          identity: string,
        ) {
          // The observe operation requires both native reads because SQS returns
          // settings and tags separately. Generated codecs validate each map before
          // the resource mapper reconstructs the model that core can save.
          const response = yield* invoke(
            definition,
            definition.operations.read,
            {
              [definition.mapping.identity.parameter]: identity,
              AttributeNames: definition.mapping.readAttributeNames,
            },
          );
          const body = yield* Effect.fromOption(response);
          const attributes = yield* Schema.decodeUnknownEffect(
            definition.attributeSchema,
          )(body.Attributes ?? {});
          const tagsResponse = yield* invoke(
            definition,
            definition.operations.readTags,
            {
              [definition.mapping.identity.parameter]: identity,
            },
          );
          const tagsBody = yield* Effect.fromOption(tagsResponse);
          const tags = yield* Schema.decodeUnknownEffect(
            definition.tagMapSchema,
          )(tagsBody[definition.mapping.tags.response] ?? {});
          const state: AwsResourceState = yield* mapping.decodeResource(
            definition,
            identity,
            attributes,
            tags,
          );

          return state;
        },
        (effect, definition) =>
          effect.pipe(
            Effect.asSome,
            Effect.catchIf(
              (failure) =>
                failure._tag === "AwsServiceError" &&
                Arr.contains(definition.mapping.missingErrors, failure.code),
              () => Effect.succeedNone,
            ),
          ),
      );

      /**
       * The waitForState service method confirms declared settings and managed
       * tags before a mutation can succeed. Unmanaged tags are preserved. Keys
       * removed from the previous declaration must disappear from the provider.
       */
      const waitForState = Effect.fn("AwsResourcePolicy.waitForState")(
        function* (
          definition: AwsAttributeResourceConfiguration,
          identity: string,
          attributes: AwsResourceAttributeValues,
          tags: AwsResourceAttributeValues,
          removedTags: ReadonlyArray<string> = [],
        ) {
          const timeout = yield* AwsResourceStabilizationTimeout;
          const pending = (observed: Option.Option<AwsResourceState>) =>
            Option.match(observed, {
              onNone: () => true,
              onSome: (state) => {
                const attributesReady = mapping.attributesMatch(
                  definition,
                  attributes,
                  state.attributes,
                );
                const tagsReady = Record.isSubrecord(tags, state.tags);
                const tagsRemoved = Arr.every(
                  removedTags,
                  (key) => !Record.has(state.tags, key),
                );
                return !(attributesReady && tagsReady && tagsRemoved);
              },
            });
          const state: AwsResourceState = yield* observe(
            definition,
            identity,
          ).pipe(
            Effect.repeat({
              while: pending,
              schedule: Schedule.spaced("1 second"),
            }),
            Effect.timeout(timeout),
            Effect.flatMap(Effect.fromOption),
          );

          return state;
        },
      );

      /**
       * The create service method applies a resolved declaration and returns the
       * observed resource for core to save. Its stable physical name lets SQS
       * recover the same creation after a response or observation failure.
       */
      const create = Effect.fn("AwsResourcePolicy.create")(function* (
        definition: AwsAttributeResourceConfiguration,
        node: ResourceNode,
      ) {
        const desired = yield* mapping.prepare(definition, node);
        const name = yield* mapping.physicalName(
          definition,
          node,
          desired.properties,
        );
        const response = yield* invoke(
          definition,
          definition.operations.create,
          {
            [definition.mapping.name.parameter]: name,
            Attributes: desired.attributes,
            [definition.mapping.tags.createParameter]: desired.tags,
          },
        );
        const body = yield* Effect.fromOption(response);
        const identity = yield* Schema.decodeUnknownEffect(
          Schema.NonEmptyString,
        )(body[definition.mapping.identity.property]);

        // The create operation waits for a complete read before returning a node.
        // An accepted AWS request alone cannot release dependent resources or
        // supply the application's output callback with validated saved values.
        const observed = yield* waitForState(
          definition,
          identity,
          desired.attributes,
          desired.tags,
        );
        const applied = yield* model.withOutputs(node, observed.resource);
        const result: ResourceCommandResult = ResourceCommandResult.Created({
          node: applied,
        });

        return result;
      });

      /**
       * The read service method reconciles a saved provider identity. A present
       * resource must retain that identity before its observation can reach core.
       * Confirmed absence produces the Missing observation used by planning.
       */
      const read = Effect.fn("AwsResourcePolicy.read")(function* (
        definition: AwsAttributeResourceConfiguration,
        node: ResourceNode,
      ) {
        const identity = yield* model.decodeOutput(
          node,
          definition.mapping.identity.property,
          Schema.NonEmptyString,
        );
        const observed = yield* observe(definition, identity);
        const observation: ResourceObservation = yield* Option.match(observed, {
          onNone: () => Effect.succeed(ResourceObservation.Missing({ node })),
          onSome: Effect.fnUntraced(function* ({ resource }) {
            const hydrated = yield* model.withObservedOutputs(node, resource);
            const present: ResourceObservation = ResourceObservation.Present({
              node: hydrated,
              observed: resource,
            });
            return present;
          }),
        });
        const result: ResourceCommandResult = ResourceCommandResult.Observed({
          observation,
        });

        return result;
      });

      /**
       * The update service method changes settings and managed tags at a saved
       * identity. Removed settings require configured reset values. Changes to
       * create-only properties require core's replacement plan. Every native
       * request is validated before the first update request reaches AWS.
       */
      const update = Effect.fn("AwsResourcePolicy.update")(function* (
        definition: AwsAttributeResourceConfiguration,
        node: ResourceNode,
        current: ResourceNode,
      ) {
        const desired = yield* mapping.prepare(definition, node);
        const previous = yield* mapping.prepare(definition, current);
        const identity = yield* model.decodeOutput(
          current,
          definition.mapping.identity.property,
          Schema.NonEmptyString,
        );

        // The update operation resolves property removal before mutation because
        // omission from SetQueueAttributes would preserve the old AWS value.
        const removed = Record.filter(
          definition.mapping.attributes,
          (_, key) =>
            Record.has(previous.properties, key) &&
            !Record.has(desired.properties, key),
        );
        const resets = yield* Effect.forEach(
          Record.toEntries(removed),
          Effect.fnUntraced(function* ([property, rule]) {
            const value = yield* Effect.fromOption(
              Option.fromUndefinedOr(rule.reset),
              () =>
                new AwsResourceMappingFailed({
                  typeName: definition.mapping.typeName,
                  message: `Removing ${property} requires a configured reset value`,
                }),
            );
            return Tuple.make(property, value);
          }),
        );
        const replacementRequired = Arr.some(
          definition.createOnlyProperties,
          (key) =>
            !equal(
              desired.properties[key] ?? null,
              previous.properties[key] ?? null,
            ),
        );
        const decision = PlanDecision.Update({ node, current });
        const command = ResourceCommand.Apply({ decision });
        yield* Effect.fail(new ResourceCommandUnsupported({ command })).pipe(
          Effect.when(Effect.succeed(replacementRequired)),
        );

        const properties = Record.union(
          Record.fromEntries(resets),
          desired.properties,
          (_, declared) => declared,
        );
        const expected = yield* mapping.encodeAttributes(
          definition,
          properties,
        );
        const immutable = Record.filter(
          definition.mapping.attributes,
          (_, property) =>
            Arr.contains(definition.createOnlyProperties, property),
        );
        const immutableAttributes = Arr.map(
          Record.values(immutable),
          ({ attribute }) => attribute,
        );
        const attributes = Record.filter(
          expected,
          (_, attribute) => !Arr.contains(immutableAttributes, attribute),
        );
        const removedTags = Record.keys(
          Record.filter(
            previous.tags,
            (_, key) => !Record.has(desired.tags, key),
          ),
        );

        // The update operation preflights all attribute and tag changes together.
        // Empty changes skip APIs that reject empty maps. Only tags owned by the
        // previous declaration qualify for removal; other provider tags remain.
        const changes = Arr.filter(
          [
            {
              enabled: !Record.isEmptyRecord(attributes),
              operation: definition.operations.update,
              input: {
                [definition.mapping.identity.parameter]: identity,
                Attributes: attributes,
              },
            },
            {
              enabled: !Record.isEmptyRecord(desired.tags),
              operation: definition.operations.tag,
              input: {
                [definition.mapping.identity.parameter]: identity,
                [definition.mapping.tags.updateParameter]: desired.tags,
              },
            },
            {
              enabled: removedTags.length > 0,
              operation: definition.operations.untag,
              input: {
                [definition.mapping.identity.parameter]: identity,
                [definition.mapping.tags.removeParameter]: removedTags,
              },
            },
          ],
          (change) => change.enabled,
        );
        const validated = yield* Effect.forEach(
          changes,
          Effect.fnUntraced(function* (change) {
            const input = yield* Schema.decodeUnknownEffect(
              change.operation.input,
            )(change.input);
            return { operation: change.operation, input };
          }),
        );
        yield* Effect.forEach(validated, (change) =>
          invoke(definition, change.operation, change.input),
        );

        const observed = yield* waitForState(
          definition,
          identity,
          attributes,
          desired.tags,
          removedTags,
        );
        const observedNode = Struct.assign(node, { outputs: current.outputs });
        const applied = yield* model.withObservedOutputs(
          observedNode,
          observed.resource,
        );
        const result: ResourceCommandResult = ResourceCommandResult.Updated({
          node: applied,
        });

        return result;
      });

      /**
       * The destroy service method confirms provider absence before core can
       * release ownership. A configured missing-resource error is idempotent
       * success. Failed deletion or observation leaves saved ownership for retry.
       */
      const destroy = Effect.fn("AwsResourcePolicy.destroy")(function* (
        definition: AwsAttributeResourceConfiguration,
        node: ResourceNode,
      ) {
        const { property, parameter } = definition.mapping.identity;
        const outputs = yield* model.decodeOutputs(
          node,
          Schema.Struct({ [property]: Schema.NonEmptyString }),
        );
        const identity = yield* Record.get(outputs, property).pipe(
          Effect.fromOption,
        );

        yield* invoke(definition, definition.operations.remove, {
          [parameter]: identity,
        }).pipe(
          Effect.catchIf(
            (failure) =>
              failure._tag === "AwsServiceError" &&
              Arr.contains(definition.mapping.missingErrors, failure.code),
            () => Effect.void,
          ),
        );

        // The destroy operation requires a missing read after deletion. An
        // accepted DeleteQueue request can precede removal by up to 60 seconds.
        yield* observe(definition, identity).pipe(
          Effect.repeat({
            while: Option.isSome,
            schedule: Schedule.spaced("1 second"),
          }),
          Effect.timeout("75 seconds"),
        );
        const result: ResourceCommandResult = ResourceCommandResult.Destroyed({
          node,
        });

        return result;
      });

      /**
       * The execute service method handles core's resource command protocol.
       * Failures retain the original command and typed cause so core can report
       * the failed action and recover its saved lifecycle progress.
       */
      const execute = Effect.fn("AwsResourcePolicy.execute")(
        function* (
          definition: AwsAttributeResourceConfiguration,
          command: ResourceCommand,
        ) {
          const action = yield* Match.value(command).pipe(
            Match.tag("Apply", ({ decision }) => Effect.succeed(decision)),
            Match.tag("Create", "Read", "Destroy", (command) =>
              Effect.succeed(command),
            ),
            Match.orElse(() =>
              Effect.fail(new ResourceCommandUnsupported({ command })),
            ),
          );
          const result: ResourceCommandResult = yield* Match.value(action).pipe(
            Match.tag("Create", ({ node }) => create(definition, node)),
            Match.tag("Read", ({ node }) => read(definition, node)),
            Match.tag("Update", ({ node, current }) =>
              update(definition, node, current),
            ),
            Match.tag("Delete", "Destroy", ({ node }) =>
              destroy(definition, node),
            ),
            Match.orElse(() =>
              Effect.fail(new ResourceCommandUnsupported({ command })),
            ),
          );

          return result;
        },
        (effect, _, command) =>
          effect.pipe(
            Effect.mapError(
              (cause) => new ResourceCommandExecutionFailed({ command, cause }),
            ),
          ),
      );

      return {
        invoke,
        observe,
        waitForState,
        create,
        read,
        update,
        destroy,
        execute,
      };
    }),
  },
) {}

export const awsResourcePolicyLayer = Layer.effect(
  AwsResourcePolicy,
  AwsResourcePolicy.make,
).pipe(
  Layer.provideMerge(awsResourceMappingLayer),
  Layer.provide(resourceModelLayer),
);

/**
 * The awsResourcePolicyRegistration function makes generated resource commands
 * available in the application's shared runtime. The provider supplies the AWS
 * client and digest, and declaration and execution share ResourceModel.
 */
export const awsResourcePolicyRegistration = (
  definition: AwsAttributeResourceConfiguration,
) =>
  Layer.effect(
    providerCommandPolicyTag(definition.schema),
    Effect.gen(function* () {
      const policy = yield* AwsResourcePolicy;
      return {
        execute: (command: ResourceCommand) =>
          policy.execute(definition, command),
      };
    }),
  ).pipe(Layer.provideMerge(awsResourcePolicyLayer));
