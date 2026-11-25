import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPaymentIntentsIntentInput,
  GetPaymentIntentsIntentOutput,
} from "../paymentIntents.js";
import {
  GetPaymentIntentsIntentOperation,
  PostPaymentIntentsInput,
  PostPaymentIntentsIntentInput,
  PostPaymentIntentsIntentOperation,
  type PostPaymentIntentsIntentOutput,
  PostPaymentIntentsOperation,
  type PostPaymentIntentsOutput,
} from "../paymentIntents.js";
import type { StripePaymentIntentPropsEntity } from "../resourceInputs/StripePaymentIntentPropsEntitySchema.js";
import type { StripePaymentIntentProps } from "../resourceInputs/StripePaymentIntentPropsSchema.js";
import {
  type StripePaymentIntentOutputs,
  StripePaymentIntentOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePaymentIntentOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePaymentIntentOutputs(
  state: Pick<PostPaymentIntentsOutput, "id">,
): StripePaymentIntentOutputs {
  const outputs: StripePaymentIntentOutputs = {
    PaymentIntentId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePaymentIntentReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePaymentIntentReadInput(
  outputs: StripePaymentIntentOutputs,
): GetPaymentIntentsIntentInput {
  const input: GetPaymentIntentsIntentInput = {
    intent: outputs.PaymentIntentId,
  };

  return input;
}

/**
 * The StripePaymentIntentResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePaymentIntentResourceClient extends Context.Service<StripePaymentIntentResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PaymentIntent/StripePaymentIntentResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePaymentIntent.create")(function* (
        props: StripePaymentIntentProps,
      ) {
        const input: PostPaymentIntentsInput =
          yield* Schema.decodeUnknownEffect(PostPaymentIntentsInput)(props);
        const created: PostPaymentIntentsOutput = yield* client.invoke(
          PostPaymentIntentsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePaymentIntent.read")(function* (
        outputs: StripePaymentIntentOutputs,
      ) {
        const input: GetPaymentIntentsIntentInput =
          bindStripePaymentIntentReadInput(outputs);
        const observed: GetPaymentIntentsIntentOutput = yield* client.invoke(
          GetPaymentIntentsIntentOperation,
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
      const update = Effect.fn("StripePaymentIntent.update")(function* (
        outputs: StripePaymentIntentOutputs,
        changes: Omit<PostPaymentIntentsIntentInput, "intent">,
      ) {
        const input: PostPaymentIntentsIntentInput = yield* Schema.decodeEffect(
          PostPaymentIntentsIntentInput,
        )({
          ...changes,
          intent: outputs.PaymentIntentId,
        });
        const changed: PostPaymentIntentsIntentOutput = yield* client.invoke(
          PostPaymentIntentsIntentOperation,
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

export const stripePaymentIntentResourceClientLayer = Layer.effect(
  StripePaymentIntentResourceClient,
  StripePaymentIntentResourceClient.make,
);
export const StripePaymentIntentResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("payment-intent"),
});

/**
 * The StripePaymentIntentResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePaymentIntentResource<
  Props = StripePaymentIntentPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "payment-intent";
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
        resource: "payment-intent",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PaymentIntentId(): Required<StripePaymentIntentOutputs>["PaymentIntentId"] {
    const value: Required<StripePaymentIntentOutputs>["PaymentIntentId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PaymentIntentId",
        StripePaymentIntentOutputsSchema.fields.PaymentIntentId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePaymentIntentDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePaymentIntentResource<Props> {
  const resource: StripePaymentIntentResource<Props> =
    new StripePaymentIntentResource<Props>(key, props, binding);

  return resource;
}
