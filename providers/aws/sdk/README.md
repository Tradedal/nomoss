# @nomoss/aws

[Tradedal](https://github.com/Tradedal) develops `@nomoss/aws` as part of Nomoss, an open source tool for managing infrastructure declared in TypeScript. When Nomoss applies a stack that declares AWS resources, it uses this SDK to make the AWS API calls. The SDK generates its clients from AWS Smithy models, so the TypeScript inputs and results follow the shapes AWS defines for each operation.

Developers can use the SDK on its own to call AWS from Effect applications on Node.js 24 or later. For example, a worker can read messages from an existing SQS queue using the same SDK that Nomoss uses to manage queues.

The SDK runs on Effect and uses Effect's `@effect/platform-node-shared` package to read AWS configuration and credentials from disk. It also uses `fast-xml-parser` to read XML responses from AWS Query services such as IAM and STS. It makes HTTP requests directly to AWS and does not depend on the AWS SDK for JavaScript.

## Check which AWS identity your program uses

Install the SDK and Effect. The SDK ships as TypeScript, so this example uses `tsx` to run the script.

```sh
npm install @nomoss/aws effect@4.1.4
npm install --save-dev tsx
```

Save this as `whoami.ts`. It calls AWS Security Token Service (STS) and prints the ARN of the identity that signed the request. The `awsClientLayerLive` Layer supplies the AWS settings, credentials, and HTTP client. The SDK uses those credentials to sign the request with AWS Signature Version 4 before sending it.

```ts
import { awsClientLayerLive } from "@nomoss/aws/credentials";
import { makeSTSClient } from "@nomoss/aws/sts";
import { Effect } from "effect";

const whoami = Effect.gen(function* () {
  const sts = yield* makeSTSClient;
  const identity = yield* sts.getCallerIdentity({});

  return identity.Arn;
});

whoami.pipe(Effect.provide(awsClientLayerLive), Effect.runPromise).then(
  (arn) => console.log(arn),
  (error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  },
);
```

To run the script with a shared AWS profile, replace `my-profile` with your profile name. If the profile uses IAM Identity Center, first run `aws sso login --profile my-profile`.

```sh
AWS_PROFILE=my-profile AWS_REGION=us-east-1 npx tsx whoami.ts
```

For another AWS service, import its client from the same package. For example, `@nomoss/aws/sqs` exports `makeSQSClient` and the types for its queue operations. Provide `awsClientLayerLive` once to share the same AWS configuration across clients in the program.

## How the SDK chooses credentials and a region

With `AWS_PROFILE` set, the Layer uses that profile for credentials even when access keys are present in the environment. If `AWS_PROFILE` is unset, it looks for `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, along with `AWS_SESSION_TOKEN` when present. If either key is missing, it reads the `default` profile. The region comes from `AWS_REGION` when set and otherwise from the named or default profile.

In a Lambda handler, leave `AWS_PROFILE` unset to use the function's execution role. [Lambda sets the region and temporary credentials in the environment](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime), so the same Layer can sign requests with the execution role credentials.
