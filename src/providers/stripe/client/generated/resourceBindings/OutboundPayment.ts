import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2MoneyManagementOutboundPaymentsIdInput,
  GetV2MoneyManagementOutboundPaymentsIdOutput,
} from "../moneyManagementOutboundPayments.js";
import {
  GetV2MoneyManagementOutboundPaymentsIdOperation,
  PostV2MoneyManagementOutboundPaymentsInput,
  PostV2MoneyManagementOutboundPaymentsOperation,
  type PostV2MoneyManagementOutboundPaymentsOutput,
} from "../moneyManagementOutboundPayments.js";
import type { StripeOutboundPaymentPropsEntity } from "../resourceInputs/StripeOutboundPaymentPropsEntitySchema.js";
import type { StripeOutboundPaymentProps } from "../resourceInputs/StripeOutboundPaymentPropsSchema.js";
import {
  type StripeOutboundPaymentOutputs,
  StripeOutboundPaymentOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeOutboundPaymentOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeOutboundPaymentOutputs(
  state: Pick<PostV2MoneyManagementOutboundPaymentsOutput, "id">,
): StripeOutboundPaymentOutputs {
  const outputs: StripeOutboundPaymentOutputs = {
    OutboundPaymentId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeOutboundPaymentReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeOutboundPaymentReadInput(
  outputs: StripeOutboundPaymentOutputs,
): GetV2MoneyManagementOutboundPaymentsIdInput {
  const input: GetV2MoneyManagementOutboundPaymentsIdInput = {
    id: outputs.OutboundPaymentId,
  };

  return input;
}

/**
 * The StripeOutboundPaymentResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeOutboundPaymentResourceClient extends Context.Service<StripeOutboundPaymentResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/OutboundPayment/StripeOutboundPaymentResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeOutboundPayment.create")(function* (
        props: StripeOutboundPaymentProps,
      ) {
        const input: PostV2MoneyManagementOutboundPaymentsInput =
          yield* Schema.decodeUnknownEffect(
            PostV2MoneyManagementOutboundPaymentsInput,
          )(props);
        const created: PostV2MoneyManagementOutboundPaymentsOutput =
          yield* client.invoke(
            PostV2MoneyManagementOutboundPaymentsOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeOutboundPayment.read")(function* (
        outputs: StripeOutboundPaymentOutputs,
      ) {
        const input: GetV2MoneyManagementOutboundPaymentsIdInput =
          bindStripeOutboundPaymentReadInput(outputs);
        const observed: GetV2MoneyManagementOutboundPaymentsIdOutput =
          yield* client.invoke(
            GetV2MoneyManagementOutboundPaymentsIdOperation,
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

export const stripeOutboundPaymentResourceClientLayer = Layer.effect(
  StripeOutboundPaymentResourceClient,
  StripeOutboundPaymentResourceClient.make,
);
export const StripeOutboundPaymentResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("money_management"),
  resource: Schema.Literal("outbound-payment"),
});

/**
 * The StripeOutboundPaymentResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeOutboundPaymentResource<
  Props = StripeOutboundPaymentPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "money_management";
  readonly resource: "outbound-payment";
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
        service: "money_management",
        resource: "outbound-payment",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get OutboundPaymentId(): Required<StripeOutboundPaymentOutputs>["OutboundPaymentId"] {
    const value: Required<StripeOutboundPaymentOutputs>["OutboundPaymentId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "OutboundPaymentId",
        StripeOutboundPaymentOutputsSchema.fields.OutboundPaymentId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeOutboundPaymentDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeOutboundPaymentResource<Props> {
  const resource: StripeOutboundPaymentResource<Props> =
    new StripeOutboundPaymentResource<Props>(key, props, binding);

  return resource;
}
