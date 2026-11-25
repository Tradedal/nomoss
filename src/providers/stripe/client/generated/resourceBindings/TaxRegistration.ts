import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTaxRegistrationPropsEntity } from "../resourceInputs/StripeTaxRegistrationPropsEntitySchema.js";
import type { StripeTaxRegistrationProps } from "../resourceInputs/StripeTaxRegistrationPropsSchema.js";
import {
  type StripeTaxRegistrationOutputs,
  StripeTaxRegistrationOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTaxRegistrationsIdInput,
  GetTaxRegistrationsIdOutput,
} from "../taxRegistrations.js";
import {
  GetTaxRegistrationsIdOperation,
  PostTaxRegistrationsIdInput,
  PostTaxRegistrationsIdOperation,
  type PostTaxRegistrationsIdOutput,
  PostTaxRegistrationsInput,
  PostTaxRegistrationsOperation,
  type PostTaxRegistrationsOutput,
} from "../taxRegistrations.js";

/**
 * The projectStripeTaxRegistrationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTaxRegistrationOutputs(
  state: Pick<PostTaxRegistrationsOutput, "id">,
): StripeTaxRegistrationOutputs {
  const outputs: StripeTaxRegistrationOutputs = {
    TaxRegistrationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTaxRegistrationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTaxRegistrationReadInput(
  outputs: StripeTaxRegistrationOutputs,
): GetTaxRegistrationsIdInput {
  const input: GetTaxRegistrationsIdInput = {
    id: outputs.TaxRegistrationId,
  };

  return input;
}

/**
 * The StripeTaxRegistrationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTaxRegistrationResourceClient extends Context.Service<StripeTaxRegistrationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TaxRegistration/StripeTaxRegistrationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTaxRegistration.create")(function* (
        props: StripeTaxRegistrationProps,
      ) {
        const input: PostTaxRegistrationsInput =
          yield* Schema.decodeUnknownEffect(PostTaxRegistrationsInput)(props);
        const created: PostTaxRegistrationsOutput = yield* client.invoke(
          PostTaxRegistrationsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTaxRegistration.read")(function* (
        outputs: StripeTaxRegistrationOutputs,
      ) {
        const input: GetTaxRegistrationsIdInput =
          bindStripeTaxRegistrationReadInput(outputs);
        const observed: GetTaxRegistrationsIdOutput = yield* client.invoke(
          GetTaxRegistrationsIdOperation,
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
      const update = Effect.fn("StripeTaxRegistration.update")(function* (
        outputs: StripeTaxRegistrationOutputs,
        changes: Omit<PostTaxRegistrationsIdInput, "id">,
      ) {
        const input: PostTaxRegistrationsIdInput = yield* Schema.decodeEffect(
          PostTaxRegistrationsIdInput,
        )({
          ...changes,
          id: outputs.TaxRegistrationId,
        });
        const changed: PostTaxRegistrationsIdOutput = yield* client.invoke(
          PostTaxRegistrationsIdOperation,
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

export const stripeTaxRegistrationResourceClientLayer = Layer.effect(
  StripeTaxRegistrationResourceClient,
  StripeTaxRegistrationResourceClient.make,
);
export const StripeTaxRegistrationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("tax-registration"),
});

/**
 * The StripeTaxRegistrationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTaxRegistrationResource<
  Props = StripeTaxRegistrationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "tax-registration";
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
        resource: "tax-registration",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TaxRegistrationId(): Required<StripeTaxRegistrationOutputs>["TaxRegistrationId"] {
    const value: Required<StripeTaxRegistrationOutputs>["TaxRegistrationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TaxRegistrationId",
        StripeTaxRegistrationOutputsSchema.fields.TaxRegistrationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTaxRegistrationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTaxRegistrationResource<Props> {
  const resource: StripeTaxRegistrationResource<Props> =
    new StripeTaxRegistrationResource<Props>(key, props, binding);

  return resource;
}
