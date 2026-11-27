import { AwsClient } from "@tradedal/aws-client-core";
import { AwsServiceError } from "@tradedal/aws-client-core/model";
import {
  Array as Arr,
  Context,
  Effect,
  Match,
  Option,
  Record,
  Schema,
  Stream,
  Struct,
} from "effect";
import {
  ResourceCommandResult,
  ResourceObservation,
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
  AssociationNames,
  AwsResourceAssociationOperations,
  type ResourceAssociationOperations,
} from "./resourceAssociations.js";
import type {
  AwsLifecycleSettings,
  ResourceOperation,
} from "./resourceLifecycleRegistration.js";
import { AwsResourceMapping } from "./resourceMapping.js";

/**
 * The AssociationPage schema requires each reply to identify the parent and
 * its members. It also preserves continuation fields such as IAM's Marker, so
 * a member on a later page can count as already present.
 */
export const AssociationPage = Schema.StructWithRest(
  Schema.Struct({
    ParentId: Schema.String,
    Members: AssociationNames,
  }),
  [Schema.JsonObject],
);

const associationRequest = Schema.Struct({
  Parent: Schema.String,
  Members: AssociationNames,
});

const identity = Schema.Struct({
  Id: Schema.String,
  Parent: Schema.String,
  ParentId: Schema.String,
});

const association = identity.mapFields((fields) => ({
  ...fields,
  Members: AssociationNames,
}));

/**
 * The AwsResourceAssociationMapping interface defines which links a stack
 * can manage on an object that exists independently of that declaration.
 * Each page must identify the parent by its immutable ID, since the provider
 * may reuse a name after deletion.
 */
export interface AwsResourceAssociationMapping {
  readonly schema: ResourceSchemaAnnotation;
  readonly outputsSchema: Schema.Schema<unknown>;
  readonly request: Schema.Decoder<typeof associationRequest.Type>;
  readonly list: ResourceOperation<typeof AssociationPage.Type>;
  readonly operations: ResourceAssociationOperations;
  readonly observationKeys: {
    readonly parent: string;
    readonly members: string;
  };
}

/**
 * The AwsResourceAssociationRegistration service treats the selected links
 * as the stack resource. For example, a group can remain in IAM after the
 * stack removes the memberships named in its declaration.
 */
export class AwsResourceAssociationRegistration extends Context.Service<AwsResourceAssociationRegistration>()(
  "nomoss/providers/aws/management/resourceAssociationRegistration/AwsResourceAssociationRegistration",
  {
    make: Effect.fn("AwsResourceAssociationRegistration.make")(function* (
      settings: AwsLifecycleSettings,
      definition: AwsResourceAssociationMapping,
    ) {
      const client = yield* AwsClient;

      const model = yield* ResourceModel;

      const names = yield* AwsResourceMapping;

      const stabilization = yield* ResourceStabilization;

      yield* model.registerOutputsSchema(
        definition.schema,
        definition.outputsSchema,
      );

      const list = client.bindOperation(settings.service)(definition.list);

      const listPages = client.bindOperationPages(settings.service)(
        definition.list,
      );

      const operations = yield* AwsResourceAssociationOperations.make(
        settings,
        definition.operations,
      );

      const missing = AwsServiceError.hasCode(...settings.missingErrors);

      /**
       * The readParent operation requires one complete view of the parent before
       * a command changes its memberships. Stream.runCollect fails if any page
       * fails. If the provider returns different parent IDs across pages, the
       * operation also rejects the result.
       *
       * @see ../../../refs/effect/packages/effect/src/Stream.ts (runCollect)
       */
      const readParent = Effect.fnUntraced(function* (Parent: string) {
        const stream = Match.value(
          Record.isEmptyRecord(definition.list.pagination),
        ).pipe(
          Match.when(true, () => Stream.fromEffect(list({ Parent }))),
          Match.orElse(() => listPages({ Parent })),
        );

        const pages = yield* Stream.runCollect(stream);

        const { ParentId } = yield* Effect.fromOption(Arr.head(pages));

        const replaced = Arr.findFirst(
          pages,
          (page) => page.ParentId !== ParentId,
        );

        yield* replaced.pipe(
          Option.map(
            (page) =>
              new ResourceIdentityMismatch({
                property: definition.observationKeys.parent,
                expected: ParentId,
                actual: page.ParentId,
              }),
          ),
          Option.map(Effect.fail),
          Effect.transposeOption,
        );

        const Members = Arr.flatMap(pages, (page) => page.Members);
        const parent: Omit<typeof association.Type, "Id"> = {
          Parent,
          ParentId,
          Members,
        };

        return parent;
      });

      /**
       * The lookup operation returns absence if the provider reports that the
       * parent no longer exists. A different ID at the saved name is an identity
       * conflict, so the caller cannot treat the result as absence.
       */
      const lookup = Effect.fnUntraced(
        function* (saved: typeof identity.Type) {
          const parent = yield* readParent(saved.Parent);

          yield* new ResourceIdentityMismatch({
            property: definition.observationKeys.parent,
            expected: saved.ParentId,
            actual: parent.ParentId,
          }).pipe(
            Effect.when(Effect.succeed(saved.ParentId !== parent.ParentId)),
          );

          const result: typeof association.Type = { ...parent, Id: saved.Id };

          return Option.some(result);
        },
        Effect.catchIf(missing, () =>
          Effect.succeed(Option.none<typeof association.Type>()),
        ),
      );

      const lifecycle = yield* ResourceLifecycle.make(
        { identity, lookup },
        settings.timeout,
      );

      const readRequest = (node: ResourceNode) =>
        Schema.decodeUnknownEffect(definition.request)(node.props);

      /**
       * The reconcileMembers operation returns a check for the next observation.
       * When AWS accepts an add or remove before the change appears in a read,
       * the check requires the new state before the lifecycle accepts the update.
       */
      const reconcileMembers = Effect.fnUntraced(function* (
        current: typeof association.Type,
        previous: typeof AssociationNames.Type,
        desired: typeof AssociationNames.Type,
      ) {
        const accepts = yield* operations.reconcile(
          current.Parent,
          current.Members,
          previous,
          desired,
        );

        return (state: typeof association.Type) => accepts(state.Members);
      });

      /**
       * The reserveIdentity operation captures the parent's provider ID before the
       * first write. If an apply stops partway through, the next apply can use the
       * checkpoint to tell the original parent from an object with the same name.
       */
      const reserveIdentity = Effect.fnUntraced(function* (node: ResourceNode) {
        const { Parent } = yield* readRequest(node);

        const parent = yield* readParent(Parent);

        const Id = yield* names.resolveName(node, undefined, 128);

        return { ...parent, Id };
      });

      /**
       * The observe operation reports the association resource as absent if none
       * of the declared members remain. If some remain, its result lists those
       * members, even when the parent has other links as well.
       */
      const observe = Effect.fnUntraced(function* ({
        node,
      }: {
        readonly node: ResourceNode;
      }) {
        const { Members } = yield* readRequest(node);

        const saved = yield* model.decodeOutputs(node, identity);

        const current = yield* lookup(saved);

        const present = current.pipe(
          Option.map((state) => Arr.intersection(Members, state.Members)),
          Option.filter((members) => Arr.isReadonlyArrayNonEmpty(members)),
        );

        const observed = Option.match(present, {
          onNone: () => ResourceObservation.Missing({ node }),
          onSome: (members) =>
            ResourceObservation.Present({
              node,
              observed: Struct.assign(
                { Id: saved.Id },
                {
                  [definition.observationKeys.parent]: saved.Parent,
                  [definition.observationKeys.members]: members,
                },
              ),
            }),
        });

        return ResourceCommandResult.Observed({ observation: observed });
      });

      /**
       * The destroy operation completes when the provider no longer lists any
       * member selected by the saved declaration. Other memberships on the same
       * parent can remain present.
       */
      const destroy = Effect.fnUntraced(function* ({
        node,
      }: {
        readonly node: ResourceNode;
      }) {
        const { Members } = yield* readRequest(node);

        const saved = yield* model.decodeOutputs(node, identity);

        const current = yield* lookup(saved);

        yield* Option.map(current, (state) =>
          reconcileMembers(state, Members, []),
        ).pipe(Effect.transposeOption);

        yield* lookup(saved).pipe(
          Effect.map(
            Option.filter((state) =>
              Arr.some(Members, (member) =>
                Arr.contains(state.Members, member),
              ),
            ),
          ),
          stabilization.waitForAbsence(settings.timeout),
        );

        return ResourceCommandResult.Destroyed({ node });
      });

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: observe,
          Create: lifecycle.create(reserveIdentity, {
            checkpoint: association,
            configure: (node, state) =>
              readRequest(node).pipe(
                Effect.flatMap(({ Members }) =>
                  reconcileMembers(state, [], Members),
                ),
              ),
          }),
          Update: lifecycle.update(
            lifecycle.observedUpdate(
              (node, current) =>
                Effect.all({
                  desired: readRequest(node),
                  previous: readRequest(current),
                }),
              (state, { desired, previous }) =>
                new ResourceIdentityMismatch({
                  property: definition.observationKeys.parent,
                  expected: state.Parent,
                  actual: desired.Parent,
                }).pipe(
                  Effect.when(Effect.succeed(desired.Parent !== state.Parent)),
                  Effect.andThen(
                    reconcileMembers(state, previous.Members, desired.Members),
                  ),
                ),
            ),
          ),
          Destroy: destroy,
        }),
      );
    }),
  },
) {}
