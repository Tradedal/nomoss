import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { GetPlansPlanInput, GetPlansPlanOutput } from "../plans.js";
import {
  GetPlansPlanOperation,
  PostPlansInput,
  PostPlansOperation,
  type PostPlansOutput,
  PostPlansPlanInput,
  PostPlansPlanOperation,
  type PostPlansPlanOutput,
} from "../plans.js";
import type { StripePlanPropsEntity } from "../resourceInputs/StripePlanPropsEntitySchema.js";
import type { StripePlanProps } from "../resourceInputs/StripePlanPropsSchema.js";
import {
  type StripePlanOutputs,
  StripePlanOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripePlanOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripePlanOutputs(
  state: Pick<PostPlansOutput, "id">,
): StripePlanOutputs {
  const outputs: StripePlanOutputs = {
    PlanId: state.id,
  };

  return outputs;
}

/**
 * The bindStripePlanReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripePlanReadInput(
  outputs: StripePlanOutputs,
): GetPlansPlanInput {
  const input: GetPlansPlanInput = {
    plan: outputs.PlanId,
  };

  return input;
}

/**
 * The StripePlanResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripePlanResourceClient extends Context.Service<StripePlanResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/Plan/StripePlanResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripePlan.create")(function* (
        props: StripePlanProps,
      ) {
        const input: PostPlansInput =
          yield* Schema.decodeUnknownEffect(PostPlansInput)(props);
        const created: PostPlansOutput = yield* client.invoke(
          PostPlansOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripePlan.read")(function* (
        outputs: StripePlanOutputs,
      ) {
        const input: GetPlansPlanInput = bindStripePlanReadInput(outputs);
        const observed: GetPlansPlanOutput = yield* client.invoke(
          GetPlansPlanOperation,
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
      const update = Effect.fn("StripePlan.update")(function* (
        outputs: StripePlanOutputs,
        changes: Omit<PostPlansPlanInput, "plan">,
      ) {
        const input: PostPlansPlanInput = yield* Schema.decodeEffect(
          PostPlansPlanInput,
        )({
          ...changes,
          plan: outputs.PlanId,
        });
        const changed: PostPlansPlanOutput = yield* client.invoke(
          PostPlansPlanOperation,
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

export const stripePlanResourceClientLayer = Layer.effect(
  StripePlanResourceClient,
  StripePlanResourceClient.make,
);
export const StripePlanResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("plan"),
});

/**
 * The StripePlanResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripePlanResource<
  Props = StripePlanPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "plan";
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
        resource: "plan",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PlanId(): Required<StripePlanOutputs>["PlanId"] {
    const value: Required<StripePlanOutputs>["PlanId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PlanId",
        StripePlanOutputsSchema.fields.PlanId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripePlanDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripePlanResource<Props> {
  const resource: StripePlanResource<Props> = new StripePlanResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}
