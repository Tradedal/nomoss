import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetApplePayDomainsDomainInput,
  GetApplePayDomainsDomainOutput,
} from "../applePayDomains.js";
import {
  GetApplePayDomainsDomainOperation,
  PostApplePayDomainsInput,
  PostApplePayDomainsOperation,
  type PostApplePayDomainsOutput,
} from "../applePayDomains.js";
import type { StripeApplePayDomainPropsEntity } from "../resourceInputs/StripeApplePayDomainPropsEntitySchema.js";
import type { StripeApplePayDomainProps } from "../resourceInputs/StripeApplePayDomainPropsSchema.js";
import {
  type StripeApplePayDomainOutputs,
  StripeApplePayDomainOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeApplePayDomainOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeApplePayDomainOutputs(
  state: Pick<PostApplePayDomainsOutput, "id">,
): StripeApplePayDomainOutputs {
  const outputs: StripeApplePayDomainOutputs = {
    ApplePayDomainId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeApplePayDomainReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeApplePayDomainReadInput(
  outputs: StripeApplePayDomainOutputs,
): GetApplePayDomainsDomainInput {
  const input: GetApplePayDomainsDomainInput = {
    domain: outputs.ApplePayDomainId,
  };

  return input;
}

/**
 * The StripeApplePayDomainResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeApplePayDomainResourceClient extends Context.Service<StripeApplePayDomainResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ApplePayDomain/StripeApplePayDomainResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeApplePayDomain.create")(function* (
        props: StripeApplePayDomainProps,
      ) {
        const input: PostApplePayDomainsInput =
          yield* Schema.decodeUnknownEffect(PostApplePayDomainsInput)(props);
        const created: PostApplePayDomainsOutput = yield* client.invoke(
          PostApplePayDomainsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeApplePayDomain.read")(function* (
        outputs: StripeApplePayDomainOutputs,
      ) {
        const input: GetApplePayDomainsDomainInput =
          bindStripeApplePayDomainReadInput(outputs);
        const observed: GetApplePayDomainsDomainOutput = yield* client.invoke(
          GetApplePayDomainsDomainOperation,
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

export const stripeApplePayDomainResourceClientLayer = Layer.effect(
  StripeApplePayDomainResourceClient,
  StripeApplePayDomainResourceClient.make,
);
export const StripeApplePayDomainResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("apple-pay-domain"),
});

/**
 * The StripeApplePayDomainResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeApplePayDomainResource<
  Props = StripeApplePayDomainPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "apple-pay-domain";
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
        resource: "apple-pay-domain",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ApplePayDomainId(): Required<StripeApplePayDomainOutputs>["ApplePayDomainId"] {
    const value: Required<StripeApplePayDomainOutputs>["ApplePayDomainId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ApplePayDomainId",
        StripeApplePayDomainOutputsSchema.fields.ApplePayDomainId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeApplePayDomainDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeApplePayDomainResource<Props> {
  const resource: StripeApplePayDomainResource<Props> =
    new StripeApplePayDomainResource<Props>(key, props, binding);

  return resource;
}
