import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetRadarValueListItemsItemInput,
  GetRadarValueListItemsItemOutput,
} from "../radarValueListItems.js";
import {
  GetRadarValueListItemsItemOperation,
  PostRadarValueListItemsInput,
  PostRadarValueListItemsOperation,
  type PostRadarValueListItemsOutput,
} from "../radarValueListItems.js";
import type { StripeRadarValueListItemPropsEntity } from "../resourceInputs/StripeRadarValueListItemPropsEntitySchema.js";
import type { StripeRadarValueListItemProps } from "../resourceInputs/StripeRadarValueListItemPropsSchema.js";
import {
  type StripeRadarValueListItemOutputs,
  StripeRadarValueListItemOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeRadarValueListItemOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeRadarValueListItemOutputs(
  state: Pick<PostRadarValueListItemsOutput, "id">,
): StripeRadarValueListItemOutputs {
  const outputs: StripeRadarValueListItemOutputs = {
    RadarValueListItemId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeRadarValueListItemReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeRadarValueListItemReadInput(
  outputs: StripeRadarValueListItemOutputs,
): GetRadarValueListItemsItemInput {
  const input: GetRadarValueListItemsItemInput = {
    item: outputs.RadarValueListItemId,
  };

  return input;
}

/**
 * The StripeRadarValueListItemResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeRadarValueListItemResourceClient extends Context.Service<StripeRadarValueListItemResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/RadarValueListItem/StripeRadarValueListItemResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeRadarValueListItem.create")(function* (
        props: StripeRadarValueListItemProps,
      ) {
        const input: PostRadarValueListItemsInput =
          yield* Schema.decodeUnknownEffect(PostRadarValueListItemsInput)(
            props,
          );
        const created: PostRadarValueListItemsOutput = yield* client.invoke(
          PostRadarValueListItemsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeRadarValueListItem.read")(function* (
        outputs: StripeRadarValueListItemOutputs,
      ) {
        const input: GetRadarValueListItemsItemInput =
          bindStripeRadarValueListItemReadInput(outputs);
        const observed: GetRadarValueListItemsItemOutput = yield* client.invoke(
          GetRadarValueListItemsItemOperation,
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

export const stripeRadarValueListItemResourceClientLayer = Layer.effect(
  StripeRadarValueListItemResourceClient,
  StripeRadarValueListItemResourceClient.make,
);
export const StripeRadarValueListItemResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("radar-value-list-item"),
});

/**
 * The StripeRadarValueListItemResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeRadarValueListItemResource<
  Props = StripeRadarValueListItemPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "radar-value-list-item";
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
        resource: "radar-value-list-item",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RadarValueListItemId(): Required<StripeRadarValueListItemOutputs>["RadarValueListItemId"] {
    const value: Required<StripeRadarValueListItemOutputs>["RadarValueListItemId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RadarValueListItemId",
        StripeRadarValueListItemOutputsSchema.fields.RadarValueListItemId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeRadarValueListItemDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeRadarValueListItemResource<Props> {
  const resource: StripeRadarValueListItemResource<Props> =
    new StripeRadarValueListItemResource<Props>(key, props, binding);

  return resource;
}
