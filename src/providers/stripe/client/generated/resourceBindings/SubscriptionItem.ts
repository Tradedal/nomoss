import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeSubscriptionItemPropsEntity } from "../resourceInputs/StripeSubscriptionItemPropsEntitySchema.js";
import type { StripeSubscriptionItemProps } from "../resourceInputs/StripeSubscriptionItemPropsSchema.js";
import {
  type StripeSubscriptionItemOutputs,
  StripeSubscriptionItemOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetSubscriptionItemsItemInput,
  GetSubscriptionItemsItemOutput,
} from "../subscriptionItems.js";
import {
  GetSubscriptionItemsItemOperation,
  PostSubscriptionItemsInput,
  PostSubscriptionItemsItemInput,
  PostSubscriptionItemsItemOperation,
  type PostSubscriptionItemsItemOutput,
  PostSubscriptionItemsOperation,
  type PostSubscriptionItemsOutput,
} from "../subscriptionItems.js";

/**
 * The projectStripeSubscriptionItemOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeSubscriptionItemOutputs(
  state: Pick<PostSubscriptionItemsOutput, "id">,
): StripeSubscriptionItemOutputs {
  const outputs: StripeSubscriptionItemOutputs = {
    SubscriptionItemId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeSubscriptionItemReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeSubscriptionItemReadInput(
  outputs: StripeSubscriptionItemOutputs,
): GetSubscriptionItemsItemInput {
  const input: GetSubscriptionItemsItemInput = {
    item: outputs.SubscriptionItemId,
  };

  return input;
}

/**
 * The StripeSubscriptionItemResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeSubscriptionItemResourceClient extends Context.Service<StripeSubscriptionItemResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/SubscriptionItem/StripeSubscriptionItemResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeSubscriptionItem.create")(function* (
        props: StripeSubscriptionItemProps,
      ) {
        const input: PostSubscriptionItemsInput =
          yield* Schema.decodeUnknownEffect(PostSubscriptionItemsInput)(props);
        const created: PostSubscriptionItemsOutput = yield* client.invoke(
          PostSubscriptionItemsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeSubscriptionItem.read")(function* (
        outputs: StripeSubscriptionItemOutputs,
      ) {
        const input: GetSubscriptionItemsItemInput =
          bindStripeSubscriptionItemReadInput(outputs);
        const observed: GetSubscriptionItemsItemOutput = yield* client.invoke(
          GetSubscriptionItemsItemOperation,
          input,
        );
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeSubscriptionItem.update")(function* (
        outputs: StripeSubscriptionItemOutputs,
        changes: Omit<PostSubscriptionItemsItemInput, "item">,
      ) {
        const input: PostSubscriptionItemsItemInput =
          yield* Schema.decodeEffect(PostSubscriptionItemsItemInput)({
            ...changes,
            item: outputs.SubscriptionItemId,
          });
        const changed: PostSubscriptionItemsItemOutput = yield* client.invoke(
          PostSubscriptionItemsItemOperation,
          input,
        );
        return changed;
      });

      return {
        create,
        read,
        update,
      };
    }),
  },
) {}

export const stripeSubscriptionItemResourceClientLayer = Layer.effect(
  StripeSubscriptionItemResourceClient,
  StripeSubscriptionItemResourceClient.make,
);
export const StripeSubscriptionItemResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("subscription-item"),
});

/**
 * The StripeSubscriptionItemResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeSubscriptionItemResource<
  Props = StripeSubscriptionItemPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "subscription-item";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "stripe",
        service: "billing",
        resource: "subscription-item",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SubscriptionItemId(): Required<StripeSubscriptionItemOutputs>["SubscriptionItemId"] {
    const value: Required<StripeSubscriptionItemOutputs>["SubscriptionItemId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SubscriptionItemId",
        StripeSubscriptionItemOutputsSchema.fields.SubscriptionItemId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeSubscriptionItemDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeSubscriptionItemResource<Props> {
  const resource: StripeSubscriptionItemResource<Props> =
    new StripeSubscriptionItemResource<Props>(key, props, binding);

  return resource;
}
