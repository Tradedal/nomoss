import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPaymentMethodDomainsPaymentMethodDomainInput,
  GetPaymentMethodDomainsPaymentMethodDomainOutput,
} from "../paymentMethodDomains.js";
import {
  GetPaymentMethodDomainsPaymentMethodDomainOperation,
  PostPaymentMethodDomainsInput,
  PostPaymentMethodDomainsOperation,
  type PostPaymentMethodDomainsOutput,
  PostPaymentMethodDomainsPaymentMethodDomainInput,
  PostPaymentMethodDomainsPaymentMethodDomainOperation,
  type PostPaymentMethodDomainsPaymentMethodDomainOutput,
} from "../paymentMethodDomains.js";
import type { StripePaymentMethodDomainPropsEntity } from "../resourceInputs/StripePaymentMethodDomainPropsEntitySchema.js";
import type { StripePaymentMethodDomainProps } from "../resourceInputs/StripePaymentMethodDomainPropsSchema.js";
import {
  type StripePaymentMethodDomainOutputs,
  StripePaymentMethodDomainOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePaymentMethodDomainOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePaymentMethodDomainOutputs(
  state: Pick<PostPaymentMethodDomainsOutput, "id">,
): StripePaymentMethodDomainOutputs {
  const outputs: StripePaymentMethodDomainOutputs = {
    PaymentMethodDomainId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePaymentMethodDomainReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePaymentMethodDomainReadInput(
  outputs: StripePaymentMethodDomainOutputs,
): GetPaymentMethodDomainsPaymentMethodDomainInput {
  const input: GetPaymentMethodDomainsPaymentMethodDomainInput = {
    payment_method_domain: outputs.PaymentMethodDomainId,
  };

  return input;
}

/**
 * The StripePaymentMethodDomainResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePaymentMethodDomainResourceClient extends Context.Service<StripePaymentMethodDomainResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PaymentMethodDomain/StripePaymentMethodDomainResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePaymentMethodDomain.create")(function* (
        props: StripePaymentMethodDomainProps,
      ) {
        const input: PostPaymentMethodDomainsInput =
          yield* Schema.decodeUnknownEffect(PostPaymentMethodDomainsInput)(
            props,
          );
        const created: PostPaymentMethodDomainsOutput = yield* client.invoke(
          PostPaymentMethodDomainsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePaymentMethodDomain.read")(function* (
        outputs: StripePaymentMethodDomainOutputs,
      ) {
        const input: GetPaymentMethodDomainsPaymentMethodDomainInput =
          bindStripePaymentMethodDomainReadInput(outputs);
        const observed: GetPaymentMethodDomainsPaymentMethodDomainOutput =
          yield* client.invoke(
            GetPaymentMethodDomainsPaymentMethodDomainOperation,
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
      const update = Effect.fn("StripePaymentMethodDomain.update")(function* (
        outputs: StripePaymentMethodDomainOutputs,
        changes: Omit<
          PostPaymentMethodDomainsPaymentMethodDomainInput,
          "payment_method_domain"
        >,
      ) {
        const input: PostPaymentMethodDomainsPaymentMethodDomainInput =
          yield* Schema.decodeEffect(
            PostPaymentMethodDomainsPaymentMethodDomainInput,
          )({
            ...changes,
            payment_method_domain: outputs.PaymentMethodDomainId,
          });
        const changed: PostPaymentMethodDomainsPaymentMethodDomainOutput =
          yield* client.invoke(
            PostPaymentMethodDomainsPaymentMethodDomainOperation,
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

export const stripePaymentMethodDomainResourceClientLayer = Layer.effect(
  StripePaymentMethodDomainResourceClient,
  StripePaymentMethodDomainResourceClient.make,
);
export const StripePaymentMethodDomainResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("payment-method-domain"),
});

/**
 * The StripePaymentMethodDomainResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePaymentMethodDomainResource<
  Props = StripePaymentMethodDomainPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "payment-method-domain";
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
        resource: "payment-method-domain",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PaymentMethodDomainId(): Required<StripePaymentMethodDomainOutputs>["PaymentMethodDomainId"] {
    const value: Required<StripePaymentMethodDomainOutputs>["PaymentMethodDomainId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PaymentMethodDomainId",
        StripePaymentMethodDomainOutputsSchema.fields.PaymentMethodDomainId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePaymentMethodDomainDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePaymentMethodDomainResource<Props> {
  const resource: StripePaymentMethodDomainResource<Props> =
    new StripePaymentMethodDomainResource<Props>(key, props, binding);

  return resource;
}
