import { AwsClientConfig } from "@tradedal/aws-client-core/config";
import {
  AwsAccountId,
  AwsArn,
  AwsArnComponents,
  AwsArnFromString,
  AwsPartition,
  AwsRegionName,
} from "@tradedal/aws-client-core/model";
import { makeSTSClient } from "@tradedal/aws-client-sts";
import { Context, Effect, Layer, Schema, Struct } from "effect";

const principal = Schema.Struct({
  principalArn: AwsArn,
  account: AwsAccountId,
  principalId: Schema.NonEmptyString.pipe(Schema.brand("AwsPrincipalId")),
});

const callerIdentity = principal.pipe(
  Schema.encodeKeys({
    principalArn: "Arn",
    account: "Account",
    principalId: "UserId",
  }),
);

const resolvedEnvironment = principal.mapFields((fields) => ({
  ...fields,
  partition: AwsPartition,
  region: AwsRegionName,
}));
export type AwsResolvedEnvironment = typeof resolvedEnvironment.Type;

const arnResource = AwsArnComponents.mapFields((fields) => ({
  service: fields.service,
  resource: fields.resource,
  region: Schema.optionalKey(fields.region),
}));

/**
 * The AwsEnvironment service gives a stack the account and partition of its
 * current AWS principal and the region selected by its client configuration.
 * A global caller ARN can have an empty region even when the stack deploys
 * into a region.
 *
 * @see ../../refs/aws-cdk/packages/aws-cdk-lib/core/lib/stack.ts (account, region, partition, and formatArn)
 */
export class AwsEnvironment extends Context.Service<AwsEnvironment>()(
  "nomoss/providers/aws/awsEnvironment",
  {
    make: Effect.gen(function* () {
      const config = yield* AwsClientConfig;
      const sts = yield* makeSTSClient;

      /**
       * The resolve service method asks STS which principal signed the request.
       * Call it when a declaration needs concrete AWS account information. If
       * the credentials fail or STS cannot identify the caller, the method fails
       * before the stack can construct account-specific identifiers.
       *
       * @see ../../refs/aws-api-models/models/sts/service/2011-06-15/sts-2011-06-15.json (GetCallerIdentity)
       */
      const resolve = Effect.fn("AwsEnvironment.resolve")(function* () {
        const { Region: region } = yield* config.resolveConfiguration();

        const response = yield* sts.getCallerIdentity({});
        const caller =
          yield* Schema.decodeUnknownEffect(callerIdentity)(response);
        const { partition } = yield* Schema.decodeEffect(AwsArnFromString)(
          caller.principalArn,
        );

        const environment: AwsResolvedEnvironment = Struct.assign(caller, {
          partition,
          region,
        });

        return environment;
      });

      /**
       * The formatArn service method uses the resolved environment's account
       * and partition. Omit region to use the configured region or pass an
       * empty string for a global IAM identifier.
       *
       * @see ../../refs/aws-cdk/packages/aws-cdk-lib/core/lib/stack.ts (formatArn)
       */
      const formatArn = Effect.fn("AwsEnvironment.formatArn")(function* (
        environment: AwsResolvedEnvironment,
        input: typeof arnResource.Encoded,
      ) {
        const components = yield* Schema.decodeEffect(arnResource)(input);

        const arn = yield* Schema.encodeEffect(AwsArnFromString)({
          partition: environment.partition,
          account: environment.account,
          ...components,
          region: components.region ?? environment.region,
        });
        const formatted: AwsArn = yield* Schema.decodeEffect(AwsArn)(arn);

        return formatted;
      });

      return { resolve, formatArn };
    }),
  },
) {
  /**
   * The layer installs the environment service beside the existing AWS
   * client. It performs no AWS request until a caller asks for the environment.
   */
  static layer = Layer.effect(AwsEnvironment, AwsEnvironment.make);
}
