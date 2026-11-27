import {
  Array as Arr,
  DateTime,
  Effect,
  Match,
  Option,
  Predicate,
  Record,
  Schema,
} from "effect";
import { HttpClientRequest, type HttpClientResponse } from "effect/http";
import { XMLParser } from "fast-xml-parser";
import {
  type AwsJsonRpcPayload,
  type AwsQueryMember,
  type AwsQueryOperation,
  type AwsQueryWire,
  AwsRequestError,
  type AwsServiceDefinition,
} from "./awsClientModel.js";

type FormEntry = readonly [string, string];
type XmlValue = Schema.Json | undefined;

const object = (value: XmlValue) =>
  Option.liftPredicate(value, Schema.is(Schema.JsonObject));

const field = (value: XmlValue, name: string) =>
  object(value).pipe(Option.flatMap(Record.get(name)), Option.getOrUndefined);

const many = (value: XmlValue): readonly Schema.Json[] =>
  Match.value(value).pipe(
    Match.when(undefined, () => []),
    Match.when(Arr.isArray<Schema.Json>, (items) => items),
    Match.orElse((item) => [item]),
  );

const join = (prefix: string, member: string) =>
  [prefix, member].filter((segment) => segment !== "").join(".");

const timestamp = (
  value: Schema.Json,
  format: AwsQueryMember["timestampFormat"],
) =>
  Match.value(format).pipe(
    Match.when("epoch-seconds", () =>
      Match.value(value).pipe(
        Match.when(Match.number, String),
        Match.when(Match.string, (encoded) =>
          DateTime.make(encoded).pipe(
            Option.map((time) => String(DateTime.toEpochMillis(time) / 1000)),
            Option.getOrElse(() => encoded),
          ),
        ),
        Match.orElse(String),
      ),
    ),
    Match.when("http-date", () =>
      Option.liftPredicate(value, Predicate.isString).pipe(
        Option.flatMap(DateTime.make),
        Option.map((time) => DateTime.toDateUtc(time).toUTCString()),
        Option.getOrElse(() => String(value)),
      ),
    ),
    Match.orElse(() => String(value)),
  );

const encode = (
  shapes: AwsQueryWire["shapes"],
  member: AwsQueryMember,
  value: Schema.Json,
  prefix: string,
): readonly FormEntry[] =>
  Match.value(shapes[member.target]).pipe(
    Match.when({ type: "unit" }, () => []),
    Match.when({ type: "structure" }, ({ members }) =>
      Record.toEntries(members).flatMap(([name, child]) =>
        Option.fromNullishOr(field(value, name)).pipe(
          Option.toArray,
          Arr.flatMap((value) =>
            encode(shapes, child, value, join(prefix, child.xmlName ?? name)),
          ),
        ),
      ),
    ),
    Match.when({ type: "list" }, ({ member: item }) => {
      const items = many(value);
      const list = Match.value(member.flattened).pipe(
        Match.when(true, () => prefix),
        Match.orElse(() => join(prefix, item.xmlName ?? "member")),
      );
      return Match.value(items.length).pipe(
        Match.when(0, () => [[prefix, ""]] as const),
        Match.orElse(() =>
          items.flatMap((value, index) =>
            encode(shapes, item, value, join(list, String(index + 1))),
          ),
        ),
      );
    }),
    Match.when({ type: "map" }, ({ key, value: item }) => {
      const map = Match.value(member.flattened).pipe(
        Match.when(true, () => prefix),
        Match.orElse(() => join(prefix, "entry")),
      );
      return Record.toEntries<string, Schema.Json>(
        Option.getOrElse(object(value), () => ({})),
      ).flatMap(([name, value], index) => {
        const entry = join(map, String(index + 1));
        return [
          ...encode(shapes, key, name, join(entry, key.xmlName ?? "key")),
          ...encode(shapes, item, value, join(entry, item.xmlName ?? "value")),
        ];
      });
    }),
    Match.when(
      { type: "timestamp" },
      (shape) =>
        [
          [
            prefix,
            timestamp(value, member.timestampFormat ?? shape.timestampFormat),
          ],
        ] as const,
    ),
    Match.orElse(() => [[prefix, String(value)]] as const),
  );

const text = (value: Schema.Json) =>
  Option.liftPredicate(value, Predicate.isString).pipe(
    Option.getOrElse(() => String(field(value, "#text") ?? "")),
  );

const decodeTimestamp = (
  raw: string,
  format: AwsQueryMember["timestampFormat"],
) =>
  Match.value(format).pipe(
    Match.when("epoch-seconds", () => DateTime.make(Number(raw) * 1000)),
    Match.orElse(() => DateTime.make(raw)),
    Option.map(DateTime.formatIso),
    Option.getOrElse(() => raw),
  );

const decode = (
  shapes: AwsQueryWire["shapes"],
  member: AwsQueryMember,
  value: Schema.Json,
): Schema.Json =>
  Match.value(shapes[member.target]).pipe(
    Match.when({ type: "structure" }, ({ members }) =>
      Record.fromEntries(
        Record.toEntries(members).flatMap(([name, child]) => {
          const wireName = child.xmlName ?? name;
          const key = Match.value(child.attribute).pipe(
            Match.when(true, () => `@_${wireName}`),
            Match.orElse(() => wireName),
          );
          return Option.fromUndefinedOr(field(value, key)).pipe(
            Option.map(
              (field) => [name, decode(shapes, child, field)] as const,
            ),
            Option.toArray,
          );
        }),
      ),
    ),
    Match.when({ type: "list" }, ({ member: item }) =>
      Match.value(member.flattened).pipe(
        Match.when(true, () => value),
        Match.orElse(() => field(value, item.xmlName ?? "member")),
        many,
        Arr.map((value) => decode(shapes, item, value)),
      ),
    ),
    Match.when({ type: "map" }, ({ key, value: item }) =>
      Record.fromEntries(
        Match.value(member.flattened).pipe(
          Match.when(true, () => value),
          Match.orElse(() => field(value, "entry")),
          many,
          Arr.flatMap((entry) =>
            Option.all([
              Option.fromUndefinedOr(field(entry, key.xmlName ?? "key")),
              Option.fromUndefinedOr(field(entry, item.xmlName ?? "value")),
            ]).pipe(
              Option.map(
                ([name, value]) =>
                  [text(name), decode(shapes, item, value)] as const,
              ),
              Option.toArray,
            ),
          ),
        ),
      ),
    ),
    Match.when({ type: "number" }, () => {
      const raw = text(value);
      const number = Number(raw);
      return Option.liftPredicate(
        number,
        (n) => raw.trim() !== "" && Number.isFinite(n),
      ).pipe(Option.getOrElse<number | string>(() => raw));
    }),
    Match.when({ type: "boolean" }, () =>
      Match.value(text(value)).pipe(
        Match.when("true", () => true),
        Match.when("false", () => false),
        Match.orElse((other) => other),
      ),
    ),
    Match.when({ type: "timestamp" }, (shape) =>
      decodeTimestamp(
        text(value),
        member.timestampFormat ?? shape.timestampFormat,
      ),
    ),
    Match.when({ type: "unit" }, () => null),
    Match.orElse(() => text(value)),
  );

/**
 * The xmlDocumentType pattern identifies declarations such as
 * "<!DOCTYPE ErrorResponse [...]>". AWS Query responses use XML's predefined
 * entities, so the parser rejects document types before it expands entities.
 */
const xmlDocumentType = /<!DOCTYPE\s/i;
const xml = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  parseTagValue: false,
  trimValues: false,
  processEntities: true,
});

const readXml = (response: HttpClientResponse.HttpClientResponse) =>
  response.text.pipe(
    Effect.filterOrFail(
      (body) => !xmlDocumentType.test(body),
      () =>
        new AwsRequestError({
          message: "AWS Query responses must not contain an XML document type",
        }),
    ),
    Effect.flatMap((body) =>
      Effect.try({
        try: (): unknown => xml.parse(body, true),
        catch: () =>
          new AwsRequestError({
            message: "AWS returned an invalid Query XML response",
          }),
      }),
    ),
    Effect.flatMap(Schema.decodeUnknownEffect(Schema.JsonObject)),
  );

/**
 * The awsQueryRequest function produces the form bytes the signer must send.
 * Each collection uses the model's member names and one-based indices.
 *
 * @see ../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Query key resolution and Collections)
 */
export const awsQueryRequest = (
  service: AwsServiceDefinition,
  operation: AwsQueryOperation,
  payload: AwsJsonRpcPayload,
) => {
  const parameters = new URLSearchParams([
    ["Action", operation.name],
    ["Version", service.version],
    ...encode(
      operation.query.shapes,
      { target: operation.query.input },
      payload,
      "",
    ).map(([name, value]) => [name, value]),
  ]);

  return HttpClientRequest.post(operation.path).pipe(
    HttpClientRequest.bodyText(
      parameters.toString(),
      "application/x-www-form-urlencoded",
    ),
  );
};

/**
 * The awsQueryOutput function opens the modeled result wrapper before the
 * client decodes the public schema. Empty operation results need no XML body.
 *
 * @see ../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Response serialization)
 * @see ../../../node_modules/fast-xml-parser/README.md (XMLParser)
 */
export const awsQueryOutput = (
  operation: AwsQueryOperation,
  response: HttpClientResponse.HttpClientResponse,
) =>
  Match.value(operation.query.shapes[operation.query.output]).pipe(
    Match.when({ type: "unit" }, () => Effect.void),
    Match.orElse(() =>
      readXml(response).pipe(
        Effect.flatMap((document) =>
          Effect.fromOption(
            Option.fromUndefinedOr(
              field(
                field(document, `${operation.name}Response`),
                `${operation.name}Result`,
              ),
            ),
            () =>
              new AwsRequestError({
                message: `AWS Query response omitted ${operation.name}Result`,
              }),
          ),
        ),
        Effect.map((result) =>
          decode(
            operation.query.shapes,
            { target: operation.query.output },
            result,
          ),
        ),
      ),
    ),
  );

/**
 * The awsQueryErrorBody function retains AWS's error code and request ID so
 * callers can identify the modeled failure and correlate it with AWS logs.
 *
 * @see ../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Operation error serialization)
 */
export const awsQueryErrorBody = (
  response: HttpClientResponse.HttpClientResponse,
) =>
  readXml(response).pipe(
    Effect.flatMap((document) =>
      Schema.decodeUnknownEffect(
        Schema.Struct({
          Error: Schema.JsonObject,
          RequestId: Schema.optionalKey(Schema.String),
        }),
      )(document.ErrorResponse),
    ),
    Effect.map(({ Error: fields, RequestId }) =>
      Option.match(Option.fromUndefinedOr(RequestId), {
        onNone: () => fields,
        onSome: (id) => Record.set(fields, "RequestId", id),
      }),
    ),
  );
