import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2MoneyManagementInboundTransfersIdInput,
  GetV2MoneyManagementInboundTransfersIdOutput,
} from "../moneyManagementInboundTransfers.js";
import {
  GetV2MoneyManagementInboundTransfersIdOperation,
  PostV2MoneyManagementInboundTransfersInput,
  PostV2MoneyManagementInboundTransfersOperation,
  type PostV2MoneyManagementInboundTransfersOutput,
} from "../moneyManagementInboundTransfers.js";
import type { StripeInboundTransferPropsEntity } from "../resourceInputs/StripeInboundTransferPropsEntitySchema.js";
import type { StripeInboundTransferProps } from "../resourceInputs/StripeInboundTransferPropsSchema.js";
import {
  type StripeInboundTransferOutputs,
  StripeInboundTransferOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeInboundTransferOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeInboundTransferOutputs(
  state: Pick<PostV2MoneyManagementInboundTransfersOutput, "id">,
): StripeInboundTransferOutputs {
  const outputs: StripeInboundTransferOutputs = {
    InboundTransferId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeInboundTransferReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeInboundTransferReadInput(
  outputs: StripeInboundTransferOutputs,
): GetV2MoneyManagementInboundTransfersIdInput {
  const input: GetV2MoneyManagementInboundTransfersIdInput = {
    id: outputs.InboundTransferId,
  };

  return input;
}

/**
 * The StripeInboundTransferResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeInboundTransferResourceClient extends Context.Service<StripeInboundTransferResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/InboundTransfer/StripeInboundTransferResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeInboundTransfer.create")(function* (
        props: StripeInboundTransferProps,
      ) {
        const input: PostV2MoneyManagementInboundTransfersInput =
          yield* Schema.decodeUnknownEffect(
            PostV2MoneyManagementInboundTransfersInput,
          )(props);
        const created: PostV2MoneyManagementInboundTransfersOutput =
          yield* client.invoke(
            PostV2MoneyManagementInboundTransfersOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeInboundTransfer.read")(function* (
        outputs: StripeInboundTransferOutputs,
      ) {
        const input: GetV2MoneyManagementInboundTransfersIdInput =
          bindStripeInboundTransferReadInput(outputs);
        const observed: GetV2MoneyManagementInboundTransfersIdOutput =
          yield* client.invoke(
            GetV2MoneyManagementInboundTransfersIdOperation,
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

export const stripeInboundTransferResourceClientLayer = Layer.effect(
  StripeInboundTransferResourceClient,
  StripeInboundTransferResourceClient.make,
);
export const StripeInboundTransferResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("money_management"),
  resource: Schema.Literal("inbound-transfer"),
});

/**
 * The StripeInboundTransferResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeInboundTransferResource<
  Props = StripeInboundTransferPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "money_management";
  readonly resource: "inbound-transfer";
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
        resource: "inbound-transfer",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get InboundTransferId(): Required<StripeInboundTransferOutputs>["InboundTransferId"] {
    const value: Required<StripeInboundTransferOutputs>["InboundTransferId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "InboundTransferId",
        StripeInboundTransferOutputsSchema.fields.InboundTransferId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeInboundTransferDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeInboundTransferResource<Props> {
  const resource: StripeInboundTransferResource<Props> =
    new StripeInboundTransferResource<Props>(key, props, binding);

  return resource;
}
