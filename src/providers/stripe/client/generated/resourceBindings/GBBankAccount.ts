import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2CoreVaultGbBankAccountsIdInput,
  GetV2CoreVaultGbBankAccountsIdOutput,
} from "../coreVaultGbBankAccounts.js";
import {
  GetV2CoreVaultGbBankAccountsIdOperation,
  PostV2CoreVaultGbBankAccountsInput,
  PostV2CoreVaultGbBankAccountsOperation,
  type PostV2CoreVaultGbBankAccountsOutput,
} from "../coreVaultGbBankAccounts.js";
import type { StripeGBBankAccountPropsEntity } from "../resourceInputs/StripeGBBankAccountPropsEntitySchema.js";
import type { StripeGBBankAccountProps } from "../resourceInputs/StripeGBBankAccountPropsSchema.js";
import {
  type StripeGBBankAccountOutputs,
  StripeGBBankAccountOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeGBBankAccountOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeGBBankAccountOutputs(
  state: Pick<PostV2CoreVaultGbBankAccountsOutput, "id">,
): StripeGBBankAccountOutputs {
  const outputs: StripeGBBankAccountOutputs = {
    GBBankAccountId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeGBBankAccountReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeGBBankAccountReadInput(
  outputs: StripeGBBankAccountOutputs,
): GetV2CoreVaultGbBankAccountsIdInput {
  const input: GetV2CoreVaultGbBankAccountsIdInput = {
    id: outputs.GBBankAccountId,
  };

  return input;
}

/**
 * The StripeGBBankAccountResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeGBBankAccountResourceClient extends Context.Service<StripeGBBankAccountResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/GBBankAccount/StripeGBBankAccountResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeGBBankAccount.create")(function* (
        props: StripeGBBankAccountProps,
      ) {
        const input: PostV2CoreVaultGbBankAccountsInput =
          yield* Schema.decodeUnknownEffect(PostV2CoreVaultGbBankAccountsInput)(
            props,
          );
        const created: PostV2CoreVaultGbBankAccountsOutput =
          yield* client.invoke(PostV2CoreVaultGbBankAccountsOperation, input);
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeGBBankAccount.read")(function* (
        outputs: StripeGBBankAccountOutputs,
      ) {
        const input: GetV2CoreVaultGbBankAccountsIdInput =
          bindStripeGBBankAccountReadInput(outputs);
        const observed: GetV2CoreVaultGbBankAccountsIdOutput =
          yield* client.invoke(GetV2CoreVaultGbBankAccountsIdOperation, input);
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeGBBankAccountResourceClientLayer = Layer.effect(
  StripeGBBankAccountResourceClient,
  StripeGBBankAccountResourceClient.make,
);
export const StripeGBBankAccountResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("core"),
  resource: Schema.Literal("gbbank-account"),
});

/**
 * The StripeGBBankAccountResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeGBBankAccountResource<
  Props = StripeGBBankAccountPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "core";
  readonly resource: "gbbank-account";
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
        resource: "gbbank-account",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get GBBankAccountId(): Required<StripeGBBankAccountOutputs>["GBBankAccountId"] {
    const value: Required<StripeGBBankAccountOutputs>["GBBankAccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "GBBankAccountId",
        StripeGBBankAccountOutputsSchema.fields.GBBankAccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeGBBankAccountDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeGBBankAccountResource<Props> {
  const resource: StripeGBBankAccountResource<Props> =
    new StripeGBBankAccountResource<Props>(key, props, binding);

  return resource;
}
