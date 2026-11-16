import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeThreeDSecureAuthenticationPropsEntity } from "../resourceInputs/StripeThreeDSecureAuthenticationPropsEntitySchema.js";
import type { StripeThreeDSecureAuthenticationProps } from "../resourceInputs/StripeThreeDSecureAuthenticationPropsSchema.js";
import {
  type StripeThreeDSecureAuthenticationOutputs,
  StripeThreeDSecureAuthenticationOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetThreeDSecureAuthenticationsAuthenticationInput,
  GetThreeDSecureAuthenticationsAuthenticationOutput,
} from "../threeDSecureAuthentications.js";
import {
  GetThreeDSecureAuthenticationsAuthenticationOperation,
  PostThreeDSecureAuthenticationsInput,
  PostThreeDSecureAuthenticationsOperation,
  type PostThreeDSecureAuthenticationsOutput,
} from "../threeDSecureAuthentications.js";

/**
 * The projectStripeThreeDSecureAuthenticationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeThreeDSecureAuthenticationOutputs(
  state: Pick<PostThreeDSecureAuthenticationsOutput, "id">,
): StripeThreeDSecureAuthenticationOutputs {
  const outputs: StripeThreeDSecureAuthenticationOutputs = {
    ThreeDSecureAuthenticationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeThreeDSecureAuthenticationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeThreeDSecureAuthenticationReadInput(
  outputs: StripeThreeDSecureAuthenticationOutputs,
): GetThreeDSecureAuthenticationsAuthenticationInput {
  const input: GetThreeDSecureAuthenticationsAuthenticationInput = {
    authentication: outputs.ThreeDSecureAuthenticationId,
  };

  return input;
}

/**
 * The StripeThreeDSecureAuthenticationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeThreeDSecureAuthenticationResourceClient extends Context.Service<StripeThreeDSecureAuthenticationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ThreeDSecureAuthentication/StripeThreeDSecureAuthenticationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeThreeDSecureAuthentication.create")(
        function* (props: StripeThreeDSecureAuthenticationProps) {
          const input: PostThreeDSecureAuthenticationsInput =
            yield* Schema.decodeUnknownEffect(
              PostThreeDSecureAuthenticationsInput,
            )(props);
          const created: PostThreeDSecureAuthenticationsOutput =
            yield* client.invoke(
              PostThreeDSecureAuthenticationsOperation,
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
      const read = Effect.fn("StripeThreeDSecureAuthentication.read")(
        function* (outputs: StripeThreeDSecureAuthenticationOutputs) {
          const input: GetThreeDSecureAuthenticationsAuthenticationInput =
            bindStripeThreeDSecureAuthenticationReadInput(outputs);
          const observed: GetThreeDSecureAuthenticationsAuthenticationOutput =
            yield* client.invoke(
              GetThreeDSecureAuthenticationsAuthenticationOperation,
              input,
            );
          return observed;
        },
      );

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeThreeDSecureAuthenticationResourceClientLayer = Layer.effect(
  StripeThreeDSecureAuthenticationResourceClient,
  StripeThreeDSecureAuthenticationResourceClient.make,
);
export const StripeThreeDSecureAuthenticationResourceTypeSchema = Schema.Struct(
  {
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("three-dsecure-authentication"),
  },
);

/**
 * The StripeThreeDSecureAuthenticationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeThreeDSecureAuthenticationResource<
  Props = StripeThreeDSecureAuthenticationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "three-dsecure-authentication";
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
        resource: "three-dsecure-authentication",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ThreeDSecureAuthenticationId(): Required<StripeThreeDSecureAuthenticationOutputs>["ThreeDSecureAuthenticationId"] {
    const value: Required<StripeThreeDSecureAuthenticationOutputs>["ThreeDSecureAuthenticationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ThreeDSecureAuthenticationId",
        StripeThreeDSecureAuthenticationOutputsSchema.fields
          .ThreeDSecureAuthenticationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeThreeDSecureAuthenticationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeThreeDSecureAuthenticationResource<Props> {
  const resource: StripeThreeDSecureAuthenticationResource<Props> =
    new StripeThreeDSecureAuthenticationResource<Props>(key, props, binding);

  return resource;
}
