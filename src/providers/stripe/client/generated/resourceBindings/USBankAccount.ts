import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2CoreVaultUsBankAccountsIdInput,
  GetV2CoreVaultUsBankAccountsIdOutput,
} from "../coreVaultUsBankAccounts.js";
import {
  GetV2CoreVaultUsBankAccountsIdOperation,
  PostV2CoreVaultUsBankAccountsIdInput,
  PostV2CoreVaultUsBankAccountsIdOperation,
  type PostV2CoreVaultUsBankAccountsIdOutput,
  PostV2CoreVaultUsBankAccountsInput,
  PostV2CoreVaultUsBankAccountsOperation,
  type PostV2CoreVaultUsBankAccountsOutput,
} from "../coreVaultUsBankAccounts.js";
import type { StripeUSBankAccountPropsEntity } from "../resourceInputs/StripeUSBankAccountPropsEntitySchema.js";
import type { StripeUSBankAccountProps } from "../resourceInputs/StripeUSBankAccountPropsSchema.js";
import {
  type StripeUSBankAccountOutputs,
  StripeUSBankAccountOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeUSBankAccountOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeUSBankAccountOutputs(
  state: Pick<PostV2CoreVaultUsBankAccountsOutput, "id">,
): StripeUSBankAccountOutputs {
  const outputs: StripeUSBankAccountOutputs = {
    USBankAccountId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeUSBankAccountReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeUSBankAccountReadInput(
  outputs: StripeUSBankAccountOutputs,
): GetV2CoreVaultUsBankAccountsIdInput {
  const input: GetV2CoreVaultUsBankAccountsIdInput = {
    id: outputs.USBankAccountId,
  };

  return input;
}

/**
 * The StripeUSBankAccountResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeUSBankAccountResourceClient extends Context.Service<StripeUSBankAccountResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/USBankAccount/StripeUSBankAccountResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeUSBankAccount.create")(function* (
        props: StripeUSBankAccountProps,
      ) {
        const input: PostV2CoreVaultUsBankAccountsInput =
          yield* Schema.decodeUnknownEffect(PostV2CoreVaultUsBankAccountsInput)(
            props,
          );
        const created: PostV2CoreVaultUsBankAccountsOutput =
          yield* client.invoke(PostV2CoreVaultUsBankAccountsOperation, input);
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeUSBankAccount.read")(function* (
        outputs: StripeUSBankAccountOutputs,
      ) {
        const input: GetV2CoreVaultUsBankAccountsIdInput =
          bindStripeUSBankAccountReadInput(outputs);
        const observed: GetV2CoreVaultUsBankAccountsIdOutput =
          yield* client.invoke(GetV2CoreVaultUsBankAccountsIdOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeUSBankAccount.update")(function* (
        outputs: StripeUSBankAccountOutputs,
        changes: Omit<PostV2CoreVaultUsBankAccountsIdInput, "id">,
      ) {
        const input: PostV2CoreVaultUsBankAccountsIdInput =
          yield* Schema.decodeEffect(PostV2CoreVaultUsBankAccountsIdInput)({
            ...changes,
            id: outputs.USBankAccountId,
          });
        const changed: PostV2CoreVaultUsBankAccountsIdOutput =
          yield* client.invoke(PostV2CoreVaultUsBankAccountsIdOperation, input);
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

export const stripeUSBankAccountResourceClientLayer = Layer.effect(
  StripeUSBankAccountResourceClient,
  StripeUSBankAccountResourceClient.make,
);
export const StripeUSBankAccountResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("core"),
  resource: Schema.Literal("usbank-account"),
});

/**
 * The StripeUSBankAccountResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeUSBankAccountResource<
  Props = StripeUSBankAccountPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "core";
  readonly resource: "usbank-account";
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
        service: "core",
        resource: "usbank-account",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get USBankAccountId(): Required<StripeUSBankAccountOutputs>["USBankAccountId"] {
    const value: Required<StripeUSBankAccountOutputs>["USBankAccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "USBankAccountId",
        StripeUSBankAccountOutputsSchema.fields.USBankAccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeUSBankAccountDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeUSBankAccountResource<Props> {
  const resource: StripeUSBankAccountResource<Props> =
    new StripeUSBankAccountResource<Props>(key, props, binding);

  return resource;
}
