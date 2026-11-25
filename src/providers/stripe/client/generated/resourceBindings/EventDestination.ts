import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2CoreEventDestinationsIdInput,
  GetV2CoreEventDestinationsIdOutput,
} from "../coreEventDestinations.js";
import {
  GetV2CoreEventDestinationsIdOperation,
  PostV2CoreEventDestinationsIdInput,
  PostV2CoreEventDestinationsIdOperation,
  type PostV2CoreEventDestinationsIdOutput,
  PostV2CoreEventDestinationsInput,
  PostV2CoreEventDestinationsOperation,
  type PostV2CoreEventDestinationsOutput,
} from "../coreEventDestinations.js";
import type { StripeEventDestinationPropsEntity } from "../resourceInputs/StripeEventDestinationPropsEntitySchema.js";
import type { StripeEventDestinationProps } from "../resourceInputs/StripeEventDestinationPropsSchema.js";
import {
  type StripeEventDestinationOutputs,
  StripeEventDestinationOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeEventDestinationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeEventDestinationOutputs(
  state: Pick<PostV2CoreEventDestinationsOutput, "id">,
): StripeEventDestinationOutputs {
  const outputs: StripeEventDestinationOutputs = {
    EventDestinationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeEventDestinationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeEventDestinationReadInput(
  outputs: StripeEventDestinationOutputs,
): GetV2CoreEventDestinationsIdInput {
  const input: GetV2CoreEventDestinationsIdInput = {
    id: outputs.EventDestinationId,
  };

  return input;
}

/**
 * The StripeEventDestinationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeEventDestinationResourceClient extends Context.Service<StripeEventDestinationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/EventDestination/StripeEventDestinationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeEventDestination.create")(function* (
        props: StripeEventDestinationProps,
      ) {
        const input: PostV2CoreEventDestinationsInput =
          yield* Schema.decodeUnknownEffect(PostV2CoreEventDestinationsInput)(
            props,
          );
        const created: PostV2CoreEventDestinationsOutput = yield* client.invoke(
          PostV2CoreEventDestinationsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeEventDestination.read")(function* (
        outputs: StripeEventDestinationOutputs,
      ) {
        const input: GetV2CoreEventDestinationsIdInput =
          bindStripeEventDestinationReadInput(outputs);
        const observed: GetV2CoreEventDestinationsIdOutput =
          yield* client.invoke(GetV2CoreEventDestinationsIdOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeEventDestination.update")(function* (
        outputs: StripeEventDestinationOutputs,
        changes: Omit<PostV2CoreEventDestinationsIdInput, "id">,
      ) {
        const input: PostV2CoreEventDestinationsIdInput =
          yield* Schema.decodeEffect(PostV2CoreEventDestinationsIdInput)({
            ...changes,
            id: outputs.EventDestinationId,
          });
        const changed: PostV2CoreEventDestinationsIdOutput =
          yield* client.invoke(PostV2CoreEventDestinationsIdOperation, input);
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

export const stripeEventDestinationResourceClientLayer = Layer.effect(
  StripeEventDestinationResourceClient,
  StripeEventDestinationResourceClient.make,
);
export const StripeEventDestinationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("core"),
  resource: Schema.Literal("event-destination"),
});

/**
 * The StripeEventDestinationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeEventDestinationResource<
  Props = StripeEventDestinationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "core";
  readonly resource: "event-destination";
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
        service: "core",
        resource: "event-destination",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get EventDestinationId(): Required<StripeEventDestinationOutputs>["EventDestinationId"] {
    const value: Required<StripeEventDestinationOutputs>["EventDestinationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "EventDestinationId",
        StripeEventDestinationOutputsSchema.fields.EventDestinationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeEventDestinationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeEventDestinationResource<Props> {
  const resource: StripeEventDestinationResource<Props> =
    new StripeEventDestinationResource<Props>(key, props, binding);

  return resource;
}
