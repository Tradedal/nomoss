import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type { StripeTestHelpersTestClockPropsEntity } from "../resourceInputs/StripeTestHelpersTestClockPropsEntitySchema.js";
import type { StripeTestHelpersTestClockProps } from "../resourceInputs/StripeTestHelpersTestClockPropsSchema.js";
import {
  type StripeTestHelpersTestClockOutputs,
  StripeTestHelpersTestClockOutputsSchema,
} from "../resourceOutputs.js";
import type {
  GetTestHelpersTestClocksTestClockInput,
  GetTestHelpersTestClocksTestClockOutput,
} from "../testHelpersTestClocks.js";
import {
  GetTestHelpersTestClocksTestClockOperation,
  PostTestHelpersTestClocksInput,
  PostTestHelpersTestClocksOperation,
  type PostTestHelpersTestClocksOutput,
  PostTestHelpersTestClocksTestClockAdvanceInput,
  PostTestHelpersTestClocksTestClockAdvanceOperation,
  type PostTestHelpersTestClocksTestClockAdvanceOutput,
} from "../testHelpersTestClocks.js";

/**
 * The projectStripeTestHelpersTestClockOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeTestHelpersTestClockOutputs(
  state: Pick<PostTestHelpersTestClocksOutput, "id">,
): StripeTestHelpersTestClockOutputs {
  const outputs: StripeTestHelpersTestClockOutputs = {
    TestHelpersTestClockId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeTestHelpersTestClockReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeTestHelpersTestClockReadInput(
  outputs: StripeTestHelpersTestClockOutputs,
): GetTestHelpersTestClocksTestClockInput {
  const input: GetTestHelpersTestClocksTestClockInput = {
    test_clock: outputs.TestHelpersTestClockId,
  };

  return input;
}

/**
 * The StripeTestHelpersTestClockResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeTestHelpersTestClockResourceClient extends Context.Service<StripeTestHelpersTestClockResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/TestHelpersTestClock/StripeTestHelpersTestClockResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeTestHelpersTestClock.create")(function* (
        props: StripeTestHelpersTestClockProps,
      ) {
        const input: PostTestHelpersTestClocksInput =
          yield* Schema.decodeUnknownEffect(PostTestHelpersTestClocksInput)(
            props,
          );
        const created: PostTestHelpersTestClocksOutput = yield* client.invoke(
          PostTestHelpersTestClocksOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeTestHelpersTestClock.read")(function* (
        outputs: StripeTestHelpersTestClockOutputs,
      ) {
        const input: GetTestHelpersTestClocksTestClockInput =
          bindStripeTestHelpersTestClockReadInput(outputs);
        const observed: GetTestHelpersTestClocksTestClockOutput =
          yield* client.invoke(
            GetTestHelpersTestClocksTestClockOperation,
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
      const update = Effect.fn("StripeTestHelpersTestClock.update")(function* (
        outputs: StripeTestHelpersTestClockOutputs,
        changes: Omit<
          PostTestHelpersTestClocksTestClockAdvanceInput,
          "test_clock"
        >,
      ) {
        const input: PostTestHelpersTestClocksTestClockAdvanceInput =
          yield* Schema.decodeEffect(
            PostTestHelpersTestClocksTestClockAdvanceInput,
          )({
            ...changes,
            test_clock: outputs.TestHelpersTestClockId,
          });
        const changed: PostTestHelpersTestClocksTestClockAdvanceOutput =
          yield* client.invoke(
            PostTestHelpersTestClocksTestClockAdvanceOperation,
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

export const stripeTestHelpersTestClockResourceClientLayer = Layer.effect(
  StripeTestHelpersTestClockResourceClient,
  StripeTestHelpersTestClockResourceClient.make,
);
export const StripeTestHelpersTestClockResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("test-helpers-test-clock"),
});

/**
 * The StripeTestHelpersTestClockResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeTestHelpersTestClockResource<
  Props = StripeTestHelpersTestClockPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "test-helpers-test-clock";
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
        resource: "test-helpers-test-clock",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get TestHelpersTestClockId(): Required<StripeTestHelpersTestClockOutputs>["TestHelpersTestClockId"] {
    const value: Required<StripeTestHelpersTestClockOutputs>["TestHelpersTestClockId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "TestHelpersTestClockId",
        StripeTestHelpersTestClockOutputsSchema.fields.TestHelpersTestClockId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeTestHelpersTestClockDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeTestHelpersTestClockResource<Props> {
  const resource: StripeTestHelpersTestClockResource<Props> =
    new StripeTestHelpersTestClockResource<Props>(key, props, binding);

  return resource;
}
