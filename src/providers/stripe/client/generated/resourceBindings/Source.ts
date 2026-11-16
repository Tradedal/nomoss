import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeSourcePropsEntity } from "../resourceInputs/StripeSourcePropsEntitySchema.js";
import type { StripeSourceProps } from "../resourceInputs/StripeSourcePropsSchema.js";
import {
  type StripeSourceOutputs,
  StripeSourceOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetSourcesSourceInput,
  GetSourcesSourceOutput,
} from "../sources.js";
import {
  GetSourcesSourceOperation,
  PostSourcesInput,
  PostSourcesOperation,
  type PostSourcesOutput,
  PostSourcesSourceInput,
  PostSourcesSourceOperation,
  type PostSourcesSourceOutput,
} from "../sources.js";

/**
 * The projectStripeSourceOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeSourceOutputs(
  state: Pick<PostSourcesOutput, "id">,
): StripeSourceOutputs {
  const outputs: StripeSourceOutputs = {
    SourceId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeSourceReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeSourceReadInput(
  outputs: StripeSourceOutputs,
): GetSourcesSourceInput {
  const input: GetSourcesSourceInput = {
    source: outputs.SourceId,
  };

  return input;
}

/**
 * The StripeSourceResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeSourceResourceClient extends Context.Service<StripeSourceResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Source/StripeSourceResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeSource.create")(function* (
        props: StripeSourceProps,
      ) {
        const input: PostSourcesInput =
          yield* Schema.decodeUnknownEffect(PostSourcesInput)(props);
        const created: PostSourcesOutput = yield* client.invoke(
          PostSourcesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeSource.read")(function* (
        outputs: StripeSourceOutputs,
      ) {
        const input: GetSourcesSourceInput = bindStripeSourceReadInput(outputs);
        const observed: GetSourcesSourceOutput = yield* client.invoke(
          GetSourcesSourceOperation,
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
      const update = Effect.fn("StripeSource.update")(function* (
        outputs: StripeSourceOutputs,
        changes: Omit<PostSourcesSourceInput, "source">,
      ) {
        const input: PostSourcesSourceInput = yield* Schema.decodeEffect(
          PostSourcesSourceInput,
        )({
          ...changes,
          source: outputs.SourceId,
        });
        const changed: PostSourcesSourceOutput = yield* client.invoke(
          PostSourcesSourceOperation,
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

export const stripeSourceResourceClientLayer = Layer.effect(
  StripeSourceResourceClient,
  StripeSourceResourceClient.make,
);
export const StripeSourceResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("source"),
});

/**
 * The StripeSourceResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeSourceResource<
  Props = StripeSourcePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "source";
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
        resource: "source",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SourceId(): Required<StripeSourceOutputs>["SourceId"] {
    const value: Required<StripeSourceOutputs>["SourceId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SourceId",
        StripeSourceOutputsSchema.fields.SourceId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeSourceDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeSourceResource<Props> {
  const resource: StripeSourceResource<Props> = new StripeSourceResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
