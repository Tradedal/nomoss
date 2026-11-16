import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetInvoiceitemsInvoiceitemInput,
  GetInvoiceitemsInvoiceitemOutput,
} from "../invoiceitems.js";
import {
  GetInvoiceitemsInvoiceitemOperation,
  PostInvoiceitemsInput,
  PostInvoiceitemsInvoiceitemInput,
  PostInvoiceitemsInvoiceitemOperation,
  type PostInvoiceitemsInvoiceitemOutput,
  PostInvoiceitemsOperation,
  type PostInvoiceitemsOutput,
} from "../invoiceitems.js";
import type { StripeInvoiceitemPropsEntity } from "../resourceInputs/StripeInvoiceitemPropsEntitySchema.js";
import type { StripeInvoiceitemProps } from "../resourceInputs/StripeInvoiceitemPropsSchema.js";
import {
  type StripeInvoiceitemOutputs,
  StripeInvoiceitemOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeInvoiceitemOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeInvoiceitemOutputs(
  state: Pick<PostInvoiceitemsOutput, "id">,
): StripeInvoiceitemOutputs {
  const outputs: StripeInvoiceitemOutputs = {
    InvoiceitemId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeInvoiceitemReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeInvoiceitemReadInput(
  outputs: StripeInvoiceitemOutputs,
): GetInvoiceitemsInvoiceitemInput {
  const input: GetInvoiceitemsInvoiceitemInput = {
    invoiceitem: outputs.InvoiceitemId,
  };

  return input;
}

/**
 * The StripeInvoiceitemResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeInvoiceitemResourceClient extends Context.Service<StripeInvoiceitemResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Invoiceitem/StripeInvoiceitemResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeInvoiceitem.create")(function* (
        props: StripeInvoiceitemProps,
      ) {
        const input: PostInvoiceitemsInput = yield* Schema.decodeUnknownEffect(
          PostInvoiceitemsInput,
        )(props);
        const created: PostInvoiceitemsOutput = yield* client.invoke(
          PostInvoiceitemsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeInvoiceitem.read")(function* (
        outputs: StripeInvoiceitemOutputs,
      ) {
        const input: GetInvoiceitemsInvoiceitemInput =
          bindStripeInvoiceitemReadInput(outputs);
        const observed: GetInvoiceitemsInvoiceitemOutput = yield* client.invoke(
          GetInvoiceitemsInvoiceitemOperation,
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
      const update = Effect.fn("StripeInvoiceitem.update")(function* (
        outputs: StripeInvoiceitemOutputs,
        changes: Omit<PostInvoiceitemsInvoiceitemInput, "invoiceitem">,
      ) {
        const input: PostInvoiceitemsInvoiceitemInput =
          yield* Schema.decodeEffect(PostInvoiceitemsInvoiceitemInput)({
            ...changes,
            invoiceitem: outputs.InvoiceitemId,
          });
        const changed: PostInvoiceitemsInvoiceitemOutput = yield* client.invoke(
          PostInvoiceitemsInvoiceitemOperation,
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

export const stripeInvoiceitemResourceClientLayer = Layer.effect(
  StripeInvoiceitemResourceClient,
  StripeInvoiceitemResourceClient.make,
);
export const StripeInvoiceitemResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("invoiceitem"),
});

/**
 * The StripeInvoiceitemResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeInvoiceitemResource<
  Props = StripeInvoiceitemPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "invoiceitem";
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
        resource: "invoiceitem",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get InvoiceitemId(): Required<StripeInvoiceitemOutputs>["InvoiceitemId"] {
    const value: Required<StripeInvoiceitemOutputs>["InvoiceitemId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "InvoiceitemId",
        StripeInvoiceitemOutputsSchema.fields.InvoiceitemId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeInvoiceitemDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeInvoiceitemResource<Props> {
  const resource: StripeInvoiceitemResource<Props> =
    new StripeInvoiceitemResource<Props>(key, props, binding);

  return resource;
}
