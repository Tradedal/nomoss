import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetForwardingRequestsIdInput,
  GetForwardingRequestsIdOutput,
} from "../forwardingRequests.js";
import {
  GetForwardingRequestsIdOperation,
  PostForwardingRequestsInput,
  PostForwardingRequestsOperation,
  type PostForwardingRequestsOutput,
} from "../forwardingRequests.js";
import type { StripeForwardingRequestPropsEntity } from "../resourceInputs/StripeForwardingRequestPropsEntitySchema.js";
import type { StripeForwardingRequestProps } from "../resourceInputs/StripeForwardingRequestPropsSchema.js";
import {
  type StripeForwardingRequestOutputs,
  StripeForwardingRequestOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeForwardingRequestOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeForwardingRequestOutputs(
  state: Pick<PostForwardingRequestsOutput, "id">,
): StripeForwardingRequestOutputs {
  const outputs: StripeForwardingRequestOutputs = {
    ForwardingRequestId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeForwardingRequestReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeForwardingRequestReadInput(
  outputs: StripeForwardingRequestOutputs,
): GetForwardingRequestsIdInput {
  const input: GetForwardingRequestsIdInput = {
    id: outputs.ForwardingRequestId,
  };

  return input;
}

/**
 * The StripeForwardingRequestResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeForwardingRequestResourceClient extends Context.Service<StripeForwardingRequestResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ForwardingRequest/StripeForwardingRequestResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeForwardingRequest.create")(function* (
        props: StripeForwardingRequestProps,
      ) {
        const input: PostForwardingRequestsInput =
          yield* Schema.decodeUnknownEffect(PostForwardingRequestsInput)(props);
        const created: PostForwardingRequestsOutput = yield* client.invoke(
          PostForwardingRequestsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeForwardingRequest.read")(function* (
        outputs: StripeForwardingRequestOutputs,
      ) {
        const input: GetForwardingRequestsIdInput =
          bindStripeForwardingRequestReadInput(outputs);
        const observed: GetForwardingRequestsIdOutput = yield* client.invoke(
          GetForwardingRequestsIdOperation,
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

export const stripeForwardingRequestResourceClientLayer = Layer.effect(
  StripeForwardingRequestResourceClient,
  StripeForwardingRequestResourceClient.make,
);
export const StripeForwardingRequestResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("forwarding-request"),
});

/**
 * The StripeForwardingRequestResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeForwardingRequestResource<
  Props = StripeForwardingRequestPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "forwarding-request";
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
        resource: "forwarding-request",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ForwardingRequestId(): Required<StripeForwardingRequestOutputs>["ForwardingRequestId"] {
    const value: Required<StripeForwardingRequestOutputs>["ForwardingRequestId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ForwardingRequestId",
        StripeForwardingRequestOutputsSchema.fields.ForwardingRequestId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeForwardingRequestDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeForwardingRequestResource<Props> {
  const resource: StripeForwardingRequestResource<Props> =
    new StripeForwardingRequestResource<Props>(key, props, binding);

  return resource;
}
