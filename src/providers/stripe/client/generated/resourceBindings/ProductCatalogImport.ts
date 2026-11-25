import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2CommerceProductCatalogImportsIdInput,
  GetV2CommerceProductCatalogImportsIdOutput,
} from "../commerceProductCatalogImports.js";
import {
  GetV2CommerceProductCatalogImportsIdOperation,
  PostV2CommerceProductCatalogImportsInput,
  PostV2CommerceProductCatalogImportsOperation,
  type PostV2CommerceProductCatalogImportsOutput,
} from "../commerceProductCatalogImports.js";
import type { StripeProductCatalogImportPropsEntity } from "../resourceInputs/StripeProductCatalogImportPropsEntitySchema.js";
import type { StripeProductCatalogImportProps } from "../resourceInputs/StripeProductCatalogImportPropsSchema.js";
import {
  type StripeProductCatalogImportOutputs,
  StripeProductCatalogImportOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeProductCatalogImportOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeProductCatalogImportOutputs(
  state: Pick<PostV2CommerceProductCatalogImportsOutput, "id">,
): StripeProductCatalogImportOutputs {
  const outputs: StripeProductCatalogImportOutputs = {
    ProductCatalogImportId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeProductCatalogImportReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeProductCatalogImportReadInput(
  outputs: StripeProductCatalogImportOutputs,
): GetV2CommerceProductCatalogImportsIdInput {
  const input: GetV2CommerceProductCatalogImportsIdInput = {
    id: outputs.ProductCatalogImportId,
  };

  return input;
}

/**
 * The StripeProductCatalogImportResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeProductCatalogImportResourceClient extends Context.Service<StripeProductCatalogImportResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ProductCatalogImport/StripeProductCatalogImportResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeProductCatalogImport.create")(function* (
        props: StripeProductCatalogImportProps,
      ) {
        const input: PostV2CommerceProductCatalogImportsInput =
          yield* Schema.decodeUnknownEffect(
            PostV2CommerceProductCatalogImportsInput,
          )(props);
        const created: PostV2CommerceProductCatalogImportsOutput =
          yield* client.invoke(
            PostV2CommerceProductCatalogImportsOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeProductCatalogImport.read")(function* (
        outputs: StripeProductCatalogImportOutputs,
      ) {
        const input: GetV2CommerceProductCatalogImportsIdInput =
          bindStripeProductCatalogImportReadInput(outputs);
        const observed: GetV2CommerceProductCatalogImportsIdOutput =
          yield* client.invoke(
            GetV2CommerceProductCatalogImportsIdOperation,
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

export const stripeProductCatalogImportResourceClientLayer = Layer.effect(
  StripeProductCatalogImportResourceClient,
  StripeProductCatalogImportResourceClient.make,
);
export const StripeProductCatalogImportResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("commerce"),
  resource: Schema.Literal("product-catalog-import"),
});

/**
 * The StripeProductCatalogImportResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeProductCatalogImportResource<
  Props = StripeProductCatalogImportPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "commerce";
  readonly resource: "product-catalog-import";
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
        service: "commerce",
        resource: "product-catalog-import",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ProductCatalogImportId(): Required<StripeProductCatalogImportOutputs>["ProductCatalogImportId"] {
    const value: Required<StripeProductCatalogImportOutputs>["ProductCatalogImportId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ProductCatalogImportId",
        StripeProductCatalogImportOutputsSchema.fields.ProductCatalogImportId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeProductCatalogImportDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeProductCatalogImportResource<Props> {
  const resource: StripeProductCatalogImportResource<Props> =
    new StripeProductCatalogImportResource<Props>(key, props, binding);

  return resource;
}
