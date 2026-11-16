import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetReportingReportRunsReportRunInput,
  GetReportingReportRunsReportRunOutput,
} from "../reportingReportRuns.js";
import {
  GetReportingReportRunsReportRunOperation,
  PostReportingReportRunsInput,
  PostReportingReportRunsOperation,
  type PostReportingReportRunsOutput,
} from "../reportingReportRuns.js";
import type { StripeReportingReportRunPropsEntity } from "../resourceInputs/StripeReportingReportRunPropsEntitySchema.js";
import type { StripeReportingReportRunProps } from "../resourceInputs/StripeReportingReportRunPropsSchema.js";
import {
  type StripeReportingReportRunOutputs,
  StripeReportingReportRunOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeReportingReportRunOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeReportingReportRunOutputs(
  state: Pick<PostReportingReportRunsOutput, "id">,
): StripeReportingReportRunOutputs {
  const outputs: StripeReportingReportRunOutputs = {
    ReportingReportRunId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeReportingReportRunReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeReportingReportRunReadInput(
  outputs: StripeReportingReportRunOutputs,
): GetReportingReportRunsReportRunInput {
  const input: GetReportingReportRunsReportRunInput = {
    report_run: outputs.ReportingReportRunId,
  };

  return input;
}

/**
 * The StripeReportingReportRunResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeReportingReportRunResourceClient extends Context.Service<StripeReportingReportRunResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/ReportingReportRun/StripeReportingReportRunResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeReportingReportRun.create")(function* (
        props: StripeReportingReportRunProps,
      ) {
        const input: PostReportingReportRunsInput =
          yield* Schema.decodeUnknownEffect(PostReportingReportRunsInput)(
            props,
          );
        const created: PostReportingReportRunsOutput = yield* client.invoke(
          PostReportingReportRunsOperation,
          input,
        );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeReportingReportRun.read")(function* (
        outputs: StripeReportingReportRunOutputs,
      ) {
        const input: GetReportingReportRunsReportRunInput =
          bindStripeReportingReportRunReadInput(outputs);
        const observed: GetReportingReportRunsReportRunOutput =
          yield* client.invoke(GetReportingReportRunsReportRunOperation, input);
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeReportingReportRunResourceClientLayer = Layer.effect(
  StripeReportingReportRunResourceClient,
  StripeReportingReportRunResourceClient.make,
);
export const StripeReportingReportRunResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("billing"),
  resource: Schema.Literal("reporting-report-run"),
});

/**
 * The StripeReportingReportRunResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeReportingReportRunResource<
  Props = StripeReportingReportRunPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "reporting-report-run";
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
        resource: "reporting-report-run",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ReportingReportRunId(): Required<StripeReportingReportRunOutputs>["ReportingReportRunId"] {
    const value: Required<StripeReportingReportRunOutputs>["ReportingReportRunId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ReportingReportRunId",
        StripeReportingReportRunOutputsSchema.fields.ReportingReportRunId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeReportingReportRunDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeReportingReportRunResource<Props> {
  const resource: StripeReportingReportRunResource<Props> =
    new StripeReportingReportRunResource<Props>(key, props, binding);

  return resource;
}
