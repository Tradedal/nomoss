import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetCreditNotesIdInput,
  GetCreditNotesIdOutput,
} from "../creditNotes.js";
import {
  GetCreditNotesIdOperation,
  PostCreditNotesIdInput,
  PostCreditNotesIdOperation,
  type PostCreditNotesIdOutput,
  PostCreditNotesInput,
  PostCreditNotesOperation,
  type PostCreditNotesOutput,
} from "../creditNotes.js";
import type { StripeCreditNotePropsEntity } from "../resourceInputs/StripeCreditNotePropsEntitySchema.js";
import type { StripeCreditNoteProps } from "../resourceInputs/StripeCreditNotePropsSchema.js";
import {
  type StripeCreditNoteOutputs,
  StripeCreditNoteOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeCreditNoteOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeCreditNoteOutputs(
  state: Pick<PostCreditNotesOutput, "id">,
): StripeCreditNoteOutputs {
  const outputs: StripeCreditNoteOutputs = {
    CreditNoteId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeCreditNoteReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeCreditNoteReadInput(
  outputs: StripeCreditNoteOutputs,
): GetCreditNotesIdInput {
  const input: GetCreditNotesIdInput = {
    id: outputs.CreditNoteId,
  };

  return input;
}

/**
 * The StripeCreditNoteResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeCreditNoteResourceClient extends Context.Service<StripeCreditNoteResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/CreditNote/StripeCreditNoteResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeCreditNote.create")(function* (
        props: StripeCreditNoteProps,
      ) {
        const input: PostCreditNotesInput =
          yield* Schema.decodeUnknownEffect(PostCreditNotesInput)(props);
        const created: PostCreditNotesOutput = yield* client.invoke(
          PostCreditNotesOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeCreditNote.read")(function* (
        outputs: StripeCreditNoteOutputs,
      ) {
        const input: GetCreditNotesIdInput =
          bindStripeCreditNoteReadInput(outputs);
        const observed: GetCreditNotesIdOutput = yield* client.invoke(
          GetCreditNotesIdOperation,
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
      const update = Effect.fn("StripeCreditNote.update")(function* (
        outputs: StripeCreditNoteOutputs,
        changes: Omit<PostCreditNotesIdInput, "id">,
      ) {
        const input: PostCreditNotesIdInput = yield* Schema.decodeEffect(
          PostCreditNotesIdInput,
        )({
          ...changes,
          id: outputs.CreditNoteId,
        });
        const changed: PostCreditNotesIdOutput = yield* client.invoke(
          PostCreditNotesIdOperation,
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

export const stripeCreditNoteResourceClientLayer = Layer.effect(
  StripeCreditNoteResourceClient,
  StripeCreditNoteResourceClient.make,
);
export const StripeCreditNoteResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("credit-note"),
});

/**
 * The StripeCreditNoteResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeCreditNoteResource<
  Props = StripeCreditNotePropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "credit-note";
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
        resource: "credit-note",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get CreditNoteId(): Required<StripeCreditNoteOutputs>["CreditNoteId"] {
    const value: Required<StripeCreditNoteOutputs>["CreditNoteId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "CreditNoteId",
        StripeCreditNoteOutputsSchema.fields.CreditNoteId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeCreditNoteDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeCreditNoteResource<Props> {
  const resource: StripeCreditNoteResource<Props> =
    new StripeCreditNoteResource<Props>(key, props, binding);

  return resource;
}
