import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeSubscriptionPropsEntity } from "../resourceInputs/StripeSubscriptionPropsEntitySchema.js";
import type { StripeSubscriptionProps } from "../resourceInputs/StripeSubscriptionPropsSchema.js";
import {
  type StripeSubscriptionOutputs,
  StripeSubscriptionOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetSubscriptionsSubscriptionExposedIdInput,
  GetSubscriptionsSubscriptionExposedIdOutput,
} from "../subscriptions.js";
import {
  GetSubscriptionsSubscriptionExposedIdOperation,
  PostSubscriptionsInput,
  PostSubscriptionsOperation,
  type PostSubscriptionsOutput,
  PostSubscriptionsSubscriptionExposedIdInput,
  PostSubscriptionsSubscriptionExposedIdOperation,
  type PostSubscriptionsSubscriptionExposedIdOutput,
} from "../subscriptions.js";

/**
 * The projectStripeSubscriptionOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeSubscriptionOutputs(
  state: Pick<PostSubscriptionsOutput, "id">,
): StripeSubscriptionOutputs {
  const outputs: StripeSubscriptionOutputs = {
    SubscriptionId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeSubscriptionReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeSubscriptionReadInput(
  outputs: StripeSubscriptionOutputs,
): GetSubscriptionsSubscriptionExposedIdInput {
  const input: GetSubscriptionsSubscriptionExposedIdInput = {
    subscription_exposed_id: outputs.SubscriptionId,
  };

  return input;
}

/**
 * The StripeSubscriptionResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeSubscriptionResourceClient extends Context.Service<StripeSubscriptionResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Subscription/StripeSubscriptionResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeSubscription.create")(function* (
        props: StripeSubscriptionProps,
      ) {
        const input: PostSubscriptionsInput = yield* Schema.decodeUnknownEffect(
          PostSubscriptionsInput,
        )(props);
        const created: PostSubscriptionsOutput = yield* client.invoke(
          PostSubscriptionsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeSubscription.read")(function* (
        outputs: StripeSubscriptionOutputs,
      ) {
        const input: GetSubscriptionsSubscriptionExposedIdInput =
          bindStripeSubscriptionReadInput(outputs);
        const observed: GetSubscriptionsSubscriptionExposedIdOutput =
          yield* client.invoke(
            GetSubscriptionsSubscriptionExposedIdOperation,
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
      const update = Effect.fn("StripeSubscription.update")(function* (
        outputs: StripeSubscriptionOutputs,
        changes: Omit<
          PostSubscriptionsSubscriptionExposedIdInput,
          "subscription_exposed_id"
        >,
      ) {
        const input: PostSubscriptionsSubscriptionExposedIdInput =
          yield* Schema.decodeEffect(
            PostSubscriptionsSubscriptionExposedIdInput,
          )({
            ...changes,
            subscription_exposed_id: outputs.SubscriptionId,
          });
        const changed: PostSubscriptionsSubscriptionExposedIdOutput =
          yield* client.invoke(
            PostSubscriptionsSubscriptionExposedIdOperation,
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

export const stripeSubscriptionResourceClientLayer = Layer.effect(
  StripeSubscriptionResourceClient,
  StripeSubscriptionResourceClient.make,
);
export const StripeSubscriptionResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("subscription"),
});

/**
 * The StripeSubscriptionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeSubscriptionResource<
  Props = StripeSubscriptionPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "subscription";
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
        resource: "subscription",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SubscriptionId(): Required<StripeSubscriptionOutputs>["SubscriptionId"] {
    const value: Required<StripeSubscriptionOutputs>["SubscriptionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SubscriptionId",
        StripeSubscriptionOutputsSchema.fields.SubscriptionId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeSubscriptionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeSubscriptionResource<Props> {
  const resource: StripeSubscriptionResource<Props> =
    new StripeSubscriptionResource<Props>(key, props, binding);

  return resource;
}
