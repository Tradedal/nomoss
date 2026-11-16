import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetChargesChargeInput,
  GetChargesChargeOutput,
} from "../charges.js";
import {
  GetChargesChargeOperation,
  PostChargesChargeInput,
  PostChargesChargeOperation,
  type PostChargesChargeOutput,
  PostChargesInput,
  PostChargesOperation,
  type PostChargesOutput,
} from "../charges.js";
import type { StripeChargePropsEntity } from "../resourceInputs/StripeChargePropsEntitySchema.js";
import type { StripeChargeProps } from "../resourceInputs/StripeChargePropsSchema.js";
import {
  type StripeChargeOutputs,
  StripeChargeOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeChargeOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeChargeOutputs(
  state: Pick<PostChargesOutput, "id">,
): StripeChargeOutputs {
  const outputs: StripeChargeOutputs = {
    ChargeId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeChargeReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeChargeReadInput(
  outputs: StripeChargeOutputs,
): GetChargesChargeInput {
  const input: GetChargesChargeInput = {
    charge: outputs.ChargeId,
  };

  return input;
}

/**
 * The StripeChargeResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeChargeResourceClient extends Context.Service<StripeChargeResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Charge/StripeChargeResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeCharge.create")(function* (
        props: StripeChargeProps,
      ) {
        const input: PostChargesInput =
          yield* Schema.decodeUnknownEffect(PostChargesInput)(props);
        const created: PostChargesOutput = yield* client.invoke(
          PostChargesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeCharge.read")(function* (
        outputs: StripeChargeOutputs,
      ) {
        const input: GetChargesChargeInput = bindStripeChargeReadInput(outputs);
        const observed: GetChargesChargeOutput = yield* client.invoke(
          GetChargesChargeOperation,
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
      const update = Effect.fn("StripeCharge.update")(function* (
        outputs: StripeChargeOutputs,
        changes: Omit<PostChargesChargeInput, "charge">,
      ) {
        const input: PostChargesChargeInput = yield* Schema.decodeEffect(
          PostChargesChargeInput,
        )({
          ...changes,
          charge: outputs.ChargeId,
        });
        const changed: PostChargesChargeOutput = yield* client.invoke(
          PostChargesChargeOperation,
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

export const stripeChargeResourceClientLayer = Layer.effect(
  StripeChargeResourceClient,
  StripeChargeResourceClient.make,
);
export const StripeChargeResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("charge"),
});

/**
 * The StripeChargeResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeChargeResource<
  Props = StripeChargePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "charge";
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
        resource: "charge",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ChargeId(): Required<StripeChargeOutputs>["ChargeId"] {
    const value: Required<StripeChargeOutputs>["ChargeId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ChargeId",
        StripeChargeOutputsSchema.fields.ChargeId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeChargeDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeChargeResource<Props> {
  const resource: StripeChargeResource<Props> = new StripeChargeResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
