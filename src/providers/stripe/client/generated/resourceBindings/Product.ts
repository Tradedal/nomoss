import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { GetProductsIdInput, GetProductsIdOutput } from "../products.js";
import {
  GetProductsIdOperation,
  PostProductsIdInput,
  PostProductsIdOperation,
  type PostProductsIdOutput,
  PostProductsInput,
  PostProductsOperation,
  type PostProductsOutput,
} from "../products.js";
import type { StripeProductPropsEntity } from "../resourceInputs/StripeProductPropsEntitySchema.js";
import type { StripeProductProps } from "../resourceInputs/StripeProductPropsSchema.js";
import {
  type StripeProductOutputs,
  StripeProductOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeProductOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeProductOutputs(
  state: Pick<PostProductsOutput, "id">,
): StripeProductOutputs {
  const outputs: StripeProductOutputs = {
    ProductId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeProductReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeProductReadInput(
  outputs: StripeProductOutputs,
): GetProductsIdInput {
  const input: GetProductsIdInput = {
    id: outputs.ProductId,
  };

  return input;
}

/**
 * The StripeProductResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeProductResourceClient extends Context.Service<StripeProductResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Product/StripeProductResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeProduct.create")(function* (
        props: StripeProductProps,
      ) {
        const input: PostProductsInput =
          yield* Schema.decodeUnknownEffect(PostProductsInput)(props);
        const created: PostProductsOutput = yield* client.invoke(
          PostProductsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeProduct.read")(function* (
        outputs: StripeProductOutputs,
      ) {
        const input: GetProductsIdInput = bindStripeProductReadInput(outputs);
        const observed: GetProductsIdOutput = yield* client.invoke(
          GetProductsIdOperation,
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
      const update = Effect.fn("StripeProduct.update")(function* (
        outputs: StripeProductOutputs,
        changes: Omit<PostProductsIdInput, "id">,
      ) {
        const input: PostProductsIdInput = yield* Schema.decodeEffect(
          PostProductsIdInput,
        )({
          ...changes,
          id: outputs.ProductId,
        });
        const changed: PostProductsIdOutput = yield* client.invoke(
          PostProductsIdOperation,
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

export const stripeProductResourceClientLayer = Layer.effect(
  StripeProductResourceClient,
  StripeProductResourceClient.make,
);
export const StripeProductResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("product"),
});

/**
 * The StripeProductResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeProductResource<
  Props = StripeProductPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "product";
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
        resource: "product",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ProductId(): Required<StripeProductOutputs>["ProductId"] {
    const value: Required<StripeProductOutputs>["ProductId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ProductId",
        StripeProductOutputsSchema.fields.ProductId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeProductDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeProductResource<Props> {
  const resource: StripeProductResource<Props> =
    new StripeProductResource<Props>(key, props, binding);

  return resource;
}
