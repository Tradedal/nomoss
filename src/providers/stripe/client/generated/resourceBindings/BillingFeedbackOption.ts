import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetBillingFeedbackOptionsIdInput,
  GetBillingFeedbackOptionsIdOutput,
} from "../billingFeedbackOptions.js";
import {
  GetBillingFeedbackOptionsIdOperation,
  PostBillingFeedbackOptionsIdInput,
  PostBillingFeedbackOptionsIdOperation,
  type PostBillingFeedbackOptionsIdOutput,
  PostBillingFeedbackOptionsInput,
  PostBillingFeedbackOptionsOperation,
  type PostBillingFeedbackOptionsOutput,
} from "../billingFeedbackOptions.js";
import type { StripeBillingFeedbackOptionPropsEntity } from "../resourceInputs/StripeBillingFeedbackOptionPropsEntitySchema.js";
import type { StripeBillingFeedbackOptionProps } from "../resourceInputs/StripeBillingFeedbackOptionPropsSchema.js";
import {
  type StripeBillingFeedbackOptionOutputs,
  StripeBillingFeedbackOptionOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeBillingFeedbackOptionOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeBillingFeedbackOptionOutputs(
  state: Pick<PostBillingFeedbackOptionsOutput, "id">,
): StripeBillingFeedbackOptionOutputs {
  const outputs: StripeBillingFeedbackOptionOutputs = {
    BillingFeedbackOptionId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeBillingFeedbackOptionReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeBillingFeedbackOptionReadInput(
  outputs: StripeBillingFeedbackOptionOutputs,
): GetBillingFeedbackOptionsIdInput {
  const input: GetBillingFeedbackOptionsIdInput = {
    id: outputs.BillingFeedbackOptionId,
  };

  return input;
}

/**
 * The StripeBillingFeedbackOptionResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeBillingFeedbackOptionResourceClient extends Context.Service<StripeBillingFeedbackOptionResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/BillingFeedbackOption/StripeBillingFeedbackOptionResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeBillingFeedbackOption.create")(function* (
        props: StripeBillingFeedbackOptionProps,
      ) {
        const input: PostBillingFeedbackOptionsInput =
          yield* Schema.decodeUnknownEffect(PostBillingFeedbackOptionsInput)(
            props,
          );
        const created: PostBillingFeedbackOptionsOutput = yield* client.invoke(
          PostBillingFeedbackOptionsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeBillingFeedbackOption.read")(function* (
        outputs: StripeBillingFeedbackOptionOutputs,
      ) {
        const input: GetBillingFeedbackOptionsIdInput =
          bindStripeBillingFeedbackOptionReadInput(outputs);
        const observed: GetBillingFeedbackOptionsIdOutput =
          yield* client.invoke(GetBillingFeedbackOptionsIdOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeBillingFeedbackOption.update")(function* (
        outputs: StripeBillingFeedbackOptionOutputs,
        changes: Omit<PostBillingFeedbackOptionsIdInput, "id">,
      ) {
        const input: PostBillingFeedbackOptionsIdInput =
          yield* Schema.decodeEffect(PostBillingFeedbackOptionsIdInput)({
            ...changes,
            id: outputs.BillingFeedbackOptionId,
          });
        const changed: PostBillingFeedbackOptionsIdOutput =
          yield* client.invoke(PostBillingFeedbackOptionsIdOperation, input);
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

export const stripeBillingFeedbackOptionResourceClientLayer = Layer.effect(
  StripeBillingFeedbackOptionResourceClient,
  StripeBillingFeedbackOptionResourceClient.make,
);
export const StripeBillingFeedbackOptionResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("billing-feedback-option"),
});

/**
 * The StripeBillingFeedbackOptionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeBillingFeedbackOptionResource<
  Props = StripeBillingFeedbackOptionPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "billing-feedback-option";
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
        resource: "billing-feedback-option",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get BillingFeedbackOptionId(): Required<StripeBillingFeedbackOptionOutputs>["BillingFeedbackOptionId"] {
    const value: Required<StripeBillingFeedbackOptionOutputs>["BillingFeedbackOptionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "BillingFeedbackOptionId",
        StripeBillingFeedbackOptionOutputsSchema.fields.BillingFeedbackOptionId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeBillingFeedbackOptionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeBillingFeedbackOptionResource<Props> {
  const resource: StripeBillingFeedbackOptionResource<Props> =
    new StripeBillingFeedbackOptionResource<Props>(key, props, binding);

  return resource;
}
