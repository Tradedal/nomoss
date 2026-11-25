import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTreasuryInboundTransferPropsEntity } from "../resourceInputs/StripeTreasuryInboundTransferPropsEntitySchema.js";
import type { StripeTreasuryInboundTransferProps } from "../resourceInputs/StripeTreasuryInboundTransferPropsSchema.js";
import {
  type StripeTreasuryInboundTransferOutputs,
  StripeTreasuryInboundTransferOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTreasuryInboundTransfersIdInput,
  GetTreasuryInboundTransfersIdOutput,
} from "../treasuryInboundTransfers.js";
import {
  GetTreasuryInboundTransfersIdOperation,
  PostTreasuryInboundTransfersInput,
  PostTreasuryInboundTransfersOperation,
  type PostTreasuryInboundTransfersOutput,
} from "../treasuryInboundTransfers.js";

/**
 * The projectStripeTreasuryInboundTransferOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTreasuryInboundTransferOutputs(
  state: Pick<PostTreasuryInboundTransfersOutput, "id">,
): StripeTreasuryInboundTransferOutputs {
  const outputs: StripeTreasuryInboundTransferOutputs = {
    TreasuryInboundTransferId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTreasuryInboundTransferReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTreasuryInboundTransferReadInput(
  outputs: StripeTreasuryInboundTransferOutputs,
): GetTreasuryInboundTransfersIdInput {
  const input: GetTreasuryInboundTransfersIdInput = {
    id: outputs.TreasuryInboundTransferId,
  };

  return input;
}

/**
 * The StripeTreasuryInboundTransferResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTreasuryInboundTransferResourceClient extends Context.Service<StripeTreasuryInboundTransferResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TreasuryInboundTransfer/StripeTreasuryInboundTransferResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTreasuryInboundTransfer.create")(
        function* (props: StripeTreasuryInboundTransferProps) {
          const input: PostTreasuryInboundTransfersInput =
            yield* Schema.decodeUnknownEffect(
              PostTreasuryInboundTransfersInput,
            )(props);
          const created: PostTreasuryInboundTransfersOutput =
            yield* client.invoke(PostTreasuryInboundTransfersOperation, input);
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTreasuryInboundTransfer.read")(function* (
        outputs: StripeTreasuryInboundTransferOutputs,
      ) {
        const input: GetTreasuryInboundTransfersIdInput =
          bindStripeTreasuryInboundTransferReadInput(outputs);
        const observed: GetTreasuryInboundTransfersIdOutput =
          yield* client.invoke(GetTreasuryInboundTransfersIdOperation, input);
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeTreasuryInboundTransferResourceClientLayer = Layer.effect(
  StripeTreasuryInboundTransferResourceClient,
  StripeTreasuryInboundTransferResourceClient.make,
);
export const StripeTreasuryInboundTransferResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("treasury-inbound-transfer"),
});

/**
 * The StripeTreasuryInboundTransferResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTreasuryInboundTransferResource<
  Props = StripeTreasuryInboundTransferPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "treasury-inbound-transfer";
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
        resource: "treasury-inbound-transfer",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TreasuryInboundTransferId(): Required<StripeTreasuryInboundTransferOutputs>["TreasuryInboundTransferId"] {
    const value: Required<StripeTreasuryInboundTransferOutputs>["TreasuryInboundTransferId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TreasuryInboundTransferId",
        StripeTreasuryInboundTransferOutputsSchema.fields
          .TreasuryInboundTransferId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTreasuryInboundTransferDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTreasuryInboundTransferResource<Props> {
  const resource: StripeTreasuryInboundTransferResource<Props> =
    new StripeTreasuryInboundTransferResource<Props>(key, props, binding);

  return resource;
}
