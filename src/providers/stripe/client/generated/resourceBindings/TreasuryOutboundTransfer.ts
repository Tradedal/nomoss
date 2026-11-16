import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTreasuryOutboundTransferPropsEntity } from "../resourceInputs/StripeTreasuryOutboundTransferPropsEntitySchema.js";
import type { StripeTreasuryOutboundTransferProps } from "../resourceInputs/StripeTreasuryOutboundTransferPropsSchema.js";
import {
  type StripeTreasuryOutboundTransferOutputs,
  StripeTreasuryOutboundTransferOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTreasuryOutboundTransfersOutboundTransferInput,
  GetTreasuryOutboundTransfersOutboundTransferOutput,
} from "../treasuryOutboundTransfers.js";
import {
  GetTreasuryOutboundTransfersOutboundTransferOperation,
  PostTreasuryOutboundTransfersInput,
  PostTreasuryOutboundTransfersOperation,
  type PostTreasuryOutboundTransfersOutput,
} from "../treasuryOutboundTransfers.js";

/**
 * The projectStripeTreasuryOutboundTransferOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTreasuryOutboundTransferOutputs(
  state: Pick<PostTreasuryOutboundTransfersOutput, "id">,
): StripeTreasuryOutboundTransferOutputs {
  const outputs: StripeTreasuryOutboundTransferOutputs = {
    TreasuryOutboundTransferId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTreasuryOutboundTransferReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTreasuryOutboundTransferReadInput(
  outputs: StripeTreasuryOutboundTransferOutputs,
): GetTreasuryOutboundTransfersOutboundTransferInput {
  const input: GetTreasuryOutboundTransfersOutboundTransferInput = {
    outbound_transfer: outputs.TreasuryOutboundTransferId,
  };

  return input;
}

/**
 * The StripeTreasuryOutboundTransferResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTreasuryOutboundTransferResourceClient extends Context.Service<StripeTreasuryOutboundTransferResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TreasuryOutboundTransfer/StripeTreasuryOutboundTransferResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTreasuryOutboundTransfer.create")(
        function* (props: StripeTreasuryOutboundTransferProps) {
          const input: PostTreasuryOutboundTransfersInput =
            yield* Schema.decodeUnknownEffect(
              PostTreasuryOutboundTransfersInput,
            )(props);
          const created: PostTreasuryOutboundTransfersOutput =
            yield* client.invoke(PostTreasuryOutboundTransfersOperation, input);
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTreasuryOutboundTransfer.read")(function* (
        outputs: StripeTreasuryOutboundTransferOutputs,
      ) {
        const input: GetTreasuryOutboundTransfersOutboundTransferInput =
          bindStripeTreasuryOutboundTransferReadInput(outputs);
        const observed: GetTreasuryOutboundTransfersOutboundTransferOutput =
          yield* client.invoke(
            GetTreasuryOutboundTransfersOutboundTransferOperation,
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

export const stripeTreasuryOutboundTransferResourceClientLayer = Layer.effect(
  StripeTreasuryOutboundTransferResourceClient,
  StripeTreasuryOutboundTransferResourceClient.make,
);
export const StripeTreasuryOutboundTransferResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("treasury-outbound-transfer"),
});

/**
 * The StripeTreasuryOutboundTransferResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTreasuryOutboundTransferResource<
  Props = StripeTreasuryOutboundTransferPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "treasury-outbound-transfer";
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
        resource: "treasury-outbound-transfer",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TreasuryOutboundTransferId(): Required<StripeTreasuryOutboundTransferOutputs>["TreasuryOutboundTransferId"] {
    const value: Required<StripeTreasuryOutboundTransferOutputs>["TreasuryOutboundTransferId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TreasuryOutboundTransferId",
        StripeTreasuryOutboundTransferOutputsSchema.fields
          .TreasuryOutboundTransferId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTreasuryOutboundTransferDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTreasuryOutboundTransferResource<Props> {
  const resource: StripeTreasuryOutboundTransferResource<Props> =
    new StripeTreasuryOutboundTransferResource<Props>(key, props, binding);

  return resource;
}
