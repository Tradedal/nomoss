import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTerminalConfigurationPropsEntity } from "../resourceInputs/StripeTerminalConfigurationPropsEntitySchema.js";
import type { StripeTerminalConfigurationProps } from "../resourceInputs/StripeTerminalConfigurationPropsSchema.js";
import {
  type StripeTerminalConfigurationOutputs,
  StripeTerminalConfigurationOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTerminalConfigurationsConfigurationInput,
  GetTerminalConfigurationsConfigurationOutput,
} from "../terminalConfigurations.js";
import {
  GetTerminalConfigurationsConfigurationOperation,
  PostTerminalConfigurationsConfigurationInput,
  PostTerminalConfigurationsConfigurationOperation,
  type PostTerminalConfigurationsConfigurationOutput,
  PostTerminalConfigurationsInput,
  PostTerminalConfigurationsOperation,
  type PostTerminalConfigurationsOutput,
} from "../terminalConfigurations.js";

/**
 * The projectStripeTerminalConfigurationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTerminalConfigurationOutputs(
  state: Pick<PostTerminalConfigurationsOutput, "id">,
): StripeTerminalConfigurationOutputs {
  const outputs: StripeTerminalConfigurationOutputs = {
    TerminalConfigurationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTerminalConfigurationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTerminalConfigurationReadInput(
  outputs: StripeTerminalConfigurationOutputs,
): GetTerminalConfigurationsConfigurationInput {
  const input: GetTerminalConfigurationsConfigurationInput = {
    configuration: outputs.TerminalConfigurationId,
  };

  return input;
}

/**
 * The StripeTerminalConfigurationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTerminalConfigurationResourceClient extends Context.Service<StripeTerminalConfigurationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TerminalConfiguration/StripeTerminalConfigurationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTerminalConfiguration.create")(function* (
        props: StripeTerminalConfigurationProps,
      ) {
        const input: PostTerminalConfigurationsInput =
          yield* Schema.decodeUnknownEffect(PostTerminalConfigurationsInput)(
            props,
          );
        const created: PostTerminalConfigurationsOutput = yield* client.invoke(
          PostTerminalConfigurationsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTerminalConfiguration.read")(function* (
        outputs: StripeTerminalConfigurationOutputs,
      ) {
        const input: GetTerminalConfigurationsConfigurationInput =
          bindStripeTerminalConfigurationReadInput(outputs);
        const observed: GetTerminalConfigurationsConfigurationOutput =
          yield* client.invoke(
            GetTerminalConfigurationsConfigurationOperation,
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
      const update = Effect.fn("StripeTerminalConfiguration.update")(function* (
        outputs: StripeTerminalConfigurationOutputs,
        changes: Omit<
          PostTerminalConfigurationsConfigurationInput,
          "configuration"
        >,
      ) {
        const input: PostTerminalConfigurationsConfigurationInput =
          yield* Schema.decodeEffect(
            PostTerminalConfigurationsConfigurationInput,
          )({
            ...changes,
            configuration: outputs.TerminalConfigurationId,
          });
        const changed: PostTerminalConfigurationsConfigurationOutput =
          yield* client.invoke(
            PostTerminalConfigurationsConfigurationOperation,
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

export const stripeTerminalConfigurationResourceClientLayer = Layer.effect(
  StripeTerminalConfigurationResourceClient,
  StripeTerminalConfigurationResourceClient.make,
);
export const StripeTerminalConfigurationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("terminal-configuration"),
});

/**
 * The StripeTerminalConfigurationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTerminalConfigurationResource<
  Props = StripeTerminalConfigurationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "terminal-configuration";
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
        resource: "terminal-configuration",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TerminalConfigurationId(): Required<StripeTerminalConfigurationOutputs>["TerminalConfigurationId"] {
    const value: Required<StripeTerminalConfigurationOutputs>["TerminalConfigurationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TerminalConfigurationId",
        StripeTerminalConfigurationOutputsSchema.fields.TerminalConfigurationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTerminalConfigurationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTerminalConfigurationResource<Props> {
  const resource: StripeTerminalConfigurationResource<Props> =
    new StripeTerminalConfigurationResource<Props>(key, props, binding);

  return resource;
}
