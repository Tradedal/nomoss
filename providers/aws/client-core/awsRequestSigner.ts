import {
  Array as Arr,
  Context,
  Data,
  DateTime,
  Effect,
  Layer,
  Match,
  Option,
  Order,
  pipe,
  Record,
} from "effect";
import { Digest, Mac, SecureRandom } from "effect/crypto";
import { Hex } from "effect/encoding";
import { HttpClientRequest } from "effect/http";
import type { AwsCredentials } from "./awsClientConfig.js";

export interface AwsSigningContext {
  readonly credentials: AwsCredentials;
  readonly region: string;
  readonly signingName: string;
  readonly disableDoubleEncoding?: boolean;
  readonly disableNormalizePath?: boolean;
}

export class AwsRequestSigningError extends Data.TaggedError(
  "AwsRequestSigningError",
)<{
  readonly message: string;
}> {}

const algorithm = "AWS4-HMAC-SHA256";
const scopeSuffix = "aws4_request";
const utf8 = new TextEncoder();
const queryOrder = Order.Tuple([Order.String, Order.String]);

/**
 * The unsignedHeaders pattern matches headers that can change in transit,
 * such as "connection" or "proxy-authorization". AWS must receive the
 * same values for signed headers such as "host" and "x-amz-date".
 *
 * @see ../../../refs/smithy-typescript/packages/signature-v4/src/getCanonicalHeaders.ts (headers excluded from signing)
 */
const unsignedHeaders =
  /^(?:authorization$|cache-control$|connection$|date$|expect$|from$|keep-alive$|max-forwards$|pragma$|referer$|te$|trailer$|transfer-encoding$|upgrade$|user-agent$|x-amzn-trace-id$|proxy-|sec-)/;

/**
 * The repeatedPathSeparators pattern lets SigV4 normalize a path such as
 * "/services//jobs" to "/services/jobs". A path with single separators
 * stays unchanged.
 *
 * @see ../../../refs/smithy-typescript/packages/signature-v4/src/SignatureV4Base.ts (getCanonicalPath)
 */
const repeatedPathSeparators = /\/{2,}/g;

/**
 * The uriReservedCharacters pattern matches characters that encodeURIComponent
 * leaves as written. SigV4 encodes "!" as "%21" and leaves "A" unchanged.
 */
const uriReservedCharacters = /[!'()*]/g;
/** The timestampSeparators pattern reduces "2026-01-01T00:00:00.123Z" to "20260101T000000Z". */
const timestampSeparators = /[-:]|\.\d{3}/g;
/** The headerLineBreaks pattern lets a header value such as "a\r\nb" become "a b". */
const headerLineBreaks = /[\r\n]/g;
/** The headerSpaceRuns pattern turns "a\t b" into "a b" for the signature. */
const headerSpaceRuns = /[ \t]+/g;
/** The headerPadding pattern removes edge spaces from " value " and leaves "a b" unchanged. */
const headerPadding = /^ | $/g;

const encodeUri = (value: string) =>
  encodeURIComponent(value).replace(
    uriReservedCharacters,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );

/**
 * The canonicalizeHeaders function gives the signature and Authorization
 * header the same sorted list of names. The canonical values are used
 * only for signing. The original values still go to AWS.
 */
const canonicalizeHeaders = (request: HttpClientRequest.HttpClientRequest) => {
  const headers = pipe(
    Record.toEntries<string, string>(request.headers),
    Arr.filter(([name]) => !unsignedHeaders.test(name)),
    Arr.sort(Order.mapInput(Order.String, ([name]: [string, string]) => name)),
  );
  const names = Arr.map(headers, ([name]) => name).join(";");
  const values = Arr.map(
    headers,
    ([name, value]) =>
      `${name}:${value.replace(headerLineBreaks, " ").replace(headerSpaceRuns, " ").replace(headerPadding, "")}\n`,
  ).join("");

  return { names, values };
};

/**
 * The canonicalizeTarget function uses the service's path rules when it
 * signs a URL. It sorts encoded query parameters so their original order
 * has no effect on the signature.
 *
 * @see ../../../refs/smithy-typescript/packages/signature-v4/src/SignatureV4Base.ts (getCanonicalPath)
 */
const canonicalizeTarget = (url: URL, context: AwsSigningContext) => {
  const pathname = Match.value(context.disableNormalizePath).pipe(
    Match.when(true, () => url.pathname),
    Match.orElse(() => url.pathname.replace(repeatedPathSeparators, "/")),
  );

  const path = Match.value(context.disableDoubleEncoding).pipe(
    Match.when(true, () => pathname),
    Match.orElse(() => pathname.split("/").map(encodeUri).join("/")),
  );

  const query = Array.from(url.searchParams)
    .filter(([name]) => name.toLowerCase() !== "x-amz-signature")
    .map(([name, value]) => [encodeUri(name), encodeUri(value)] as const)
    .sort(queryOrder)
    .map(([name, value]) => `${name}=${value}`)
    .join("&");

  return { path, query };
};

/**
 * The AwsRequestSigner service lets the retrying client sign the same
 * serialized request with a different session on each attempt. The
 * caller supplies the current credentials and the AWS signing scope.
 */
export class AwsRequestSigner extends Context.Service<AwsRequestSigner>()(
  "@tradedal/aws-client-core/awsRequestSigner",
  {
    make: Effect.gen(function* () {
      const digest = yield* Digest.Digest;
      const mac = yield* Mac.Mac;

      /**
       * The signHmac operation derives a key for one part of the signing
       * scope or signs the final request with the derived key.
       */
      const signHmac = (key: Uint8Array, data: string) =>
        Mac.key(Mac.hmacSha256, key).pipe(
          Effect.flatMap((key) => mac.sign(key, utf8.encode(data))),
        );

      /**
       * The signRequest service method returns a request whose signature
       * applies to the URL and bytes supplied by the caller. A body that
       * still needs serialization fails before the caller can send it.
       *
       * @see ../../../refs/smithy/docs/source-2.0/aws/aws-auth.rst (aws.auth#sigv4)
       * @see ../../../refs/smithy-typescript/packages/signature-v4/src/SignatureV4Base.ts (createCanonicalRequest and getCanonicalPath)
       * @see ../../../refs/effect/packages/effect/src/crypto/Digest.ts (digestHex)
       * @see ../../../refs/effect/packages/effect/src/crypto/Mac.ts (key and sign)
       */
      const signRequest = Effect.fn("AwsRequestSigner.signRequest")(
        function* (
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
            Match.tag("Empty", () => Effect.succeed(new Uint8Array())),
            Match.tag("Uint8Array", (value) => Effect.succeed(value.body)),
            Match.orElse(() =>
              Effect.fail(
                new AwsRequestSigningError({
                  message: "AWS request signing requires a serialized body",
                }),
              ),
            ),
          );

          const timestamp = DateTime.formatIso(yield* DateTime.now).replace(
            timestampSeparators,
            "",
          );

          const date = timestamp.substring(0, 8);
          const scope = [
            date,
            context.region,
            context.signingName,
            scopeSuffix,
          ].join("/");

          const payloadHash = yield* digest.digestHex(Digest.sha256, body);

          const sessionToken = Option.fromUndefinedOr(
            context.credentials.sessionToken,
          );

          const prepared = request.pipe(
            HttpClientRequest.removeHeader("x-amz-security-token"),
            HttpClientRequest.setHeaders({
              host: url.host,
              "x-amz-date": timestamp,
              "x-amz-content-sha256": payloadHash,
            }),
            (request) =>
              Option.match(sessionToken, {
                onNone: () => request,
                onSome: (token) =>
                  HttpClientRequest.setHeader(
                    request,
                    "x-amz-security-token",
                    token,
                  ),
              }),
          );

          const headers = canonicalizeHeaders(prepared);
          const target = canonicalizeTarget(url, context);

          const canonicalRequest = [
            request.method,
            target.path,
            target.query,
            headers.values,
            headers.names,
            payloadHash,
          ].join("\n");

          const requestHash = yield* digest.digestHex(
            Digest.sha256,
            utf8.encode(canonicalRequest),
          );

          const stringToSign = [algorithm, timestamp, scope, requestHash].join(
            "\n",
          );

          const signature = yield* Effect.reduce(
            [
              date,
              context.region,
              context.signingName,
              scopeSuffix,
              stringToSign,
            ],
            () => utf8.encode(`AWS4${context.credentials.secretAccessKey}`),
            signHmac,
          );

          return HttpClientRequest.setHeader(
            prepared,
            "authorization",
            `${algorithm} Credential=${context.credentials.accessKeyId}/${scope}, SignedHeaders=${headers.names}, Signature=${Hex.encode(signature)}`,
          );
        },
        (effect) => {
          const failure = () =>
            new AwsRequestSigningError({
              message: "AWS request signing failed",
            });

          return effect.pipe(
            Effect.catchTag("CryptoError", () => Effect.fail(failure())),
            Effect.catchDefect(() => Effect.fail(failure())),
          );
        },
      );

      return { signRequest };
    }),
  },
) {}

/**
 * The awsRequestSignerLayer Layer supplies WebCrypto for SigV4. It lets
 * applications sign prepared requests separately from executing them.
 *
 * @see ../../../refs/effect/packages/effect/src/crypto/Mac.ts (layerWebCrypto)
 * @see ../../../refs/effect/packages/effect/src/crypto/Digest.ts (layerWebCrypto)
 */
export const awsRequestSignerLayer = Layer.effect(
  AwsRequestSigner,
  AwsRequestSigner.make,
).pipe(
  Layer.provide([
    Digest.layerWebCrypto,
    Mac.layerWebCrypto.pipe(Layer.provide(SecureRandom.layerWebCrypto)),
  ]),
);
