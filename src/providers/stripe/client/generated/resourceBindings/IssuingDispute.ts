import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetIssuingDisputesDisputeInput,
  GetIssuingDisputesDisputeOutput,
} from "../issuingDisputes.js";
import {
  GetIssuingDisputesDisputeOperation,
  PostIssuingDisputesDisputeInput,
  PostIssuingDisputesDisputeOperation,
  type PostIssuingDisputesDisputeOutput,
  PostIssuingDisputesInput,
  PostIssuingDisputesOperation,
  type PostIssuingDisputesOutput,
} from "../issuingDisputes.js";
import type { StripeIssuingDisputePropsEntity } from "../resourceInputs/StripeIssuingDisputePropsEntitySchema.js";
import type { StripeIssuingDisputeProps } from "../resourceInputs/StripeIssuingDisputePropsSchema.js";
import {
  type StripeIssuingDisputeOutputs,
  StripeIssuingDisputeOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeIssuingDisputeOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeIssuingDisputeOutputs(
  state: Pick<PostIssuingDisputesOutput, "id">,
): StripeIssuingDisputeOutputs {
  const outputs: StripeIssuingDisputeOutputs = {
    IssuingDisputeId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeIssuingDisputeReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeIssuingDisputeReadInput(
  outputs: StripeIssuingDisputeOutputs,
): GetIssuingDisputesDisputeInput {
  const input: GetIssuingDisputesDisputeInput = {
    dispute: outputs.IssuingDisputeId,
  };

  return input;
}

/**
 * The StripeIssuingDisputeResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeIssuingDisputeResourceClient extends Context.Service<StripeIssuingDisputeResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/IssuingDispute/StripeIssuingDisputeResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeIssuingDispute.create")(function* (
        props: StripeIssuingDisputeProps,
      ) {
        const input: PostIssuingDisputesInput =
          yield* Schema.decodeUnknownEffect(PostIssuingDisputesInput)(props);
        const created: PostIssuingDisputesOutput = yield* client.invoke(
          PostIssuingDisputesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeIssuingDispute.read")(function* (
        outputs: StripeIssuingDisputeOutputs,
      ) {
        const input: GetIssuingDisputesDisputeInput =
          bindStripeIssuingDisputeReadInput(outputs);
        const observed: GetIssuingDisputesDisputeOutput = yield* client.invoke(
          GetIssuingDisputesDisputeOperation,
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
      const update = Effect.fn("StripeIssuingDispute.update")(function* (
        outputs: StripeIssuingDisputeOutputs,
        changes: Omit<PostIssuingDisputesDisputeInput, "dispute">,
      ) {
        const input: PostIssuingDisputesDisputeInput =
          yield* Schema.decodeEffect(PostIssuingDisputesDisputeInput)({
            ...changes,
            dispute: outputs.IssuingDisputeId,
          });
        const changed: PostIssuingDisputesDisputeOutput = yield* client.invoke(
          PostIssuingDisputesDisputeOperation,
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

export const stripeIssuingDisputeResourceClientLayer = Layer.effect(
  StripeIssuingDisputeResourceClient,
  StripeIssuingDisputeResourceClient.make,
);
export const StripeIssuingDisputeResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("issuing-dispute"),
});

/**
 * The StripeIssuingDisputeResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeIssuingDisputeResource<
  Props = StripeIssuingDisputePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "issuing-dispute";
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
        resource: "issuing-dispute",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IssuingDisputeId(): Required<StripeIssuingDisputeOutputs>["IssuingDisputeId"] {
    const value: Required<StripeIssuingDisputeOutputs>["IssuingDisputeId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IssuingDisputeId",
        StripeIssuingDisputeOutputsSchema.fields.IssuingDisputeId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeIssuingDisputeDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeIssuingDisputeResource<Props> {
  const resource: StripeIssuingDisputeResource<Props> =
    new StripeIssuingDisputeResource<Props>(key, props, binding);

  return resource;
}
