import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetClimateOrdersOrderInput,
  GetClimateOrdersOrderOutput,
} from "../climateOrders.js";
import {
  GetClimateOrdersOrderOperation,
  PostClimateOrdersInput,
  PostClimateOrdersOperation,
  PostClimateOrdersOrderInput,
  PostClimateOrdersOrderOperation,
  type PostClimateOrdersOrderOutput,
  type PostClimateOrdersOutput,
} from "../climateOrders.js";
import type { StripeClimateOrderPropsEntity } from "../resourceInputs/StripeClimateOrderPropsEntitySchema.js";
import type { StripeClimateOrderProps } from "../resourceInputs/StripeClimateOrderPropsSchema.js";
import {
  type StripeClimateOrderOutputs,
  StripeClimateOrderOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeClimateOrderOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeClimateOrderOutputs(
  state: Pick<PostClimateOrdersOutput, "id">,
): StripeClimateOrderOutputs {
  const outputs: StripeClimateOrderOutputs = {
    ClimateOrderId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeClimateOrderReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeClimateOrderReadInput(
  outputs: StripeClimateOrderOutputs,
): GetClimateOrdersOrderInput {
  const input: GetClimateOrdersOrderInput = {
    order: outputs.ClimateOrderId,
  };

  return input;
}

/**
 * The StripeClimateOrderResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeClimateOrderResourceClient extends Context.Service<StripeClimateOrderResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ClimateOrder/StripeClimateOrderResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeClimateOrder.create")(function* (
        props: StripeClimateOrderProps,
      ) {
        const input: PostClimateOrdersInput = yield* Schema.decodeUnknownEffect(
          PostClimateOrdersInput,
        )(props);
        const created: PostClimateOrdersOutput = yield* client.invoke(
          PostClimateOrdersOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeClimateOrder.read")(function* (
        outputs: StripeClimateOrderOutputs,
      ) {
        const input: GetClimateOrdersOrderInput =
          bindStripeClimateOrderReadInput(outputs);
        const observed: GetClimateOrdersOrderOutput = yield* client.invoke(
          GetClimateOrdersOrderOperation,
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
      const update = Effect.fn("StripeClimateOrder.update")(function* (
        outputs: StripeClimateOrderOutputs,
        changes: Omit<PostClimateOrdersOrderInput, "order">,
      ) {
        const input: PostClimateOrdersOrderInput = yield* Schema.decodeEffect(
          PostClimateOrdersOrderInput,
        )({
          ...changes,
          order: outputs.ClimateOrderId,
        });
        const changed: PostClimateOrdersOrderOutput = yield* client.invoke(
          PostClimateOrdersOrderOperation,
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

export const stripeClimateOrderResourceClientLayer = Layer.effect(
  StripeClimateOrderResourceClient,
  StripeClimateOrderResourceClient.make,
);
export const StripeClimateOrderResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("climate-order"),
});

/**
 * The StripeClimateOrderResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeClimateOrderResource<
  Props = StripeClimateOrderPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "climate-order";
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
        resource: "climate-order",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ClimateOrderId(): Required<StripeClimateOrderOutputs>["ClimateOrderId"] {
    const value: Required<StripeClimateOrderOutputs>["ClimateOrderId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ClimateOrderId",
        StripeClimateOrderOutputsSchema.fields.ClimateOrderId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeClimateOrderDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeClimateOrderResource<Props> {
  const resource: StripeClimateOrderResource<Props> =
    new StripeClimateOrderResource<Props>(key, props, binding);

  return resource;
}
