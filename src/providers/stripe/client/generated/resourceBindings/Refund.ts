import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetRefundsRefundInput,
  GetRefundsRefundOutput,
} from "../refunds.js";
import {
  GetRefundsRefundOperation,
  PostRefundsInput,
  PostRefundsOperation,
  type PostRefundsOutput,
  PostRefundsRefundInput,
  PostRefundsRefundOperation,
  type PostRefundsRefundOutput,
} from "../refunds.js";
import type { StripeRefundPropsEntity } from "../resourceInputs/StripeRefundPropsEntitySchema.js";
import type { StripeRefundProps } from "../resourceInputs/StripeRefundPropsSchema.js";
import {
  type StripeRefundOutputs,
  StripeRefundOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeRefundOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeRefundOutputs(
  state: Pick<PostRefundsOutput, "id">,
): StripeRefundOutputs {
  const outputs: StripeRefundOutputs = {
    RefundId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeRefundReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeRefundReadInput(
  outputs: StripeRefundOutputs,
): GetRefundsRefundInput {
  const input: GetRefundsRefundInput = {
    refund: outputs.RefundId,
  };

  return input;
}

/**
 * The StripeRefundResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeRefundResourceClient extends Context.Service<StripeRefundResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Refund/StripeRefundResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeRefund.create")(function* (
        props: StripeRefundProps,
      ) {
        const input: PostRefundsInput =
          yield* Schema.decodeUnknownEffect(PostRefundsInput)(props);
        const created: PostRefundsOutput = yield* client.invoke(
          PostRefundsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeRefund.read")(function* (
        outputs: StripeRefundOutputs,
      ) {
        const input: GetRefundsRefundInput = bindStripeRefundReadInput(outputs);
        const observed: GetRefundsRefundOutput = yield* client.invoke(
          GetRefundsRefundOperation,
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
      const update = Effect.fn("StripeRefund.update")(function* (
        outputs: StripeRefundOutputs,
        changes: Omit<PostRefundsRefundInput, "refund">,
      ) {
        const input: PostRefundsRefundInput = yield* Schema.decodeEffect(
          PostRefundsRefundInput,
        )({
          ...changes,
          refund: outputs.RefundId,
        });
        const changed: PostRefundsRefundOutput = yield* client.invoke(
          PostRefundsRefundOperation,
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

export const stripeRefundResourceClientLayer = Layer.effect(
  StripeRefundResourceClient,
  StripeRefundResourceClient.make,
);
export const StripeRefundResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("refund"),
});

/**
 * The StripeRefundResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeRefundResource<
  Props = StripeRefundPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "refund";
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
        resource: "refund",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RefundId(): Required<StripeRefundOutputs>["RefundId"] {
    const value: Required<StripeRefundOutputs>["RefundId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RefundId",
        StripeRefundOutputsSchema.fields.RefundId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeRefundDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeRefundResource<Props> {
  const resource: StripeRefundResource<Props> = new StripeRefundResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
