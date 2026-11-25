import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetAppsInstallsIdInput,
  GetAppsInstallsIdOutput,
} from "../appsInstalls.js";
import {
  GetAppsInstallsIdOperation,
  PostAppsInstallsIdInput,
  PostAppsInstallsIdOperation,
  type PostAppsInstallsIdOutput,
  PostAppsInstallsInput,
  PostAppsInstallsOperation,
  type PostAppsInstallsOutput,
} from "../appsInstalls.js";
import type { StripeAppsInstallPropsEntity } from "../resourceInputs/StripeAppsInstallPropsEntitySchema.js";
import type { StripeAppsInstallProps } from "../resourceInputs/StripeAppsInstallPropsSchema.js";
import {
  type StripeAppsInstallOutputs,
  StripeAppsInstallOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeAppsInstallOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeAppsInstallOutputs(
  state: Pick<PostAppsInstallsOutput, "id">,
): StripeAppsInstallOutputs {
  const outputs: StripeAppsInstallOutputs = {
    AppsInstallId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeAppsInstallReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeAppsInstallReadInput(
  outputs: StripeAppsInstallOutputs,
): GetAppsInstallsIdInput {
  const input: GetAppsInstallsIdInput = {
    id: outputs.AppsInstallId,
  };

  return input;
}

/**
 * The StripeAppsInstallResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeAppsInstallResourceClient extends Context.Service<StripeAppsInstallResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/AppsInstall/StripeAppsInstallResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeAppsInstall.create")(function* (
        props: StripeAppsInstallProps,
      ) {
        const input: PostAppsInstallsInput = yield* Schema.decodeUnknownEffect(
          PostAppsInstallsInput,
        )(props);
        const created: PostAppsInstallsOutput = yield* client.invoke(
          PostAppsInstallsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeAppsInstall.read")(function* (
        outputs: StripeAppsInstallOutputs,
      ) {
        const input: GetAppsInstallsIdInput =
          bindStripeAppsInstallReadInput(outputs);
        const observed: GetAppsInstallsIdOutput = yield* client.invoke(
          GetAppsInstallsIdOperation,
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
      const update = Effect.fn("StripeAppsInstall.update")(function* (
        outputs: StripeAppsInstallOutputs,
        changes: Omit<PostAppsInstallsIdInput, "id">,
      ) {
        const input: PostAppsInstallsIdInput = yield* Schema.decodeEffect(
          PostAppsInstallsIdInput,
        )({
          ...changes,
          id: outputs.AppsInstallId,
        });
        const changed: PostAppsInstallsIdOutput = yield* client.invoke(
          PostAppsInstallsIdOperation,
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

export const stripeAppsInstallResourceClientLayer = Layer.effect(
  StripeAppsInstallResourceClient,
  StripeAppsInstallResourceClient.make,
);
export const StripeAppsInstallResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("apps-install"),
});

/**
 * The StripeAppsInstallResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeAppsInstallResource<
  Props = StripeAppsInstallPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "apps-install";
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
        resource: "apps-install",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get AppsInstallId(): Required<StripeAppsInstallOutputs>["AppsInstallId"] {
    const value: Required<StripeAppsInstallOutputs>["AppsInstallId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "AppsInstallId",
        StripeAppsInstallOutputsSchema.fields.AppsInstallId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeAppsInstallDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeAppsInstallResource<Props> {
  const resource: StripeAppsInstallResource<Props> =
    new StripeAppsInstallResource<Props>(key, props, binding);

  return resource;
}
