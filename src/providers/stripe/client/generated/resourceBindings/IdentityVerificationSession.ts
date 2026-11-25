import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetIdentityVerificationSessionsSessionInput,
  GetIdentityVerificationSessionsSessionOutput,
} from "../identityVerificationSessions.js";
import {
  GetIdentityVerificationSessionsSessionOperation,
  PostIdentityVerificationSessionsInput,
  PostIdentityVerificationSessionsOperation,
  type PostIdentityVerificationSessionsOutput,
  PostIdentityVerificationSessionsSessionInput,
  PostIdentityVerificationSessionsSessionOperation,
  type PostIdentityVerificationSessionsSessionOutput,
} from "../identityVerificationSessions.js";
import type { StripeIdentityVerificationSessionPropsEntity } from "../resourceInputs/StripeIdentityVerificationSessionPropsEntitySchema.js";
import type { StripeIdentityVerificationSessionProps } from "../resourceInputs/StripeIdentityVerificationSessionPropsSchema.js";
import {
  type StripeIdentityVerificationSessionOutputs,
  StripeIdentityVerificationSessionOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeIdentityVerificationSessionOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeIdentityVerificationSessionOutputs(
  state: Pick<PostIdentityVerificationSessionsOutput, "id">,
): StripeIdentityVerificationSessionOutputs {
  const outputs: StripeIdentityVerificationSessionOutputs = {
    IdentityVerificationSessionId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeIdentityVerificationSessionReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeIdentityVerificationSessionReadInput(
  outputs: StripeIdentityVerificationSessionOutputs,
): GetIdentityVerificationSessionsSessionInput {
  const input: GetIdentityVerificationSessionsSessionInput = {
    session: outputs.IdentityVerificationSessionId,
  };

  return input;
}

/**
 * The StripeIdentityVerificationSessionResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeIdentityVerificationSessionResourceClient extends Context.Service<StripeIdentityVerificationSessionResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/IdentityVerificationSession/StripeIdentityVerificationSessionResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeIdentityVerificationSession.create")(
        function* (props: StripeIdentityVerificationSessionProps) {
          const input: PostIdentityVerificationSessionsInput =
            yield* Schema.decodeUnknownEffect(
              PostIdentityVerificationSessionsInput,
            )(props);
          const created: PostIdentityVerificationSessionsOutput =
            yield* client.invoke(
              PostIdentityVerificationSessionsOperation,
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
      const read = Effect.fn("StripeIdentityVerificationSession.read")(
        function* (outputs: StripeIdentityVerificationSessionOutputs) {
          const input: GetIdentityVerificationSessionsSessionInput =
            bindStripeIdentityVerificationSessionReadInput(outputs);
          const observed: GetIdentityVerificationSessionsSessionOutput =
            yield* client.invoke(
              GetIdentityVerificationSessionsSessionOperation,
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
      const update = Effect.fn("StripeIdentityVerificationSession.update")(
        function* (
          outputs: StripeIdentityVerificationSessionOutputs,
          changes: Omit<
            PostIdentityVerificationSessionsSessionInput,
            "session"
          >,
        ) {
          const input: PostIdentityVerificationSessionsSessionInput =
            yield* Schema.decodeEffect(
              PostIdentityVerificationSessionsSessionInput,
            )({
              ...changes,
              session: outputs.IdentityVerificationSessionId,
            });
          const changed: PostIdentityVerificationSessionsSessionOutput =
            yield* client.invoke(
              PostIdentityVerificationSessionsSessionOperation,
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

export const stripeIdentityVerificationSessionResourceClientLayer =
  Layer.effect(
    StripeIdentityVerificationSessionResourceClient,
    StripeIdentityVerificationSessionResourceClient.make,
  );
export const StripeIdentityVerificationSessionResourceTypeSchema =
  Schema.Struct({
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("identity-verification-session"),
  });

/**
 * The StripeIdentityVerificationSessionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeIdentityVerificationSessionResource<
  Props = StripeIdentityVerificationSessionPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "identity-verification-session";
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
        resource: "identity-verification-session",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IdentityVerificationSessionId(): Required<StripeIdentityVerificationSessionOutputs>["IdentityVerificationSessionId"] {
    const value: Required<StripeIdentityVerificationSessionOutputs>["IdentityVerificationSessionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IdentityVerificationSessionId",
        StripeIdentityVerificationSessionOutputsSchema.fields
          .IdentityVerificationSessionId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeIdentityVerificationSessionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeIdentityVerificationSessionResource<Props> {
  const resource: StripeIdentityVerificationSessionResource<Props> =
    new StripeIdentityVerificationSessionResource<Props>(key, props, binding);

  return resource;
}
