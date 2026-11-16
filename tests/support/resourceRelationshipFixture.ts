import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Layer,
  Match,
  Option,
  Predicate,
  Ref,
  Schema,
} from "effect";
import { KeyValueStore } from "effect/persistence";
import {
  type ResourceCommand,
  ResourceCommandResult,
} from "../../src/core/resource/lifecycle.js";
import {
  annotateResourceSchema,
  type ResourceEntity,
  ResourceModel,
  type ResourceNode,
  ResourceReferenceSchema,
} from "../../src/core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandPolicy,
} from "../../src/core/resource/resourceCommandPolicy.js";
import {
  ResourceGraphBuilder,
  resourceGraphBuilderLayer,
} from "../../src/core/resource/resourceGraphBuilder.js";
import { resourceStackLifecycleLayer } from "../../src/core/stack/resourceStackLifecycle.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";

export const RelationshipSourceType = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("relationships"),
  resource: Schema.Literal("source"),
});
export const RelationshipOtherType = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("relationships"),
  resource: Schema.Literal("other"),
});
export const RelationshipDependentType = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("relationships"),
  resource: Schema.Literal("dependent"),
});

export const RelationshipSourceProps = annotateResourceSchema(
  Schema.Struct({ revision: Schema.Int, label: Schema.NonEmptyString }),
  {
    provider: "aws",
    service: "relationships",
    resource: "source",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/identity"],
  },
);
export const RelationshipSourceOutputs = Schema.Struct({
  identity: Schema.Struct({
    account: Schema.NonEmptyString,
    id: Schema.NonEmptyString,
  }),
  sequence: Schema.Int,
});
export const RelationshipEntityReference = ResourceReferenceSchema(
  RelationshipSourceType,
  {
    value: { account: null, id: null },
    outputs: [
      { source: ["identity", "account"], target: ["account"] },
      { source: ["identity", "id"], target: ["id"] },
    ],
  },
);
export const RelationshipScalarReference = ResourceReferenceSchema(
  RelationshipSourceType,
  {
    value: null,
    outputs: [{ source: ["identity", "id"], target: [] }],
  },
);
export const RelationshipDependentProps = annotateResourceSchema(
  Schema.Struct({
    label: Schema.NonEmptyString,
    resources: Schema.Array(
      Schema.Struct({ owner: RelationshipEntityReference }),
    ),
    selected: RelationshipScalarReference,
  }),
  {
    provider: "stripe",
    service: "relationships",
    resource: "dependent",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/id"],
  },
);
export const RelationshipDependentRequest = Schema.Struct({
  label: Schema.NonEmptyString,
  resources: Schema.Array(
    Schema.Struct({ owner: RelationshipSourceOutputs.fields.identity }),
  ),
  selected: Schema.NonEmptyString,
});
export const RelationshipDependentOutputs = Schema.Struct({
  id: Schema.NonEmptyString,
});

export class RelationshipMutationRejected extends Data.TaggedError(
  "RelationshipMutationRejected",
)<Record<never, never>> {}

export type RelationshipRequest = {
  readonly operation: "Create" | "Update" | "Delete" | "Destroy";
  readonly logicalId: string;
  readonly props: Schema.Json;
};

/**
 * The ResourceRelationshipFixture service supplies provider outcomes for core
 * tests. Source updates return a new physical identity so dependent requests
 * must resolve again through production lifecycle and state services.
 */
export class ResourceRelationshipFixture extends Context.Service<ResourceRelationshipFixture>()(
  "nomoss/tests/support/resourceRelationshipFixture",
  {
    make: Effect.gen(function* () {
      const builder = yield* ResourceGraphBuilder;
      const model = yield* ResourceModel;
      const requests = yield* Ref.make<ReadonlyArray<RelationshipRequest>>([]);
      const rejection = yield* Ref.make(false);

      /**
       * The declareSource fixture method registers a resource whose next
       * physical identity depends on its requested revision.
       */
      const declareSource = Effect.fn(
        "ResourceRelationshipFixture.declareSource",
      )(function* (logicalId: string, revision = 1) {
        const declaration = yield* builder.resource({ logicalId });
        const entity: ResourceEntity<typeof RelationshipSourceType.Type> =
          yield* declaration.registerEntity(RelationshipSourceType, {
            propsSchema: RelationshipSourceProps,
            outputsSchema: RelationshipSourceOutputs,
            requestSchema: RelationshipSourceProps,
            props: {
              revision,
              label: "source-properties-must-stay-with-source",
            },
          });

        return entity;
      });

      /**
       * The declareDependent fixture method accepts a source entity in direct
       * and nested properties. Both relationships use the same registered source.
       */
      const declareDependent = Effect.fn(
        "ResourceRelationshipFixture.declareDependent",
      )(function* (
        logicalId: string,
        source: ResourceEntity<typeof RelationshipSourceType.Type>,
      ) {
        const declaration = yield* builder.resource({ logicalId });
        const entity: ResourceEntity<typeof RelationshipDependentType.Type> =
          yield* declaration.registerEntity(RelationshipDependentType, {
            propsSchema: RelationshipDependentProps,
            outputsSchema: RelationshipDependentOutputs,
            requestSchema: RelationshipDependentRequest,
            props: {
              label: "dependent",
              resources: [{ owner: source }],
              selected: source,
            },
          });

        return entity;
      });

      /**
       * The declareOther fixture method registers an incompatible resource
       * whose output values follow the same schema as the permitted source.
       */
      const declareOther = Effect.fn(
        "ResourceRelationshipFixture.declareOther",
      )(function* (logicalId: string) {
        const declaration = yield* builder.resource({ logicalId });
        const propsSchema = annotateResourceSchema(
          Schema.Struct({ revision: Schema.Int, label: Schema.NonEmptyString }),
          {
            provider: "stripe",
            service: "relationships",
            resource: "other",
            operation: "create",
            stateSecretOutputKeys: [],
          },
        );
        const entity: ResourceEntity<typeof RelationshipOtherType.Type> =
          yield* declaration.registerEntity(RelationshipOtherType, {
            propsSchema,
            outputsSchema: RelationshipSourceOutputs,
            props: { revision: 1, label: "other" },
          });

        return entity;
      });

      /**
       * The execute fixture method captures requests after core resolution and
       * supplies validated provider results. A rejected dependent update leaves
       * recovery to the production lifecycle service.
       */
      const execute = Effect.fn("ResourceRelationshipFixture.execute")(
        function* (command: ResourceCommand) {
          const decision = yield* Match.value(command).pipe(
            Match.tag("Apply", ({ decision }) => Effect.succeed(decision)),
            Match.orElse(() => Effect.fail(new RelationshipMutationRejected())),
          );
          const pending = yield* Match.value(decision).pipe(
            Match.tag("Create", "Update", "Delete", "Destroy", (action) =>
              Effect.succeed(action),
            ),
            Match.orElse(() => Effect.fail(new RelationshipMutationRejected())),
          );
          const isMutation = Predicate.or(
            Predicate.isTagged("Create"),
            Predicate.isTagged("Update"),
          );
          const isDependent = (node: ResourceNode) =>
            node.schema.resource === "dependent";

          yield* Ref.update(
            requests,
            Arr.append({
              operation: pending._tag,
              logicalId: pending.node.key.logicalId,
              props: pending.node.props,
            }),
          );

          const input = yield* Match.value(isDependent(pending.node)).pipe(
            Match.when(true, () =>
              model.decodeProps(pending.node, RelationshipDependentRequest),
            ),
            Match.orElse(() =>
              model.decodeProps(pending.node, RelationshipSourceProps),
            ),
            Effect.when(Effect.succeed(isMutation(pending))),
          );
          const rejected = yield* Ref.get(rejection);

          yield* Effect.fail(new RelationshipMutationRejected()).pipe(
            Effect.when(
              Effect.succeed(
                isMutation(pending) && isDependent(pending.node) && rejected,
              ),
            ),
          );

          const outputs: Schema.Json = Option.match(input, {
            onNone: () => pending.node.outputs,
            onSome: (props) =>
              Match.value(props).pipe(
                Match.when(Schema.is(RelationshipSourceProps), (props) => ({
                  identity: {
                    account: "account",
                    id: `resource-${props.revision}`,
                  },
                  sequence: props.revision,
                })),
                Match.orElse(() => ({ id: pending.node.key.logicalId })),
              ),
          });
          const observed = yield* model
            .withOutputs(pending.node, outputs)
            .pipe(Effect.when(Effect.succeed(isMutation(pending))));
          const node: ResourceNode = Option.getOrElse(
            observed,
            () => pending.node,
          );
          const result: ResourceCommandResult = Match.value(pending).pipe(
            Match.tag("Create", () => ResourceCommandResult.Created({ node })),
            Match.tag("Update", () => ResourceCommandResult.Updated({ node })),
            Match.tag("Delete", () => ResourceCommandResult.Deleted({ node })),
            Match.tag("Destroy", () =>
              ResourceCommandResult.Destroyed({ node }),
            ),
            Match.exhaustive,
          );

          return result;
        },
        (effect, command) =>
          effect.pipe(
            Effect.mapError(
              (cause) => new ResourceCommandExecutionFailed({ command, cause }),
            ),
          ),
      );

      /**
       * The setRejectDependent fixture method controls whether the provider
       * accepts the next dependent request.
       */
      const setRejectDependent = (value: boolean) => Ref.set(rejection, value);

      return {
        declareSource,
        declareDependent,
        declareOther,
        execute,
        setRejectDependent,
        requests: Ref.get(requests),
      };
    }),
  },
) {}

const resourceRelationshipFixtureLayer = Layer.effect(
  ResourceRelationshipFixture,
  ResourceRelationshipFixture.make,
).pipe(Layer.provideMerge(resourceGraphBuilderLayer));

export const resourceRelationshipPolicyLayer = Layer.effect(
  ResourceCommandPolicy,
  Effect.gen(function* () {
    const fixture = yield* ResourceRelationshipFixture;

    return { execute: fixture.execute };
  }),
).pipe(Layer.provideMerge(resourceRelationshipFixtureLayer));

export const resourceRelationshipTestLayer = resourceStackLifecycleLayer.pipe(
  Layer.provideMerge(resourceRelationshipPolicyLayer),
  Layer.provideMerge([
    KeyValueStore.layerMemory,
    StateSecretServiceDefaultLayer,
  ]),
);
