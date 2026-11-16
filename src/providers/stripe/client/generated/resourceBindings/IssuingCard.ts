import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetIssuingCardsCardInput,
  GetIssuingCardsCardOutput,
} from "../issuingCards.js";
import {
  GetIssuingCardsCardOperation,
  PostIssuingCardsCardInput,
  PostIssuingCardsCardOperation,
  type PostIssuingCardsCardOutput,
  PostIssuingCardsInput,
  PostIssuingCardsOperation,
  type PostIssuingCardsOutput,
} from "../issuingCards.js";
import type { StripeIssuingCardPropsEntity } from "../resourceInputs/StripeIssuingCardPropsEntitySchema.js";
import type { StripeIssuingCardProps } from "../resourceInputs/StripeIssuingCardPropsSchema.js";
import {
  type StripeIssuingCardOutputs,
  StripeIssuingCardOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeIssuingCardOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeIssuingCardOutputs(
  state: Pick<PostIssuingCardsOutput, "id">,
): StripeIssuingCardOutputs {
  const outputs: StripeIssuingCardOutputs = {
    IssuingCardId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeIssuingCardReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeIssuingCardReadInput(
  outputs: StripeIssuingCardOutputs,
): GetIssuingCardsCardInput {
  const input: GetIssuingCardsCardInput = {
    card: outputs.IssuingCardId,
  };

  return input;
}

/**
 * The StripeIssuingCardResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeIssuingCardResourceClient extends Context.Service<StripeIssuingCardResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/IssuingCard/StripeIssuingCardResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeIssuingCard.create")(function* (
        props: StripeIssuingCardProps,
      ) {
        const input: PostIssuingCardsInput = yield* Schema.decodeUnknownEffect(
          PostIssuingCardsInput,
        )(props);
        const created: PostIssuingCardsOutput = yield* client.invoke(
          PostIssuingCardsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeIssuingCard.read")(function* (
        outputs: StripeIssuingCardOutputs,
      ) {
        const input: GetIssuingCardsCardInput =
          bindStripeIssuingCardReadInput(outputs);
        const observed: GetIssuingCardsCardOutput = yield* client.invoke(
          GetIssuingCardsCardOperation,
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
      const update = Effect.fn("StripeIssuingCard.update")(function* (
        outputs: StripeIssuingCardOutputs,
        changes: Omit<PostIssuingCardsCardInput, "card">,
      ) {
        const input: PostIssuingCardsCardInput = yield* Schema.decodeEffect(
          PostIssuingCardsCardInput,
        )({
          ...changes,
          card: outputs.IssuingCardId,
        });
        const changed: PostIssuingCardsCardOutput = yield* client.invoke(
          PostIssuingCardsCardOperation,
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

export const stripeIssuingCardResourceClientLayer = Layer.effect(
  StripeIssuingCardResourceClient,
  StripeIssuingCardResourceClient.make,
);
export const StripeIssuingCardResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("issuing-card"),
});

/**
 * The StripeIssuingCardResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeIssuingCardResource<
  Props = StripeIssuingCardPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "issuing-card";
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
        resource: "issuing-card",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IssuingCardId(): Required<StripeIssuingCardOutputs>["IssuingCardId"] {
    const value: Required<StripeIssuingCardOutputs>["IssuingCardId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IssuingCardId",
        StripeIssuingCardOutputsSchema.fields.IssuingCardId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeIssuingCardDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeIssuingCardResource<Props> {
  const resource: StripeIssuingCardResource<Props> =
    new StripeIssuingCardResource<Props>(key, props, binding);

  return resource;
}
