import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetFileLinksLinkInput,
  GetFileLinksLinkOutput,
} from "../fileLinks.js";
import {
  GetFileLinksLinkOperation,
  PostFileLinksInput,
  PostFileLinksLinkInput,
  PostFileLinksLinkOperation,
  type PostFileLinksLinkOutput,
  PostFileLinksOperation,
  type PostFileLinksOutput,
} from "../fileLinks.js";
import type { StripeFileLinkPropsEntity } from "../resourceInputs/StripeFileLinkPropsEntitySchema.js";
import type { StripeFileLinkProps } from "../resourceInputs/StripeFileLinkPropsSchema.js";
import {
  type StripeFileLinkOutputs,
  StripeFileLinkOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeFileLinkOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeFileLinkOutputs(
  state: Pick<PostFileLinksOutput, "id">,
): StripeFileLinkOutputs {
  const outputs: StripeFileLinkOutputs = {
    FileLinkId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeFileLinkReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeFileLinkReadInput(
  outputs: StripeFileLinkOutputs,
): GetFileLinksLinkInput {
  const input: GetFileLinksLinkInput = {
    link: outputs.FileLinkId,
  };

  return input;
}

/**
 * The StripeFileLinkResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeFileLinkResourceClient extends Context.Service<StripeFileLinkResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/FileLink/StripeFileLinkResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeFileLink.create")(function* (
        props: StripeFileLinkProps,
      ) {
        const input: PostFileLinksInput =
          yield* Schema.decodeUnknownEffect(PostFileLinksInput)(props);
        const created: PostFileLinksOutput = yield* client.invoke(
          PostFileLinksOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeFileLink.read")(function* (
        outputs: StripeFileLinkOutputs,
      ) {
        const input: GetFileLinksLinkInput =
          bindStripeFileLinkReadInput(outputs);
        const observed: GetFileLinksLinkOutput = yield* client.invoke(
          GetFileLinksLinkOperation,
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
      const update = Effect.fn("StripeFileLink.update")(function* (
        outputs: StripeFileLinkOutputs,
        changes: Omit<PostFileLinksLinkInput, "link">,
      ) {
        const input: PostFileLinksLinkInput = yield* Schema.decodeEffect(
          PostFileLinksLinkInput,
        )({
          ...changes,
          link: outputs.FileLinkId,
        });
        const changed: PostFileLinksLinkOutput = yield* client.invoke(
          PostFileLinksLinkOperation,
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

export const stripeFileLinkResourceClientLayer = Layer.effect(
  StripeFileLinkResourceClient,
  StripeFileLinkResourceClient.make,
);
export const StripeFileLinkResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("file-link"),
});

/**
 * The StripeFileLinkResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeFileLinkResource<
  Props = StripeFileLinkPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "file-link";
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
        resource: "file-link",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get FileLinkId(): Required<StripeFileLinkOutputs>["FileLinkId"] {
    const value: Required<StripeFileLinkOutputs>["FileLinkId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "FileLinkId",
        StripeFileLinkOutputsSchema.fields.FileLinkId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeFileLinkDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeFileLinkResource<Props> {
  const resource: StripeFileLinkResource<Props> =
    new StripeFileLinkResource<Props>(key, props, binding);

  return resource;
}
