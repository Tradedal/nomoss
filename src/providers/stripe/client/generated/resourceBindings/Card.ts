import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeCardPropsEntity } from "../resourceInputs/StripeCardPropsEntitySchema.js";
import type { StripeCardProps } from "../resourceInputs/StripeCardPropsSchema.js";
import {
  type StripeCardOutputs,
  StripeCardOutputsSchema,
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
 * The projectStripeCardOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 * StripeResourcePolicy supplies identity fields from creation parameters
 * before ResourceModel validates the complete saved outputs.
 */
export function projectStripeCardOutputs(
  state: Pick<PostAccountsAccountExternalAccountsOutput, "id">,
): Omit<StripeCardOutputs, "AccountId"> {
  const outputs: Omit<StripeCardOutputs, "AccountId"> = {
    CardId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeCardReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeCardReadInput(
  outputs: StripeCardOutputs,
): GetAccountsAccountExternalAccountsIdInput {
  const input: GetAccountsAccountExternalAccountsIdInput = {
    id: outputs.CardId,
    account: outputs.AccountId,
  };

  return input;
}

/**
 * The StripeCardResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeCardResourceClient extends Context.Service<StripeCardResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Card/StripeCardResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeCard.create")(function* (
        props: StripeCardProps,
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
      const read = Effect.fn("StripeCard.read")(function* (
        outputs: StripeCardOutputs,
      ) {
        const input: GetAccountsAccountExternalAccountsIdInput =
          bindStripeCardReadInput(outputs);
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
      const update = Effect.fn("StripeCard.update")(function* (
        outputs: StripeCardOutputs,
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
            id: outputs.CardId,
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

export const stripeCardResourceClientLayer = Layer.effect(
  StripeCardResourceClient,
  StripeCardResourceClient.make,
);
export const StripeCardResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("card"),
});

/**
 * The StripeCardResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeCardResource<
  Props = StripeCardPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "card";
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
        resource: "card",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get CardId(): Required<StripeCardOutputs>["CardId"] {
    const value: Required<StripeCardOutputs>["CardId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "CardId",
        StripeCardOutputsSchema.fields.CardId,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get AccountId(): Required<StripeCardOutputs>["AccountId"] {
    const value: Required<StripeCardOutputs>["AccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "AccountId",
        StripeCardOutputsSchema.fields.AccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeCardDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeCardResource<Props> {
  const resource: StripeCardResource<Props> = new StripeCardResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
