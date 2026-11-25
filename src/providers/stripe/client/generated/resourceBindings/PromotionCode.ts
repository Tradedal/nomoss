import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPromotionCodesPromotionCodeInput,
  GetPromotionCodesPromotionCodeOutput,
} from "../promotionCodes.js";
import {
  GetPromotionCodesPromotionCodeOperation,
  PostPromotionCodesInput,
  PostPromotionCodesOperation,
  type PostPromotionCodesOutput,
  PostPromotionCodesPromotionCodeInput,
  PostPromotionCodesPromotionCodeOperation,
  type PostPromotionCodesPromotionCodeOutput,
} from "../promotionCodes.js";
import type { StripePromotionCodePropsEntity } from "../resourceInputs/StripePromotionCodePropsEntitySchema.js";
import type { StripePromotionCodeProps } from "../resourceInputs/StripePromotionCodePropsSchema.js";
import {
  type StripePromotionCodeOutputs,
  StripePromotionCodeOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePromotionCodeOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePromotionCodeOutputs(
  state: Pick<PostPromotionCodesOutput, "id">,
): StripePromotionCodeOutputs {
  const outputs: StripePromotionCodeOutputs = {
    PromotionCodeId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePromotionCodeReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePromotionCodeReadInput(
  outputs: StripePromotionCodeOutputs,
): GetPromotionCodesPromotionCodeInput {
  const input: GetPromotionCodesPromotionCodeInput = {
    promotion_code: outputs.PromotionCodeId,
  };

  return input;
}

/**
 * The StripePromotionCodeResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePromotionCodeResourceClient extends Context.Service<StripePromotionCodeResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PromotionCode/StripePromotionCodeResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePromotionCode.create")(function* (
        props: StripePromotionCodeProps,
      ) {
        const input: PostPromotionCodesInput =
          yield* Schema.decodeUnknownEffect(PostPromotionCodesInput)(props);
        const created: PostPromotionCodesOutput = yield* client.invoke(
          PostPromotionCodesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePromotionCode.read")(function* (
        outputs: StripePromotionCodeOutputs,
      ) {
        const input: GetPromotionCodesPromotionCodeInput =
          bindStripePromotionCodeReadInput(outputs);
        const observed: GetPromotionCodesPromotionCodeOutput =
          yield* client.invoke(GetPromotionCodesPromotionCodeOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripePromotionCode.update")(function* (
        outputs: StripePromotionCodeOutputs,
        changes: Omit<PostPromotionCodesPromotionCodeInput, "promotion_code">,
      ) {
        const input: PostPromotionCodesPromotionCodeInput =
          yield* Schema.decodeEffect(PostPromotionCodesPromotionCodeInput)({
            ...changes,
            promotion_code: outputs.PromotionCodeId,
          });
        const changed: PostPromotionCodesPromotionCodeOutput =
          yield* client.invoke(PostPromotionCodesPromotionCodeOperation, input);
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

export const stripePromotionCodeResourceClientLayer = Layer.effect(
  StripePromotionCodeResourceClient,
  StripePromotionCodeResourceClient.make,
);
export const StripePromotionCodeResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("promotion-code"),
});

/**
 * The StripePromotionCodeResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePromotionCodeResource<
  Props = StripePromotionCodePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "promotion-code";
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
        resource: "promotion-code",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PromotionCodeId(): Required<StripePromotionCodeOutputs>["PromotionCodeId"] {
    const value: Required<StripePromotionCodeOutputs>["PromotionCodeId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PromotionCodeId",
        StripePromotionCodeOutputsSchema.fields.PromotionCodeId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePromotionCodeDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePromotionCodeResource<Props> {
  const resource: StripePromotionCodeResource<Props> =
    new StripePromotionCodeResource<Props>(key, props, binding);

  return resource;
}
