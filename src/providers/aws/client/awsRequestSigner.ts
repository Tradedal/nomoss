import { Sha256 } from "@smithy/core/checksum";
import { SignatureV4 } from "@smithy/signature-v4";
import {
  Array as Arr,
  Context,
  Data,
  DateTime,
  Effect,
  Match,
  Option,
  Record,
  Tuple,
} from "effect";
import { HttpClientRequest } from "effect/http";
import type { AwsCredentials } from "./awsClientConfig.js";

export interface AwsSigningContext {
  readonly credentials: AwsCredentials;
  readonly region: string;
  readonly signingName: string;
}

export class AwsRequestSigningError extends Data.TaggedError(
  "AwsRequestSigningError",
)<{
  readonly message: string;
}> {}

/**
 * AwsRequestSigner applies SigV4 to the serialized request that AwsClient will
 * send. Its public API uses Nomoss credentials and signing context so AWS
 * implementation types remain internal to signing.
 */
export class AwsRequestSigner extends Context.Service<AwsRequestSigner>()(
  "nomoss/providers/aws/client/awsRequestSigner",
  {
    make: Effect.sync(() => {
      /**
       * The signRequest service method signs the final URL and headers with
       * the prepared body or the empty payload. A retry can refresh its
       * credentials and sign the same serialized request again.
       */
      const signRequest = Effect.fn("AwsRequestSigner.signRequest")(function* (
        request: HttpClientRequest.HttpClientRequest,
        context: AwsSigningContext,
      ) {
        const url = yield* HttpClientRequest.toUrl(request).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new AwsRequestSigningError({
                message: "Invalid AWS request URL",
              }),
          ),
        );

        const body = yield* Match.value(request.body).pipe(
          Match.tag("Empty", () => Effect.succeed(undefined)),
          Match.tag("Uint8Array", (value) => Effect.succeed(value.body)),
          Match.orElse(() =>
            Effect.fail(
              new AwsRequestSigningError({
                message: "AWS request signing requires a serialized body",
              }),
            ),
          ),
        );

        const signingDate = DateTime.toDateUtc(yield* DateTime.now);

        const signed = yield* Effect.tryPromise({
          try: () =>
            new SignatureV4({
              credentials: context.credentials,
              region: context.region,
              service: context.signingName,
              sha256: Sha256,
            }).sign(
              {
                protocol: url.protocol,
                hostname: url.hostname,
                port: Option.getOrUndefined(
                  Option.liftPredicate(url.port, (port) => port !== "").pipe(
                    Option.map(Number),
                  ),
                ),
                method: request.method,
                path: url.pathname,
                query: Record.fromEntries(
                  Arr.map(
                    Arr.dedupe(Arr.fromIterable(url.searchParams.keys())),
                    (key) => Tuple.make(key, url.searchParams.getAll(key)),
                  ),
                ),
                headers: { ...request.headers, host: url.host },
                body,
              },
              { signingDate },
            ),
          catch: () =>
            new AwsRequestSigningError({
              message: "AWS request signing failed",
            }),
        });

        const signedRequest: HttpClientRequest.HttpClientRequest =
          HttpClientRequest.setHeaders(request, signed.headers);

        return signedRequest;
      });

      return { signRequest };
    }),
  },
) {}
