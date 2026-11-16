import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTreasuryCreditReversalPropsEntity } from "../resourceInputs/StripeTreasuryCreditReversalPropsEntitySchema.js";
import type { StripeTreasuryCreditReversalProps } from "../resourceInputs/StripeTreasuryCreditReversalPropsSchema.js";
import {
  type StripeTreasuryCreditReversalOutputs,
  StripeTreasuryCreditReversalOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTreasuryCreditReversalsCreditReversalInput,
  GetTreasuryCreditReversalsCreditReversalOutput,
} from "../treasuryCreditReversals.js";
import {
  GetTreasuryCreditReversalsCreditReversalOperation,
  PostTreasuryCreditReversalsInput,
  PostTreasuryCreditReversalsOperation,
  type PostTreasuryCreditReversalsOutput,
} from "../treasuryCreditReversals.js";

/**
 * The projectStripeTreasuryCreditReversalOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTreasuryCreditReversalOutputs(
  state: Pick<PostTreasuryCreditReversalsOutput, "id">,
): StripeTreasuryCreditReversalOutputs {
  const outputs: StripeTreasuryCreditReversalOutputs = {
    TreasuryCreditReversalId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTreasuryCreditReversalReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTreasuryCreditReversalReadInput(
  outputs: StripeTreasuryCreditReversalOutputs,
): GetTreasuryCreditReversalsCreditReversalInput {
  const input: GetTreasuryCreditReversalsCreditReversalInput = {
    credit_reversal: outputs.TreasuryCreditReversalId,
  };

  return input;
}

/**
 * The StripeTreasuryCreditReversalResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTreasuryCreditReversalResourceClient extends Context.Service<StripeTreasuryCreditReversalResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TreasuryCreditReversal/StripeTreasuryCreditReversalResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTreasuryCreditReversal.create")(
        function* (props: StripeTreasuryCreditReversalProps) {
          const input: PostTreasuryCreditReversalsInput =
            yield* Schema.decodeUnknownEffect(PostTreasuryCreditReversalsInput)(
              props,
            );
          const created: PostTreasuryCreditReversalsOutput =
            yield* client.invoke(PostTreasuryCreditReversalsOperation, input);
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTreasuryCreditReversal.read")(function* (
        outputs: StripeTreasuryCreditReversalOutputs,
      ) {
        const input: GetTreasuryCreditReversalsCreditReversalInput =
          bindStripeTreasuryCreditReversalReadInput(outputs);
        const observed: GetTreasuryCreditReversalsCreditReversalOutput =
          yield* client.invoke(
            GetTreasuryCreditReversalsCreditReversalOperation,
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

export const stripeTreasuryCreditReversalResourceClientLayer = Layer.effect(
  StripeTreasuryCreditReversalResourceClient,
  StripeTreasuryCreditReversalResourceClient.make,
);
export const StripeTreasuryCreditReversalResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("treasury-credit-reversal"),
});

/**
 * The StripeTreasuryCreditReversalResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTreasuryCreditReversalResource<
  Props = StripeTreasuryCreditReversalPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "treasury-credit-reversal";
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
        resource: "treasury-credit-reversal",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TreasuryCreditReversalId(): Required<StripeTreasuryCreditReversalOutputs>["TreasuryCreditReversalId"] {
    const value: Required<StripeTreasuryCreditReversalOutputs>["TreasuryCreditReversalId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TreasuryCreditReversalId",
        StripeTreasuryCreditReversalOutputsSchema.fields
          .TreasuryCreditReversalId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTreasuryCreditReversalDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTreasuryCreditReversalResource<Props> {
  const resource: StripeTreasuryCreditReversalResource<Props> =
    new StripeTreasuryCreditReversalResource<Props>(key, props, binding);

  return resource;
}
