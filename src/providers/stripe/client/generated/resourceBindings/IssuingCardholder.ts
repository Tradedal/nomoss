import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetIssuingCardholdersCardholderInput,
  GetIssuingCardholdersCardholderOutput,
} from "../issuingCardholders.js";
import {
  GetIssuingCardholdersCardholderOperation,
  PostIssuingCardholdersCardholderInput,
  PostIssuingCardholdersCardholderOperation,
  type PostIssuingCardholdersCardholderOutput,
  PostIssuingCardholdersInput,
  PostIssuingCardholdersOperation,
  type PostIssuingCardholdersOutput,
} from "../issuingCardholders.js";
import type { StripeIssuingCardholderPropsEntity } from "../resourceInputs/StripeIssuingCardholderPropsEntitySchema.js";
import type { StripeIssuingCardholderProps } from "../resourceInputs/StripeIssuingCardholderPropsSchema.js";
import {
  type StripeIssuingCardholderOutputs,
  StripeIssuingCardholderOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeIssuingCardholderOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeIssuingCardholderOutputs(
  state: Pick<PostIssuingCardholdersOutput, "id">,
): StripeIssuingCardholderOutputs {
  const outputs: StripeIssuingCardholderOutputs = {
    IssuingCardholderId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeIssuingCardholderReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeIssuingCardholderReadInput(
  outputs: StripeIssuingCardholderOutputs,
): GetIssuingCardholdersCardholderInput {
  const input: GetIssuingCardholdersCardholderInput = {
    cardholder: outputs.IssuingCardholderId,
  };

  return input;
}

/**
 * The StripeIssuingCardholderResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeIssuingCardholderResourceClient extends Context.Service<StripeIssuingCardholderResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/IssuingCardholder/StripeIssuingCardholderResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeIssuingCardholder.create")(function* (
        props: StripeIssuingCardholderProps,
      ) {
        const input: PostIssuingCardholdersInput =
          yield* Schema.decodeUnknownEffect(PostIssuingCardholdersInput)(props);
        const created: PostIssuingCardholdersOutput = yield* client.invoke(
          PostIssuingCardholdersOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeIssuingCardholder.read")(function* (
        outputs: StripeIssuingCardholderOutputs,
      ) {
        const input: GetIssuingCardholdersCardholderInput =
          bindStripeIssuingCardholderReadInput(outputs);
        const observed: GetIssuingCardholdersCardholderOutput =
          yield* client.invoke(GetIssuingCardholdersCardholderOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeIssuingCardholder.update")(function* (
        outputs: StripeIssuingCardholderOutputs,
        changes: Omit<PostIssuingCardholdersCardholderInput, "cardholder">,
      ) {
        const input: PostIssuingCardholdersCardholderInput =
          yield* Schema.decodeEffect(PostIssuingCardholdersCardholderInput)({
            ...changes,
            cardholder: outputs.IssuingCardholderId,
          });
        const changed: PostIssuingCardholdersCardholderOutput =
          yield* client.invoke(
            PostIssuingCardholdersCardholderOperation,
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

export const stripeIssuingCardholderResourceClientLayer = Layer.effect(
  StripeIssuingCardholderResourceClient,
  StripeIssuingCardholderResourceClient.make,
);
export const StripeIssuingCardholderResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("issuing-cardholder"),
});

/**
 * The StripeIssuingCardholderResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeIssuingCardholderResource<
  Props = StripeIssuingCardholderPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "issuing-cardholder";
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
        resource: "issuing-cardholder",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IssuingCardholderId(): Required<StripeIssuingCardholderOutputs>["IssuingCardholderId"] {
    const value: Required<StripeIssuingCardholderOutputs>["IssuingCardholderId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IssuingCardholderId",
        StripeIssuingCardholderOutputsSchema.fields.IssuingCardholderId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeIssuingCardholderDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeIssuingCardholderResource<Props> {
  const resource: StripeIssuingCardholderResource<Props> =
    new StripeIssuingCardholderResource<Props>(key, props, binding);

  return resource;
}
