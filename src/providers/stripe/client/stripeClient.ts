import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  String as Str,
} from "effect";
import { HttpClient, HttpClientRequest } from "effect/http";
import { StripeClientConfig } from "./stripeClientConfig.js";
import {
  StripeApiError,
  type StripeOperation,
  type StripePayload,
} from "./stripeClientModel.js";

/**
 * StripeClient validates generated inputs, sends authenticated Stripe requests,
 * and decodes modeled responses. Resource lifecycles share this service and the
 * application's configured HTTP transport.
 */
export class StripeClient extends Context.Service<StripeClient>()(
  "nomoss/providers/stripe/client/stripeClient",
  {
    make: Effect.gen(function* () {
      const config = yield* StripeClientConfig;
      const http = yield* HttpClient.HttpClient;

      /**
       * The encodeForm service method serializes nested Stripe v1 properties as bracket paths.
       * Empty collections send an empty value so update requests can clear a
       * field. Omitted properties remain absent from the request.
       */
      const encodeForm = (
        value: Schema.Json,
        prefix: string,
      ): ReadonlyArray<readonly [string, string]> => {
        const fields: ReadonlyArray<readonly [string, string]> = Match.value(
          value,
        ).pipe(
          Match.when(null, () =>
            Arr.of<readonly [string, string]>([prefix, ""]),
          ),
          Match.when(Match.string, (value) =>
            Arr.of<readonly [string, string]>([prefix, value]),
          ),
          Match.when(Match.number, (value) =>
            Arr.of<readonly [string, string]>([prefix, String(value)]),
          ),
          Match.when(Match.boolean, (value) =>
            Arr.of<readonly [string, string]>([prefix, String(value)]),
          ),
          Match.when(Arr.isArray<Schema.Json>, (values) =>
            Match.value(values.length).pipe(
              Match.when(0, () =>
                Match.value(prefix).pipe(
                  Match.when("", () => []),
                  Match.orElse((path) =>
                    Arr.of<readonly [string, string]>([path, ""]),
                  ),
                ),
              ),
              Match.orElse(() =>
                Arr.flatMap(values, (item, index) =>
                  encodeForm(item, `${prefix}[${index}]`),
                ),
              ),
            ),
          ),
          Match.orElse((value) =>
            Match.value(Record.size(value)).pipe(
              Match.when(0, () =>
                Match.value(prefix).pipe(
                  Match.when("", () => []),
                  Match.orElse((path) =>
                    Arr.of<readonly [string, string]>([path, ""]),
                  ),
                ),
              ),
              Match.orElse(() =>
                Arr.flatMap(Record.toEntries(value), ([key, item]) =>
                  Option.match(Option.fromUndefinedOr(item), {
                    onNone: () => [],
                    onSome: (item) =>
                      encodeForm(
                        item,
                        Match.value(prefix).pipe(
                          Match.when("", () => key),
                          Match.orElse((prefix) => `${prefix}[${key}]`),
                        ),
                      ),
                  }),
                ),
              ),
            ),
          ),
        );

        return fields;
      };

      /**
       * invoke uses the same generated schemas for input validation and
       * response decoding. Path identifiers are URL-encoded and excluded from
       * bodies. HTTP failures retain Stripe's modeled error and request id.
       */
      const invoke = Effect.fn("StripeClient.invoke")(function* <
        Input,
        Output,
        Failure extends { readonly error: { readonly message?: string } },
      >(
        operation: StripeOperation & {
          readonly input: Schema.Codec<Input, StripePayload>;
          readonly output: Schema.Codec<Output, Schema.Json>;
          readonly error: Schema.Codec<Failure, Schema.Json>;
        },
        input: Input,
      ) {
        const payload: StripePayload = yield* Schema.encodeEffect(
          operation.input,
        )(input);
        const path = Arr.reduce(
          operation.pathParameters,
          operation.path,
          (path, key) =>
            Str.replace(
              `{${key}}`,
              encodeURIComponent(String(payload[key])),
            )(path),
        );
        const parameters = Record.filter(
          payload,
          (_, key) => !Arr.contains(operation.pathParameters, key),
        );
        const query = Record.filter(parameters, (_, key) =>
          Arr.contains(operation.queryParameters, key),
        );
        const body = Record.filter(
          parameters,
          (_, key) => !Arr.contains(operation.queryParameters, key),
        );
        const request = HttpClientRequest.make(operation.method)(
          new URL(path, config.apiBaseUrl ?? operation.baseUrl).toString(),
        ).pipe(
          HttpClientRequest.bearerToken(config.apiKey),
          HttpClientRequest.setHeader("stripe-version", operation.apiVersion),
          HttpClientRequest.acceptJson,
          HttpClientRequest.appendUrlParams(encodeForm(query, "")),
        );
        const prepared = yield* Match.value(operation.method).pipe(
          Match.when("POST", () =>
            Match.value(operation.contentType).pipe(
              Match.when("application/json", () =>
                HttpClientRequest.bodyJson(request, body),
              ),
              Match.when("application/x-www-form-urlencoded", () =>
                Effect.succeed(
                  HttpClientRequest.bodyUrlParams(
                    request,
                    encodeForm(body, ""),
                  ),
                ),
              ),
              Match.exhaustive,
            ),
          ),
          Match.orElse(() => Effect.succeed(request)),
        );
        const response = yield* http.execute(prepared);
        const json = yield* response.json;

        yield* Effect.when(
          Effect.gen(function* () {
            const decoded = yield* Schema.decodeUnknownEffect(operation.error)(
              json,
            );
            const details: Schema.Json = yield* Schema.encodeEffect(
              operation.error,
            )(decoded);
            const message =
              decoded.error.message ??
              `Stripe ${operation.name} failed with HTTP ${response.status}`;

            return yield* Effect.fail(
              new StripeApiError({
                operation: operation.name,
                statusCode: response.status,
                requestId: response.headers["request-id"],
                message,
                details,
              }),
            );
          }),
          Effect.succeed(response.status < 200 || response.status >= 300),
        );

        const result: Output = yield* Schema.decodeUnknownEffect(
          operation.output,
        )(json);

        return result;
      });

      return { encodeForm, invoke };
    }),
  },
) {}

export const stripeClientLayer = Layer.effect(StripeClient, StripeClient.make);
