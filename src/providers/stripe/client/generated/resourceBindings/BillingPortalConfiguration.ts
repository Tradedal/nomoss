import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetBillingPortalConfigurationsConfigurationInput,
  GetBillingPortalConfigurationsConfigurationOutput,
} from "../billingPortalConfigurations.js";
import {
  GetBillingPortalConfigurationsConfigurationOperation,
  PostBillingPortalConfigurationsConfigurationInput,
  PostBillingPortalConfigurationsConfigurationOperation,
  type PostBillingPortalConfigurationsConfigurationOutput,
  PostBillingPortalConfigurationsInput,
  PostBillingPortalConfigurationsOperation,
  type PostBillingPortalConfigurationsOutput,
} from "../billingPortalConfigurations.js";
import type { StripeBillingPortalConfigurationPropsEntity } from "../resourceInputs/StripeBillingPortalConfigurationPropsEntitySchema.js";
import type { StripeBillingPortalConfigurationProps } from "../resourceInputs/StripeBillingPortalConfigurationPropsSchema.js";
import {
  type StripeBillingPortalConfigurationOutputs,
  StripeBillingPortalConfigurationOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeBillingPortalConfigurationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeBillingPortalConfigurationOutputs(
  state: Pick<PostBillingPortalConfigurationsOutput, "id">,
): StripeBillingPortalConfigurationOutputs {
  const outputs: StripeBillingPortalConfigurationOutputs = {
    BillingPortalConfigurationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeBillingPortalConfigurationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeBillingPortalConfigurationReadInput(
  outputs: StripeBillingPortalConfigurationOutputs,
): GetBillingPortalConfigurationsConfigurationInput {
  const input: GetBillingPortalConfigurationsConfigurationInput = {
    configuration: outputs.BillingPortalConfigurationId,
  };

  return input;
}

/**
 * The StripeBillingPortalConfigurationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeBillingPortalConfigurationResourceClient extends Context.Service<StripeBillingPortalConfigurationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/BillingPortalConfiguration/StripeBillingPortalConfigurationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeBillingPortalConfiguration.create")(
        function* (props: StripeBillingPortalConfigurationProps) {
          const input: PostBillingPortalConfigurationsInput =
            yield* Schema.decodeUnknownEffect(
              PostBillingPortalConfigurationsInput,
            )(props);
          const created: PostBillingPortalConfigurationsOutput =
            yield* client.invoke(
              PostBillingPortalConfigurationsOperation,
              input,
            );
          return created;
        },
      );

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeBillingPortalConfiguration.read")(
        function* (outputs: StripeBillingPortalConfigurationOutputs) {
          const input: GetBillingPortalConfigurationsConfigurationInput =
            bindStripeBillingPortalConfigurationReadInput(outputs);
          const observed: GetBillingPortalConfigurationsConfigurationOutput =
            yield* client.invoke(
              GetBillingPortalConfigurationsConfigurationOperation,
              input,
            );
          return observed;
        },
      );

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeBillingPortalConfiguration.update")(
        function* (
          outputs: StripeBillingPortalConfigurationOutputs,
          changes: Omit<
            PostBillingPortalConfigurationsConfigurationInput,
            "configuration"
          >,
        ) {
          const input: PostBillingPortalConfigurationsConfigurationInput =
            yield* Schema.decodeEffect(
              PostBillingPortalConfigurationsConfigurationInput,
            )({
              ...changes,
              configuration: outputs.BillingPortalConfigurationId,
            });
          const changed: PostBillingPortalConfigurationsConfigurationOutput =
            yield* client.invoke(
              PostBillingPortalConfigurationsConfigurationOperation,
              input,
            );
          return changed;
        },
      );

      return {
        create,
        read,
        update,
      };
    }),
  },
) {}

export const stripeBillingPortalConfigurationResourceClientLayer = Layer.effect(
  StripeBillingPortalConfigurationResourceClient,
  StripeBillingPortalConfigurationResourceClient.make,
);
export const StripeBillingPortalConfigurationResourceTypeSchema = Schema.Struct(
  {
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("billing-portal-configuration"),
  },
);

/**
 * The StripeBillingPortalConfigurationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeBillingPortalConfigurationResource<
  Props = StripeBillingPortalConfigurationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "billing-portal-configuration";
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
        resource: "billing-portal-configuration",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get BillingPortalConfigurationId(): Required<StripeBillingPortalConfigurationOutputs>["BillingPortalConfigurationId"] {
    const value: Required<StripeBillingPortalConfigurationOutputs>["BillingPortalConfigurationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "BillingPortalConfigurationId",
        StripeBillingPortalConfigurationOutputsSchema.fields
          .BillingPortalConfigurationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeBillingPortalConfigurationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeBillingPortalConfigurationResource<Props> {
  const resource: StripeBillingPortalConfigurationResource<Props> =
    new StripeBillingPortalConfigurationResource<Props>(key, props, binding);

  return resource;
}
