import { AwsClient } from "@nomoss/aws";
import { AwsServiceError } from "@nomoss/aws/model";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  HashSet,
  Match,
  Schema,
} from "effect";
import type {
  AwsLifecycleSettings,
  ResourceOperation,
} from "./resourceLifecycleRegistration.js";

/**
 * The AssociationNames schema validates member names within one collection.
 * Callers must pass names from that collection alone. A bare name carries
 * no information about the type of member or the parent it belongs to.
 */
export const AssociationNames = Schema.Array(Schema.String);

/**
 * The associationChanges function identifies which links a stack may add or
 * remove. A removal requires the name to appear in both the previous
 * declaration and the provider's current list. For example, if a group
 * contains Ana and Ben and the stack previously declared only Ana, an empty
 * declaration removes Ana alone.
 *
 * @see ../../../refs/effect/packages/effect/src/HashSet.ts (difference and intersection)
 */
export const associationChanges = (
  observed: typeof AssociationNames.Type,
  previous: typeof AssociationNames.Type,
  desired: typeof AssociationNames.Type,
) => {
  const current = HashSet.fromIterable(observed);

  const declared = HashSet.fromIterable(previous);

  const requested = HashSet.fromIterable(desired);

  const add = Arr.fromIterable(HashSet.difference(requested, current));

  const remove = Arr.fromIterable(
    HashSet.intersection(HashSet.difference(declared, requested), current),
  );

  return { add, remove };
};

/**
 * The ResourceAssociationOperations definition specifies how a provider
 * accepts changes to one collection. Use releaseSlotFirst for an instance
 * profile: IAM allows one role, and the old role must leave before the
 * request can add its replacement.
 */
export interface ResourceAssociationOperations {
  readonly add: ResourceOperation<unknown>;
  readonly remove: ResourceOperation<unknown>;
  readonly order?: "releaseSlotFirst";
}

class AssociationSlotOccupied extends Data.TaggedError(
  "AssociationSlotOccupied",
)<{
  readonly parent: string;
}> {
  override get message() {
    return `Resource "${this.parent}" has a member that this declaration cannot remove.`;
  }
}

/**
 * The AwsResourceAssociationOperations service applies the same rules to
 * a resource's member property and to a declaration that manages links on
 * an independent parent. Both consumers confirm the requested links with
 * a separate provider read.
 */
export class AwsResourceAssociationOperations extends Context.Service<AwsResourceAssociationOperations>()(
  "nomoss/providers/aws/management/resourceAssociations/AwsResourceAssociationOperations",
  {
    make: Effect.fn("AwsResourceAssociationOperations.make")(function* (
      settings: Pick<AwsLifecycleSettings, "service" | "missingErrors">,
      operations: ResourceAssociationOperations,
    ) {
      const client = yield* AwsClient;

      const bind = client.bindOperation(settings.service);

      const add = bind(operations.add);

      const remove = bind(operations.remove);

      const missing = AwsServiceError.hasCode(...settings.missingErrors);

      /**
       * The reconcile service method requires the full provider list and the
       * previous and desired declarations for one parent. If the provider has
       * a member outside the previous declaration and that member blocks a
       * replacement, the method reports AssociationSlotOccupied before any write.
       * Use the returned check on a fresh list to verify the new membership.
       */
      const reconcile = Effect.fn("AwsResourceAssociationOperations.reconcile")(
        function* (
          Parent: string,
          observed: typeof AssociationNames.Type,
          previous: typeof AssociationNames.Type,
          desired: typeof AssociationNames.Type,
        ) {
          const changes = associationChanges(observed, previous, desired);

          const releaseSlotFirst = operations.order === "releaseSlotFirst";

          const occupiedByUndeclaredMember = Arr.some(
            observed,
            (name) => !Arr.contains(previous, name),
          );

          const blocked =
            releaseSlotFirst &&
            occupiedByUndeclaredMember &&
            Arr.isReadonlyArrayNonEmpty(changes.add);

          yield* new AssociationSlotOccupied({ parent: Parent }).pipe(
            Effect.when(Effect.succeed(blocked)),
          );

          const order = Match.value(releaseSlotFirst).pipe(
            Match.when(true, () => ["remove", "add"] as const),
            Match.orElse(() => ["add", "remove"] as const),
          );

          yield* Effect.forEach(
            order,
            (action) =>
              Effect.forEach(
                changes[action],
                (Member) =>
                  Match.value(action).pipe(
                    Match.when("add", () => add({ Parent, Member })),
                    Match.orElse(() =>
                      remove({ Parent, Member }).pipe(
                        Effect.catchIf(missing, () => Effect.void),
                      ),
                    ),
                  ),
                { discard: true },
              ),
            { discard: true },
          );

          const accepts = (confirmed: typeof AssociationNames.Type): boolean =>
            Arr.every(desired, (member) => Arr.contains(confirmed, member)) &&
            Arr.every(
              changes.remove,
              (member) => !Arr.contains(confirmed, member),
            );

          return accepts;
        },
      );

      return { reconcile };
    }),
  },
) {}
