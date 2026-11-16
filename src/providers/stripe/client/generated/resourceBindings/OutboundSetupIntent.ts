import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2MoneyManagementOutboundSetupIntentsIdInput,
  GetV2MoneyManagementOutboundSetupIntentsIdOutput,
} from "../moneyManagementOutboundSetupIntents.js";
import {
  GetV2MoneyManagementOutboundSetupIntentsIdOperation,
  PostV2MoneyManagementOutboundSetupIntentsIdInput,
  PostV2MoneyManagementOutboundSetupIntentsIdOperation,
  type PostV2MoneyManagementOutboundSetupIntentsIdOutput,
  PostV2MoneyManagementOutboundSetupIntentsInput,
  PostV2MoneyManagementOutboundSetupIntentsOperation,
  type PostV2MoneyManagementOutboundSetupIntentsOutput,
} from "../moneyManagementOutboundSetupIntents.js";
import type { StripeOutboundSetupIntentPropsEntity } from "../resourceInputs/StripeOutboundSetupIntentPropsEntitySchema.js";
import type { StripeOutboundSetupIntentProps } from "../resourceInputs/StripeOutboundSetupIntentPropsSchema.js";
import {
  type StripeOutboundSetupIntentOutputs,
  StripeOutboundSetupIntentOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeOutboundSetupIntentOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeOutboundSetupIntentOutputs(
  state: Pick<PostV2MoneyManagementOutboundSetupIntentsOutput, "id">,
): StripeOutboundSetupIntentOutputs {
  const outputs: StripeOutboundSetupIntentOutputs = {
    OutboundSetupIntentId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeOutboundSetupIntentReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeOutboundSetupIntentReadInput(
  outputs: StripeOutboundSetupIntentOutputs,
): GetV2MoneyManagementOutboundSetupIntentsIdInput {
  const input: GetV2MoneyManagementOutboundSetupIntentsIdInput = {
    id: outputs.OutboundSetupIntentId,
  };

  return input;
}

/**
 * The StripeOutboundSetupIntentResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeOutboundSetupIntentResourceClient extends Context.Service<StripeOutboundSetupIntentResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/OutboundSetupIntent/StripeOutboundSetupIntentResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeOutboundSetupIntent.create")(function* (
        props: StripeOutboundSetupIntentProps,
      ) {
        const input: PostV2MoneyManagementOutboundSetupIntentsInput =
          yield* Schema.decodeUnknownEffect(
            PostV2MoneyManagementOutboundSetupIntentsInput,
          )(props);
        const created: PostV2MoneyManagementOutboundSetupIntentsOutput =
          yield* client.invoke(
            PostV2MoneyManagementOutboundSetupIntentsOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeOutboundSetupIntent.read")(function* (
        outputs: StripeOutboundSetupIntentOutputs,
      ) {
        const input: GetV2MoneyManagementOutboundSetupIntentsIdInput =
          bindStripeOutboundSetupIntentReadInput(outputs);
        const observed: GetV2MoneyManagementOutboundSetupIntentsIdOutput =
          yield* client.invoke(
            GetV2MoneyManagementOutboundSetupIntentsIdOperation,
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
      const update = Effect.fn("StripeOutboundSetupIntent.update")(function* (
        outputs: StripeOutboundSetupIntentOutputs,
        changes: Omit<PostV2MoneyManagementOutboundSetupIntentsIdInput, "id">,
      ) {
        const input: PostV2MoneyManagementOutboundSetupIntentsIdInput =
          yield* Schema.decodeEffect(
            PostV2MoneyManagementOutboundSetupIntentsIdInput,
          )({
            ...changes,
            id: outputs.OutboundSetupIntentId,
          });
        const changed: PostV2MoneyManagementOutboundSetupIntentsIdOutput =
          yield* client.invoke(
            PostV2MoneyManagementOutboundSetupIntentsIdOperation,
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

export const stripeOutboundSetupIntentResourceClientLayer = Layer.effect(
  StripeOutboundSetupIntentResourceClient,
  StripeOutboundSetupIntentResourceClient.make,
);
export const StripeOutboundSetupIntentResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("money_management"),
  resource: Schema.Literal("outbound-setup-intent"),
});

/**
 * The StripeOutboundSetupIntentResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeOutboundSetupIntentResource<
  Props = StripeOutboundSetupIntentPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "money_management";
  readonly resource: "outbound-setup-intent";
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
        resource: "outbound-setup-intent",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get OutboundSetupIntentId(): Required<StripeOutboundSetupIntentOutputs>["OutboundSetupIntentId"] {
    const value: Required<StripeOutboundSetupIntentOutputs>["OutboundSetupIntentId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "OutboundSetupIntentId",
        StripeOutboundSetupIntentOutputsSchema.fields.OutboundSetupIntentId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeOutboundSetupIntentDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeOutboundSetupIntentResource<Props> {
  const resource: StripeOutboundSetupIntentResource<Props> =
    new StripeOutboundSetupIntentResource<Props>(key, props, binding);

  return resource;
}
