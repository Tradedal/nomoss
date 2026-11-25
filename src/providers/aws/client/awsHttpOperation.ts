import {
  Array as Arr,
  Option,
  Predicate,
  Record,
  Schema,
  SchemaGetter,
  String as Str,
  Tuple,
} from "effect";
import { HttpApiEndpoint, HttpApiSchema } from "effect/http-api";
import { AwsJsonRpcPayload, type AwsOperation } from "./awsClientModel.js";

const HttpFields = Schema.Record(Schema.String, Schema.String);

/**
 * The awsJsonRpcEmptyOutput schema factory accepts an empty reply or an empty
 * JSON object for an operation with no output members. Both replies mean that
 * the mutation succeeded, so callers receive void after response validation.
 *
 * @see ../../../../refs/smithy/docs/source-2.0/aws/protocols/aws-json.rst.template (Empty body serialization)
 * @see ../../../../node_modules/effect/src/http-api/HttpApiSchema.ts (asText)
 * @see ../../../../node_modules/effect/src/Schema.ts (fromJsonString and decodeTo)
 */
export const awsJsonRpcEmptyOutput = (contentType: string) =>
  Schema.Union([
    Schema.Literal(""),
    Schema.fromJsonString(Schema.Struct({})),
  ]).pipe(
    Schema.decodeTo(Schema.Void, {
      decode: SchemaGetter.transform(() => undefined),
      encode: SchemaGetter.transform(() => ""),
    }),
    HttpApiSchema.asText({ contentType }),
  );

/**
 * The optionalRestJsonMember codec treats a null structure member as absent
 * when it reads an AWS reply. Optional members still encode through their
 * original field schemas.
 *
 * @see ../../../../refs/smithy/smithy-aws-protocol-tests/model/restJson1/json-structs.smithy (RestJsonDoesntDeserializeNullStructureValues)
 * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/SchemaGetter.ts (transformOptional)
 */
export const optionalRestJsonMember = <Field extends Schema.Top>(
  field: Field,
) =>
  Schema.optionalKey(Schema.NullOr(field)).pipe(
    Schema.decodeTo(Schema.optionalKey(Schema.toType(field)), {
      decode: SchemaGetter.transformOptional((value) =>
        Option.filter(value, Predicate.isNotNull),
      ),
      encode: SchemaGetter.passthroughSupertype(),
    }),
  );

/**
 * The awsHttpEndpoint function binds the Smithy path labels and success
 * statuses to Effect's HTTP contract. HttpApiClient encodes parameters and
 * decodes the response after AWS signing and transport.
 *
 * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/http-api/HttpApiClient.ts (makeWith)
 * @see ../../../../refs/smithy/docs/source-2.0/spec/http-bindings.rst (httpLabel)
 */
export const awsHttpEndpoint = <
  Name extends string,
  Success extends Schema.Top,
>(
  name: Name,
  operation: AwsOperation & { readonly output: Success },
) => {
  const bindings = operation.rest?.bindings ?? {};

  const labels = Record.filter(
    bindings,
    (binding) => binding.location === "LABEL",
  );

  const fields = Record.fromEntries(
    Arr.map(Record.values(labels), ({ name }) =>
      Tuple.make(name, Schema.String),
    ),
  );

  const path = Str.replace(/\{([^}]+)\}/g, ":$1")(operation.path);

  const success = Option.match(Option.fromUndefinedOr(operation.rest), {
    onNone: () => operation.output,
    onSome: ({ status }) =>
      Arr.map(Arr.ensure(status), (code) =>
        operation.output.pipe(HttpApiSchema.status(code)),
      ),
  });

  const payload = Option.getOrUndefined(
    Option.liftPredicate(AwsJsonRpcPayload, () => operation.rest?.body ?? true),
  );

  return HttpApiEndpoint.make(operation.method)(
    name,
    `/${Str.slice(1)(path)}`,
    {
      params: fields,
      headers: HttpFields,
      query: HttpFields,
      payload,
      success,
    },
  );
};

/**
 * The awsHttpRequest function places each encoded Smithy member in the
 * location selected by its HTTP binding. The declaration schema has already
 * checked the values. The remaining members form the JSON document.
 *
 * @see ../../../../refs/smithy/docs/source-2.0/spec/http-bindings.rst (HTTP message bindings)
 */
export const awsHttpRequest = (
  operation: AwsOperation,
  encoded: AwsJsonRpcPayload,
) => {
  const bindings = operation.rest?.bindings ?? {};

  const bound = Record.toEntries(
    Record.filter(encoded, (_, name) => Record.has(bindings, name)),
  );

  const fieldsFor = (location: "LABEL" | "HEADER" | "QUERY") => {
    const selected = Arr.filter(
      bound,
      ([field]) => bindings[field].location === location,
    );

    return Record.fromEntries(
      Arr.map(selected, ([field, value]) =>
        Tuple.make(bindings[field].name, String(value)),
      ),
    );
  };

  const payload = Record.filter(
    encoded,
    (_, name) => !Record.has(bindings, name),
  );

  return {
    params: fieldsFor("LABEL"),
    headers: fieldsFor("HEADER"),
    query: fieldsFor("QUERY"),
    payload,
  };
};
