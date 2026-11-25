import { Schema } from "effect";

/**
 * The JsonFileConfiguration schema connects a file resource's declared path
 * to the output that retains its published path. Reads and teardown use that
 * saved output so a change to the declaration cannot redirect them to a file
 * the stack has not published.
 */
export const JsonFileConfiguration = Schema.Struct({
  pathProperty: Schema.NonEmptyString,
  pathOutput: Schema.NonEmptyString,
});

export type JsonFileConfiguration = typeof JsonFileConfiguration.Type;

/**
 * The JsonFileResourceDefinition interface lets generated registrations supply
 * the contracts for a managed application file. Resolved properties include
 * both its destination and document data; the document schema selects the
 * fields that the application will read from the file. The property schema's
 * resource annotation identifies saved commands, and the output schema
 * validates the published path before the stack saves ownership.
 */
export interface JsonFileResourceDefinition {
  readonly propsSchema: Schema.Codec<Schema.JsonObject>;
  readonly documentSchema: Schema.Codec<Schema.JsonObject>;
  readonly outputsSchema: Schema.Codec<Schema.JsonObject>;
  readonly file: JsonFileConfiguration;
}
