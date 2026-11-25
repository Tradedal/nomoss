import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeSetupIntentPropsEntity } from "../resourceInputs/StripeSetupIntentPropsEntitySchema.js";
import type { StripeSetupIntentProps } from "../resourceInputs/StripeSetupIntentPropsSchema.js";
import {
  type StripeSetupIntentOutputs,
  StripeSetupIntentOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetSetupIntentsIntentInput,
  GetSetupIntentsIntentOutput,
} from "../setupIntents.js";
import {
  GetSetupIntentsIntentOperation,
  PostSetupIntentsInput,
  PostSetupIntentsIntentInput,
  PostSetupIntentsIntentOperation,
  type PostSetupIntentsIntentOutput,
  PostSetupIntentsOperation,
  type PostSetupIntentsOutput,
} from "../setupIntents.js";

/**
 * The projectStripeSetupIntentOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeSetupIntentOutputs(
  state: Pick<PostSetupIntentsOutput, "id">,
): StripeSetupIntentOutputs {
  const outputs: StripeSetupIntentOutputs = {
    SetupIntentId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeSetupIntentReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeSetupIntentReadInput(
  outputs: StripeSetupIntentOutputs,
): GetSetupIntentsIntentInput {
  const input: GetSetupIntentsIntentInput = {
    intent: outputs.SetupIntentId,
  };

  return input;
}

/**
 * The StripeSetupIntentResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeSetupIntentResourceClient extends Context.Service<StripeSetupIntentResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/SetupIntent/StripeSetupIntentResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeSetupIntent.create")(function* (
        props: StripeSetupIntentProps,
      ) {
        const input: PostSetupIntentsInput = yield* Schema.decodeUnknownEffect(
          PostSetupIntentsInput,
        )(props);
        const created: PostSetupIntentsOutput = yield* client.invoke(
          PostSetupIntentsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeSetupIntent.read")(function* (
        outputs: StripeSetupIntentOutputs,
      ) {
        const input: GetSetupIntentsIntentInput =
          bindStripeSetupIntentReadInput(outputs);
        const observed: GetSetupIntentsIntentOutput = yield* client.invoke(
          GetSetupIntentsIntentOperation,
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
      const update = Effect.fn("StripeSetupIntent.update")(function* (
        outputs: StripeSetupIntentOutputs,
        changes: Omit<PostSetupIntentsIntentInput, "intent">,
      ) {
        const input: PostSetupIntentsIntentInput = yield* Schema.decodeEffect(
          PostSetupIntentsIntentInput,
        )({
          ...changes,
          intent: outputs.SetupIntentId,
        });
        const changed: PostSetupIntentsIntentOutput = yield* client.invoke(
          PostSetupIntentsIntentOperation,
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

export const stripeSetupIntentResourceClientLayer = Layer.effect(
  StripeSetupIntentResourceClient,
  StripeSetupIntentResourceClient.make,
);
export const StripeSetupIntentResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("setup-intent"),
});

/**
 * The StripeSetupIntentResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeSetupIntentResource<
  Props = StripeSetupIntentPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "setup-intent";
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
        resource: "setup-intent",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SetupIntentId(): Required<StripeSetupIntentOutputs>["SetupIntentId"] {
    const value: Required<StripeSetupIntentOutputs>["SetupIntentId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SetupIntentId",
        StripeSetupIntentOutputsSchema.fields.SetupIntentId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeSetupIntentDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeSetupIntentResource<Props> {
  const resource: StripeSetupIntentResource<Props> =
    new StripeSetupIntentResource<Props>(key, props, binding);

  return resource;
}
