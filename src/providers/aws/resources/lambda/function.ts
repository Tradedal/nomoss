import {
  Array as Arr,
  Data,
  Effect,
  Layer,
  Match,
  Option,
  Schedule,
  Schema,
  Struct,
  Tuple,
} from "effect";
import { Digest } from "effect/crypto";
import { Base64 } from "effect/encoding";
import {
  AssetError,
  AssetSchema,
  Assets,
  assetsLayer,
} from "../../../../core/asset.js";
import {
  type ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../../../core/resource/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  resourceGeneration,
  resourceModelLayer,
} from "../../../../core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandStackName,
} from "../../../../core/resource/resourceCommandPolicy.js";
import { providerCommandPolicyTag } from "../../../resourceCommandPolicyLayer.js";
import {
  FunctionCode,
  makeLambdaClient,
} from "../../client/generated/lambda.js";
import {
  AWSFunctionRequestSchema,
  AWSFunctionResourceSchema,
} from "../generated/native/lambda/function/index.js";

const fields = AWSFunctionRequestSchema.fields;
/** The settings schema selects the configuration that this native Lambda policy sends on creation and update. */
const settings = Schema.Struct({
  Description: fields.Description,
  Handler: fields.Handler,
  MemorySize: fields.MemorySize,
  Role: fields.Role,
  Runtime: fields.Runtime,
  Timeout: fields.Timeout,
});
const request = settings.pipe(
  Schema.fieldsAssign({
    FunctionName: fields.FunctionName,
    Code: Schema.Union([AssetSchema, fields.Code]),
  }),
);
/** The identity schema requires the saved function name before a provider read, update, or deletion. */
const identity = Schema.Struct({
  FunctionName: Schema.requiredKey(fields.FunctionName),
});
const equal = Schema.toEquivalence(Schema.Json);
const isMissing = (error: { readonly _tag: string; readonly code?: string }) =>
  error._tag === "AwsServiceError" &&
  error.code === "ResourceNotFoundException";

/** The FunctionDeploymentFailed error preserves a readiness failure while core retains the saved operation for retry. */
class FunctionDeploymentFailed extends Data.TaggedError(
  "FunctionDeploymentFailed",
)<{
  readonly logicalId: string;
  readonly message: string;
}> {}

/**
 * The functionCommands Layer creates functions from planned assets and updates
 * configuration before code. Each mutation waits up to three minutes for
 * readiness. Local code must match the reported CodeSha256 before core saves
 * the applied declaration. Removing a saved configuration field fails before
 * mutation because this policy has no reset values for those fields.
 *
 * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (CreateFunction, UpdateFunctionConfiguration, UpdateFunctionCode, FunctionConfiguration.CodeSha256)
 * @see ../../../../../node_modules/effect/src/Effect.ts (repeat and retry)
 */
export const functionCommands = Layer.effect(
  providerCommandPolicyTag(AWSFunctionResourceSchema),
  Effect.gen(function* () {
    const client = yield* makeLambdaClient;
    const model = yield* ResourceModel;
    const assets = yield* Assets;
    const digest = yield* Digest.Digest;

    /** The read function returns validated provider outputs or absence when Lambda reports ResourceNotFoundException. */
    const read = Effect.fn("Function.read")(function* (node: ResourceNode) {
      const key = yield* Schema.decodeUnknownEffect(identity)(node.outputs);

      return yield* client.getFunctionConfiguration(key).pipe(
        Effect.flatMap((observed) =>
          model
            .withObservedOutputs(
              node,
              Struct.assign(observed, { Arn: observed.FunctionArn }),
            )
            .pipe(Effect.map((node) => ({ node, observed }))),
        ),
        Effect.map(Option.some),
        Effect.catchIf(isMissing, () => Effect.succeedNone),
      );
    });

    /**
     * The waitForConfiguration function waits for an active function with no
     * update in progress. Lambda's failure reason remains in the typed error;
     * timeout and interruption stop the local polling.
     *
     * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (GetFunctionConfiguration and FunctionConfiguration)
     * @see ../../../../../node_modules/effect/src/Effect.ts (repeat and timeout)
     */
    const waitForConfiguration = Effect.fn("Function.waitForConfiguration")(
      function* (node: ResourceNode) {
        const key = yield* Schema.decodeUnknownEffect(identity)(node.outputs);

        const observed = yield* client.getFunctionConfiguration(key).pipe(
          Effect.repeat({
            while: (value) =>
              value.State === "Pending" ||
              value.LastUpdateStatus === "InProgress",
            schedule: Schedule.spaced("1 second"),
          }),
          Effect.timeout("3 minutes"),
          Effect.filterOrFail(
            (value) =>
              value.State === "Active" && value.LastUpdateStatus !== "Failed",
            (value) =>
              new FunctionDeploymentFailed({
                logicalId: node.key.logicalId,
                message: `Function ${key.FunctionName} failed to become ready: ${value.LastUpdateStatusReason ?? value.StateReason ?? value.State}.`,
              }),
          ),
        );

        return observed;
      },
    );

    /** The waitFor function checks the planned asset digest after readiness and returns the validated node that core can persist. */
    const waitFor = Effect.fn("Function.waitFor")(function* (
      node: ResourceNode,
    ) {
      const observed = yield* waitForConfiguration(node);
      const props = yield* model.decodeProps(node, Schema.JsonObject);

      yield* Effect.fail(
        new FunctionDeploymentFailed({
          logicalId: node.key.logicalId,
          message: `Function ${observed.FunctionName} reports a different code digest. Saved state was kept.`,
        }),
      ).pipe(
        Effect.when(
          Effect.succeed(
            Schema.is(AssetSchema)(props.Code) &&
              props.Code.digest !== observed.CodeSha256,
          ),
        ),
      );

      const ready: ResourceNode = yield* model.withObservedOutputs(
        node,
        Struct.assign(observed, { Arn: observed.FunctionArn }),
      );

      return ready;
    });

    /**
     * The codeInput function encodes retained asset bytes for a direct upload,
     * rejecting archives above 50 MiB. Other code locations pass through the
     * generated FunctionCode schema before the client receives them.
     *
     * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (FunctionCode.ZipFile)
     */
    const codeInput = Effect.fn("Function.codeInput")(function* (
      code: (typeof request.Type)["Code"],
    ) {
      const asset = Option.liftPredicate(code, Schema.is(AssetSchema));
      const bytes = yield* asset.pipe(
        Option.map(assets.bytes),
        Effect.transposeOption,
      );

      yield* Effect.fail(
        new AssetError({
          path: "Code",
          message: "The code asset exceeds the direct upload limit of 50 MiB.",
        }),
      ).pipe(
        Effect.when(
          Effect.succeed(
            Option.exists(
              bytes,
              (bytes) => bytes.byteLength > 50 * 1024 * 1024,
            ),
          ),
        ),
      );

      return yield* Option.match(bytes, {
        onSome: (bytes) => Effect.succeed({ ZipFile: Base64.encode(bytes) }),
        onNone: () => Schema.decodeUnknownEffect(FunctionCode)(code),
      });
    });

    /**
     * The create function uses an explicit name or derives one from the stack,
     * logical ID, and generation. A new IAM role can take time to become
     * assumable; the documented assume-role rejection is retried for up to
     * three minutes before creation fails.
     */
    const create = Effect.fn("Function.create")(function* (node: ResourceNode) {
      const props = yield* model.decodeProps(node, request);
      const configuration = yield* Schema.decodeUnknownEffect(settings)(props);
      const code = yield* codeInput(props.Code);

      const FunctionName = yield* Option.fromUndefinedOr(
        props.FunctionName,
      ).pipe(
        Effect.fromOption,
        Effect.catch(() =>
          ResourceCommandStackName.pipe(
            Effect.flatMap(Effect.fromOption),
            Effect.map((stack) =>
              Tuple.make(stack, node.key.logicalId, resourceGeneration(node)),
            ),
            Effect.flatMap(
              Schema.encodeEffect(Schema.fromJsonString(Schema.Json)),
            ),
            Effect.flatMap((seed) =>
              digest.digestHex(Digest.sha256, new TextEncoder().encode(seed)),
            ),
            Effect.map((hash) => `nomoss-${hash.substring(0, 56)}`),
          ),
        ),
      );
      const created = yield* client
        .createFunction(
          Struct.assign(configuration, { FunctionName, Code: code }),
        )
        .pipe(
          Effect.retry({
            while: (error) =>
              error._tag === "AwsServiceError" &&
              error.code === "InvalidParameterValueException" &&
              error.message.includes(
                "The role defined for the function cannot be assumed by Lambda",
              ),
            schedule: Schedule.spaced("1 second").pipe(
              Schedule.upTo({ duration: "3 minutes" }),
            ),
          }),
        );

      const identified = yield* model.withOutputs(node, {
        FunctionName: created.FunctionName ?? FunctionName,
      });
      const ready = yield* waitFor(identified);

      const result: ResourceCommandResult = ResourceCommandResult.Created({
        node: ready,
      });

      return result;
    });

    /**
     * The update function changes configuration and code only when their
     * saved inputs differ. Configuration must finish before code can change.
     * The returned node confirms readiness and the planned local code digest.
     */
    const update = Effect.fn("Function.update")(function* (
      node: ResourceNode,
      current: ResourceNode,
    ) {
      const props = yield* model.decodeProps(node, request);
      const configuration = yield* Schema.decodeUnknownEffect(settings)(props);
      const code = yield* codeInput(props.Code);
      const saved = yield* model.decodeProps(current, request);
      const previous = yield* Schema.decodeUnknownEffect(settings)(saved);
      const key = yield* Schema.decodeUnknownEffect(identity)(current.outputs);

      yield* Effect.fail(
        new ResourceCommandUnsupported({
          command: {
            _tag: "Apply",
            decision: { _tag: "Update", node, current },
          },
        }),
      ).pipe(
        Effect.when(
          Effect.succeed(
            Arr.some(
              Struct.keys(previous),
              (key) => !Arr.contains(Struct.keys(configuration), key),
            ),
          ),
        ),
      );

      const identified = yield* model.withOutputs(node, current.outputs);
      const configChanged = !equal(configuration, previous);
      const codeChanged = !equal(props.Code, saved.Code);

      // The UpdateFunctionConfiguration operation completes before the code
      // mutation starts. GetFunctionConfiguration supplies the status fields
      // described by the pinned model's UpdateFunctionConfiguration guide.
      yield* client
        .updateFunctionConfiguration(Struct.assign(configuration, key))
        .pipe(
          Effect.andThen(() => waitForConfiguration(identified)),
          Effect.when(Effect.succeed(configChanged)),
        );

      yield* client
        .updateFunctionCode(Struct.assign(code, key))
        .pipe(Effect.when(Effect.succeed(codeChanged)));

      const ready = yield* waitFor(identified);

      const result: ResourceCommandResult = ResourceCommandResult.Updated({
        node: ready,
      });

      return result;
    });

    /** The destroy function removes the saved function and confirms absence before returning; an already missing function also completes deletion. */
    const destroy = Effect.fn("Function.destroy")(function* (
      node: ResourceNode,
    ) {
      const key = yield* Schema.decodeUnknownEffect(identity)(node.outputs);

      yield* client
        .deleteFunction(key)
        .pipe(Effect.catchIf(isMissing, () => Effect.void));

      yield* read(node).pipe(
        Effect.repeat({
          while: Option.isSome,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("3 minutes"),
      );

      const result: ResourceCommandResult = ResourceCommandResult.Destroyed({
        node,
      });

      return result;
    });

    /** The execute service method dispatches supported lifecycle commands and preserves provider or validation failures inside ResourceCommandExecutionFailed. */
    const execute = Effect.fn("Function.execute")((command: ResourceCommand) =>
      Match.value(command).pipe(
        Match.tag("Read", ({ node }) =>
          read(node).pipe(
            Effect.map((value) => {
              const observation = Option.match(value, {
                onNone: () => ResourceObservation.Missing({ node }),
                onSome: ResourceObservation.Present,
              });

              return ResourceCommandResult.Observed({ observation });
            }),
          ),
        ),
        Match.tag("Create", ({ node }) => create(node)),
        Match.tag("Delete", "Destroy", ({ node }) => destroy(node)),
        Match.tag("Apply", ({ decision }) =>
          Match.value(decision).pipe(
            Match.tag("Create", ({ node }) => create(node)),
            Match.tag("Update", ({ node, current }) => update(node, current)),
            Match.tag("Delete", "Destroy", ({ node }) => destroy(node)),
            Match.orElse(() =>
              Effect.fail(new ResourceCommandUnsupported({ command })),
            ),
          ),
        ),
        Match.orElse(() =>
          Effect.fail(new ResourceCommandUnsupported({ command })),
        ),
        Effect.mapError(
          (cause) => new ResourceCommandExecutionFailed({ command, cause }),
        ),
      ),
    );

    return { execute };
  }),
).pipe(Layer.provide([resourceModelLayer, assetsLayer, Digest.layerWebCrypto]));
