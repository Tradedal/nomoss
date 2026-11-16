import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTaxRatePropsEntity } from "../resourceInputs/StripeTaxRatePropsEntitySchema.js";
import type { StripeTaxRateProps } from "../resourceInputs/StripeTaxRatePropsSchema.js";
import {
  type StripeTaxRateOutputs,
  StripeTaxRateOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTaxRatesTaxRateInput,
  GetTaxRatesTaxRateOutput,
} from "../taxRates.js";
import {
  GetTaxRatesTaxRateOperation,
  PostTaxRatesInput,
  PostTaxRatesOperation,
  type PostTaxRatesOutput,
  PostTaxRatesTaxRateInput,
  PostTaxRatesTaxRateOperation,
  type PostTaxRatesTaxRateOutput,
} from "../taxRates.js";

/**
 * The projectStripeTaxRateOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTaxRateOutputs(
  state: Pick<PostTaxRatesOutput, "id">,
): StripeTaxRateOutputs {
  const outputs: StripeTaxRateOutputs = {
    TaxRateId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTaxRateReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTaxRateReadInput(
  outputs: StripeTaxRateOutputs,
): GetTaxRatesTaxRateInput {
  const input: GetTaxRatesTaxRateInput = {
    tax_rate: outputs.TaxRateId,
  };

  return input;
}

/**
 * The StripeTaxRateResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTaxRateResourceClient extends Context.Service<StripeTaxRateResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TaxRate/StripeTaxRateResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTaxRate.create")(function* (
        props: StripeTaxRateProps,
      ) {
        const input: PostTaxRatesInput =
          yield* Schema.decodeUnknownEffect(PostTaxRatesInput)(props);
        const created: PostTaxRatesOutput = yield* client.invoke(
          PostTaxRatesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTaxRate.read")(function* (
        outputs: StripeTaxRateOutputs,
      ) {
        const input: GetTaxRatesTaxRateInput =
          bindStripeTaxRateReadInput(outputs);
        const observed: GetTaxRatesTaxRateOutput = yield* client.invoke(
          GetTaxRatesTaxRateOperation,
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
      const update = Effect.fn("StripeTaxRate.update")(function* (
        outputs: StripeTaxRateOutputs,
        changes: Omit<PostTaxRatesTaxRateInput, "tax_rate">,
      ) {
        const input: PostTaxRatesTaxRateInput = yield* Schema.decodeEffect(
          PostTaxRatesTaxRateInput,
        )({
          ...changes,
          tax_rate: outputs.TaxRateId,
        });
        const changed: PostTaxRatesTaxRateOutput = yield* client.invoke(
          PostTaxRatesTaxRateOperation,
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

export const stripeTaxRateResourceClientLayer = Layer.effect(
  StripeTaxRateResourceClient,
  StripeTaxRateResourceClient.make,
);
export const StripeTaxRateResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("tax-rate"),
});

/**
 * The StripeTaxRateResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTaxRateResource<
  Props = StripeTaxRatePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "tax-rate";
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
        resource: "tax-rate",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TaxRateId(): Required<StripeTaxRateOutputs>["TaxRateId"] {
    const value: Required<StripeTaxRateOutputs>["TaxRateId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TaxRateId",
        StripeTaxRateOutputsSchema.fields.TaxRateId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTaxRateDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTaxRateResource<Props> {
  const resource: StripeTaxRateResource<Props> =
    new StripeTaxRateResource<Props>(key, props, binding);

  return resource;
}
