import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTokenPropsEntity } from "../resourceInputs/StripeTokenPropsEntitySchema.js";
import type { StripeTokenProps } from "../resourceInputs/StripeTokenPropsSchema.js";
import {
  type StripeTokenOutputs,
  StripeTokenOutputsSchema,
} from "../resourceOutputs.js";
import type { GetTokensTokenInput, GetTokensTokenOutput } from "../tokens.js";
import {
  GetTokensTokenOperation,
  PostTokensInput,
  PostTokensOperation,
  type PostTokensOutput,
} from "../tokens.js";

/**
 * The projectStripeTokenOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTokenOutputs(
  state: Pick<PostTokensOutput, "id">,
): StripeTokenOutputs {
  const outputs: StripeTokenOutputs = {
    TokenId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTokenReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTokenReadInput(
  outputs: StripeTokenOutputs,
): GetTokensTokenInput {
  const input: GetTokensTokenInput = {
    token: outputs.TokenId,
  };

  return input;
}

/**
 * The StripeTokenResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTokenResourceClient extends Context.Service<StripeTokenResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Token/StripeTokenResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeToken.create")(function* (
        props: StripeTokenProps,
      ) {
        const input: PostTokensInput =
          yield* Schema.decodeUnknownEffect(PostTokensInput)(props);
        const created: PostTokensOutput = yield* client.invoke(
          PostTokensOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeToken.read")(function* (
        outputs: StripeTokenOutputs,
      ) {
        const input: GetTokensTokenInput = bindStripeTokenReadInput(outputs);
        const observed: GetTokensTokenOutput = yield* client.invoke(
          GetTokensTokenOperation,
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

export const stripeTokenResourceClientLayer = Layer.effect(
  StripeTokenResourceClient,
  StripeTokenResourceClient.make,
);
export const StripeTokenResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("token"),
});

/**
 * The StripeTokenResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTokenResource<
  Props = StripeTokenPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "token";
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
        resource: "token",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TokenId(): Required<StripeTokenOutputs>["TokenId"] {
    const value: Required<StripeTokenOutputs>["TokenId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TokenId",
        StripeTokenOutputsSchema.fields.TokenId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTokenDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTokenResource<Props> {
  const resource: StripeTokenResource<Props> = new StripeTokenResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
