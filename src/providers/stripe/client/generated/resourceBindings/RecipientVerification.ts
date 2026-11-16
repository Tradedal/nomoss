import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2MoneyManagementRecipientVerificationsIdInput,
  GetV2MoneyManagementRecipientVerificationsIdOutput,
} from "../moneyManagementRecipientVerifications.js";
import {
  GetV2MoneyManagementRecipientVerificationsIdOperation,
  PostV2MoneyManagementRecipientVerificationsInput,
  PostV2MoneyManagementRecipientVerificationsOperation,
  type PostV2MoneyManagementRecipientVerificationsOutput,
} from "../moneyManagementRecipientVerifications.js";
import type { StripeRecipientVerificationPropsEntity } from "../resourceInputs/StripeRecipientVerificationPropsEntitySchema.js";
import type { StripeRecipientVerificationProps } from "../resourceInputs/StripeRecipientVerificationPropsSchema.js";
import {
  type StripeRecipientVerificationOutputs,
  StripeRecipientVerificationOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeRecipientVerificationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeRecipientVerificationOutputs(
  state: Pick<PostV2MoneyManagementRecipientVerificationsOutput, "id">,
): StripeRecipientVerificationOutputs {
  const outputs: StripeRecipientVerificationOutputs = {
    RecipientVerificationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeRecipientVerificationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeRecipientVerificationReadInput(
  outputs: StripeRecipientVerificationOutputs,
): GetV2MoneyManagementRecipientVerificationsIdInput {
  const input: GetV2MoneyManagementRecipientVerificationsIdInput = {
    id: outputs.RecipientVerificationId,
  };

  return input;
}

/**
 * The StripeRecipientVerificationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeRecipientVerificationResourceClient extends Context.Service<StripeRecipientVerificationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/RecipientVerification/StripeRecipientVerificationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeRecipientVerification.create")(function* (
        props: StripeRecipientVerificationProps,
      ) {
        const input: PostV2MoneyManagementRecipientVerificationsInput =
          yield* Schema.decodeUnknownEffect(
            PostV2MoneyManagementRecipientVerificationsInput,
          )(props);
        const created: PostV2MoneyManagementRecipientVerificationsOutput =
          yield* client.invoke(
            PostV2MoneyManagementRecipientVerificationsOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeRecipientVerification.read")(function* (
        outputs: StripeRecipientVerificationOutputs,
      ) {
        const input: GetV2MoneyManagementRecipientVerificationsIdInput =
          bindStripeRecipientVerificationReadInput(outputs);
        const observed: GetV2MoneyManagementRecipientVerificationsIdOutput =
          yield* client.invoke(
            GetV2MoneyManagementRecipientVerificationsIdOperation,
            input,
          );
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeRecipientVerificationResourceClientLayer = Layer.effect(
  StripeRecipientVerificationResourceClient,
  StripeRecipientVerificationResourceClient.make,
);
export const StripeRecipientVerificationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("money_management"),
  resource: Schema.Literal("recipient-verification"),
});

/**
 * The StripeRecipientVerificationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeRecipientVerificationResource<
  Props = StripeRecipientVerificationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "money_management";
  readonly resource: "recipient-verification";
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
        resource: "recipient-verification",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RecipientVerificationId(): Required<StripeRecipientVerificationOutputs>["RecipientVerificationId"] {
    const value: Required<StripeRecipientVerificationOutputs>["RecipientVerificationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RecipientVerificationId",
        StripeRecipientVerificationOutputsSchema.fields.RecipientVerificationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeRecipientVerificationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeRecipientVerificationResource<Props> {
  const resource: StripeRecipientVerificationResource<Props> =
    new StripeRecipientVerificationResource<Props>(key, props, binding);

  return resource;
}
