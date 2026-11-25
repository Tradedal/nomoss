import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeSubscriptionSchedulePropsEntity } from "../resourceInputs/StripeSubscriptionSchedulePropsEntitySchema.js";
import type { StripeSubscriptionScheduleProps } from "../resourceInputs/StripeSubscriptionSchedulePropsSchema.js";
import {
  type StripeSubscriptionScheduleOutputs,
  StripeSubscriptionScheduleOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetSubscriptionSchedulesScheduleInput,
  GetSubscriptionSchedulesScheduleOutput,
} from "../subscriptionSchedules.js";
import {
  GetSubscriptionSchedulesScheduleOperation,
  PostSubscriptionSchedulesInput,
  PostSubscriptionSchedulesOperation,
  type PostSubscriptionSchedulesOutput,
  PostSubscriptionSchedulesScheduleInput,
  PostSubscriptionSchedulesScheduleOperation,
  type PostSubscriptionSchedulesScheduleOutput,
} from "../subscriptionSchedules.js";

/**
 * The projectStripeSubscriptionScheduleOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeSubscriptionScheduleOutputs(
  state: Pick<PostSubscriptionSchedulesOutput, "id">,
): StripeSubscriptionScheduleOutputs {
  const outputs: StripeSubscriptionScheduleOutputs = {
    SubscriptionScheduleId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeSubscriptionScheduleReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeSubscriptionScheduleReadInput(
  outputs: StripeSubscriptionScheduleOutputs,
): GetSubscriptionSchedulesScheduleInput {
  const input: GetSubscriptionSchedulesScheduleInput = {
    schedule: outputs.SubscriptionScheduleId,
  };

  return input;
}

/**
 * The StripeSubscriptionScheduleResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeSubscriptionScheduleResourceClient extends Context.Service<StripeSubscriptionScheduleResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/SubscriptionSchedule/StripeSubscriptionScheduleResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeSubscriptionSchedule.create")(function* (
        props: StripeSubscriptionScheduleProps,
      ) {
        const input: PostSubscriptionSchedulesInput =
          yield* Schema.decodeUnknownEffect(PostSubscriptionSchedulesInput)(
            props,
          );
        const created: PostSubscriptionSchedulesOutput = yield* client.invoke(
          PostSubscriptionSchedulesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeSubscriptionSchedule.read")(function* (
        outputs: StripeSubscriptionScheduleOutputs,
      ) {
        const input: GetSubscriptionSchedulesScheduleInput =
          bindStripeSubscriptionScheduleReadInput(outputs);
        const observed: GetSubscriptionSchedulesScheduleOutput =
          yield* client.invoke(
            GetSubscriptionSchedulesScheduleOperation,
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
      const update = Effect.fn("StripeSubscriptionSchedule.update")(function* (
        outputs: StripeSubscriptionScheduleOutputs,
        changes: Omit<PostSubscriptionSchedulesScheduleInput, "schedule">,
      ) {
        const input: PostSubscriptionSchedulesScheduleInput =
          yield* Schema.decodeEffect(PostSubscriptionSchedulesScheduleInput)({
            ...changes,
            schedule: outputs.SubscriptionScheduleId,
          });
        const changed: PostSubscriptionSchedulesScheduleOutput =
          yield* client.invoke(
            PostSubscriptionSchedulesScheduleOperation,
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

export const stripeSubscriptionScheduleResourceClientLayer = Layer.effect(
  StripeSubscriptionScheduleResourceClient,
  StripeSubscriptionScheduleResourceClient.make,
);
export const StripeSubscriptionScheduleResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("subscription-schedule"),
});

/**
 * The StripeSubscriptionScheduleResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeSubscriptionScheduleResource<
  Props = StripeSubscriptionSchedulePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "subscription-schedule";
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
        resource: "subscription-schedule",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SubscriptionScheduleId(): Required<StripeSubscriptionScheduleOutputs>["SubscriptionScheduleId"] {
    const value: Required<StripeSubscriptionScheduleOutputs>["SubscriptionScheduleId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SubscriptionScheduleId",
        StripeSubscriptionScheduleOutputsSchema.fields.SubscriptionScheduleId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeSubscriptionScheduleDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeSubscriptionScheduleResource<Props> {
  const resource: StripeSubscriptionScheduleResource<Props> =
    new StripeSubscriptionScheduleResource<Props>(key, props, binding);

  return resource;
}
