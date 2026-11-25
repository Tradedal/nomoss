import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTreasuryOutboundPaymentPropsEntity } from "../resourceInputs/StripeTreasuryOutboundPaymentPropsEntitySchema.js";
import type { StripeTreasuryOutboundPaymentProps } from "../resourceInputs/StripeTreasuryOutboundPaymentPropsSchema.js";
import {
  type StripeTreasuryOutboundPaymentOutputs,
  StripeTreasuryOutboundPaymentOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTreasuryOutboundPaymentsIdInput,
  GetTreasuryOutboundPaymentsIdOutput,
} from "../treasuryOutboundPayments.js";
import {
  GetTreasuryOutboundPaymentsIdOperation,
  PostTreasuryOutboundPaymentsInput,
  PostTreasuryOutboundPaymentsOperation,
  type PostTreasuryOutboundPaymentsOutput,
} from "../treasuryOutboundPayments.js";

/**
 * The projectStripeTreasuryOutboundPaymentOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTreasuryOutboundPaymentOutputs(
  state: Pick<PostTreasuryOutboundPaymentsOutput, "id">,
): StripeTreasuryOutboundPaymentOutputs {
  const outputs: StripeTreasuryOutboundPaymentOutputs = {
    TreasuryOutboundPaymentId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTreasuryOutboundPaymentReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTreasuryOutboundPaymentReadInput(
  outputs: StripeTreasuryOutboundPaymentOutputs,
): GetTreasuryOutboundPaymentsIdInput {
  const input: GetTreasuryOutboundPaymentsIdInput = {
    id: outputs.TreasuryOutboundPaymentId,
  };

  return input;
}

/**
 * The StripeTreasuryOutboundPaymentResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTreasuryOutboundPaymentResourceClient extends Context.Service<StripeTreasuryOutboundPaymentResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TreasuryOutboundPayment/StripeTreasuryOutboundPaymentResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTreasuryOutboundPayment.create")(
        function* (props: StripeTreasuryOutboundPaymentProps) {
          const input: PostTreasuryOutboundPaymentsInput =
            yield* Schema.decodeUnknownEffect(
              PostTreasuryOutboundPaymentsInput,
            )(props);
          const created: PostTreasuryOutboundPaymentsOutput =
            yield* client.invoke(PostTreasuryOutboundPaymentsOperation, input);
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTreasuryOutboundPayment.read")(function* (
        outputs: StripeTreasuryOutboundPaymentOutputs,
      ) {
        const input: GetTreasuryOutboundPaymentsIdInput =
          bindStripeTreasuryOutboundPaymentReadInput(outputs);
        const observed: GetTreasuryOutboundPaymentsIdOutput =
          yield* client.invoke(GetTreasuryOutboundPaymentsIdOperation, input);
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeTreasuryOutboundPaymentResourceClientLayer = Layer.effect(
  StripeTreasuryOutboundPaymentResourceClient,
  StripeTreasuryOutboundPaymentResourceClient.make,
);
export const StripeTreasuryOutboundPaymentResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("treasury-outbound-payment"),
});

/**
 * The StripeTreasuryOutboundPaymentResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTreasuryOutboundPaymentResource<
  Props = StripeTreasuryOutboundPaymentPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "treasury-outbound-payment";
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
        resource: "treasury-outbound-payment",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TreasuryOutboundPaymentId(): Required<StripeTreasuryOutboundPaymentOutputs>["TreasuryOutboundPaymentId"] {
    const value: Required<StripeTreasuryOutboundPaymentOutputs>["TreasuryOutboundPaymentId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TreasuryOutboundPaymentId",
        StripeTreasuryOutboundPaymentOutputsSchema.fields
          .TreasuryOutboundPaymentId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTreasuryOutboundPaymentDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTreasuryOutboundPaymentResource<Props> {
  const resource: StripeTreasuryOutboundPaymentResource<Props> =
    new StripeTreasuryOutboundPaymentResource<Props>(key, props, binding);

  return resource;
}
