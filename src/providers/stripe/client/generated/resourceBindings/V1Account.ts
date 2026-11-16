import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeV1AccountPropsEntity } from "../resourceInputs/StripeV1AccountPropsEntitySchema.js";
import type { StripeV1AccountProps } from "../resourceInputs/StripeV1AccountPropsSchema.js";
import {
  type StripeV1AccountOutputs,
  StripeV1AccountOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetAccountsAccountInput,
  GetAccountsAccountOutput,
} from "../v1Accounts.js";
import {
  GetAccountsAccountOperation,
  PostAccountsAccountInput,
  PostAccountsAccountOperation,
  type PostAccountsAccountOutput,
  PostAccountsInput,
  PostAccountsOperation,
  type PostAccountsOutput,
} from "../v1Accounts.js";

/**
 * The projectStripeV1AccountOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeV1AccountOutputs(
  state: Pick<PostAccountsOutput, "id">,
): StripeV1AccountOutputs {
  const outputs: StripeV1AccountOutputs = {
    V1AccountId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeV1AccountReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeV1AccountReadInput(
  outputs: StripeV1AccountOutputs,
): GetAccountsAccountInput {
  const input: GetAccountsAccountInput = {
    account: outputs.V1AccountId,
  };

  return input;
}

/**
 * The StripeV1AccountResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeV1AccountResourceClient extends Context.Service<StripeV1AccountResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/V1Account/StripeV1AccountResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeV1Account.create")(function* (
        props: StripeV1AccountProps,
      ) {
        const input: PostAccountsInput =
          yield* Schema.decodeUnknownEffect(PostAccountsInput)(props);
        const created: PostAccountsOutput = yield* client.invoke(
          PostAccountsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeV1Account.read")(function* (
        outputs: StripeV1AccountOutputs,
      ) {
        const input: GetAccountsAccountInput =
          bindStripeV1AccountReadInput(outputs);
        const observed: GetAccountsAccountOutput = yield* client.invoke(
          GetAccountsAccountOperation,
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
      const update = Effect.fn("StripeV1Account.update")(function* (
        outputs: StripeV1AccountOutputs,
        changes: Omit<PostAccountsAccountInput, "account">,
      ) {
        const input: PostAccountsAccountInput = yield* Schema.decodeEffect(
          PostAccountsAccountInput,
        )({
          ...changes,
          account: outputs.V1AccountId,
        });
        const changed: PostAccountsAccountOutput = yield* client.invoke(
          PostAccountsAccountOperation,
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

export const stripeV1AccountResourceClientLayer = Layer.effect(
  StripeV1AccountResourceClient,
  StripeV1AccountResourceClient.make,
);
export const StripeV1AccountResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("v1-account"),
});

/**
 * The StripeV1AccountResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeV1AccountResource<
  Props = StripeV1AccountPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "v1-account";
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
        resource: "v1-account",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get V1AccountId(): Required<StripeV1AccountOutputs>["V1AccountId"] {
    const value: Required<StripeV1AccountOutputs>["V1AccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "V1AccountId",
        StripeV1AccountOutputsSchema.fields.V1AccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeV1AccountDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeV1AccountResource<Props> {
  const resource: StripeV1AccountResource<Props> =
    new StripeV1AccountResource<Props>(key, props, binding);

  return resource;
}
