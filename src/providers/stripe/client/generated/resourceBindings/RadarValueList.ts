import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetRadarValueListsValueListInput,
  GetRadarValueListsValueListOutput,
} from "../radarValueLists.js";
import {
  GetRadarValueListsValueListOperation,
  PostRadarValueListsInput,
  PostRadarValueListsOperation,
  type PostRadarValueListsOutput,
  PostRadarValueListsValueListInput,
  PostRadarValueListsValueListOperation,
  type PostRadarValueListsValueListOutput,
} from "../radarValueLists.js";
import type { StripeRadarValueListPropsEntity } from "../resourceInputs/StripeRadarValueListPropsEntitySchema.js";
import type { StripeRadarValueListProps } from "../resourceInputs/StripeRadarValueListPropsSchema.js";
import {
  type StripeRadarValueListOutputs,
  StripeRadarValueListOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeRadarValueListOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeRadarValueListOutputs(
  state: Pick<PostRadarValueListsOutput, "id">,
): StripeRadarValueListOutputs {
  const outputs: StripeRadarValueListOutputs = {
    RadarValueListId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeRadarValueListReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeRadarValueListReadInput(
  outputs: StripeRadarValueListOutputs,
): GetRadarValueListsValueListInput {
  const input: GetRadarValueListsValueListInput = {
    value_list: outputs.RadarValueListId,
  };

  return input;
}

/**
 * The StripeRadarValueListResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeRadarValueListResourceClient extends Context.Service<StripeRadarValueListResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/RadarValueList/StripeRadarValueListResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeRadarValueList.create")(function* (
        props: StripeRadarValueListProps,
      ) {
        const input: PostRadarValueListsInput =
          yield* Schema.decodeUnknownEffect(PostRadarValueListsInput)(props);
        const created: PostRadarValueListsOutput = yield* client.invoke(
          PostRadarValueListsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeRadarValueList.read")(function* (
        outputs: StripeRadarValueListOutputs,
      ) {
        const input: GetRadarValueListsValueListInput =
          bindStripeRadarValueListReadInput(outputs);
        const observed: GetRadarValueListsValueListOutput =
          yield* client.invoke(GetRadarValueListsValueListOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeRadarValueList.update")(function* (
        outputs: StripeRadarValueListOutputs,
        changes: Omit<PostRadarValueListsValueListInput, "value_list">,
      ) {
        const input: PostRadarValueListsValueListInput =
          yield* Schema.decodeEffect(PostRadarValueListsValueListInput)({
            ...changes,
            value_list: outputs.RadarValueListId,
          });
        const changed: PostRadarValueListsValueListOutput =
          yield* client.invoke(PostRadarValueListsValueListOperation, input);
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

export const stripeRadarValueListResourceClientLayer = Layer.effect(
  StripeRadarValueListResourceClient,
  StripeRadarValueListResourceClient.make,
);
export const StripeRadarValueListResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("radar-value-list"),
});

/**
 * The StripeRadarValueListResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeRadarValueListResource<
  Props = StripeRadarValueListPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "radar-value-list";
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
        resource: "radar-value-list",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RadarValueListId(): Required<StripeRadarValueListOutputs>["RadarValueListId"] {
    const value: Required<StripeRadarValueListOutputs>["RadarValueListId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RadarValueListId",
        StripeRadarValueListOutputsSchema.fields.RadarValueListId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeRadarValueListDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeRadarValueListResource<Props> {
  const resource: StripeRadarValueListResource<Props> =
    new StripeRadarValueListResource<Props>(key, props, binding);

  return resource;
}
