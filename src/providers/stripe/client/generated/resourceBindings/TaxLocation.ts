import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTaxLocationPropsEntity } from "../resourceInputs/StripeTaxLocationPropsEntitySchema.js";
import type { StripeTaxLocationProps } from "../resourceInputs/StripeTaxLocationPropsSchema.js";
import {
  type StripeTaxLocationOutputs,
  StripeTaxLocationOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTaxLocationsLocationInput,
  GetTaxLocationsLocationOutput,
} from "../taxLocations.js";
import {
  GetTaxLocationsLocationOperation,
  PostTaxLocationsInput,
  PostTaxLocationsOperation,
  type PostTaxLocationsOutput,
} from "../taxLocations.js";

/**
 * The projectStripeTaxLocationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTaxLocationOutputs(
  state: Pick<PostTaxLocationsOutput, "id">,
): StripeTaxLocationOutputs {
  const outputs: StripeTaxLocationOutputs = {
    TaxLocationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTaxLocationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTaxLocationReadInput(
  outputs: StripeTaxLocationOutputs,
): GetTaxLocationsLocationInput {
  const input: GetTaxLocationsLocationInput = {
    location: outputs.TaxLocationId,
  };

  return input;
}

/**
 * The StripeTaxLocationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTaxLocationResourceClient extends Context.Service<StripeTaxLocationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TaxLocation/StripeTaxLocationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTaxLocation.create")(function* (
        props: StripeTaxLocationProps,
      ) {
        const input: PostTaxLocationsInput = yield* Schema.decodeUnknownEffect(
          PostTaxLocationsInput,
        )(props);
        const created: PostTaxLocationsOutput = yield* client.invoke(
          PostTaxLocationsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTaxLocation.read")(function* (
        outputs: StripeTaxLocationOutputs,
      ) {
        const input: GetTaxLocationsLocationInput =
          bindStripeTaxLocationReadInput(outputs);
        const observed: GetTaxLocationsLocationOutput = yield* client.invoke(
          GetTaxLocationsLocationOperation,
          input,
        );
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeTaxLocationResourceClientLayer = Layer.effect(
  StripeTaxLocationResourceClient,
  StripeTaxLocationResourceClient.make,
);
export const StripeTaxLocationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("tax-location"),
});

/**
 * The StripeTaxLocationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTaxLocationResource<
  Props = StripeTaxLocationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "tax-location";
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
        resource: "tax-location",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TaxLocationId(): Required<StripeTaxLocationOutputs>["TaxLocationId"] {
    const value: Required<StripeTaxLocationOutputs>["TaxLocationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TaxLocationId",
        StripeTaxLocationOutputsSchema.fields.TaxLocationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTaxLocationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTaxLocationResource<Props> {
  const resource: StripeTaxLocationResource<Props> =
    new StripeTaxLocationResource<Props>(key, props, binding);

  return resource;
}
