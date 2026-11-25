import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeBankAccountPropsEntity } from "../resourceInputs/StripeBankAccountPropsEntitySchema.js";
import type { StripeBankAccountProps } from "../resourceInputs/StripeBankAccountPropsSchema.js";
import {
  type StripeBankAccountOutputs,
  StripeBankAccountOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetAccountsAccountExternalAccountsIdInput,
  GetAccountsAccountExternalAccountsIdOutput,
} from "../v1Accounts.js";
import {
  GetAccountsAccountExternalAccountsIdOperation,
  PostAccountsAccountExternalAccountsIdInput,
  PostAccountsAccountExternalAccountsIdOperation,
  type PostAccountsAccountExternalAccountsIdOutput,
  PostAccountsAccountExternalAccountsInput,
  PostAccountsAccountExternalAccountsOperation,
  type PostAccountsAccountExternalAccountsOutput,
} from "../v1Accounts.js";

/**
 * The projectStripeBankAccountOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 * StripeResourcePolicy supplies identity fields from creation parameters
 * before ResourceModel validates the complete saved outputs.
 */
export function projectStripeBankAccountOutputs(
  state: Pick<PostAccountsAccountExternalAccountsOutput, "id">,
): Omit<StripeBankAccountOutputs, "AccountId"> {
  const outputs: Omit<StripeBankAccountOutputs, "AccountId"> = {
    BankAccountId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeBankAccountReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeBankAccountReadInput(
  outputs: StripeBankAccountOutputs,
): GetAccountsAccountExternalAccountsIdInput {
  const input: GetAccountsAccountExternalAccountsIdInput = {
    id: outputs.BankAccountId,
    account: outputs.AccountId,
  };

  return input;
}

/**
 * The StripeBankAccountResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeBankAccountResourceClient extends Context.Service<StripeBankAccountResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/BankAccount/StripeBankAccountResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeBankAccount.create")(function* (
        props: StripeBankAccountProps,
      ) {
        const input: PostAccountsAccountExternalAccountsInput =
          yield* Schema.decodeUnknownEffect(
            PostAccountsAccountExternalAccountsInput,
          )(props);
        const created: PostAccountsAccountExternalAccountsOutput =
          yield* client.invoke(
            PostAccountsAccountExternalAccountsOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeBankAccount.read")(function* (
        outputs: StripeBankAccountOutputs,
      ) {
        const input: GetAccountsAccountExternalAccountsIdInput =
          bindStripeBankAccountReadInput(outputs);
        const observed: GetAccountsAccountExternalAccountsIdOutput =
          yield* client.invoke(
            GetAccountsAccountExternalAccountsIdOperation,
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
      const update = Effect.fn("StripeBankAccount.update")(function* (
        outputs: StripeBankAccountOutputs,
        changes: Omit<
          PostAccountsAccountExternalAccountsIdInput,
          "id" | "account"
        >,
      ) {
        const input: PostAccountsAccountExternalAccountsIdInput =
          yield* Schema.decodeEffect(
            PostAccountsAccountExternalAccountsIdInput,
          )({
            ...changes,
            id: outputs.BankAccountId,
            account: outputs.AccountId,
          });
        const changed: PostAccountsAccountExternalAccountsIdOutput =
          yield* client.invoke(
            PostAccountsAccountExternalAccountsIdOperation,
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

export const stripeBankAccountResourceClientLayer = Layer.effect(
  StripeBankAccountResourceClient,
  StripeBankAccountResourceClient.make,
);
export const StripeBankAccountResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("bank-account"),
});

/**
 * The StripeBankAccountResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeBankAccountResource<
  Props = StripeBankAccountPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "bank-account";
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
        resource: "bank-account",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get BankAccountId(): Required<StripeBankAccountOutputs>["BankAccountId"] {
    const value: Required<StripeBankAccountOutputs>["BankAccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "BankAccountId",
        StripeBankAccountOutputsSchema.fields.BankAccountId,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get AccountId(): Required<StripeBankAccountOutputs>["AccountId"] {
    const value: Required<StripeBankAccountOutputs>["AccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "AccountId",
        StripeBankAccountOutputsSchema.fields.AccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeBankAccountDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeBankAccountResource<Props> {
  const resource: StripeBankAccountResource<Props> =
    new StripeBankAccountResource<Props>(key, props, binding);

  return resource;
}
