import { NodeServices } from "@effect/platform-node";
import {
  Config,
  Context,
  Data,
  Effect,
  Layer,
  Option,
  String as Str,
  Stream,
} from "effect";
import { SecureRandom } from "effect/crypto";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import { NomossTracingLive } from "../../src/core/runtime/tracing.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import { resourceStateFileStorageLayer } from "../../src/core/state/stateStore.js";
import { awsCloudControlStackLayerLive } from "../../src/providers/aws/awsCloudControlRuntimeLayer.js";
import { AwsRegion } from "../../src/providers/aws/client/awsClientConfig.js";

export class AwsIntegrationCommandFailed extends Data.TaggedError(
  "AwsIntegrationCommandFailed",
)<{
  readonly arguments: ReadonlyArray<string>;
  readonly exitCode: number;
  readonly stderr: string;
}> {
  override get message() {
    return this.stderr;
  }
}

/**
 * AwsIntegrationCli uses the installed AWS CLI to verify object delivery from
 * S3 to SQS independently of Nomoss provisioning. CLI verification and the
 * generated Cloud Control client use the selected AWS credentials.
 */
export class AwsIntegrationCli extends Context.Service<AwsIntegrationCli>()(
  "nomoss/tests/support/awsIntegrationCli",
  {
    make: Effect.gen(function* () {
      const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;

      /**
       * The run service method returns trimmed command output or a failure with exit status
       * and stderr. Output consumption and process completion run together,
       * and interruption releases the process through the command scope.
       */
      const run = Effect.fn("AwsIntegrationCli.run")(function* (
        args: ReadonlyArray<string>,
        region: string,
      ) {
        yield* Effect.annotateCurrentSpan({
          "aws.cli.service": args[0],
          "aws.cli.operation": args[1],
          "aws.region": region,
        });

        const process = yield* spawner.spawn(
          ChildProcess.make("aws", [
            ...args,
            "--region",
            region,
            "--output",
            "text",
            "--no-cli-pager",
          ]),
        );

        const [stdout, stderr, exitCode] = yield* Effect.all(
          [
            process.stdout.pipe(Stream.decodeText(), Stream.mkString),
            process.stderr.pipe(Stream.decodeText(), Stream.mkString),
            process.exitCode,
          ],
          { concurrency: "unbounded" },
        );

        yield* Effect.annotateCurrentSpan("process.exit.code", exitCode);

        yield* Effect.fail(
          new AwsIntegrationCommandFailed({
            arguments: args,
            exitCode,
            stderr,
          }),
        ).pipe(Effect.when(Effect.succeed(exitCode !== 0)));

        const output: string = Str.trim(stdout);

        return output;
      }, Effect.scoped);

      return { run };
    }),
  },
) {}

/**
 * awsUploadEventsIntegrationLayer runs live resource provisioning with file
 * state and the AWS CLI used for delivery verification. Both paths share the
 * selected profile and region, and tracing includes the integration cleanup.
 */
export const awsUploadEventsIntegrationLayer =
  awsCloudControlStackLayerLive.pipe(
    Layer.provide(StateSecretServiceDefaultLayer),
    Layer.provide(resourceStateFileStorageLayer),
    Layer.provideMerge(Layer.effect(AwsIntegrationCli, AwsIntegrationCli.make)),
    Layer.provideMerge(NodeServices.layer),
    Layer.provideMerge(SecureRandom.layerWebCrypto),
    Layer.provideMerge(
      Layer.effect(
        AwsRegion,
        Config.String("AWS_REGION").pipe(
          Config.withDefault("us-east-1"),
          Effect.map(Option.some),
        ),
      ),
    ),
    Layer.provideMerge(NomossTracingLive),
  );
