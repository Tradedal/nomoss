import { AwsClient } from "@nomoss/aws";
import type { AwsServiceDefinition } from "@nomoss/aws/model";
import { Array as Arr, Context, Effect, Option, Schema } from "effect";
import { associationChanges } from "./resourceAssociations.js";
import type { ResourceOperation } from "./resourceLifecycleRegistration.js";

/**
 * The ResourceTags schema requires a value for each key. The stack needs
 * both to tell whether a declared tag already has the requested value or
 * needs another write.
 */
const ResourceTags = Schema.Array(
  Schema.Struct({ Key: Schema.String, Value: Schema.String }),
);
type ResourceTags = typeof ResourceTags.Type;

/**
 * The AwsResourceTagOperations service preserves tags that an operator
 * or another tool added. A lifecycle definition must supply AWS operations
 * that can set individual keys and remove selected keys.
 */
export class AwsResourceTagOperations extends Context.Service<AwsResourceTagOperations>()(
  "nomoss/providers/aws/management/resourceTagOperations/AwsResourceTagOperations",
  {
    make: Effect.fn("AwsResourceTagOperations.make")(function* (
      service: AwsServiceDefinition,
      operations: {
        readonly tag: ResourceOperation<unknown>;
        readonly untag: ResourceOperation<unknown>;
      },
    ) {
      const client = yield* AwsClient;

      const bind = client.bindOperation(service);

      const tag = bind(operations.tag);

      const untag = bind(operations.untag);

      const tags = (value: ResourceTags | undefined) =>
        Option.fromUndefinedOr(value).pipe(Option.toArray, Arr.flatten);

      const includesTag = (
        current: ResourceTags,
        { Key, Value }: ResourceTags[number],
      ) =>
        Arr.some(
          current,
          (entry) => entry.Key === Key && entry.Value === Value,
        );

      /**
       * The reconcile service method removes a key only if the prior declaration
       * listed it and the new declaration omits it. Its check accepts a fresh
       * provider read once every requested value appears and the keys selected
       * for removal are absent.
       */
      const reconcile = Effect.fn("AwsResourceTagOperations.reconcile")(
        function* (
          Parent: string,
          observed: ResourceTags | undefined,
          previous: ResourceTags | undefined,
          desired: ResourceTags | undefined,
        ) {
          const current = tags(observed);

          const requested = tags(desired);

          const keys = (values: ResourceTags) =>
            Arr.map(values, ({ Key }) => Key);

          const { remove } = associationChanges(
            keys(current),
            keys(tags(previous)),
            keys(requested),
          );

          const changed = Arr.filter(
            requested,
            (entry) => !includesTag(current, entry),
          );

          yield* tag({ Parent, Tags: changed }).pipe(
            Effect.when(Effect.succeed(Arr.isReadonlyArrayNonEmpty(changed))),
          );

          yield* untag({ Parent, TagKeys: remove }).pipe(
            Effect.when(Effect.succeed(Arr.isReadonlyArrayNonEmpty(remove))),
          );

          return (observed: ResourceTags | undefined) => {
            const confirmed = tags(observed);

            return (
              Arr.every(requested, (entry) => includesTag(confirmed, entry)) &&
              Arr.every(
                remove,
                (key) => !Arr.some(confirmed, ({ Key }) => key === Key),
              )
            );
          };
        },
      );

      return { reconcile };
    }),
  },
) {}
