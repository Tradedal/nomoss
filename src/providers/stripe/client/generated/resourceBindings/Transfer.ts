import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTransferPropsEntity } from "../resourceInputs/StripeTransferPropsEntitySchema.js";
import type { StripeTransferProps } from "../resourceInputs/StripeTransferPropsSchema.js";
import {
  type StripeTransferOutputs,
  StripeTransferOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTransfersTransferInput,
  GetTransfersTransferOutput,
} from "../transfers.js";
import {
  GetTransfersTransferOperation,
  PostTransfersInput,
  PostTransfersOperation,
  type PostTransfersOutput,
  PostTransfersTransferInput,
  PostTransfersTransferOperation,
  type PostTransfersTransferOutput,
} from "../transfers.js";

/**
 * The projectStripeTransferOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTransferOutputs(
  state: Pick<PostTransfersOutput, "id">,
): StripeTransferOutputs {
  const outputs: StripeTransferOutputs = {
    TransferId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTransferReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTransferReadInput(
  outputs: StripeTransferOutputs,
): GetTransfersTransferInput {
  const input: GetTransfersTransferInput = {
    transfer: outputs.TransferId,
  };

  return input;
}

/**
 * The StripeTransferResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTransferResourceClient extends Context.Service<StripeTransferResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Transfer/StripeTransferResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTransfer.create")(function* (
        props: StripeTransferProps,
      ) {
        const input: PostTransfersInput =
          yield* Schema.decodeUnknownEffect(PostTransfersInput)(props);
        const created: PostTransfersOutput = yield* client.invoke(
          PostTransfersOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTransfer.read")(function* (
        outputs: StripeTransferOutputs,
      ) {
        const input: GetTransfersTransferInput =
          bindStripeTransferReadInput(outputs);
        const observed: GetTransfersTransferOutput = yield* client.invoke(
          GetTransfersTransferOperation,
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
      const update = Effect.fn("StripeTransfer.update")(function* (
        outputs: StripeTransferOutputs,
        changes: Omit<PostTransfersTransferInput, "transfer">,
      ) {
        const input: PostTransfersTransferInput = yield* Schema.decodeEffect(
          PostTransfersTransferInput,
        )({
          ...changes,
          transfer: outputs.TransferId,
        });
        const changed: PostTransfersTransferOutput = yield* client.invoke(
          PostTransfersTransferOperation,
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

export const stripeTransferResourceClientLayer = Layer.effect(
  StripeTransferResourceClient,
  StripeTransferResourceClient.make,
);
export const StripeTransferResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("transfer"),
});

/**
 * The StripeTransferResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTransferResource<
  Props = StripeTransferPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "transfer";
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
        resource: "transfer",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TransferId(): Required<StripeTransferOutputs>["TransferId"] {
    const value: Required<StripeTransferOutputs>["TransferId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TransferId",
        StripeTransferOutputsSchema.fields.TransferId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTransferDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTransferResource<Props> {
  const resource: StripeTransferResource<Props> =
    new StripeTransferResource<Props>(key, props, binding);

  return resource;
}
