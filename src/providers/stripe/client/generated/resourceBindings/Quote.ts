import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { GetQuotesQuoteInput, GetQuotesQuoteOutput } from "../quotes.js";
import {
  GetQuotesQuoteOperation,
  PostQuotesInput,
  PostQuotesOperation,
  type PostQuotesOutput,
  PostQuotesQuoteInput,
  PostQuotesQuoteOperation,
  type PostQuotesQuoteOutput,
} from "../quotes.js";
import type { StripeQuotePropsEntity } from "../resourceInputs/StripeQuotePropsEntitySchema.js";
import type { StripeQuoteProps } from "../resourceInputs/StripeQuotePropsSchema.js";
import {
  type StripeQuoteOutputs,
  StripeQuoteOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeQuoteOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeQuoteOutputs(
  state: Pick<PostQuotesOutput, "id">,
): StripeQuoteOutputs {
  const outputs: StripeQuoteOutputs = {
    QuoteId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeQuoteReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeQuoteReadInput(
  outputs: StripeQuoteOutputs,
): GetQuotesQuoteInput {
  const input: GetQuotesQuoteInput = {
    quote: outputs.QuoteId,
  };

  return input;
}

/**
 * The StripeQuoteResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeQuoteResourceClient extends Context.Service<StripeQuoteResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Quote/StripeQuoteResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeQuote.create")(function* (
        props: StripeQuoteProps,
      ) {
        const input: PostQuotesInput =
          yield* Schema.decodeUnknownEffect(PostQuotesInput)(props);
        const created: PostQuotesOutput = yield* client.invoke(
          PostQuotesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeQuote.read")(function* (
        outputs: StripeQuoteOutputs,
      ) {
        const input: GetQuotesQuoteInput = bindStripeQuoteReadInput(outputs);
        const observed: GetQuotesQuoteOutput = yield* client.invoke(
          GetQuotesQuoteOperation,
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
      const update = Effect.fn("StripeQuote.update")(function* (
        outputs: StripeQuoteOutputs,
        changes: Omit<PostQuotesQuoteInput, "quote">,
      ) {
        const input: PostQuotesQuoteInput = yield* Schema.decodeEffect(
          PostQuotesQuoteInput,
        )({
          ...changes,
          quote: outputs.QuoteId,
        });
        const changed: PostQuotesQuoteOutput = yield* client.invoke(
          PostQuotesQuoteOperation,
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

export const stripeQuoteResourceClientLayer = Layer.effect(
  StripeQuoteResourceClient,
  StripeQuoteResourceClient.make,
);
export const StripeQuoteResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("quote"),
});

/**
 * The StripeQuoteResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeQuoteResource<
  Props = StripeQuotePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "quote";
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
        resource: "quote",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get QuoteId(): Required<StripeQuoteOutputs>["QuoteId"] {
    const value: Required<StripeQuoteOutputs>["QuoteId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "QuoteId",
        StripeQuoteOutputsSchema.fields.QuoteId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeQuoteDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeQuoteResource<Props> {
  const resource: StripeQuoteResource<Props> = new StripeQuoteResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
