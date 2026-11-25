import { Effect, Match, Schema } from "effect";

/** The requestBody schema selects the fields that determine how the echo handler decodes its input. */
const requestBody = Schema.Struct({
  body: Schema.optionalKey(Schema.String),
  isBase64Encoded: Schema.optionalKey(Schema.Boolean),
});

/**
 * The json function encodes a JSON value in the HTTP response format that both
 * handlers return to the function runtime.
 *
 * @see ../../node_modules/effect/src/Schema.ts (fromJsonString and encodeEffect)
 */
const json = Effect.fnUntraced(function* (value: Schema.Json) {
  const body = yield* Schema.encodeEffect(Schema.fromJsonString(Schema.Json))(
    value,
  );

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body,
  };
});

const echoResponse = Effect.fn("HttpEcho.echo")(function* (event: unknown) {
  const request = yield* Schema.decodeUnknownEffect(requestBody)(event);
  const bodySchema = Match.value(request.isBase64Encoded).pipe(
    Match.when(true, () => Schema.StringFromBase64),
    Match.orElse(() => Schema.String),
  );
  const message = yield* Schema.decodeEffect(bodySchema)(request.body ?? "");

  return yield* json({ message });
});

/**
 * The health handler returns readiness as a promise that the function runtime
 * can await.
 *
 * @see ../../node_modules/effect/src/Effect.ts (runPromise)
 */
export const health = () => Effect.runPromise(json({ status: "ready" }));

/**
 * The echo handler returns the request body as text. HTTP payload format 2.0
 * marks base64 input with isBase64Encoded. Invalid input rejects the promise
 * returned to the function runtime.
 *
 * @see ../../node_modules/effect/src/Schema.ts (StringFromBase64 and decodeUnknownEffect)
 * @see ../../node_modules/effect/src/Effect.ts (runPromise)
 */
export const echo = (event: unknown) => Effect.runPromise(echoResponse(event));
