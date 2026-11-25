import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeShippingRatePropsEntity } from "../resourceInputs/StripeShippingRatePropsEntitySchema.js";
import type { StripeShippingRateProps } from "../resourceInputs/StripeShippingRatePropsSchema.js";
import {
  type StripeShippingRateOutputs,
  StripeShippingRateOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetShippingRatesShippingRateTokenInput,
  GetShippingRatesShippingRateTokenOutput,
} from "../shippingRates.js";
import {
  GetShippingRatesShippingRateTokenOperation,
  PostShippingRatesInput,
  PostShippingRatesOperation,
  type PostShippingRatesOutput,
  PostShippingRatesShippingRateTokenInput,
  PostShippingRatesShippingRateTokenOperation,
  type PostShippingRatesShippingRateTokenOutput,
} from "../shippingRates.js";

/**
 * The projectStripeShippingRateOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeShippingRateOutputs(
  state: Pick<PostShippingRatesOutput, "id">,
): StripeShippingRateOutputs {
  const outputs: StripeShippingRateOutputs = {
    ShippingRateId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeShippingRateReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeShippingRateReadInput(
  outputs: StripeShippingRateOutputs,
): GetShippingRatesShippingRateTokenInput {
  const input: GetShippingRatesShippingRateTokenInput = {
    shipping_rate_token: outputs.ShippingRateId,
  };

  return input;
}

/**
 * The StripeShippingRateResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeShippingRateResourceClient extends Context.Service<StripeShippingRateResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ShippingRate/StripeShippingRateResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeShippingRate.create")(function* (
        props: StripeShippingRateProps,
      ) {
        const input: PostShippingRatesInput = yield* Schema.decodeUnknownEffect(
          PostShippingRatesInput,
        )(props);
        const created: PostShippingRatesOutput = yield* client.invoke(
          PostShippingRatesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeShippingRate.read")(function* (
        outputs: StripeShippingRateOutputs,
      ) {
        const input: GetShippingRatesShippingRateTokenInput =
          bindStripeShippingRateReadInput(outputs);
        const observed: GetShippingRatesShippingRateTokenOutput =
          yield* client.invoke(
            GetShippingRatesShippingRateTokenOperation,
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
      const update = Effect.fn("StripeShippingRate.update")(function* (
        outputs: StripeShippingRateOutputs,
        changes: Omit<
          PostShippingRatesShippingRateTokenInput,
          "shipping_rate_token"
        >,
      ) {
        const input: PostShippingRatesShippingRateTokenInput =
          yield* Schema.decodeEffect(PostShippingRatesShippingRateTokenInput)({
            ...changes,
            shipping_rate_token: outputs.ShippingRateId,
          });
        const changed: PostShippingRatesShippingRateTokenOutput =
          yield* client.invoke(
            PostShippingRatesShippingRateTokenOperation,
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

export const stripeShippingRateResourceClientLayer = Layer.effect(
  StripeShippingRateResourceClient,
  StripeShippingRateResourceClient.make,
);
export const StripeShippingRateResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("shipping-rate"),
});

/**
 * The StripeShippingRateResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeShippingRateResource<
  Props = StripeShippingRatePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "shipping-rate";
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
        resource: "shipping-rate",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ShippingRateId(): Required<StripeShippingRateOutputs>["ShippingRateId"] {
    const value: Required<StripeShippingRateOutputs>["ShippingRateId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ShippingRateId",
        StripeShippingRateOutputsSchema.fields.ShippingRateId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeShippingRateDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeShippingRateResource<Props> {
  const resource: StripeShippingRateResource<Props> =
    new StripeShippingRateResource<Props>(key, props, binding);

  return resource;
}
