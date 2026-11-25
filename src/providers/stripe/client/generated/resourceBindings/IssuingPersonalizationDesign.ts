import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetIssuingPersonalizationDesignsPersonalizationDesignInput,
  GetIssuingPersonalizationDesignsPersonalizationDesignOutput,
} from "../issuingPersonalizationDesigns.js";
import {
  GetIssuingPersonalizationDesignsPersonalizationDesignOperation,
  PostIssuingPersonalizationDesignsInput,
  PostIssuingPersonalizationDesignsOperation,
  type PostIssuingPersonalizationDesignsOutput,
  PostIssuingPersonalizationDesignsPersonalizationDesignInput,
  PostIssuingPersonalizationDesignsPersonalizationDesignOperation,
  type PostIssuingPersonalizationDesignsPersonalizationDesignOutput,
} from "../issuingPersonalizationDesigns.js";
import type { StripeIssuingPersonalizationDesignPropsEntity } from "../resourceInputs/StripeIssuingPersonalizationDesignPropsEntitySchema.js";
import type { StripeIssuingPersonalizationDesignProps } from "../resourceInputs/StripeIssuingPersonalizationDesignPropsSchema.js";
import {
  type StripeIssuingPersonalizationDesignOutputs,
  StripeIssuingPersonalizationDesignOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeIssuingPersonalizationDesignOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeIssuingPersonalizationDesignOutputs(
  state: Pick<PostIssuingPersonalizationDesignsOutput, "id">,
): StripeIssuingPersonalizationDesignOutputs {
  const outputs: StripeIssuingPersonalizationDesignOutputs = {
    IssuingPersonalizationDesignId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeIssuingPersonalizationDesignReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeIssuingPersonalizationDesignReadInput(
  outputs: StripeIssuingPersonalizationDesignOutputs,
): GetIssuingPersonalizationDesignsPersonalizationDesignInput {
  const input: GetIssuingPersonalizationDesignsPersonalizationDesignInput = {
    personalization_design: outputs.IssuingPersonalizationDesignId,
  };

  return input;
}

/**
 * The StripeIssuingPersonalizationDesignResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeIssuingPersonalizationDesignResourceClient extends Context.Service<StripeIssuingPersonalizationDesignResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/IssuingPersonalizationDesign/StripeIssuingPersonalizationDesignResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeIssuingPersonalizationDesign.create")(
        function* (props: StripeIssuingPersonalizationDesignProps) {
          const input: PostIssuingPersonalizationDesignsInput =
            yield* Schema.decodeUnknownEffect(
              PostIssuingPersonalizationDesignsInput,
            )(props);
          const created: PostIssuingPersonalizationDesignsOutput =
            yield* client.invoke(
              PostIssuingPersonalizationDesignsOperation,
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
      const read = Effect.fn("StripeIssuingPersonalizationDesign.read")(
        function* (outputs: StripeIssuingPersonalizationDesignOutputs) {
          const input: GetIssuingPersonalizationDesignsPersonalizationDesignInput =
            bindStripeIssuingPersonalizationDesignReadInput(outputs);
          const observed: GetIssuingPersonalizationDesignsPersonalizationDesignOutput =
            yield* client.invoke(
              GetIssuingPersonalizationDesignsPersonalizationDesignOperation,
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
      const update = Effect.fn("StripeIssuingPersonalizationDesign.update")(
        function* (
          outputs: StripeIssuingPersonalizationDesignOutputs,
          changes: Omit<
            PostIssuingPersonalizationDesignsPersonalizationDesignInput,
            "personalization_design"
          >,
        ) {
          const input: PostIssuingPersonalizationDesignsPersonalizationDesignInput =
            yield* Schema.decodeEffect(
              PostIssuingPersonalizationDesignsPersonalizationDesignInput,
            )({
              ...changes,
              personalization_design: outputs.IssuingPersonalizationDesignId,
            });
          const changed: PostIssuingPersonalizationDesignsPersonalizationDesignOutput =
            yield* client.invoke(
              PostIssuingPersonalizationDesignsPersonalizationDesignOperation,
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

export const stripeIssuingPersonalizationDesignResourceClientLayer =
  Layer.effect(
    StripeIssuingPersonalizationDesignResourceClient,
    StripeIssuingPersonalizationDesignResourceClient.make,
  );
export const StripeIssuingPersonalizationDesignResourceTypeSchema =
  Schema.Struct({
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("issuing-personalization-design"),
  });

/**
 * The StripeIssuingPersonalizationDesignResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeIssuingPersonalizationDesignResource<
  Props = StripeIssuingPersonalizationDesignPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "issuing-personalization-design";
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
        resource: "issuing-personalization-design",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IssuingPersonalizationDesignId(): Required<StripeIssuingPersonalizationDesignOutputs>["IssuingPersonalizationDesignId"] {
    const value: Required<StripeIssuingPersonalizationDesignOutputs>["IssuingPersonalizationDesignId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IssuingPersonalizationDesignId",
        StripeIssuingPersonalizationDesignOutputsSchema.fields
          .IssuingPersonalizationDesignId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeIssuingPersonalizationDesignDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeIssuingPersonalizationDesignResource<Props> {
  const resource: StripeIssuingPersonalizationDesignResource<Props> =
    new StripeIssuingPersonalizationDesignResource<Props>(key, props, binding);

  return resource;
}
