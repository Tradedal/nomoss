import { assert } from "@effect/vitest";
import { awsClientLayer } from "@tradedal/aws-client-core";
import {
  AwsClientConfig,
  AwsClientConfigurationError,
  AwsRegion,
  awsClientConfigLayerFromProvider,
  awsCredentialProviderLayer,
} from "@tradedal/aws-client-core/config";
import { AwsServiceError } from "@tradedal/aws-client-core/model";
import {
  type AssumeRoleRequest,
  makeSTSClient,
} from "@tradedal/aws-client-sts";
import {
  AwsStsCredentials,
  awsAssumeRoleCredentialsLayer,
} from "@tradedal/aws-credentials";
import { Effect, Layer, Option, Schedule, Schema } from "effect";
import { SecureRandom } from "effect/crypto";
import { AwsEnvironment } from "nomoss/providers/aws";
import { AWSRole } from "nomoss/providers/aws/iam/role";
import { AWSRolePolicy } from "nomoss/providers/aws/iam/rolepolicy";
import { ResourceStackOperations } from "../../../../src/core/stack/resourceStackOperations.js";
import { awsNativeResourceSuite } from "../../../support/awsResourceIntegrationFixture.js";

const accessDenied = AwsServiceError.hasCode("AccessDenied");
const invalidSession = AwsServiceError.hasCode("InvalidClientTokenId");
const propagation = { times: 45, schedule: Schedule.spaced("1 second") };

const sessionName = "nomoss-policy-test";

/**
 * The declareRoles fixture trusts the test's provisioner for the source
 * role. The target role trusts the account and restricts it to the source
 * role ARN, so the source role still needs an IAM grant of its own.
 *
 * @see ../../../../refs/aws-api-models/models/sts/service/2011-06-15/sts-2011-06-15.json (AssumeRole)
 */
const declareRoles = Effect.fn("IAM integration declareRoles")(function* (
  accountArn: string,
  provisionerId: string,
  sourceName: string,
  targetName: string,
  sourceArn: string,
) {
  const source = yield* AWSRole({
    logicalId: "SourceRole",
    props: {
      RoleName: sourceName,
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: accountArn },
            Action: "sts:AssumeRole",
            Condition: { StringEquals: { "aws:userid": provisionerId } },
          },
        ],
      },
    },
  });

  const target = yield* AWSRole({
    logicalId: "TargetRole",
    props: {
      RoleName: targetName,
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: accountArn },
            Action: "sts:AssumeRole",
            Condition: { ArnEquals: { "aws:PrincipalArn": sourceArn } },
          },
        ],
      },
    },
  });

  return { source, target };
});

/**
 * The callerIdentity operation verifies the actual caller of a signed
 * request. STS reports the principal even when the assumed role starts
 * with no permissions.
 *
 * @see ../../../../refs/aws-api-models/models/sts/service/2011-06-15/sts-2011-06-15.json (GetCallerIdentity)
 */
const callerIdentity = Effect.fn("IAM integration callerIdentity")(() =>
  makeSTSClient.pipe(Effect.flatMap((sts) => sts.getCallerIdentity({}))),
);

const assumeRole = Effect.fn("IAM integration assumeRole")(
  (request: AssumeRoleRequest) =>
    makeSTSClient.pipe(Effect.flatMap((sts) => sts.assumeRole(request))),
);

awsNativeResourceSuite("IAM role delegation", (it) => {
  it.effect(
    "The declared policy lets the source role assume the target role",
    () =>
      Effect.gen(function* () {
        const random = yield* SecureRandom.SecureRandom;
        const operations = yield* ResourceStackOperations;

        const name = `nomoss-${yield* random.uuidV4()}`;

        const empty = yield* operations.Stack(
          name,
          Effect.succeed(() => undefined),
        );

        yield* Effect.addFinalizer(() =>
          operations.destroy(empty).pipe(Effect.asVoid, Effect.orDie),
        );

        const { resolveCredentials } = yield* AwsClientConfig;
        const aws = yield* AwsEnvironment;

        const environment = yield* aws.resolve();

        const sourceName = `${name}-source`;
        const targetName = `${name}-target`;

        const accountArn = yield* aws.formatArn(environment, {
          service: "iam",
          region: "",
          resource: "root",
        });
        const sourceArn = yield* aws.formatArn(environment, {
          service: "iam",
          region: "",
          resource: `role/${sourceName}`,
        });

        const roles = declareRoles(
          accountArn,
          environment.principalId,
          sourceName,
          targetName,
          sourceArn,
        );

        const baseline = yield* operations.Stack(
          name,
          roles.pipe(
            Effect.map(({ source, target }) => () => ({
              SourceArn: source.Arn,
              TargetArn: target.Arn,
            })),
          ),
        );

        const { outputs } = yield* operations.apply(baseline);

        const provisioner = awsCredentialProviderLayer(resolveCredentials);
        const sourceSession = Layer.fresh(
          awsAssumeRoleCredentialsLayer(environment.region, {
            RoleArn: outputs.SourceArn,
            RoleSessionName: sessionName,
          }),
        ).pipe(Layer.provide(provisioner));

        const region = Layer.succeed(
          AwsRegion,
          Option.some(environment.region),
        );
        const sourceClient = awsClientLayer.pipe(
          Layer.provide(awsClientConfigLayerFromProvider),
          Layer.provide([sourceSession, region]),
          Layer.fresh,
        );

        const sourceServices = yield* Layer.build(sourceClient);

        const targetRequest = {
          RoleArn: outputs.TargetArn,
          RoleSessionName: sessionName,
        };

        const sourceCaller = yield* callerIdentity().pipe(
          Effect.provide(sourceServices),
          Effect.retry({
            ...propagation,
            while: (error) =>
              error instanceof AwsClientConfigurationError ||
              invalidSession(error),
          }),
        );

        const sourceSessionArn = yield* aws.formatArn(environment, {
          service: "sts",
          region: "",
          resource: `assumed-role/${sourceName}/${sessionName}`,
        });

        assert.strictEqual(
          sourceCaller.Arn,
          sourceSessionArn,
          "The authorization check must run as the source role",
        );

        const denied = yield* assumeRole(targetRequest).pipe(
          Effect.provide(sourceServices),
          Effect.retry({ ...propagation, while: invalidSession }),
          Effect.flip,
        );

        assert.isTrue(
          accessDenied(denied),
          `Expected STS to deny access before the grant; received ${denied._tag}`,
        );

        const grant = yield* operations.Stack(
          name,
          roles.pipe(
            Effect.flatMap(({ source }) =>
              AWSRolePolicy({
                logicalId: "AssumeTarget",
                props: {
                  RoleName: source,
                  PolicyName: "AssumeTarget",
                  PolicyDocument: {
                    Version: "2012-10-17",
                    Statement: [
                      {
                        Effect: "Allow",
                        Action: "sts:AssumeRole",
                        Resource: outputs.TargetArn,
                      },
                    ],
                  },
                },
              }),
            ),
            Effect.map(() => () => undefined),
          ),
        );

        yield* operations.apply(grant);

        // AWS can retain the pre-grant authorization result for an existing
        // source session. The same source role requests a fresh session on
        // each attempt while IAM propagates the new policy.
        const issued = yield* assumeRole(targetRequest).pipe(
          Effect.provide(sourceClient),
          Effect.retry({
            ...propagation,
            while: (error) => accessDenied(error) || invalidSession(error),
          }),
        );

        const credentials = yield* Schema.decodeUnknownEffect(
          AwsStsCredentials,
        )(issued.Credentials);

        // The target client must sign with the credentials from the successful
        // AssumeRole call. A fresh Layer also rebuilds the configuration, so
        // the identity check cannot reuse the provisioner's client.
        // See ../../../../refs/effect/packages/effect/src/Layer.ts (fresh).
        const targetSession = awsCredentialProviderLayer(() =>
          Effect.succeed(credentials),
        );

        const targetClient = awsClientLayer.pipe(
          Layer.provide(awsClientConfigLayerFromProvider),
          Layer.provide([targetSession, region]),
          Layer.fresh,
        );

        const caller = yield* callerIdentity().pipe(
          Effect.provide(targetClient),
          Effect.retry({ ...propagation, while: invalidSession }),
        );

        const targetSessionArn = yield* aws.formatArn(environment, {
          service: "sts",
          region: "",
          resource: `assumed-role/${targetName}/${sessionName}`,
        });

        assert.strictEqual(
          caller.Arn,
          targetSessionArn,
          "AWS must identify the caller as a session of the target role",
        );
      }).pipe(Effect.scoped),
    150_000,
  );
});
