import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPaymentMethodsPaymentMethodInput,
  GetPaymentMethodsPaymentMethodOutput,
} from "../paymentMethods.js";
import {
  GetPaymentMethodsPaymentMethodOperation,
  PostPaymentMethodsInput,
  PostPaymentMethodsOperation,
  type PostPaymentMethodsOutput,
  PostPaymentMethodsPaymentMethodInput,
  PostPaymentMethodsPaymentMethodOperation,
  type PostPaymentMethodsPaymentMethodOutput,
} from "../paymentMethods.js";
import type { StripePaymentMethodPropsEntity } from "../resourceInputs/StripePaymentMethodPropsEntitySchema.js";
import type { StripePaymentMethodProps } from "../resourceInputs/StripePaymentMethodPropsSchema.js";
import {
  type StripePaymentMethodOutputs,
  StripePaymentMethodOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePaymentMethodOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePaymentMethodOutputs(
  state: Pick<PostPaymentMethodsOutput, "id">,
): StripePaymentMethodOutputs {
  const outputs: StripePaymentMethodOutputs = {
    PaymentMethodId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePaymentMethodReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePaymentMethodReadInput(
  outputs: StripePaymentMethodOutputs,
): GetPaymentMethodsPaymentMethodInput {
  const input: GetPaymentMethodsPaymentMethodInput = {
    payment_method: outputs.PaymentMethodId,
  };

  return input;
}

/**
 * The StripePaymentMethodResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePaymentMethodResourceClient extends Context.Service<StripePaymentMethodResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PaymentMethod/StripePaymentMethodResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePaymentMethod.create")(function* (
        props: StripePaymentMethodProps,
      ) {
        const input: PostPaymentMethodsInput =
          yield* Schema.decodeUnknownEffect(PostPaymentMethodsInput)(props);
        const created: PostPaymentMethodsOutput = yield* client.invoke(
          PostPaymentMethodsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePaymentMethod.read")(function* (
        outputs: StripePaymentMethodOutputs,
      ) {
        const input: GetPaymentMethodsPaymentMethodInput =
          bindStripePaymentMethodReadInput(outputs);
        const observed: GetPaymentMethodsPaymentMethodOutput =
          yield* client.invoke(GetPaymentMethodsPaymentMethodOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripePaymentMethod.update")(function* (
        outputs: StripePaymentMethodOutputs,
        changes: Omit<PostPaymentMethodsPaymentMethodInput, "payment_method">,
      ) {
        const input: PostPaymentMethodsPaymentMethodInput =
          yield* Schema.decodeEffect(PostPaymentMethodsPaymentMethodInput)({
            ...changes,
            payment_method: outputs.PaymentMethodId,
          });
        const changed: PostPaymentMethodsPaymentMethodOutput =
          yield* client.invoke(PostPaymentMethodsPaymentMethodOperation, input);
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

export const stripePaymentMethodResourceClientLayer = Layer.effect(
  StripePaymentMethodResourceClient,
  StripePaymentMethodResourceClient.make,
);
export const StripePaymentMethodResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("payment-method"),
});

/**
 * The StripePaymentMethodResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePaymentMethodResource<
  Props = StripePaymentMethodPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "payment-method";
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
        resource: "payment-method",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PaymentMethodId(): Required<StripePaymentMethodOutputs>["PaymentMethodId"] {
    const value: Required<StripePaymentMethodOutputs>["PaymentMethodId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PaymentMethodId",
        StripePaymentMethodOutputsSchema.fields.PaymentMethodId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePaymentMethodDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePaymentMethodResource<Props> {
  const resource: StripePaymentMethodResource<Props> =
    new StripePaymentMethodResource<Props>(key, props, binding);

  return resource;
}
