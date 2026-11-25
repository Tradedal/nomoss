import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { GetPricesPriceInput, GetPricesPriceOutput } from "../prices.js";
import {
  GetPricesPriceOperation,
  PostPricesInput,
  PostPricesOperation,
  type PostPricesOutput,
  PostPricesPriceInput,
  PostPricesPriceOperation,
  type PostPricesPriceOutput,
} from "../prices.js";
import type { StripePricePropsEntity } from "../resourceInputs/StripePricePropsEntitySchema.js";
import type { StripePriceProps } from "../resourceInputs/StripePricePropsSchema.js";
import {
  type StripePriceOutputs,
  StripePriceOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePriceOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePriceOutputs(
  state: Pick<PostPricesOutput, "id">,
): StripePriceOutputs {
  const outputs: StripePriceOutputs = {
    PriceId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePriceReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePriceReadInput(
  outputs: StripePriceOutputs,
): GetPricesPriceInput {
  const input: GetPricesPriceInput = {
    price: outputs.PriceId,
  };

  return input;
}

/**
 * The StripePriceResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePriceResourceClient extends Context.Service<StripePriceResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Price/StripePriceResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePrice.create")(function* (
        props: StripePriceProps,
      ) {
        const input: PostPricesInput =
          yield* Schema.decodeUnknownEffect(PostPricesInput)(props);
        const created: PostPricesOutput = yield* client.invoke(
          PostPricesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePrice.read")(function* (
        outputs: StripePriceOutputs,
      ) {
        const input: GetPricesPriceInput = bindStripePriceReadInput(outputs);
        const observed: GetPricesPriceOutput = yield* client.invoke(
          GetPricesPriceOperation,
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
      const update = Effect.fn("StripePrice.update")(function* (
        outputs: StripePriceOutputs,
        changes: Omit<PostPricesPriceInput, "price">,
      ) {
        const input: PostPricesPriceInput = yield* Schema.decodeEffect(
          PostPricesPriceInput,
        )({
          ...changes,
          price: outputs.PriceId,
        });
        const changed: PostPricesPriceOutput = yield* client.invoke(
          PostPricesPriceOperation,
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

export const stripePriceResourceClientLayer = Layer.effect(
  StripePriceResourceClient,
  StripePriceResourceClient.make,
);
export const StripePriceResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("price"),
});

/**
 * The StripePriceResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePriceResource<
  Props = StripePricePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "price";
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
        resource: "price",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PriceId(): Required<StripePriceOutputs>["PriceId"] {
    const value: Required<StripePriceOutputs>["PriceId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PriceId",
        StripePriceOutputsSchema.fields.PriceId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePriceDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePriceResource<Props> {
  const resource: StripePriceResource<Props> = new StripePriceResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
