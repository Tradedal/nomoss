import { AwsClient } from "@tradedal/aws-client-core";
import {
  type AwsJsonRpcPayload,
  type AwsOperation,
  type AwsServiceDefinition,
  AwsServiceError,
} from "@tradedal/aws-client-core/model";
import {
  Array as Arr,
  Context,
  Data,
  type Duration,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  Struct,
} from "effect";
import {
  ResourceCommand,
  ResourceCommandUnsupported,
} from "../../../src/core/resource/lifecycle.js";
import {
  ResourceIdentityMismatch,
  ResourceModel,
  type ResourceNode,
  type ResourceSchemaAnnotation,
} from "../../../src/core/resource/model.js";
import { ResourceLifecycle } from "../../../src/core/resource/resourceLifecycle.js";
import { ResourceStabilization } from "../../../src/core/resource/resourceStabilization.js";
import {
  providerCommandPolicyTag,
  registerResourceCommands,
} from "../../../src/providers/resourceCommandPolicyLayer.js";
import {
  type AwsAssociationConfiguration,
  AwsResourceAssociationConfiguration,
} from "./resourceAssociationConfiguration.js";
import { AwsResourceMapping } from "./resourceMapping.js";

/**
 * The ResourceOperation type allows a lifecycle definition to use the names
 * from a stack declaration even when AWS expects different field names.
 * The generated operation still determines which requests and replies are valid.
 */
export type ResourceOperation<Output> = AwsOperation & {
  readonly input: Schema.Codec<Schema.JsonObject, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<Output, unknown>;
};

/**
 * The AwsLifecycleSettings interface specifies which AWS errors a stack may
 * treat as proof that a resource is absent. Keep authorization errors out of
 * that list: a denied read tells the stack nothing about whether the resource
 * exists.
 */
export interface AwsLifecycleSettings {
  readonly service: AwsServiceDefinition;
  readonly missingErrors: ReadonlyArray<string>;
  readonly timeout: Duration.Input;
}

class AwsResourceCreateConflict extends Data.TaggedError(
  "AwsResourceCreateConflict",
)<{
  readonly identity: Schema.JsonObject;
}> {
  override get message() {
    return "AWS already has an object with the requested identity.";
  }
}

/**
 * The AwsResourceLifecycleDefinition interface requires a read that accepts
 * the saved identity on its own. A stack must still be able to verify the
 * object it will delete after you remove the declaration.
 */
interface AwsResourceLifecycleDefinition {
  readonly schema: ResourceSchemaAnnotation;
  readonly outputsSchema?: Schema.Schema<unknown>;
  readonly generatedName?: {
    readonly property: string;
    readonly maxLength: number;
  };
  /**
   * The createMode option protects resources when AWS uses the same operation
   * to create and overwrite them. For example, PutGroupPolicy would replace
   * the policy document if the group already had a policy with that name.
   * With requireAbsent, the stack checks the group and policy name first. If
   * IAM returns the policy, the command fails with AwsResourceCreateConflict
   * before it sends PutGroupPolicy.
   *
   * @see ../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (PutGroupPolicy)
   */
  readonly createMode?: "requireAbsent";
  readonly create: ResourceOperation<Schema.JsonObject>;
  readonly read: ResourceOperation<Schema.JsonObject>;
  readonly remove: ResourceOperation<unknown>;
  readonly ownership?: {
    readonly identity: Schema.Decoder<Schema.JsonObject>;
    readonly property: string;
  };
  readonly ready?: (observation: Schema.JsonObject) => boolean;
  readonly retryCreate?: (error: AwsServiceError) => boolean;
}

/**
 * The AwsResourceLifecycleMapping type lets a resource use separate AWS
 * calls for changes to its members. Use the association definition when
 * those members are part of the declared resource but require their own AWS
 * requests. An IAM instance profile's role is one example.
 */
export type AwsResourceLifecycleMapping = AwsResourceLifecycleDefinition &
  (
    | {
        readonly update: ResourceOperation<unknown>;
        readonly associations?: never;
      }
    | {
        readonly associations: AwsAssociationConfiguration;
        readonly update?: never;
      }
  );

/**
 * The AwsResourceLifecycleRegistration service is for AWS resources whose
 * native read can confirm a change. If AWS accepts a name that another
 * object can reuse, supply the original provider ID as part of the saved
 * identity. The stack can then reject a different object at that name.
 *
 * @see ../../../refs/effect/packages/effect/src/Context.ts (Service)
 */
export class AwsResourceLifecycleRegistration extends Context.Service<AwsResourceLifecycleRegistration>()(
  "nomoss/providers/aws/management/resourceLifecycleRegistration/AwsResourceLifecycleRegistration",
  {
    make: Effect.fn("AwsResourceLifecycleRegistration.make")(function* (
      settings: AwsLifecycleSettings,
      definition: AwsResourceLifecycleMapping,
    ) {
      const model = yield* ResourceModel;
      const names = yield* AwsResourceMapping;
      const client = yield* AwsClient;
      const stabilization = yield* ResourceStabilization;

      const associations = yield* Option.fromUndefinedOr(
        definition.associations,
      ).pipe(
        Option.map((mapping) =>
          AwsResourceAssociationConfiguration.make(settings, mapping),
        ),
        Effect.transposeOption,
      );

      yield* Option.fromUndefinedOr(definition.outputsSchema).pipe(
        Option.map((outputs) =>
          model.registerOutputsSchema(definition.schema, outputs),
        ),
        Effect.transposeOption,
      );

      const bindOperation = client.bindOperation(settings.service);

      const ownership = Option.fromUndefinedOr(definition.ownership);
      const savedIdentity =
        definition.ownership?.identity ?? Schema.toType(definition.read.input);

      const isMissing = AwsServiceError.hasCode(...settings.missingErrors);

      const ready = (outputs: Schema.JsonObject) =>
        definition.ready?.(outputs) ?? true;

      /**
       * The decodeAndCall function rejects extra properties when a stack command
       * submits its AWS request. A typo or an incomplete request definition should
       * fail the command before the stack can report success for a property AWS
       * never received.
       *
       * @see ../client-core/awsClient.ts (AwsClient.bindOperation)
       */
      const decodeAndCall = <Output>(operation: ResourceOperation<Output>) => {
        const call = bindOperation(operation);
        const input = Schema.decodeUnknownEffect(
          Schema.toType(operation.input),
          {
            onExcessProperty: "error",
          },
        );

        return (properties: Schema.JsonObject) =>
          input(properties).pipe(Effect.flatMap(call));
      };

      const createResource = decodeAndCall(definition.create);
      const readResource = decodeAndCall(definition.read);
      const removeResource = decodeAndCall(definition.remove);

      const readIdentity = Schema.decodeUnknownEffect(
        Schema.toType(definition.read.input),
      );
      const removeIdentity = Schema.decodeUnknownEffect(
        Schema.toType(definition.remove.input),
      );

      /**
       * The readProvider operation rejects a different object at the saved address
       * when the definition supplies an immutable ID. For a child resource, the
       * observation also includes any parent identity that the AWS reply leaves out.
       * An inline policy, for example, needs that identity for later commands.
       *
       * @see ../../../src/core/resource/resourceLifecycle.ts (ResourceLifecycle.make)
       * @see ../../../refs/effect/packages/effect/src/Struct.ts (assign)
       */
      const readProvider = Effect.fnUntraced(function* (
        saved: Schema.JsonObject,
      ) {
        const identity = yield* readIdentity(saved);

        const returned = yield* readResource(identity);

        const mismatch = ownership.pipe(
          Option.filter(
            ({ property }) => returned[property] !== saved[property],
          ),
        );

        yield* mismatch.pipe(
          Option.map(
            ({ property }) =>
              new ResourceIdentityMismatch({
                property,
                expected: saved[property],
                actual: returned[property],
              }),
          ),
          Option.map(Effect.fail),
          Effect.transposeOption,
        );

        const observed = Struct.assign(identity, returned);

        return Option.some(observed);
      });

      /**
       * The creationProperties operation gives an unnamed resource the same
       * generated name on another apply for the same generation. If AWS already
       * received the first request, the retry still addresses that name.
       *
       * @see ./resourceMapping.ts (AwsResourceMapping.resolveName)
       * @see ../../../refs/effect/packages/effect/src/Effect.ts (transposeOption)
       */
      const creationProperties = Effect.fnUntraced(function* (
        node: ResourceNode,
      ) {
        const properties = yield* model.decodeProps(node, Schema.JsonObject);

        const missingName = Option.fromUndefinedOr(
          definition.generatedName,
        ).pipe(
          Option.filter(({ property }) => !Record.has(properties, property)),
        );

        const named = yield* missingName.pipe(
          Option.map(
            Effect.fnUntraced(function* ({ property, maxLength }) {
              const name = yield* names.resolveName(node, undefined, maxLength);

              return Record.set(properties, property, name);
            }),
          ),
          Effect.transposeOption,
        );

        return Option.getOrElse(named, () => properties);
      });

      /**
       * The create operation supplies an identity for the first confirmation.
       * An inline policy write can return an empty reply. In that case the stack
       * uses the parent and policy name from the request to find the policy.
       *
       * @see ../../../src/core/resource/resourceStabilization.ts (retrySchedule)
       * @see ../../../refs/effect/packages/effect/src/Effect.ts (retry)
       */
      const create = Effect.fn("AwsResourceLifecycleRegistration.create")(
        function* (node: ResourceNode) {
          const properties = yield* creationProperties(node);

          yield* readIdentity(properties).pipe(
            Effect.flatMap((identity) =>
              readResource(identity).pipe(
                Effect.flatMap(() =>
                  Effect.fail(new AwsResourceCreateConflict({ identity })),
                ),
              ),
            ),
            Effect.catchIf(isMissing, () => Effect.void),
            Effect.when(
              Effect.succeed(definition.createMode === "requireAbsent"),
            ),
          );

          const request = Option.match(associations, {
            onNone: () => createResource(properties),
            onSome: (operations) =>
              operations
                .createProperties(properties)
                .pipe(Effect.flatMap(createResource)),
          });

          // The create operation retries only AWS service errors that this
          // definition recognizes. A transport failure may leave the first
          // request's outcome unknown, so this step returns that failure.
          const retry = Option.fromUndefinedOr(definition.retryCreate);

          const submission = Option.match(retry, {
            onNone: () => request,
            onSome: (accepts) =>
              Effect.retry(request, {
                while: (failure) =>
                  failure._tag === "AwsServiceError" && accepts(failure),
                schedule: stabilization.retrySchedule(settings.timeout),
              }),
          });

          const created = yield* submission;

          const identified = Struct.assign(properties, created);
          const identity =
            yield* Schema.decodeUnknownEffect(savedIdentity)(identified);

          return identity;
        },
      );

      /**
       * The directUpdate operation rejects an update that removes a declared
       * property. For a patch request, the absent field could tell AWS to keep its
       * old value when the stack needs the provider to clear it.
       *
       * @see ../../../docs/application/resource-operations.md (Update a resource)
       * @see ../../../refs/effect/packages/effect/src/Effect.ts (filterOrFail)
       */
      const directUpdate = (operation: ResourceOperation<unknown>) =>
        Effect.fn("AwsResourceLifecycleRegistration.update")(function* (
          node: ResourceNode,
          current: ResourceNode,
        ) {
          const desired = yield* model.decodeProps(node, Schema.JsonObject);
          const saved = yield* model.decodeProps(current, Schema.JsonObject);

          const removesProperty = Record.some(
            saved,
            (_, property) => !Record.has(desired, property),
          );

          yield* Effect.succeed(removesProperty).pipe(
            Effect.filterOrFail(
              (removed) => !removed,
              () =>
                new ResourceCommandUnsupported({
                  command: ResourceCommand.Apply({
                    decision: { _tag: "Update", node, current },
                  }),
                }),
            ),
          );

          const equivalent = Schema.toEquivalence(Schema.Json);
          const changes = Record.filter(
            desired,
            (value, property) =>
              !Record.has(saved, property) ||
              !equivalent(value, saved[property]),
          );

          const identity = yield* readIdentity(current.outputs);
          const request = Struct.assign(changes, identity);

          // The directUpdate operation compares values in the form the AWS
          // read returns. For an API Gateway route, a declaration can carry
          // "integrations/abc" while the observation carries the ID "abc".
          // See ./resourceOperation.ts (resourceRequest and relationshipValueCodec).
          const encoded = yield* Schema.encodeEffect(operation.input)(request);
          const normalized = yield* Schema.decodeEffect(operation.input)(
            encoded,
          );

          const expected = Record.filter(normalized, (_, key) =>
            Record.has(changes, key),
          );

          // The directUpdate operation verifies the saved ID when the
          // definition supplies one. IAM can reuse a group name, and the
          // update request accepts only the name as its address.
          yield* model
            .decodeOutputs(current, savedIdentity)
            .pipe(
              Effect.flatMap(readProvider),
              Effect.when(Effect.succeed(Option.isSome(ownership))),
            );

          yield* decodeAndCall(operation)(request);

          const sameProps = Record.isSubrecordBy(equivalent);
          const accepts = (state: Schema.JsonObject): boolean =>
            ready(state) && sameProps(expected, state);

          return accepts;
        });

      const lifecycle = yield* ResourceLifecycle.make(
        {
          identity: savedIdentity,
          lookup: (saved) =>
            readProvider(saved).pipe(
              Effect.catchIf(isMissing, () => Effect.succeedNone),
            ),
        },
        settings.timeout,
      );

      /**
       * The remove operation accepts the service's absence error after a prior
       * attempt deletes the object. The stack can proceed to its confirmation
       * read and finish teardown.
       */
      const remove = (saved: Schema.JsonObject) =>
        removeIdentity(saved).pipe(
          Effect.flatMap(removeResource),
          Effect.catchIf(isMissing, () => Effect.void),
        );

      const verification = Option.match(associations, {
        onNone: () => Option.getOrUndefined(Option.map(ownership, () => ({}))),
        onSome: (operations) => ({
          cleanup: (observed: Schema.JsonObject, node: ResourceNode) =>
            operations
              .readSelection(node)
              .pipe(
                Effect.flatMap((previous) =>
                  operations.reconcile(observed, previous, []),
                ),
              ),
        }),
      });

      const destroy = lifecycle.remove(remove, verification);

      const updateResource = Effect.fnUntraced(function* (
        node: ResourceNode,
        current: ResourceNode,
      ) {
        return yield* Match.value(associations).pipe(
          Match.tag("Some", ({ value: operations }) =>
            lifecycle.observedUpdate(
              (node, current) =>
                Effect.all({
                  desired: operations.readSelection(node),
                  previous: operations.readSelection(current),
                }),
              (observed, { previous, desired }) =>
                operations.reconcile(observed, previous, desired),
            )(node, current),
          ),
          Match.tag("None", () =>
            Effect.fromOption(Option.fromUndefinedOr(definition.update)).pipe(
              Effect.flatMap((operation) =>
                directUpdate(operation)(node, current),
              ),
            ),
          ),
          Match.exhaustive,
        );
      });

      const update = lifecycle.update(updateResource);

      const createOptions = Option.match(associations, {
        onNone: () => ({
          // The create checkpoint records the accepted identity even when
          // the first confirmation fails. A requireAbsent retry can then
          // recognize its own resource without another create request.
          checkpoint: Schema.JsonObject,
          matches: (_created: Schema.JsonObject, observed: Schema.JsonObject) =>
            ready(observed),
        }),
        onSome: (operations) => ({
          checkpoint: Schema.JsonObject,
          configure: (node: ResourceNode, observed: Schema.JsonObject) =>
            operations
              .readSelection(node)
              .pipe(
                Effect.flatMap((desired) =>
                  operations.reconcile(observed, [], desired),
                ),
              ),
        }),
      });

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: (command) => lifecycle.observe(command),
          Create: lifecycle.create(create, createOptions),
          Update: update,
          Destroy: destroy,
        }),
      );
    }),
  },
) {
  /**
   * The layer method registers a fixed set of definitions for a caller that
   * already knows which resources it needs. Layer initialization constructs
   * every executor in that set, so use the lazy registry for a provider catalog.
   *
   * @see ../../../refs/effect/packages/effect/src/Layer.ts (effectContext and mergeAll)
   */
  static layer(
    settings: AwsLifecycleSettings,
    ...resources: AwsResourceLifecycleMapping[]
  ) {
    const registrations = Arr.map(resources, (resource) =>
      Layer.effectContext(
        AwsResourceLifecycleRegistration.make(settings, resource).pipe(
          Effect.map(({ execute }) =>
            registerResourceCommands(
              execute,
              providerCommandPolicyTag(resource.schema),
            ),
          ),
        ),
      ),
    );

    return Layer.mergeAll(Layer.empty, ...registrations);
  }
}
