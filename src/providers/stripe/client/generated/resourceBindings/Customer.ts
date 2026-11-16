import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetCustomersCustomerInput,
  GetCustomersCustomerOutput,
} from "../customers.js";
import {
  GetCustomersCustomerOperation,
  PostCustomersCustomerInput,
  PostCustomersCustomerOperation,
  type PostCustomersCustomerOutput,
  PostCustomersInput,
  PostCustomersOperation,
  type PostCustomersOutput,
} from "../customers.js";
import type { StripeCustomerPropsEntity } from "../resourceInputs/StripeCustomerPropsEntitySchema.js";
import type { StripeCustomerProps } from "../resourceInputs/StripeCustomerPropsSchema.js";
import {
  type StripeCustomerOutputs,
  StripeCustomerOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeCustomerOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeCustomerOutputs(
  state: Pick<PostCustomersOutput, "id">,
): StripeCustomerOutputs {
  const outputs: StripeCustomerOutputs = {
    CustomerId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeCustomerReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeCustomerReadInput(
  outputs: StripeCustomerOutputs,
): GetCustomersCustomerInput {
  const input: GetCustomersCustomerInput = {
    customer: outputs.CustomerId,
  };

  return input;
}

/**
 * The StripeCustomerResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeCustomerResourceClient extends Context.Service<StripeCustomerResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Customer/StripeCustomerResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeCustomer.create")(function* (
        props: StripeCustomerProps,
      ) {
        const input: PostCustomersInput =
          yield* Schema.decodeUnknownEffect(PostCustomersInput)(props);
        const created: PostCustomersOutput = yield* client.invoke(
          PostCustomersOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeCustomer.read")(function* (
        outputs: StripeCustomerOutputs,
      ) {
        const input: GetCustomersCustomerInput =
          bindStripeCustomerReadInput(outputs);
        const observed: GetCustomersCustomerOutput = yield* client.invoke(
          GetCustomersCustomerOperation,
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
      const update = Effect.fn("StripeCustomer.update")(function* (
        outputs: StripeCustomerOutputs,
        changes: Omit<PostCustomersCustomerInput, "customer">,
      ) {
        const input: PostCustomersCustomerInput = yield* Schema.decodeEffect(
          PostCustomersCustomerInput,
        )({
          ...changes,
          customer: outputs.CustomerId,
        });
        const changed: PostCustomersCustomerOutput = yield* client.invoke(
          PostCustomersCustomerOperation,
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

export const stripeCustomerResourceClientLayer = Layer.effect(
  StripeCustomerResourceClient,
  StripeCustomerResourceClient.make,
);
export const StripeCustomerResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("customer"),
});

/**
 * The StripeCustomerResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeCustomerResource<
  Props = StripeCustomerPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "customer";
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
        resource: "customer",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get CustomerId(): Required<StripeCustomerOutputs>["CustomerId"] {
    const value: Required<StripeCustomerOutputs>["CustomerId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "CustomerId",
        StripeCustomerOutputsSchema.fields.CustomerId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeCustomerDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeCustomerResource<Props> {
  const resource: StripeCustomerResource<Props> =
    new StripeCustomerResource<Props>(key, props, binding);

  return resource;
}
