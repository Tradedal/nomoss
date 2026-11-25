import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPaymentLinksPaymentLinkInput,
  GetPaymentLinksPaymentLinkOutput,
} from "../paymentLinks.js";
import {
  GetPaymentLinksPaymentLinkOperation,
  PostPaymentLinksInput,
  PostPaymentLinksOperation,
  type PostPaymentLinksOutput,
  PostPaymentLinksPaymentLinkInput,
  PostPaymentLinksPaymentLinkOperation,
  type PostPaymentLinksPaymentLinkOutput,
} from "../paymentLinks.js";
import type { StripePaymentLinkPropsEntity } from "../resourceInputs/StripePaymentLinkPropsEntitySchema.js";
import type { StripePaymentLinkProps } from "../resourceInputs/StripePaymentLinkPropsSchema.js";
import {
  type StripePaymentLinkOutputs,
  StripePaymentLinkOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePaymentLinkOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePaymentLinkOutputs(
  state: Pick<PostPaymentLinksOutput, "id">,
): StripePaymentLinkOutputs {
  const outputs: StripePaymentLinkOutputs = {
    PaymentLinkId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePaymentLinkReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePaymentLinkReadInput(
  outputs: StripePaymentLinkOutputs,
): GetPaymentLinksPaymentLinkInput {
  const input: GetPaymentLinksPaymentLinkInput = {
    payment_link: outputs.PaymentLinkId,
  };

  return input;
}

/**
 * The StripePaymentLinkResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePaymentLinkResourceClient extends Context.Service<StripePaymentLinkResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PaymentLink/StripePaymentLinkResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePaymentLink.create")(function* (
        props: StripePaymentLinkProps,
      ) {
        const input: PostPaymentLinksInput = yield* Schema.decodeUnknownEffect(
          PostPaymentLinksInput,
        )(props);
        const created: PostPaymentLinksOutput = yield* client.invoke(
          PostPaymentLinksOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePaymentLink.read")(function* (
        outputs: StripePaymentLinkOutputs,
      ) {
        const input: GetPaymentLinksPaymentLinkInput =
          bindStripePaymentLinkReadInput(outputs);
        const observed: GetPaymentLinksPaymentLinkOutput = yield* client.invoke(
          GetPaymentLinksPaymentLinkOperation,
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
      const update = Effect.fn("StripePaymentLink.update")(function* (
        outputs: StripePaymentLinkOutputs,
        changes: Omit<PostPaymentLinksPaymentLinkInput, "payment_link">,
      ) {
        const input: PostPaymentLinksPaymentLinkInput =
          yield* Schema.decodeEffect(PostPaymentLinksPaymentLinkInput)({
            ...changes,
            payment_link: outputs.PaymentLinkId,
          });
        const changed: PostPaymentLinksPaymentLinkOutput = yield* client.invoke(
          PostPaymentLinksPaymentLinkOperation,
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

export const stripePaymentLinkResourceClientLayer = Layer.effect(
  StripePaymentLinkResourceClient,
  StripePaymentLinkResourceClient.make,
);
export const StripePaymentLinkResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("payment-link"),
});

/**
 * The StripePaymentLinkResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePaymentLinkResource<
  Props = StripePaymentLinkPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "payment-link";
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
        resource: "payment-link",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PaymentLinkId(): Required<StripePaymentLinkOutputs>["PaymentLinkId"] {
    const value: Required<StripePaymentLinkOutputs>["PaymentLinkId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PaymentLinkId",
        StripePaymentLinkOutputsSchema.fields.PaymentLinkId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePaymentLinkDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePaymentLinkResource<Props> {
  const resource: StripePaymentLinkResource<Props> =
    new StripePaymentLinkResource<Props>(key, props, binding);

  return resource;
}
