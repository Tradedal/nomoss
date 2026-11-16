import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTreasuryFinancialAccountPropsEntity } from "../resourceInputs/StripeTreasuryFinancialAccountPropsEntitySchema.js";
import type { StripeTreasuryFinancialAccountProps } from "../resourceInputs/StripeTreasuryFinancialAccountPropsSchema.js";
import {
  type StripeTreasuryFinancialAccountOutputs,
  StripeTreasuryFinancialAccountOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTreasuryFinancialAccountsFinancialAccountInput,
  GetTreasuryFinancialAccountsFinancialAccountOutput,
} from "../treasuryFinancialAccounts.js";
import {
  GetTreasuryFinancialAccountsFinancialAccountOperation,
  PostTreasuryFinancialAccountsFinancialAccountInput,
  PostTreasuryFinancialAccountsFinancialAccountOperation,
  type PostTreasuryFinancialAccountsFinancialAccountOutput,
  PostTreasuryFinancialAccountsInput,
  PostTreasuryFinancialAccountsOperation,
  type PostTreasuryFinancialAccountsOutput,
} from "../treasuryFinancialAccounts.js";

/**
 * The projectStripeTreasuryFinancialAccountOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTreasuryFinancialAccountOutputs(
  state: Pick<PostTreasuryFinancialAccountsOutput, "id">,
): StripeTreasuryFinancialAccountOutputs {
  const outputs: StripeTreasuryFinancialAccountOutputs = {
    TreasuryFinancialAccountId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTreasuryFinancialAccountReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTreasuryFinancialAccountReadInput(
  outputs: StripeTreasuryFinancialAccountOutputs,
): GetTreasuryFinancialAccountsFinancialAccountInput {
  const input: GetTreasuryFinancialAccountsFinancialAccountInput = {
    financial_account: outputs.TreasuryFinancialAccountId,
  };

  return input;
}

/**
 * The StripeTreasuryFinancialAccountResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTreasuryFinancialAccountResourceClient extends Context.Service<StripeTreasuryFinancialAccountResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TreasuryFinancialAccount/StripeTreasuryFinancialAccountResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTreasuryFinancialAccount.create")(
        function* (props: StripeTreasuryFinancialAccountProps) {
          const input: PostTreasuryFinancialAccountsInput =
            yield* Schema.decodeUnknownEffect(
              PostTreasuryFinancialAccountsInput,
            )(props);
          const created: PostTreasuryFinancialAccountsOutput =
            yield* client.invoke(PostTreasuryFinancialAccountsOperation, input);
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTreasuryFinancialAccount.read")(function* (
        outputs: StripeTreasuryFinancialAccountOutputs,
      ) {
        const input: GetTreasuryFinancialAccountsFinancialAccountInput =
          bindStripeTreasuryFinancialAccountReadInput(outputs);
        const observed: GetTreasuryFinancialAccountsFinancialAccountOutput =
          yield* client.invoke(
            GetTreasuryFinancialAccountsFinancialAccountOperation,
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
      const update = Effect.fn("StripeTreasuryFinancialAccount.update")(
        function* (
          outputs: StripeTreasuryFinancialAccountOutputs,
          changes: Omit<
            PostTreasuryFinancialAccountsFinancialAccountInput,
            "financial_account"
          >,
        ) {
          const input: PostTreasuryFinancialAccountsFinancialAccountInput =
            yield* Schema.decodeEffect(
              PostTreasuryFinancialAccountsFinancialAccountInput,
            )({
              ...changes,
              financial_account: outputs.TreasuryFinancialAccountId,
            });
          const changed: PostTreasuryFinancialAccountsFinancialAccountOutput =
            yield* client.invoke(
              PostTreasuryFinancialAccountsFinancialAccountOperation,
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

export const stripeTreasuryFinancialAccountResourceClientLayer = Layer.effect(
  StripeTreasuryFinancialAccountResourceClient,
  StripeTreasuryFinancialAccountResourceClient.make,
);
export const StripeTreasuryFinancialAccountResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("treasury-financial-account"),
});

/**
 * The StripeTreasuryFinancialAccountResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTreasuryFinancialAccountResource<
  Props = StripeTreasuryFinancialAccountPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "treasury-financial-account";
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
        resource: "treasury-financial-account",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TreasuryFinancialAccountId(): Required<StripeTreasuryFinancialAccountOutputs>["TreasuryFinancialAccountId"] {
    const value: Required<StripeTreasuryFinancialAccountOutputs>["TreasuryFinancialAccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TreasuryFinancialAccountId",
        StripeTreasuryFinancialAccountOutputsSchema.fields
          .TreasuryFinancialAccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTreasuryFinancialAccountDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTreasuryFinancialAccountResource<Props> {
  const resource: StripeTreasuryFinancialAccountResource<Props> =
    new StripeTreasuryFinancialAccountResource<Props>(key, props, binding);

  return resource;
}
