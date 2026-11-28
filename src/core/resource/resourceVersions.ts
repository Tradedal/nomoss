import {
  Array as Arr,
  Context,
  Data,
  DateTime,
  Effect,
  Layer,
  Option,
  Order,
} from "effect";

/**
 * The ResourceVersion interface supplies the identity, age, and protection
 * status for a version returned by the provider. A protected version stays
 * in the inventory even when it is ineligible for removal.
 */
export interface ResourceVersion<Id extends string | number> {
  readonly id: Id;
  readonly createdAt: DateTime.Utc;
  readonly protected: boolean;
}

/**
 * The ResourceVersionCapacityUnavailable error tells the caller that
 * publishing would require removal of a protected version.
 */
class ResourceVersionCapacityUnavailable extends Data.TaggedError(
  "ResourceVersionCapacityUnavailable",
)<{ readonly limit: number }> {
  override get message() {
    return `The protected resource versions leave no room to publish within the limit of ${this.limit}.`;
  }
}

/**
 * The ResourceVersions service selects which versions a provider may remove before
 * publication or during teardown. Protected versions always count toward capacity.
 *
 * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Context.ts (Service)
 */
export class ResourceVersions extends Context.Service<ResourceVersions>()(
  "nomoss/core/resource/resourceVersions",
  {
    make: Effect.sync(() => {
      /**
       * The selectForRetirement service method chooses the oldest eligible versions
       * that must give way to a new publication. Teardown selects every eligible
       * version. The caller supplies the complete inventory before deleting any version.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Array.ts (filter, sort, and take)
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/DateTime.ts (Order)
       */
      const selectForRetirement = Effect.fn(
        "ResourceVersions.selectForRetirement",
      )(function* <Id extends string | number>(
        inventory: ReadonlyArray<ResourceVersion<Id>>,
        limit?: number,
      ) {
        const eligible = Arr.filter(inventory, (version) => !version.protected);
        const oldestFirst = Order.mapInput(
          DateTime.Order,
          (version: ResourceVersion<Id>) => version.createdAt,
        );

        const capacity = Option.fromUndefinedOr(limit).pipe(
          Option.map((limit) => ({
            limit,
            needed: Math.max(inventory.length + 1 - limit, 0),
          })),
        );

        yield* capacity.pipe(
          Option.filter(({ needed }) => eligible.length < needed),
          Option.map(({ limit }) =>
            Effect.fail(new ResourceVersionCapacityUnavailable({ limit })),
          ),
          Effect.transposeOption,
        );

        const selected = Option.match(capacity, {
          onNone: () => eligible,
          onSome: ({ needed }) =>
            Arr.take(Arr.sort(eligible, oldestFirst), needed),
        });
        return selected;
      });

      return { selectForRetirement };
    }),
  },
) {}

/**
 * The resourceVersionsLayer Layer provides version management to the
 * resource command runtime.
 *
 * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Layer.ts (effect)
 */
export const resourceVersionsLayer = Layer.effect(
  ResourceVersions,
  ResourceVersions.make,
);
