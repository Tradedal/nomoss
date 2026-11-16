import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2CoreAccountTokensIdInput,
  GetV2CoreAccountTokensIdOutput,
} from "../coreAccountTokens.js";
import {
  GetV2CoreAccountTokensIdOperation,
  PostV2CoreAccountTokensInput,
  PostV2CoreAccountTokensOperation,
  type PostV2CoreAccountTokensOutput,
} from "../coreAccountTokens.js";
import type { StripeAccountTokenPropsEntity } from "../resourceInputs/StripeAccountTokenPropsEntitySchema.js";
import type { StripeAccountTokenProps } from "../resourceInputs/StripeAccountTokenPropsSchema.js";
import {
  type StripeAccountTokenOutputs,
  StripeAccountTokenOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeAccountTokenOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeAccountTokenOutputs(
  state: Pick<PostV2CoreAccountTokensOutput, "id">,
): StripeAccountTokenOutputs {
  const outputs: StripeAccountTokenOutputs = {
    AccountTokenId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeAccountTokenReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeAccountTokenReadInput(
  outputs: StripeAccountTokenOutputs,
): GetV2CoreAccountTokensIdInput {
  const input: GetV2CoreAccountTokensIdInput = {
    id: outputs.AccountTokenId,
  };

  return input;
}

/**
 * The StripeAccountTokenResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeAccountTokenResourceClient extends Context.Service<StripeAccountTokenResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/AccountToken/StripeAccountTokenResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeAccountToken.create")(function* (
        props: StripeAccountTokenProps,
      ) {
        const input: PostV2CoreAccountTokensInput =
          yield* Schema.decodeUnknownEffect(PostV2CoreAccountTokensInput)(
            props,
          );
        const created: PostV2CoreAccountTokensOutput = yield* client.invoke(
          PostV2CoreAccountTokensOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeAccountToken.read")(function* (
        outputs: StripeAccountTokenOutputs,
      ) {
        const input: GetV2CoreAccountTokensIdInput =
          bindStripeAccountTokenReadInput(outputs);
        const observed: GetV2CoreAccountTokensIdOutput = yield* client.invoke(
          GetV2CoreAccountTokensIdOperation,
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

export const stripeAccountTokenResourceClientLayer = Layer.effect(
  StripeAccountTokenResourceClient,
  StripeAccountTokenResourceClient.make,
);
export const StripeAccountTokenResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("core"),
  resource: Schema.Literal("account-token"),
});

/**
 * The StripeAccountTokenResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeAccountTokenResource<
  Props = StripeAccountTokenPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "core";
  readonly resource: "account-token";
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
        resource: "account-token",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get AccountTokenId(): Required<StripeAccountTokenOutputs>["AccountTokenId"] {
    const value: Required<StripeAccountTokenOutputs>["AccountTokenId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "AccountTokenId",
        StripeAccountTokenOutputsSchema.fields.AccountTokenId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeAccountTokenDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeAccountTokenResource<Props> {
  const resource: StripeAccountTokenResource<Props> =
    new StripeAccountTokenResource<Props>(key, props, binding);

  return resource;
}
