import {
  Array as Arr,
  JsonPointer,
  Match,
  Option,
  Record,
  Redacted,
  Schema,
  String as Str,
  TextDiff,
} from "effect";
import { stringify } from "yaml";
import {
  type ResourceNode,
  ResourceOutputRefSchema,
  type ResourcePropertyPath,
  ResourceReferenceRecordSchema,
} from "../resource/model.js";

const jsonArray = Schema.is(Schema.Array(Schema.Json));
const jsonObject = Schema.is(Schema.JsonObject);
const encodeJson = Schema.encodeSync(
  Schema.fromJsonString(Schema.Json, { space: 2 }),
);

/**
 * The propertyPath function decodes the pointers returned by JsonPatch.get
 * so property names with slashes or tildes still address the original value.
 */
const propertyPath = (pointer: string): ResourcePropertyPath =>
  Arr.map(Arr.drop(Str.split("/")(pointer), 1), JsonPointer.unescapeToken);

/**
 * The sensitiveProperties function combines CloudFormation write-only paths
 * with paths that carry protected outputs from another resource.
 *
 * @see refs/cloudformation-resource-schema/README.md (writeOnlyProperties)
 */
export const sensitiveProperties = (node: ResourceNode) =>
  Arr.appendAll(
    node.sensitivePropertyPaths ?? [],
    Arr.map(node.schema.cloudControl?.writeOnlyProperties ?? [], (pointer) =>
      Arr.drop(propertyPath(pointer), 1),
    ),
  );

/**
 * The isSensitivePath helper matches provider property paths, including
 * wildcards that cover every item in a collection.
 *
 * @see refs/cloudformation-resource-schema/README.md (writeOnlyProperties)
 */
const isSensitivePath = (
  path: ResourcePropertyPath,
  sensitive: ReadonlyArray<ResourcePropertyPath>,
): boolean =>
  Arr.some(
    sensitive,
    (secret) =>
      secret.length <= path.length &&
      Arr.every(
        secret,
        (segment, index) => segment === "*" || segment === path[index],
      ),
  );

/**
 * The displayValue helper uses Effect's Redacted type for sensitive fields
 * and labels unresolved references before the formatter receives them.
 */
const displayValue = (
  value: Schema.Json,
  sensitive: ReadonlyArray<ResourcePropertyPath>,
  path: ResourcePropertyPath,
): Schema.Json => {
  const display = (
    entry: Schema.Json,
    location: ResourcePropertyPath,
  ): Schema.Json =>
    Match.value(entry).pipe(
      Match.when(
        () => isSensitivePath(location, sensitive),
        () => String(Redacted.make(entry)),
      ),
      Match.when(
        Schema.is(ResourceOutputRefSchema),
        ({ source }) => `<available after apply: ${source.logicalId}>`,
      ),
      Match.when(
        Schema.is(ResourceReferenceRecordSchema),
        ({ source }) => `<available after apply: ${source.logicalId}>`,
      ),
      Match.when(jsonArray, (array) =>
        Arr.map(array, (item, index) =>
          display(item, Arr.append(location, String(index))),
        ),
      ),
      Match.when(jsonObject, (object) =>
        Record.map(object, (item, key) =>
          display(item, Arr.append(location, key)),
        ),
      ),
      Match.orElse((value) => value),
    );

  return display(value, path);
};

/**
 * The displayPropertyDiff function shows the saved and desired declarations
 * as a YAML line diff. Both documents use the same protected paths so the
 * comparison can safely include unchanged lines as context.
 */
export const displayPropertyDiff = (
  saved: Option.Option<ResourceNode>,
  desired: ResourceNode,
  canColor: boolean,
): Option.Option<string> => {
  const sensitive = Arr.appendAll(
    Option.match(saved, { onNone: () => [], onSome: sensitiveProperties }),
    sensitiveProperties(desired),
  );

  const yaml = (value: Schema.Json) =>
    stringify(displayValue(value, sensitive, []), {
      lineWidth: 0,
      sortMapEntries: true,
    });
  const after = yaml(desired.props);
  const before = Option.map(saved, (node) => yaml(node.props));

  // TextDiff.lines compares YAML documents using the public API in the pinned Effect release.
  // @effect-diagnostics-next-line experimentalApiUsage:off
  const edits = TextDiff.lines(
    Option.getOrElse(before, () => ""),
    after,
  );

  const insertedLine = Option.match(saved, {
    onNone: () => ({ prefix: "      ", color: "" }),
    onSome: () => ({ prefix: "    +   ", color: "\u001b[32m" }),
  });

  return Match.value(Arr.some(edits, (edit) => edit._tag !== "Equal")).pipe(
    Match.when(true, () => {
      const lines = Arr.flatMap(edits, (edit) => {
        const { prefix, color } = Match.value(edit).pipe(
          Match.tagsExhaustive({
            Equal: () => ({ prefix: "        ", color: "" }),
            Delete: () => ({ prefix: "    -   ", color: "\u001b[31m" }),
            Insert: () => insertedLine,
          }),
        );

        return Arr.map(edit.items, (item) => {
          const line = `${prefix}${item.replace(/\n$/, "")}`;

          return Match.value(canColor && color !== "").pipe(
            Match.when(true, () => `${color}${line}\u001b[0m`),
            Match.orElse(() => line),
          );
        });
      });

      return Option.some(`    properties:\n${Arr.join(lines, "\n")}`);
    }),
    Match.orElse(() =>
      saved.pipe(
        Option.filter(
          (node) =>
            !Schema.toEquivalence(Schema.Json)(node.props, desired.props),
        ),
        Option.map(
          () => "    properties: changed values are unavailable for display",
        ),
      ),
    ),
  );
};

/**
 * The displayProperties function prints one named property per line and
 * keeps nested values aligned with the property that contains them.
 */
export const displayProperties = (
  value: Schema.Json,
  sensitive: ReadonlyArray<ResourcePropertyPath>,
  indent: string,
): string => {
  const rendered = displayValue(value, sensitive, []);
  const aligned = Str.replace(/\n/g, `\n${indent}`);

  return Match.value(rendered).pipe(
    Match.when(jsonObject, (properties) =>
      Arr.match(Record.toEntries(properties), {
        onEmpty: () => `${indent}(none)`,
        onNonEmpty: (entries) =>
          Arr.join(
            Arr.map(entries, ([key, value]) => {
              const label = Match.value(/^[\w.-]+$/.test(key)).pipe(
                Match.when(true, () => key),
                Match.orElse(() => encodeJson(key)),
              );

              return `${indent}${label}: ${aligned(encodeJson(value))}`;
            }),
            "\n",
          ),
      }),
    ),
    Match.orElse((value) => `${indent}${aligned(encodeJson(value))}`),
  );
};
