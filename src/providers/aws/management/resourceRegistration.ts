import {
  Array as Arr,
  type Duration,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schedule,
  Schema,
} from "effect";
import {
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../../core/resource/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  type ResourceSchemaAnnotation,
  resourceModelLayer,
} from "../../../core/resource/model.js";
import { ResourceCommandExecutionFailed } from "../../../core/resource/resourceCommandPolicy.js";
import { providerCommandPolicyTag } from "../../resourceCommandPolicyLayer.js";
import { AwsClient } from "../client/awsClient.js";
import type {
  AwsJsonRpcPayload,
  AwsOperation,
  AwsServiceDefinition,
  AwsServiceError,
} from "../client/awsClientModel.js";

type Operation<Output> = AwsOperation & {
  readonly input: Schema.Codec<Schema.JsonObject, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<Output, unknown>;
};

/**
 * The awsResourceRegistration function supplies a lifecycle Layer for
 * resources that use one AWS call per change. The read input schema selects
 * the identity from the create request and response. This lets child
 * resources retain parent identifiers that AWS omits from its reply.
 *
 * The Layer waits for reads to confirm a change. The optional readiness
 * check lets a provider keep waiting after an object first appears. Core
 * releases ownership when a post-delete read returns a configured
 * missing-resource error. A provider can select rejected creates that may
 * succeed after propagation. The retry window retains the last AWS error.
 *
 * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/Schedule.ts (upTo)
 */
export const awsResourceRegistration = (
  schema: ResourceSchemaAnnotation,
  definition: {
    readonly service: AwsServiceDefinition;
    readonly create: Operation<Schema.JsonObject>;
    readonly read: Operation<Schema.JsonObject>;
    readonly update: Operation<unknown>;
    readonly remove: Operation<unknown>;
    readonly missingErrors: ReadonlyArray<string>;
    readonly timeout: Duration.Input;
    readonly ready?: (observation: Schema.JsonObject) => boolean;
    readonly retryCreate?: (error: AwsServiceError) => boolean;
  },
) =>
  Layer.effect(
    providerCommandPolicyTag(schema),
    Effect.gen(function* () {
      const model = yield* ResourceModel;
      const client = yield* AwsClient;

      const bindOperation = client.bindOperation(definition.service);

      const bind = <Output>(operation: Operation<Output>) => {
        const call = bindOperation(operation);
        const input = Schema.decodeUnknownEffect(
          Schema.toType(operation.input),
          {
            onExcessProperty: "error",
          },
        );

        return (value: Schema.JsonObject) =>
          input(value).pipe(Effect.flatMap(call));
      };
      const createResource = bind(definition.create);
      const readResource = bind(definition.read);
      const updateResource = bind(definition.update);
      const removeResource = bind(definition.remove);

      const readIdentity = Schema.decodeUnknownEffect(
        Schema.toType(definition.read.input),
      );

      const isMissing = (failure: { readonly _tag: string }) =>
        failure._tag === "AwsServiceError" &&
        "code" in failure &&
        Arr.contains(definition.missingErrors, failure.code);

      /**
       * The readProvider operation carries forward identity fields that the
       * provider omits. Fields AWS does return take precedence so the caller
       * can detect an identity mismatch.
       */
      const readProvider = Effect.fn("AwsResource.readProvider")(function* (
        node: ResourceNode,
      ) {
        const identity = yield* readIdentity(node.outputs);

        const observation: Option.Option<Schema.JsonObject> =
          yield* readResource(identity).pipe(
            Effect.map((fields) => Option.some({ ...identity, ...fields })),
            Effect.catchIf(isMissing, () => Effect.succeedNone),
          );

        return observation;
      });

      const read = Effect.fn("AwsResource.read")(function* (
        node: ResourceNode,
      ) {
        const observation = yield* readProvider(node);

        return yield* observation.pipe(
          Option.map((observed) =>
            model
              .withObservedOutputs(node, observed)
              .pipe(Effect.map((node) => ({ node, observed }))),
          ),
          Effect.transposeOption,
        );
      });

      const waitFor = (
        node: ResourceNode,
        accepts: (state: Schema.JsonObject) => boolean,
      ) =>
        read(node).pipe(
          Effect.repeat({
            while: (state) =>
              !Option.exists(
                state,
                ({ observed }) =>
                  (definition.ready?.(observed) ?? true) && accepts(observed),
              ),
            schedule: Schedule.spaced("1 second"),
          }),
          Effect.timeout(definition.timeout),
          Effect.flatMap(Effect.fromOption),
        );

      const create = Effect.fn("AwsResource.create")(function* (
        node: ResourceNode,
      ) {
        const properties = yield* model.decodeProps(node, Schema.JsonObject);

        const request = createResource(properties);

        const created = yield* Option.fromUndefinedOr(
          definition.retryCreate,
        ).pipe(
          Option.match({
            onNone: () => request,
            onSome: (retryCreate) =>
              request.pipe(
                Effect.retry({
                  while: (failure) =>
                    failure._tag === "AwsServiceError" && retryCreate(failure),
                  schedule: Schedule.spaced("1 second").pipe(
                    Schedule.upTo({ duration: definition.timeout }),
                  ),
                }),
              ),
          }),
        );

        const identityFields = { ...properties, ...created };

        const identity = yield* readIdentity(identityFields);

        const identified = yield* model.withOutputs(node, identity);

        const observed = yield* waitFor(identified, () => true);

        return ResourceCommandResult.Created({ node: observed.node });
      });

      const update = Effect.fn("AwsResource.update")(function* (
        node: ResourceNode,
        current: ResourceNode,
      ) {
        const desired = yield* model.decodeProps(node, Schema.JsonObject);
        const saved = yield* model.decodeProps(current, Schema.JsonObject);
        const equivalent = Schema.toEquivalence(Schema.Json);
        const sameProps = Record.isSubrecordBy(equivalent);
        yield* Effect.fail(
          new ResourceCommandUnsupported({
            command: ResourceCommand.Apply({
              decision: { _tag: "Update", node, current },
            }),
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Record.keys(saved).some(
                (property) => !Record.has(desired, property),
              ),
            ),
          ),
        );

        const changes = Record.filter(
          desired,
          (value, property) =>
            !Record.has(saved, property) || !equivalent(value, saved[property]),
        );
        const identity = yield* Schema.decodeUnknownEffect(
          Schema.toType(definition.read.input),
        )(current.outputs);

        yield* updateResource({ ...changes, ...identity });
        const identified = yield* model.withOutputs(node, current.outputs);
        const observed = yield* waitFor(identified, (state) =>
          sameProps(changes, state),
        );

        return ResourceCommandResult.Updated({ node: observed.node });
      });

      const destroy = Effect.fn("AwsResource.destroy")(function* (
        node: ResourceNode,
      ) {
        const identity = yield* Schema.decodeUnknownEffect(
          Schema.toType(definition.remove.input),
        )(node.outputs);
        yield* removeResource(identity).pipe(
          Effect.asVoid,
          Effect.catchIf(isMissing, () => Effect.void),
        );
        yield* readProvider(node).pipe(
          Effect.repeat({
            while: Option.isSome,
            schedule: Schedule.spaced("1 second"),
          }),
          Effect.timeout(definition.timeout),
        );

        return ResourceCommandResult.Destroyed({ node });
      });

      const execute = Effect.fn("AwsResource.execute")(
        (command: ResourceCommand) =>
          Match.value(command).pipe(
            Match.tag("Read", ({ node }) =>
              read(node).pipe(
                Effect.map((result) => {
                  const observation = Option.match(result, {
                    onNone: () => ResourceObservation.Missing({ node }),
                    onSome: ResourceObservation.Present,
                  });

                  return ResourceCommandResult.Observed({ observation });
                }),
              ),
            ),
            Match.tag("Create", ({ node }) => create(node)),
            Match.tag("Delete", "Destroy", ({ node }) => destroy(node)),
            Match.tag("Apply", ({ decision }) =>
              Match.value(decision).pipe(
                Match.tag("Create", ({ node }) => create(node)),
                Match.tag("Update", ({ node, current }) =>
                  update(node, current),
                ),
                Match.tag("Delete", "Destroy", ({ node }) => destroy(node)),
                Match.orElse(() =>
                  Effect.fail(new ResourceCommandUnsupported({ command })),
                ),
              ),
            ),
            Match.orElse(() =>
              Effect.fail(new ResourceCommandUnsupported({ command })),
            ),
          ),
        (effect, command) =>
          Effect.mapError(
            effect,
            (cause) => new ResourceCommandExecutionFailed({ command, cause }),
          ),
      );

      return { execute };
    }),
  ).pipe(Layer.provide(resourceModelLayer));
