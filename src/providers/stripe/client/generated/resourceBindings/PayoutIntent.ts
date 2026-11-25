import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2MoneyManagementPayoutIntentsIdInput,
  GetV2MoneyManagementPayoutIntentsIdOutput,
} from "../moneyManagementPayoutIntents.js";
import {
  GetV2MoneyManagementPayoutIntentsIdOperation,
  PostV2MoneyManagementPayoutIntentsIdInput,
  PostV2MoneyManagementPayoutIntentsIdOperation,
  type PostV2MoneyManagementPayoutIntentsIdOutput,
  PostV2MoneyManagementPayoutIntentsInput,
  PostV2MoneyManagementPayoutIntentsOperation,
  type PostV2MoneyManagementPayoutIntentsOutput,
} from "../moneyManagementPayoutIntents.js";
import type { StripePayoutIntentPropsEntity } from "../resourceInputs/StripePayoutIntentPropsEntitySchema.js";
import type { StripePayoutIntentProps } from "../resourceInputs/StripePayoutIntentPropsSchema.js";
import {
  type StripePayoutIntentOutputs,
  StripePayoutIntentOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePayoutIntentOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePayoutIntentOutputs(
  state: Pick<PostV2MoneyManagementPayoutIntentsOutput, "id">,
): StripePayoutIntentOutputs {
  const outputs: StripePayoutIntentOutputs = {
    PayoutIntentId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePayoutIntentReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePayoutIntentReadInput(
  outputs: StripePayoutIntentOutputs,
): GetV2MoneyManagementPayoutIntentsIdInput {
  const input: GetV2MoneyManagementPayoutIntentsIdInput = {
    id: outputs.PayoutIntentId,
  };

  return input;
}

/**
 * The StripePayoutIntentResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePayoutIntentResourceClient extends Context.Service<StripePayoutIntentResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/PayoutIntent/StripePayoutIntentResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePayoutIntent.create")(function* (
        props: StripePayoutIntentProps,
      ) {
        const input: PostV2MoneyManagementPayoutIntentsInput =
          yield* Schema.decodeUnknownEffect(
            PostV2MoneyManagementPayoutIntentsInput,
          )(props);
        const created: PostV2MoneyManagementPayoutIntentsOutput =
          yield* client.invoke(
            PostV2MoneyManagementPayoutIntentsOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePayoutIntent.read")(function* (
        outputs: StripePayoutIntentOutputs,
      ) {
        const input: GetV2MoneyManagementPayoutIntentsIdInput =
          bindStripePayoutIntentReadInput(outputs);
        const observed: GetV2MoneyManagementPayoutIntentsIdOutput =
          yield* client.invoke(
            GetV2MoneyManagementPayoutIntentsIdOperation,
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
      const update = Effect.fn("StripePayoutIntent.update")(function* (
        outputs: StripePayoutIntentOutputs,
        changes: Omit<PostV2MoneyManagementPayoutIntentsIdInput, "id">,
      ) {
        const input: PostV2MoneyManagementPayoutIntentsIdInput =
          yield* Schema.decodeEffect(PostV2MoneyManagementPayoutIntentsIdInput)(
            {
              ...changes,
              id: outputs.PayoutIntentId,
            },
          );
        const changed: PostV2MoneyManagementPayoutIntentsIdOutput =
          yield* client.invoke(
            PostV2MoneyManagementPayoutIntentsIdOperation,
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

export const stripePayoutIntentResourceClientLayer = Layer.effect(
  StripePayoutIntentResourceClient,
  StripePayoutIntentResourceClient.make,
);
export const StripePayoutIntentResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("money_management"),
  resource: Schema.Literal("payout-intent"),
});

/**
 * The StripePayoutIntentResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePayoutIntentResource<
  Props = StripePayoutIntentPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "money_management";
  readonly resource: "payout-intent";
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
        service: "money_management",
        resource: "payout-intent",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PayoutIntentId(): Required<StripePayoutIntentOutputs>["PayoutIntentId"] {
    const value: Required<StripePayoutIntentOutputs>["PayoutIntentId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PayoutIntentId",
        StripePayoutIntentOutputsSchema.fields.PayoutIntentId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePayoutIntentDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePayoutIntentResource<Props> {
  const resource: StripePayoutIntentResource<Props> =
    new StripePayoutIntentResource<Props>(key, props, binding);

  return resource;
}
