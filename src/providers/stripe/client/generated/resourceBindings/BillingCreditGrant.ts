import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetBillingCreditGrantsIdInput,
  GetBillingCreditGrantsIdOutput,
} from "../billingCreditGrants.js";
import {
  GetBillingCreditGrantsIdOperation,
  PostBillingCreditGrantsIdInput,
  PostBillingCreditGrantsIdOperation,
  type PostBillingCreditGrantsIdOutput,
  PostBillingCreditGrantsInput,
  PostBillingCreditGrantsOperation,
  type PostBillingCreditGrantsOutput,
} from "../billingCreditGrants.js";
import type { StripeBillingCreditGrantPropsEntity } from "../resourceInputs/StripeBillingCreditGrantPropsEntitySchema.js";
import type { StripeBillingCreditGrantProps } from "../resourceInputs/StripeBillingCreditGrantPropsSchema.js";
import {
  type StripeBillingCreditGrantOutputs,
  StripeBillingCreditGrantOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeBillingCreditGrantOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeBillingCreditGrantOutputs(
  state: Pick<PostBillingCreditGrantsOutput, "id">,
): StripeBillingCreditGrantOutputs {
  const outputs: StripeBillingCreditGrantOutputs = {
    BillingCreditGrantId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeBillingCreditGrantReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeBillingCreditGrantReadInput(
  outputs: StripeBillingCreditGrantOutputs,
): GetBillingCreditGrantsIdInput {
  const input: GetBillingCreditGrantsIdInput = {
    id: outputs.BillingCreditGrantId,
  };

  return input;
}

/**
 * The StripeBillingCreditGrantResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeBillingCreditGrantResourceClient extends Context.Service<StripeBillingCreditGrantResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/BillingCreditGrant/StripeBillingCreditGrantResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeBillingCreditGrant.create")(function* (
        props: StripeBillingCreditGrantProps,
      ) {
        const input: PostBillingCreditGrantsInput =
          yield* Schema.decodeUnknownEffect(PostBillingCreditGrantsInput)(
            props,
          );
        const created: PostBillingCreditGrantsOutput = yield* client.invoke(
          PostBillingCreditGrantsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeBillingCreditGrant.read")(function* (
        outputs: StripeBillingCreditGrantOutputs,
      ) {
        const input: GetBillingCreditGrantsIdInput =
          bindStripeBillingCreditGrantReadInput(outputs);
        const observed: GetBillingCreditGrantsIdOutput = yield* client.invoke(
          GetBillingCreditGrantsIdOperation,
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
      const update = Effect.fn("StripeBillingCreditGrant.update")(function* (
        outputs: StripeBillingCreditGrantOutputs,
        changes: Omit<PostBillingCreditGrantsIdInput, "id">,
      ) {
        const input: PostBillingCreditGrantsIdInput =
          yield* Schema.decodeEffect(PostBillingCreditGrantsIdInput)({
            ...changes,
            id: outputs.BillingCreditGrantId,
          });
        const changed: PostBillingCreditGrantsIdOutput = yield* client.invoke(
          PostBillingCreditGrantsIdOperation,
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

export const stripeBillingCreditGrantResourceClientLayer = Layer.effect(
  StripeBillingCreditGrantResourceClient,
  StripeBillingCreditGrantResourceClient.make,
);
export const StripeBillingCreditGrantResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("billing-credit-grant"),
});

/**
 * The StripeBillingCreditGrantResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeBillingCreditGrantResource<
  Props = StripeBillingCreditGrantPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "billing-credit-grant";
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
        resource: "billing-credit-grant",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get BillingCreditGrantId(): Required<StripeBillingCreditGrantOutputs>["BillingCreditGrantId"] {
    const value: Required<StripeBillingCreditGrantOutputs>["BillingCreditGrantId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "BillingCreditGrantId",
        StripeBillingCreditGrantOutputsSchema.fields.BillingCreditGrantId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeBillingCreditGrantDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeBillingCreditGrantResource<Props> {
  const resource: StripeBillingCreditGrantResource<Props> =
    new StripeBillingCreditGrantResource<Props>(key, props, binding);

  return resource;
}
