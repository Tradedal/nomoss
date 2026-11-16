import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPaymentMethodConfigurationsConfigurationInput,
  GetPaymentMethodConfigurationsConfigurationOutput,
} from "../paymentMethodConfigurations.js";
import {
  GetPaymentMethodConfigurationsConfigurationOperation,
  PostPaymentMethodConfigurationsConfigurationInput,
  PostPaymentMethodConfigurationsConfigurationOperation,
  type PostPaymentMethodConfigurationsConfigurationOutput,
  PostPaymentMethodConfigurationsInput,
  PostPaymentMethodConfigurationsOperation,
  type PostPaymentMethodConfigurationsOutput,
} from "../paymentMethodConfigurations.js";
import type { StripePaymentMethodConfigurationPropsEntity } from "../resourceInputs/StripePaymentMethodConfigurationPropsEntitySchema.js";
import type { StripePaymentMethodConfigurationProps } from "../resourceInputs/StripePaymentMethodConfigurationPropsSchema.js";
import {
  type StripePaymentMethodConfigurationOutputs,
  StripePaymentMethodConfigurationOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePaymentMethodConfigurationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePaymentMethodConfigurationOutputs(
  state: Pick<PostPaymentMethodConfigurationsOutput, "id">,
): StripePaymentMethodConfigurationOutputs {
  const outputs: StripePaymentMethodConfigurationOutputs = {
    PaymentMethodConfigurationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePaymentMethodConfigurationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePaymentMethodConfigurationReadInput(
  outputs: StripePaymentMethodConfigurationOutputs,
): GetPaymentMethodConfigurationsConfigurationInput {
  const input: GetPaymentMethodConfigurationsConfigurationInput = {
    configuration: outputs.PaymentMethodConfigurationId,
  };

  return input;
}

/**
 * The StripePaymentMethodConfigurationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePaymentMethodConfigurationResourceClient extends Context.Service<StripePaymentMethodConfigurationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PaymentMethodConfiguration/StripePaymentMethodConfigurationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePaymentMethodConfiguration.create")(
        function* (props: StripePaymentMethodConfigurationProps) {
          const input: PostPaymentMethodConfigurationsInput =
            yield* Schema.decodeUnknownEffect(
              PostPaymentMethodConfigurationsInput,
            )(props);
          const created: PostPaymentMethodConfigurationsOutput =
            yield* client.invoke(
              PostPaymentMethodConfigurationsOperation,
              input,
            );
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePaymentMethodConfiguration.read")(
        function* (outputs: StripePaymentMethodConfigurationOutputs) {
          const input: GetPaymentMethodConfigurationsConfigurationInput =
            bindStripePaymentMethodConfigurationReadInput(outputs);
          const observed: GetPaymentMethodConfigurationsConfigurationOutput =
            yield* client.invoke(
              GetPaymentMethodConfigurationsConfigurationOperation,
              input,
            );
          return observed;
        },
      );

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripePaymentMethodConfiguration.update")(
        function* (
          outputs: StripePaymentMethodConfigurationOutputs,
          changes: Omit<
            PostPaymentMethodConfigurationsConfigurationInput,
            "configuration"
          >,
        ) {
          const input: PostPaymentMethodConfigurationsConfigurationInput =
            yield* Schema.decodeEffect(
              PostPaymentMethodConfigurationsConfigurationInput,
            )({
              ...changes,
              configuration: outputs.PaymentMethodConfigurationId,
            });
          const changed: PostPaymentMethodConfigurationsConfigurationOutput =
            yield* client.invoke(
              PostPaymentMethodConfigurationsConfigurationOperation,
              input,
            );
          return changed;
        },
      );

      return {
        create,
        read,
        update,
      };
    }),
  },
) {}

export const stripePaymentMethodConfigurationResourceClientLayer = Layer.effect(
  StripePaymentMethodConfigurationResourceClient,
  StripePaymentMethodConfigurationResourceClient.make,
);
export const StripePaymentMethodConfigurationResourceTypeSchema = Schema.Struct(
  {
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("payment-method-configuration"),
  },
);

/**
 * The StripePaymentMethodConfigurationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePaymentMethodConfigurationResource<
  Props = StripePaymentMethodConfigurationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "payment-method-configuration";
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
        resource: "payment-method-configuration",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PaymentMethodConfigurationId(): Required<StripePaymentMethodConfigurationOutputs>["PaymentMethodConfigurationId"] {
    const value: Required<StripePaymentMethodConfigurationOutputs>["PaymentMethodConfigurationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PaymentMethodConfigurationId",
        StripePaymentMethodConfigurationOutputsSchema.fields
          .PaymentMethodConfigurationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePaymentMethodConfigurationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePaymentMethodConfigurationResource<Props> {
  const resource: StripePaymentMethodConfigurationResource<Props> =
    new StripePaymentMethodConfigurationResource<Props>(key, props, binding);

  return resource;
}
