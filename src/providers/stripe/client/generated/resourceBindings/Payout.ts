import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetPayoutsPayoutInput,
  GetPayoutsPayoutOutput,
} from "../payouts.js";
import {
  GetPayoutsPayoutOperation,
  PostPayoutsInput,
  PostPayoutsOperation,
  type PostPayoutsOutput,
  PostPayoutsPayoutInput,
  PostPayoutsPayoutOperation,
  type PostPayoutsPayoutOutput,
} from "../payouts.js";
import type { StripePayoutPropsEntity } from "../resourceInputs/StripePayoutPropsEntitySchema.js";
import type { StripePayoutProps } from "../resourceInputs/StripePayoutPropsSchema.js";
import {
  type StripePayoutOutputs,
  StripePayoutOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePayoutOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePayoutOutputs(
  state: Pick<PostPayoutsOutput, "id">,
): StripePayoutOutputs {
  const outputs: StripePayoutOutputs = {
    PayoutId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePayoutReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePayoutReadInput(
  outputs: StripePayoutOutputs,
): GetPayoutsPayoutInput {
  const input: GetPayoutsPayoutInput = {
    payout: outputs.PayoutId,
  };

  return input;
}

/**
 * The StripePayoutResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePayoutResourceClient extends Context.Service<StripePayoutResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Payout/StripePayoutResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePayout.create")(function* (
        props: StripePayoutProps,
      ) {
        const input: PostPayoutsInput =
          yield* Schema.decodeUnknownEffect(PostPayoutsInput)(props);
        const created: PostPayoutsOutput = yield* client.invoke(
          PostPayoutsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePayout.read")(function* (
        outputs: StripePayoutOutputs,
      ) {
        const input: GetPayoutsPayoutInput = bindStripePayoutReadInput(outputs);
        const observed: GetPayoutsPayoutOutput = yield* client.invoke(
          GetPayoutsPayoutOperation,
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
      const update = Effect.fn("StripePayout.update")(function* (
        outputs: StripePayoutOutputs,
        changes: Omit<PostPayoutsPayoutInput, "payout">,
      ) {
        const input: PostPayoutsPayoutInput = yield* Schema.decodeEffect(
          PostPayoutsPayoutInput,
        )({
          ...changes,
          payout: outputs.PayoutId,
        });
        const changed: PostPayoutsPayoutOutput = yield* client.invoke(
          PostPayoutsPayoutOperation,
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

export const stripePayoutResourceClientLayer = Layer.effect(
  StripePayoutResourceClient,
  StripePayoutResourceClient.make,
);
export const StripePayoutResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("payout"),
});

/**
 * The StripePayoutResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePayoutResource<
  Props = StripePayoutPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "payout";
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
        resource: "payout",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PayoutId(): Required<StripePayoutOutputs>["PayoutId"] {
    const value: Required<StripePayoutOutputs>["PayoutId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PayoutId",
        StripePayoutOutputsSchema.fields.PayoutId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePayoutDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePayoutResource<Props> {
  const resource: StripePayoutResource<Props> = new StripePayoutResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
