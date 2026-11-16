import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetProductCatalogTrialOffersIdInput,
  GetProductCatalogTrialOffersIdOutput,
} from "../productCatalogTrialOffers.js";
import {
  GetProductCatalogTrialOffersIdOperation,
  PostProductCatalogTrialOffersIdInput,
  PostProductCatalogTrialOffersIdOperation,
  type PostProductCatalogTrialOffersIdOutput,
  PostProductCatalogTrialOffersInput,
  PostProductCatalogTrialOffersOperation,
  type PostProductCatalogTrialOffersOutput,
} from "../productCatalogTrialOffers.js";
import type { StripeProductCatalogTrialOfferPropsEntity } from "../resourceInputs/StripeProductCatalogTrialOfferPropsEntitySchema.js";
import type { StripeProductCatalogTrialOfferProps } from "../resourceInputs/StripeProductCatalogTrialOfferPropsSchema.js";
import {
  type StripeProductCatalogTrialOfferOutputs,
  StripeProductCatalogTrialOfferOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeProductCatalogTrialOfferOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeProductCatalogTrialOfferOutputs(
  state: Pick<PostProductCatalogTrialOffersOutput, "id">,
): StripeProductCatalogTrialOfferOutputs {
  const outputs: StripeProductCatalogTrialOfferOutputs = {
    ProductCatalogTrialOfferId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeProductCatalogTrialOfferReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeProductCatalogTrialOfferReadInput(
  outputs: StripeProductCatalogTrialOfferOutputs,
): GetProductCatalogTrialOffersIdInput {
  const input: GetProductCatalogTrialOffersIdInput = {
    id: outputs.ProductCatalogTrialOfferId,
  };

  return input;
}

/**
 * The StripeProductCatalogTrialOfferResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeProductCatalogTrialOfferResourceClient extends Context.Service<StripeProductCatalogTrialOfferResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ProductCatalogTrialOffer/StripeProductCatalogTrialOfferResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeProductCatalogTrialOffer.create")(
        function* (props: StripeProductCatalogTrialOfferProps) {
          const input: PostProductCatalogTrialOffersInput =
            yield* Schema.decodeUnknownEffect(
              PostProductCatalogTrialOffersInput,
            )(props);
          const created: PostProductCatalogTrialOffersOutput =
            yield* client.invoke(PostProductCatalogTrialOffersOperation, input);
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeProductCatalogTrialOffer.read")(function* (
        outputs: StripeProductCatalogTrialOfferOutputs,
      ) {
        const input: GetProductCatalogTrialOffersIdInput =
          bindStripeProductCatalogTrialOfferReadInput(outputs);
        const observed: GetProductCatalogTrialOffersIdOutput =
          yield* client.invoke(GetProductCatalogTrialOffersIdOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeProductCatalogTrialOffer.update")(
        function* (
          outputs: StripeProductCatalogTrialOfferOutputs,
          changes: Omit<PostProductCatalogTrialOffersIdInput, "id">,
        ) {
          const input: PostProductCatalogTrialOffersIdInput =
            yield* Schema.decodeEffect(PostProductCatalogTrialOffersIdInput)({
              ...changes,
              id: outputs.ProductCatalogTrialOfferId,
            });
          const changed: PostProductCatalogTrialOffersIdOutput =
            yield* client.invoke(
              PostProductCatalogTrialOffersIdOperation,
              input,
            );
          return changed;
        },
      );

      return {
        create,
        read,
        update,
      };
    }),
  },
) {}

export const stripeProductCatalogTrialOfferResourceClientLayer = Layer.effect(
  StripeProductCatalogTrialOfferResourceClient,
  StripeProductCatalogTrialOfferResourceClient.make,
);
export const StripeProductCatalogTrialOfferResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("product-catalog-trial-offer"),
});

/**
 * The StripeProductCatalogTrialOfferResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeProductCatalogTrialOfferResource<
  Props = StripeProductCatalogTrialOfferPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "product-catalog-trial-offer";
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
        resource: "product-catalog-trial-offer",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ProductCatalogTrialOfferId(): Required<StripeProductCatalogTrialOfferOutputs>["ProductCatalogTrialOfferId"] {
    const value: Required<StripeProductCatalogTrialOfferOutputs>["ProductCatalogTrialOfferId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ProductCatalogTrialOfferId",
        StripeProductCatalogTrialOfferOutputsSchema.fields
          .ProductCatalogTrialOfferId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeProductCatalogTrialOfferDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeProductCatalogTrialOfferResource<Props> {
  const resource: StripeProductCatalogTrialOfferResource<Props> =
    new StripeProductCatalogTrialOfferResource<Props>(key, props, binding);

  return resource;
}
