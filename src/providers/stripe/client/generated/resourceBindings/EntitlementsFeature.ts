import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetEntitlementsFeaturesIdInput,
  GetEntitlementsFeaturesIdOutput,
} from "../entitlementsFeatures.js";
import {
  GetEntitlementsFeaturesIdOperation,
  PostEntitlementsFeaturesIdInput,
  PostEntitlementsFeaturesIdOperation,
  type PostEntitlementsFeaturesIdOutput,
  PostEntitlementsFeaturesInput,
  PostEntitlementsFeaturesOperation,
  type PostEntitlementsFeaturesOutput,
} from "../entitlementsFeatures.js";
import type { StripeEntitlementsFeaturePropsEntity } from "../resourceInputs/StripeEntitlementsFeaturePropsEntitySchema.js";
import type { StripeEntitlementsFeatureProps } from "../resourceInputs/StripeEntitlementsFeaturePropsSchema.js";
import {
  type StripeEntitlementsFeatureOutputs,
  StripeEntitlementsFeatureOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeEntitlementsFeatureOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeEntitlementsFeatureOutputs(
  state: Pick<PostEntitlementsFeaturesOutput, "id">,
): StripeEntitlementsFeatureOutputs {
  const outputs: StripeEntitlementsFeatureOutputs = {
    EntitlementsFeatureId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeEntitlementsFeatureReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeEntitlementsFeatureReadInput(
  outputs: StripeEntitlementsFeatureOutputs,
): GetEntitlementsFeaturesIdInput {
  const input: GetEntitlementsFeaturesIdInput = {
    id: outputs.EntitlementsFeatureId,
  };

  return input;
}

/**
 * The StripeEntitlementsFeatureResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeEntitlementsFeatureResourceClient extends Context.Service<StripeEntitlementsFeatureResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/EntitlementsFeature/StripeEntitlementsFeatureResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeEntitlementsFeature.create")(function* (
        props: StripeEntitlementsFeatureProps,
      ) {
        const input: PostEntitlementsFeaturesInput =
          yield* Schema.decodeUnknownEffect(PostEntitlementsFeaturesInput)(
            props,
          );
        const created: PostEntitlementsFeaturesOutput = yield* client.invoke(
          PostEntitlementsFeaturesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeEntitlementsFeature.read")(function* (
        outputs: StripeEntitlementsFeatureOutputs,
      ) {
        const input: GetEntitlementsFeaturesIdInput =
          bindStripeEntitlementsFeatureReadInput(outputs);
        const observed: GetEntitlementsFeaturesIdOutput = yield* client.invoke(
          GetEntitlementsFeaturesIdOperation,
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
      const update = Effect.fn("StripeEntitlementsFeature.update")(function* (
        outputs: StripeEntitlementsFeatureOutputs,
        changes: Omit<PostEntitlementsFeaturesIdInput, "id">,
      ) {
        const input: PostEntitlementsFeaturesIdInput =
          yield* Schema.decodeEffect(PostEntitlementsFeaturesIdInput)({
            ...changes,
            id: outputs.EntitlementsFeatureId,
          });
        const changed: PostEntitlementsFeaturesIdOutput = yield* client.invoke(
          PostEntitlementsFeaturesIdOperation,
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

export const stripeEntitlementsFeatureResourceClientLayer = Layer.effect(
  StripeEntitlementsFeatureResourceClient,
  StripeEntitlementsFeatureResourceClient.make,
);
export const StripeEntitlementsFeatureResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("entitlements-feature"),
});

/**
 * The StripeEntitlementsFeatureResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeEntitlementsFeatureResource<
  Props = StripeEntitlementsFeaturePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "entitlements-feature";
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
        resource: "entitlements-feature",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get EntitlementsFeatureId(): Required<StripeEntitlementsFeatureOutputs>["EntitlementsFeatureId"] {
    const value: Required<StripeEntitlementsFeatureOutputs>["EntitlementsFeatureId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "EntitlementsFeatureId",
        StripeEntitlementsFeatureOutputsSchema.fields.EntitlementsFeatureId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeEntitlementsFeatureDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeEntitlementsFeatureResource<Props> {
  const resource: StripeEntitlementsFeatureResource<Props> =
    new StripeEntitlementsFeatureResource<Props>(key, props, binding);

  return resource;
}
