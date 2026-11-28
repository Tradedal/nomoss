import { expect, layer } from "@effect/vitest";
import {
  AwsCredentials,
  AwsSessionToken,
} from "@tradedal/aws-client-core/config";
import {
  AwsRequestSigner,
  awsRequestSignerLayer,
} from "@tradedal/aws-client-core/signer";
import { Effect, Schema } from "effect";
import { HttpClientRequest } from "effect/http";
import { TestClock } from "effect/testing";

const signingTime = Date.parse("2015-08-30T12:36:00Z");
const context = {
  credentials: Schema.decodeSync(AwsCredentials)({
    accessKeyId: "AKIDEXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
  }),
  region: "us-east-1",
  signingName: "execute-api",
};

layer(awsRequestSignerLayer)("AWS request signing", (it) => {
  it.effect(
    "An application can sign an AWS URL with a port, an encoded path, and repeated query values",
    () =>
      Effect.gen(function* () {
        yield* TestClock.setTime(signingTime);
        const signer = yield* AwsRequestSigner;

        const request = HttpClientRequest.get(
          "https://example.amazonaws.com:8443/service//%C3%A9/?test=b&test=&test=a&space=+&literal=%2B&mark=%21",
        ).pipe(
          HttpClientRequest.setHeaders({
            "my-header": "a   b",
            "user-agent": "fixture",
            "x-amzn-trace-id": "fixture",
          }),
        );
        const signed = yield* signer.signRequest(request, context);

        expect(signed.headers.authorization).toBe(
          "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/execute-api/aws4_request, SignedHeaders=host;my-header;x-amz-content-sha256;x-amz-date, Signature=0c788d3d8a751a68f839d9e969e1bee24cad937bf840a4e9754ba35368735c51",
        );
      }),
  );

  it.effect(
    "An application can sign an IAM GetUser request with temporary credentials",
    () =>
      Effect.gen(function* () {
        yield* TestClock.setTime(signingTime);
        const signer = yield* AwsRequestSigner;

        const request = HttpClientRequest.post(
          "https://iam.amazonaws.com/",
        ).pipe(
          HttpClientRequest.bodyText(
            "Action=GetUser&Version=2010-05-08",
            "application/x-www-form-urlencoded",
          ),
        );
        const signed = yield* signer.signRequest(request, {
          ...context,
          signingName: "iam",
          credentials: {
            ...context.credentials,
            sessionToken: AwsSessionToken.make("session-token-example"),
          },
        });

        expect(signed.headers["x-amz-security-token"]).toBe(
          "session-token-example",
        );
        expect(signed.headers.authorization).toBe(
          "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/iam/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-amz-security-token, Signature=564db6e6418d6a771e4d1dbcd3b02623cd24fd59a78c68a4b9868cb674da889d",
        );
      }),
  );
});
