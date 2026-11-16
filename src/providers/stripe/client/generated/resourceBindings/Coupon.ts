import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetCouponsCouponInput,
  GetCouponsCouponOutput,
} from "../coupons.js";
import {
  GetCouponsCouponOperation,
  PostCouponsCouponInput,
  PostCouponsCouponOperation,
  type PostCouponsCouponOutput,
  PostCouponsInput,
  PostCouponsOperation,
  type PostCouponsOutput,
} from "../coupons.js";
import type { StripeCouponPropsEntity } from "../resourceInputs/StripeCouponPropsEntitySchema.js";
import type { StripeCouponProps } from "../resourceInputs/StripeCouponPropsSchema.js";
import {
  type StripeCouponOutputs,
  StripeCouponOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeCouponOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeCouponOutputs(
  state: Pick<PostCouponsOutput, "id">,
): StripeCouponOutputs {
  const outputs: StripeCouponOutputs = {
    CouponId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeCouponReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeCouponReadInput(
  outputs: StripeCouponOutputs,
): GetCouponsCouponInput {
  const input: GetCouponsCouponInput = {
    coupon: outputs.CouponId,
  };

  return input;
}

/**
 * The StripeCouponResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeCouponResourceClient extends Context.Service<StripeCouponResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Coupon/StripeCouponResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeCoupon.create")(function* (
        props: StripeCouponProps,
      ) {
        const input: PostCouponsInput =
          yield* Schema.decodeUnknownEffect(PostCouponsInput)(props);
        const created: PostCouponsOutput = yield* client.invoke(
          PostCouponsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeCoupon.read")(function* (
        outputs: StripeCouponOutputs,
      ) {
        const input: GetCouponsCouponInput = bindStripeCouponReadInput(outputs);
        const observed: GetCouponsCouponOutput = yield* client.invoke(
          GetCouponsCouponOperation,
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
      const update = Effect.fn("StripeCoupon.update")(function* (
        outputs: StripeCouponOutputs,
        changes: Omit<PostCouponsCouponInput, "coupon">,
      ) {
        const input: PostCouponsCouponInput = yield* Schema.decodeEffect(
          PostCouponsCouponInput,
        )({
          ...changes,
          coupon: outputs.CouponId,
        });
        const changed: PostCouponsCouponOutput = yield* client.invoke(
          PostCouponsCouponOperation,
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

export const stripeCouponResourceClientLayer = Layer.effect(
  StripeCouponResourceClient,
  StripeCouponResourceClient.make,
);
export const StripeCouponResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("coupon"),
});

/**
 * The StripeCouponResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeCouponResource<
  Props = StripeCouponPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "coupon";
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
        resource: "coupon",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get CouponId(): Required<StripeCouponOutputs>["CouponId"] {
    const value: Required<StripeCouponOutputs>["CouponId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "CouponId",
        StripeCouponOutputsSchema.fields.CouponId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeCouponDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeCouponResource<Props> {
  const resource: StripeCouponResource<Props> = new StripeCouponResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
