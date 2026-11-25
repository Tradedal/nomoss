import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTerminalReaderPropsEntity } from "../resourceInputs/StripeTerminalReaderPropsEntitySchema.js";
import type { StripeTerminalReaderProps } from "../resourceInputs/StripeTerminalReaderPropsSchema.js";
import {
  type StripeTerminalReaderOutputs,
  StripeTerminalReaderOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTerminalReadersReaderInput,
  GetTerminalReadersReaderOutput,
} from "../terminalReaders.js";
import {
  GetTerminalReadersReaderOperation,
  PostTerminalReadersInput,
  PostTerminalReadersOperation,
  type PostTerminalReadersOutput,
  PostTerminalReadersReaderInput,
  PostTerminalReadersReaderOperation,
  type PostTerminalReadersReaderOutput,
} from "../terminalReaders.js";

/**
 * The projectStripeTerminalReaderOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTerminalReaderOutputs(
  state: Pick<PostTerminalReadersOutput, "id">,
): StripeTerminalReaderOutputs {
  const outputs: StripeTerminalReaderOutputs = {
    TerminalReaderId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTerminalReaderReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTerminalReaderReadInput(
  outputs: StripeTerminalReaderOutputs,
): GetTerminalReadersReaderInput {
  const input: GetTerminalReadersReaderInput = {
    reader: outputs.TerminalReaderId,
  };

  return input;
}

/**
 * The StripeTerminalReaderResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTerminalReaderResourceClient extends Context.Service<StripeTerminalReaderResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TerminalReader/StripeTerminalReaderResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTerminalReader.create")(function* (
        props: StripeTerminalReaderProps,
      ) {
        const input: PostTerminalReadersInput =
          yield* Schema.decodeUnknownEffect(PostTerminalReadersInput)(props);
        const created: PostTerminalReadersOutput = yield* client.invoke(
          PostTerminalReadersOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTerminalReader.read")(function* (
        outputs: StripeTerminalReaderOutputs,
      ) {
        const input: GetTerminalReadersReaderInput =
          bindStripeTerminalReaderReadInput(outputs);
        const observed: GetTerminalReadersReaderOutput = yield* client.invoke(
          GetTerminalReadersReaderOperation,
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
      const update = Effect.fn("StripeTerminalReader.update")(function* (
        outputs: StripeTerminalReaderOutputs,
        changes: Omit<PostTerminalReadersReaderInput, "reader">,
      ) {
        const input: PostTerminalReadersReaderInput =
          yield* Schema.decodeEffect(PostTerminalReadersReaderInput)({
            ...changes,
            reader: outputs.TerminalReaderId,
          });
        const changed: PostTerminalReadersReaderOutput = yield* client.invoke(
          PostTerminalReadersReaderOperation,
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

export const stripeTerminalReaderResourceClientLayer = Layer.effect(
  StripeTerminalReaderResourceClient,
  StripeTerminalReaderResourceClient.make,
);
export const StripeTerminalReaderResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("terminal-reader"),
});

/**
 * The StripeTerminalReaderResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTerminalReaderResource<
  Props = StripeTerminalReaderPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "terminal-reader";
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
        resource: "terminal-reader",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TerminalReaderId(): Required<StripeTerminalReaderOutputs>["TerminalReaderId"] {
    const value: Required<StripeTerminalReaderOutputs>["TerminalReaderId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TerminalReaderId",
        StripeTerminalReaderOutputsSchema.fields.TerminalReaderId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTerminalReaderDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTerminalReaderResource<Props> {
  const resource: StripeTerminalReaderResource<Props> =
    new StripeTerminalReaderResource<Props>(key, props, binding);

  return resource;
}
