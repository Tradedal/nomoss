import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetFinancialConnectionsSessionsSessionInput,
  GetFinancialConnectionsSessionsSessionOutput,
} from "../financialConnectionsSessions.js";
import {
  GetFinancialConnectionsSessionsSessionOperation,
  PostFinancialConnectionsSessionsInput,
  PostFinancialConnectionsSessionsOperation,
  type PostFinancialConnectionsSessionsOutput,
} from "../financialConnectionsSessions.js";
import type { StripeFinancialConnectionsSessionPropsEntity } from "../resourceInputs/StripeFinancialConnectionsSessionPropsEntitySchema.js";
import type { StripeFinancialConnectionsSessionProps } from "../resourceInputs/StripeFinancialConnectionsSessionPropsSchema.js";
import {
  type StripeFinancialConnectionsSessionOutputs,
  StripeFinancialConnectionsSessionOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeFinancialConnectionsSessionOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeFinancialConnectionsSessionOutputs(
  state: Pick<PostFinancialConnectionsSessionsOutput, "id">,
): StripeFinancialConnectionsSessionOutputs {
  const outputs: StripeFinancialConnectionsSessionOutputs = {
    FinancialConnectionsSessionId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeFinancialConnectionsSessionReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeFinancialConnectionsSessionReadInput(
  outputs: StripeFinancialConnectionsSessionOutputs,
): GetFinancialConnectionsSessionsSessionInput {
  const input: GetFinancialConnectionsSessionsSessionInput = {
    session: outputs.FinancialConnectionsSessionId,
  };

  return input;
}

/**
 * The StripeFinancialConnectionsSessionResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeFinancialConnectionsSessionResourceClient extends Context.Service<StripeFinancialConnectionsSessionResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/FinancialConnectionsSession/StripeFinancialConnectionsSessionResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeFinancialConnectionsSession.create")(
        function* (props: StripeFinancialConnectionsSessionProps) {
          const input: PostFinancialConnectionsSessionsInput =
            yield* Schema.decodeUnknownEffect(
              PostFinancialConnectionsSessionsInput,
            )(props);
          const created: PostFinancialConnectionsSessionsOutput =
            yield* client.invoke(
              PostFinancialConnectionsSessionsOperation,
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
      const read = Effect.fn("StripeFinancialConnectionsSession.read")(
        function* (outputs: StripeFinancialConnectionsSessionOutputs) {
          const input: GetFinancialConnectionsSessionsSessionInput =
            bindStripeFinancialConnectionsSessionReadInput(outputs);
          const observed: GetFinancialConnectionsSessionsSessionOutput =
            yield* client.invoke(
              GetFinancialConnectionsSessionsSessionOperation,
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

export const stripeFinancialConnectionsSessionResourceClientLayer =
  Layer.effect(
    StripeFinancialConnectionsSessionResourceClient,
    StripeFinancialConnectionsSessionResourceClient.make,
  );
export const StripeFinancialConnectionsSessionResourceTypeSchema =
  Schema.Struct({
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("financial-connections-session"),
  });

/**
 * The StripeFinancialConnectionsSessionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeFinancialConnectionsSessionResource<
  Props = StripeFinancialConnectionsSessionPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "financial-connections-session";
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
        resource: "financial-connections-session",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get FinancialConnectionsSessionId(): Required<StripeFinancialConnectionsSessionOutputs>["FinancialConnectionsSessionId"] {
    const value: Required<StripeFinancialConnectionsSessionOutputs>["FinancialConnectionsSessionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "FinancialConnectionsSessionId",
        StripeFinancialConnectionsSessionOutputsSchema.fields
          .FinancialConnectionsSessionId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeFinancialConnectionsSessionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeFinancialConnectionsSessionResource<Props> {
  const resource: StripeFinancialConnectionsSessionResource<Props> =
    new StripeFinancialConnectionsSessionResource<Props>(key, props, binding);

  return resource;
}
