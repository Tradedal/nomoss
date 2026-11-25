import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTerminalLocationPropsEntity } from "../resourceInputs/StripeTerminalLocationPropsEntitySchema.js";
import type { StripeTerminalLocationProps } from "../resourceInputs/StripeTerminalLocationPropsSchema.js";
import {
  type StripeTerminalLocationOutputs,
  StripeTerminalLocationOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTerminalLocationsLocationInput,
  GetTerminalLocationsLocationOutput,
} from "../terminalLocations.js";
import {
  GetTerminalLocationsLocationOperation,
  PostTerminalLocationsInput,
  PostTerminalLocationsLocationInput,
  PostTerminalLocationsLocationOperation,
  type PostTerminalLocationsLocationOutput,
  PostTerminalLocationsOperation,
  type PostTerminalLocationsOutput,
} from "../terminalLocations.js";

/**
 * The projectStripeTerminalLocationOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTerminalLocationOutputs(
  state: Pick<PostTerminalLocationsOutput, "id">,
): StripeTerminalLocationOutputs {
  const outputs: StripeTerminalLocationOutputs = {
    TerminalLocationId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTerminalLocationReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTerminalLocationReadInput(
  outputs: StripeTerminalLocationOutputs,
): GetTerminalLocationsLocationInput {
  const input: GetTerminalLocationsLocationInput = {
    location: outputs.TerminalLocationId,
  };

  return input;
}

/**
 * The StripeTerminalLocationResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTerminalLocationResourceClient extends Context.Service<StripeTerminalLocationResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TerminalLocation/StripeTerminalLocationResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTerminalLocation.create")(function* (
        props: StripeTerminalLocationProps,
      ) {
        const input: PostTerminalLocationsInput =
          yield* Schema.decodeUnknownEffect(PostTerminalLocationsInput)(props);
        const created: PostTerminalLocationsOutput = yield* client.invoke(
          PostTerminalLocationsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTerminalLocation.read")(function* (
        outputs: StripeTerminalLocationOutputs,
      ) {
        const input: GetTerminalLocationsLocationInput =
          bindStripeTerminalLocationReadInput(outputs);
        const observed: GetTerminalLocationsLocationOutput =
          yield* client.invoke(GetTerminalLocationsLocationOperation, input);
        return observed;
      });

      /**
       * The update service method identifies the object through saved outputs.
       * Changes follow the selected update operation's input contract. Identity
       * comes from saved outputs and takes precedence over supplied changes.
       * The result is the decoded provider response; validation and API failures propagate.
       */
      const update = Effect.fn("StripeTerminalLocation.update")(function* (
        outputs: StripeTerminalLocationOutputs,
        changes: Omit<PostTerminalLocationsLocationInput, "location">,
      ) {
        const input: PostTerminalLocationsLocationInput =
          yield* Schema.decodeEffect(PostTerminalLocationsLocationInput)({
            ...changes,
            location: outputs.TerminalLocationId,
          });
        const changed: PostTerminalLocationsLocationOutput =
          yield* client.invoke(PostTerminalLocationsLocationOperation, input);
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

export const stripeTerminalLocationResourceClientLayer = Layer.effect(
  StripeTerminalLocationResourceClient,
  StripeTerminalLocationResourceClient.make,
);
export const StripeTerminalLocationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("terminal-location"),
});

/**
 * The StripeTerminalLocationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTerminalLocationResource<
  Props = StripeTerminalLocationPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "terminal-location";
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
        resource: "terminal-location",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TerminalLocationId(): Required<StripeTerminalLocationOutputs>["TerminalLocationId"] {
    const value: Required<StripeTerminalLocationOutputs>["TerminalLocationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TerminalLocationId",
        StripeTerminalLocationOutputsSchema.fields.TerminalLocationId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTerminalLocationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTerminalLocationResource<Props> {
  const resource: StripeTerminalLocationResource<Props> =
    new StripeTerminalLocationResource<Props>(key, props, binding);

  return resource;
}
