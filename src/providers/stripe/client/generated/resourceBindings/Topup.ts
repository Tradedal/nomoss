import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTopupPropsEntity } from "../resourceInputs/StripeTopupPropsEntitySchema.js";
import type { StripeTopupProps } from "../resourceInputs/StripeTopupPropsSchema.js";
import {
  type StripeTopupOutputs,
  StripeTopupOutputsSchema,
} from "../resourceOutputs.js";
import type { GetTopupsTopupInput, GetTopupsTopupOutput } from "../topups.js";
import {
  GetTopupsTopupOperation,
  PostTopupsInput,
  PostTopupsOperation,
  type PostTopupsOutput,
  PostTopupsTopupInput,
  PostTopupsTopupOperation,
  type PostTopupsTopupOutput,
} from "../topups.js";

/**
 * The projectStripeTopupOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTopupOutputs(
  state: Pick<PostTopupsOutput, "id">,
): StripeTopupOutputs {
  const outputs: StripeTopupOutputs = {
    TopupId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTopupReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTopupReadInput(
  outputs: StripeTopupOutputs,
): GetTopupsTopupInput {
  const input: GetTopupsTopupInput = {
    topup: outputs.TopupId,
  };

  return input;
}

/**
 * The StripeTopupResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTopupResourceClient extends Context.Service<StripeTopupResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Topup/StripeTopupResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTopup.create")(function* (
        props: StripeTopupProps,
      ) {
        const input: PostTopupsInput =
          yield* Schema.decodeUnknownEffect(PostTopupsInput)(props);
        const created: PostTopupsOutput = yield* client.invoke(
          PostTopupsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTopup.read")(function* (
        outputs: StripeTopupOutputs,
      ) {
        const input: GetTopupsTopupInput = bindStripeTopupReadInput(outputs);
        const observed: GetTopupsTopupOutput = yield* client.invoke(
          GetTopupsTopupOperation,
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
      const update = Effect.fn("StripeTopup.update")(function* (
        outputs: StripeTopupOutputs,
        changes: Omit<PostTopupsTopupInput, "topup">,
      ) {
        const input: PostTopupsTopupInput = yield* Schema.decodeEffect(
          PostTopupsTopupInput,
        )({
          ...changes,
          topup: outputs.TopupId,
        });
        const changed: PostTopupsTopupOutput = yield* client.invoke(
          PostTopupsTopupOperation,
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

export const stripeTopupResourceClientLayer = Layer.effect(
  StripeTopupResourceClient,
  StripeTopupResourceClient.make,
);
export const StripeTopupResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("topup"),
});

/**
 * The StripeTopupResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTopupResource<
  Props = StripeTopupPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "topup";
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
        resource: "topup",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TopupId(): Required<StripeTopupOutputs>["TopupId"] {
    const value: Required<StripeTopupOutputs>["TopupId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TopupId",
        StripeTopupOutputsSchema.fields.TopupId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTopupDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTopupResource<Props> {
  const resource: StripeTopupResource<Props> = new StripeTopupResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
