import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetCheckoutSessionsSessionInput,
  GetCheckoutSessionsSessionOutput,
} from "../checkoutSessions.js";
import {
  GetCheckoutSessionsSessionOperation,
  PostCheckoutSessionsInput,
  PostCheckoutSessionsOperation,
  type PostCheckoutSessionsOutput,
  PostCheckoutSessionsSessionInput,
  PostCheckoutSessionsSessionOperation,
  type PostCheckoutSessionsSessionOutput,
} from "../checkoutSessions.js";
import type { StripeCheckoutSessionPropsEntity } from "../resourceInputs/StripeCheckoutSessionPropsEntitySchema.js";
import type { StripeCheckoutSessionProps } from "../resourceInputs/StripeCheckoutSessionPropsSchema.js";
import {
  type StripeCheckoutSessionOutputs,
  StripeCheckoutSessionOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeCheckoutSessionOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeCheckoutSessionOutputs(
  state: Pick<PostCheckoutSessionsOutput, "id">,
): StripeCheckoutSessionOutputs {
  const outputs: StripeCheckoutSessionOutputs = {
    CheckoutSessionId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeCheckoutSessionReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeCheckoutSessionReadInput(
  outputs: StripeCheckoutSessionOutputs,
): GetCheckoutSessionsSessionInput {
  const input: GetCheckoutSessionsSessionInput = {
    session: outputs.CheckoutSessionId,
  };

  return input;
}

/**
 * The StripeCheckoutSessionResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeCheckoutSessionResourceClient extends Context.Service<StripeCheckoutSessionResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/CheckoutSession/StripeCheckoutSessionResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeCheckoutSession.create")(function* (
        props: StripeCheckoutSessionProps,
      ) {
        const input: PostCheckoutSessionsInput =
          yield* Schema.decodeUnknownEffect(PostCheckoutSessionsInput)(props);
        const created: PostCheckoutSessionsOutput = yield* client.invoke(
          PostCheckoutSessionsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeCheckoutSession.read")(function* (
        outputs: StripeCheckoutSessionOutputs,
      ) {
        const input: GetCheckoutSessionsSessionInput =
          bindStripeCheckoutSessionReadInput(outputs);
        const observed: GetCheckoutSessionsSessionOutput = yield* client.invoke(
          GetCheckoutSessionsSessionOperation,
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
      const update = Effect.fn("StripeCheckoutSession.update")(function* (
        outputs: StripeCheckoutSessionOutputs,
        changes: Omit<PostCheckoutSessionsSessionInput, "session">,
      ) {
        const input: PostCheckoutSessionsSessionInput =
          yield* Schema.decodeEffect(PostCheckoutSessionsSessionInput)({
            ...changes,
            session: outputs.CheckoutSessionId,
          });
        const changed: PostCheckoutSessionsSessionOutput = yield* client.invoke(
          PostCheckoutSessionsSessionOperation,
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

export const stripeCheckoutSessionResourceClientLayer = Layer.effect(
  StripeCheckoutSessionResourceClient,
  StripeCheckoutSessionResourceClient.make,
);
export const StripeCheckoutSessionResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("checkout-session"),
});

/**
 * The StripeCheckoutSessionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeCheckoutSessionResource<
  Props = StripeCheckoutSessionPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "checkout-session";
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
        resource: "checkout-session",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get CheckoutSessionId(): Required<StripeCheckoutSessionOutputs>["CheckoutSessionId"] {
    const value: Required<StripeCheckoutSessionOutputs>["CheckoutSessionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "CheckoutSessionId",
        StripeCheckoutSessionOutputsSchema.fields.CheckoutSessionId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeCheckoutSessionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeCheckoutSessionResource<Props> {
  const resource: StripeCheckoutSessionResource<Props> =
    new StripeCheckoutSessionResource<Props>(key, props, binding);

  return resource;
}
