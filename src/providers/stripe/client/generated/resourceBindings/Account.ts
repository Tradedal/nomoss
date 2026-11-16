import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2CoreAccountsIdInput,
  GetV2CoreAccountsIdOutput,
} from "../accounts.js";
import {
  GetV2CoreAccountsIdOperation,
  PostV2CoreAccountsIdInput,
  PostV2CoreAccountsIdOperation,
  type PostV2CoreAccountsIdOutput,
  PostV2CoreAccountsInput,
  PostV2CoreAccountsOperation,
  type PostV2CoreAccountsOutput,
} from "../accounts.js";
import type { StripeAccountPropsEntity } from "../resourceInputs/StripeAccountPropsEntitySchema.js";
import type { StripeAccountProps } from "../resourceInputs/StripeAccountPropsSchema.js";
import {
  type StripeAccountOutputs,
  StripeAccountOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeAccountOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeAccountOutputs(
  state: Pick<PostV2CoreAccountsOutput, "id">,
): StripeAccountOutputs {
  const outputs: StripeAccountOutputs = {
    AccountId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeAccountReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeAccountReadInput(
  outputs: StripeAccountOutputs,
): GetV2CoreAccountsIdInput {
  const input: GetV2CoreAccountsIdInput = {
    id: outputs.AccountId,
  };

  return input;
}

/**
 * The StripeAccountResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeAccountResourceClient extends Context.Service<StripeAccountResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Account/StripeAccountResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeAccount.create")(function* (
        props: StripeAccountProps,
      ) {
        const input: PostV2CoreAccountsInput =
          yield* Schema.decodeUnknownEffect(PostV2CoreAccountsInput)(props);
        const created: PostV2CoreAccountsOutput = yield* client.invoke(
          PostV2CoreAccountsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeAccount.read")(function* (
        outputs: StripeAccountOutputs,
      ) {
        const input: GetV2CoreAccountsIdInput =
          bindStripeAccountReadInput(outputs);
        const observed: GetV2CoreAccountsIdOutput = yield* client.invoke(
          GetV2CoreAccountsIdOperation,
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
      const update = Effect.fn("StripeAccount.update")(function* (
        outputs: StripeAccountOutputs,
        changes: Omit<PostV2CoreAccountsIdInput, "id">,
      ) {
        const input: PostV2CoreAccountsIdInput = yield* Schema.decodeEffect(
          PostV2CoreAccountsIdInput,
        )({
          ...changes,
          id: outputs.AccountId,
        });
        const changed: PostV2CoreAccountsIdOutput = yield* client.invoke(
          PostV2CoreAccountsIdOperation,
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

export const stripeAccountResourceClientLayer = Layer.effect(
  StripeAccountResourceClient,
  StripeAccountResourceClient.make,
);
export const StripeAccountResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("core"),
  resource: Schema.Literal("account"),
});

/**
 * The StripeAccountResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeAccountResource<
  Props = StripeAccountPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "core";
  readonly resource: "account";
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
        resource: "account",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get AccountId(): Required<StripeAccountOutputs>["AccountId"] {
    const value: Required<StripeAccountOutputs>["AccountId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "AccountId",
        StripeAccountOutputsSchema.fields.AccountId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeAccountDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeAccountResource<Props> {
  const resource: StripeAccountResource<Props> =
    new StripeAccountResource<Props>(key, props, binding);

  return resource;
}
