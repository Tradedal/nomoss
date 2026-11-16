import { Context, Effect, Layer, Option, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeWebhookEndpointDeclarationPropsEntity } from "../resourceInputs/StripeWebhookEndpointDeclarationPropsEntitySchema.js";
import type { StripeWebhookEndpointRequestProps } from "../resourceInputs/StripeWebhookEndpointRequestPropsSchema.js";
import {
  type StripeWebhookEndpointOutputs,
  StripeWebhookEndpointOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetWebhookEndpointsWebhookEndpointInput,
  GetWebhookEndpointsWebhookEndpointOutput,
} from "../webhookEndpoints.js";
import {
  GetWebhookEndpointsWebhookEndpointOperation,
  PostWebhookEndpointsInput,
  PostWebhookEndpointsOperation,
  type PostWebhookEndpointsOutput,
  PostWebhookEndpointsWebhookEndpointInput,
  PostWebhookEndpointsWebhookEndpointOperation,
  type PostWebhookEndpointsWebhookEndpointOutput,
} from "../webhookEndpoints.js";

/**
 * The projectStripeWebhookEndpointOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeWebhookEndpointOutputs(
  state: Pick<PostWebhookEndpointsOutput, "id" | "secret">,
  previous?: StripeWebhookEndpointOutputs,
): StripeWebhookEndpointOutputs {
  const webhookSigningSecret = state.secret ?? previous?.WebhookSigningSecret;

  const outputs: StripeWebhookEndpointOutputs = Option.match(
    Option.fromNullishOr(webhookSigningSecret),
    {
      onNone: () => ({
        WebhookEndpointId: state.id,
      }),
      onSome: (webhookSigningSecretValue) => ({
        WebhookEndpointId: state.id,
        WebhookSigningSecret: webhookSigningSecretValue,
      }),
    },
  );

  return outputs;
}

/**
 * The bindStripeWebhookEndpointReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeWebhookEndpointReadInput(
  outputs: StripeWebhookEndpointOutputs,
): GetWebhookEndpointsWebhookEndpointInput {
  const input: GetWebhookEndpointsWebhookEndpointInput = {
    webhook_endpoint: outputs.WebhookEndpointId,
  };

  return input;
}

/**
 * The StripeWebhookEndpointResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeWebhookEndpointResourceClient extends Context.Service<StripeWebhookEndpointResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/WebhookEndpoint/StripeWebhookEndpointResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeWebhookEndpoint.create")(function* (
        props: StripeWebhookEndpointRequestProps,
      ) {
        const input: PostWebhookEndpointsInput =
          yield* Schema.decodeUnknownEffect(PostWebhookEndpointsInput)(props);
        const created: PostWebhookEndpointsOutput = yield* client.invoke(
          PostWebhookEndpointsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeWebhookEndpoint.read")(function* (
        outputs: StripeWebhookEndpointOutputs,
      ) {
        const input: GetWebhookEndpointsWebhookEndpointInput =
          bindStripeWebhookEndpointReadInput(outputs);
        const observed: GetWebhookEndpointsWebhookEndpointOutput =
          yield* client.invoke(
            GetWebhookEndpointsWebhookEndpointOperation,
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
      const update = Effect.fn("StripeWebhookEndpoint.update")(function* (
        outputs: StripeWebhookEndpointOutputs,
        changes: Omit<
          PostWebhookEndpointsWebhookEndpointInput,
          "webhook_endpoint"
        >,
      ) {
        const input: PostWebhookEndpointsWebhookEndpointInput =
          yield* Schema.decodeEffect(PostWebhookEndpointsWebhookEndpointInput)({
            ...changes,
            webhook_endpoint: outputs.WebhookEndpointId,
          });
        const changed: PostWebhookEndpointsWebhookEndpointOutput =
          yield* client.invoke(
            PostWebhookEndpointsWebhookEndpointOperation,
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

export const stripeWebhookEndpointResourceClientLayer = Layer.effect(
  StripeWebhookEndpointResourceClient,
  StripeWebhookEndpointResourceClient.make,
);
export const StripeWebhookEndpointResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("webhook-endpoint"),
});

/**
 * The StripeWebhookEndpointResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeWebhookEndpointResource<
  Props = StripeWebhookEndpointDeclarationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "webhook-endpoint";
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
        resource: "webhook-endpoint",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get WebhookEndpointId(): Required<StripeWebhookEndpointOutputs>["WebhookEndpointId"] {
    const value: Required<StripeWebhookEndpointOutputs>["WebhookEndpointId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "WebhookEndpointId",
        StripeWebhookEndpointOutputsSchema.fields.WebhookEndpointId,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get WebhookSigningSecret(): Required<StripeWebhookEndpointOutputs>["WebhookSigningSecret"] {
    const value: Required<StripeWebhookEndpointOutputs>["WebhookSigningSecret"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "WebhookSigningSecret",
        Schema.requiredKey(
          StripeWebhookEndpointOutputsSchema.fields.WebhookSigningSecret,
        ),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeWebhookEndpointDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeWebhookEndpointResource<Props> {
  const resource: StripeWebhookEndpointResource<Props> =
    new StripeWebhookEndpointResource<Props>(key, props, binding);

  return resource;
}
