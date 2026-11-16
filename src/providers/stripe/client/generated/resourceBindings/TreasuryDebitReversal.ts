import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTreasuryDebitReversalPropsEntity } from "../resourceInputs/StripeTreasuryDebitReversalPropsEntitySchema.js";
import type { StripeTreasuryDebitReversalProps } from "../resourceInputs/StripeTreasuryDebitReversalPropsSchema.js";
import {
  type StripeTreasuryDebitReversalOutputs,
  StripeTreasuryDebitReversalOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTreasuryDebitReversalsDebitReversalInput,
  GetTreasuryDebitReversalsDebitReversalOutput,
} from "../treasuryDebitReversals.js";
import {
  GetTreasuryDebitReversalsDebitReversalOperation,
  PostTreasuryDebitReversalsInput,
  PostTreasuryDebitReversalsOperation,
  type PostTreasuryDebitReversalsOutput,
} from "../treasuryDebitReversals.js";

/**
 * The projectStripeTreasuryDebitReversalOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTreasuryDebitReversalOutputs(
  state: Pick<PostTreasuryDebitReversalsOutput, "id">,
): StripeTreasuryDebitReversalOutputs {
  const outputs: StripeTreasuryDebitReversalOutputs = {
    TreasuryDebitReversalId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTreasuryDebitReversalReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTreasuryDebitReversalReadInput(
  outputs: StripeTreasuryDebitReversalOutputs,
): GetTreasuryDebitReversalsDebitReversalInput {
  const input: GetTreasuryDebitReversalsDebitReversalInput = {
    debit_reversal: outputs.TreasuryDebitReversalId,
  };

  return input;
}

/**
 * The StripeTreasuryDebitReversalResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTreasuryDebitReversalResourceClient extends Context.Service<StripeTreasuryDebitReversalResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TreasuryDebitReversal/StripeTreasuryDebitReversalResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTreasuryDebitReversal.create")(function* (
        props: StripeTreasuryDebitReversalProps,
      ) {
        const input: PostTreasuryDebitReversalsInput =
          yield* Schema.decodeUnknownEffect(PostTreasuryDebitReversalsInput)(
            props,
          );
        const created: PostTreasuryDebitReversalsOutput = yield* client.invoke(
          PostTreasuryDebitReversalsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTreasuryDebitReversal.read")(function* (
        outputs: StripeTreasuryDebitReversalOutputs,
      ) {
        const input: GetTreasuryDebitReversalsDebitReversalInput =
          bindStripeTreasuryDebitReversalReadInput(outputs);
        const observed: GetTreasuryDebitReversalsDebitReversalOutput =
          yield* client.invoke(
            GetTreasuryDebitReversalsDebitReversalOperation,
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

export const stripeTreasuryDebitReversalResourceClientLayer = Layer.effect(
  StripeTreasuryDebitReversalResourceClient,
  StripeTreasuryDebitReversalResourceClient.make,
);
export const StripeTreasuryDebitReversalResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("treasury-debit-reversal"),
});

/**
 * The StripeTreasuryDebitReversalResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTreasuryDebitReversalResource<
  Props = StripeTreasuryDebitReversalPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "treasury-debit-reversal";
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
        resource: "treasury-debit-reversal",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TreasuryDebitReversalId(): Required<StripeTreasuryDebitReversalOutputs>["TreasuryDebitReversalId"] {
    const value: Required<StripeTreasuryDebitReversalOutputs>["TreasuryDebitReversalId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TreasuryDebitReversalId",
        StripeTreasuryDebitReversalOutputsSchema.fields.TreasuryDebitReversalId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTreasuryDebitReversalDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTreasuryDebitReversalResource<Props> {
  const resource: StripeTreasuryDebitReversalResource<Props> =
    new StripeTreasuryDebitReversalResource<Props>(key, props, binding);

  return resource;
}
