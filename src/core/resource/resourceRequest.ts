import {
  Array as Arr,
  Config,
  Context,
  Effect,
  JsonPatch,
  JsonPointer,
  Layer,
  Option,
  Record,
  Schema,
} from "effect";
import { Url } from "effect/http";

/**
 * The ResourceRequestConfiguration schema lets declarations select the object
 * sent to a provider while other fields control local lifecycle decisions.
 * URL credential paths are relative to that selected object. Credentials come
 * from named configuration entries, so saved properties retain the application's URL.
 */
export const ResourceRequestConfiguration = Schema.Struct({
  propertyPath: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
  urlCredentials: Schema.optionalKey(
    Schema.Array(
      Schema.Struct({
        propertyPath: Schema.NonEmptyArray(Schema.NonEmptyString),
        usernameConfig: Schema.NonEmptyString,
        passwordConfig: Schema.NonEmptyString,
      }),
    ),
  ),
});

export type ResourceRequestConfiguration =
  typeof ResourceRequestConfiguration.Type;

/**
 * The ResourceRequest service requires resource references to be resolved
 * before request preparation. Configured credentials apply to outgoing URLs,
 * while declarations retain their original URLs. Callers must validate the
 * prepared request against the generated operation schema before provider I/O.
 */
export class ResourceRequest extends Context.Service<ResourceRequest>()(
  "nomoss/core/resource/resourceRequest",
  {
    make: Effect.sync(() => {
      const read = Effect.fn("ResourceRequest.read")(function* (
        input: Schema.JsonObject,
        path: ReadonlyArray<string>,
      ) {
        const value: Schema.Json = yield* Effect.reduce(
          path,
          (): Schema.Json => input,
          (current, key) =>
            Schema.decodeUnknownEffect(Schema.JsonObject)(current).pipe(
              Effect.flatMap((record) =>
                Record.get(record, key).pipe(Effect.fromOption),
              ),
            ),
        );

        return value;
      });

      /**
       * The properties service method requires the selected declaration value
       * to represent a request object. An omitted path selects the complete
       * declaration. Missing paths and other values fail before I/O.
       */
      const properties = Effect.fn("ResourceRequest.properties")(function* (
        input: unknown,
        config?: ResourceRequestConfiguration,
      ) {
        const props = yield* Schema.decodeUnknownEffect(Schema.JsonObject)(
          input,
        );
        const selected = yield* Option.fromUndefinedOr(config).pipe(
          Option.flatMap((config) =>
            Option.fromUndefinedOr(config.propertyPath),
          ),
          Option.match({
            onNone: () => Effect.succeed(props),
            onSome: (path) => read(props, path),
          }),
        );
        const request: Schema.JsonObject = yield* Schema.decodeUnknownEffect(
          Schema.JsonObject,
        )(selected);

        return request;
      });

      /**
       * The prepare service method applies URL credentials when both named
       * configuration entries have values. Either entry's absence leaves the
       * declared URL intact. Invalid paths or URLs fail before I/O when
       * credentials must be applied.
       */
      const prepare = Effect.fn("ResourceRequest.prepare")(function* (
        input: Schema.JsonObject,
        config?: ResourceRequestConfiguration,
      ) {
        const request: Schema.JsonObject = yield* Option.fromUndefinedOr(
          config,
        ).pipe(
          Option.flatMap((config) =>
            Option.fromUndefinedOr(config.urlCredentials),
          ),
          Option.match({
            onNone: () => Effect.succeed(input),
            onSome: (rules) =>
              Effect.reduce(
                rules,
                () => input,
                Effect.fnUntraced(function* (current, rule) {
                  const credentials = yield* Config.all({
                    username: Config.String(rule.usernameConfig).pipe(
                      Config.option,
                    ),
                    password: Config.String(rule.passwordConfig).pipe(
                      Config.option,
                    ),
                  });

                  const authenticated = yield* Effect.transposeOption(
                    Option.map(
                      Option.all(credentials),
                      ({ username, password }) =>
                        read(current, rule.propertyPath).pipe(
                          Effect.flatMap(
                            Schema.decodeUnknownEffect(Schema.String),
                          ),
                          Effect.flatMap((url) =>
                            Effect.fromResult(Url.fromString(url)),
                          ),
                          Effect.map((url) =>
                            Url.setPassword(
                              Url.setUsername(url, username),
                              password,
                            ).toString(),
                          ),
                          Effect.map((url) =>
                            JsonPatch.apply(
                              [
                                {
                                  op: "replace",
                                  path: `/${Arr.join(Arr.map(rule.propertyPath, JsonPointer.escapeToken), "/")}`,
                                  value: url,
                                },
                              ],
                              current,
                            ),
                          ),
                          Effect.flatMap(
                            Schema.decodeUnknownEffect(Schema.JsonObject),
                          ),
                        ),
                    ),
                  );

                  const prepared: Schema.JsonObject = Option.match(
                    authenticated,
                    {
                      onNone: () => current,
                      onSome: (request) => request,
                    },
                  );

                  return prepared;
                }),
              ),
          }),
        );

        return request;
      });

      return { properties, prepare };
    }),
  },
) {}

export const resourceRequestLayer = Layer.effect(
  ResourceRequest,
  ResourceRequest.make,
);
