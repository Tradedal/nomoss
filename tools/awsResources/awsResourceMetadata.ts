import { DatabaseBuilder } from "@aws-cdk/service-spec-importers";
import {
  emptyDatabase,
  type ResourceProperties,
  RichSpecDatabase,
} from "@aws-cdk/service-spec-types";
import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  JsonPointer,
  Layer,
  Match,
  Option,
  Path,
  Record,
  Schema,
  String as Str,
  Stream,
} from "effect";
import { ResourceSourceInvalid } from "../codegen/resourceErrors.js";
import {
  CloudFormationRelationshipsSchema,
  RegistryResourceSchema,
} from "./awsResourceDefinition.js";

/**
 * The ImportInput schema requires a region and selected documents because CDK
 * groups definitions by region. A report location is required so interpretation
 * warnings and corrections remain available when generation accepts the import.
 */
const ImportInput = Schema.Struct({
  region: Schema.NonEmptyString.check(
    Schema.isPattern(/^[a-z0-9]+(?:-[a-z0-9]+)+$/),
  ),
  documents: Schema.NonEmptyArray(Schema.JsonObject),
  relationships: CloudFormationRelationshipsSchema,
  reportDirectory: Schema.NonEmptyString,
});

/**
 * The RelationshipTarget schema identifies the saved resource value that core
 * must substitute into a declaration. Comparing these targets distinguishes a
 * duplicate report from multiple output choices that require review.
 */
const RelationshipTarget = Schema.Struct({
  typeName: RegistryResourceSchema.fields.typeName,
  propertyPath: Schema.Array(Schema.String),
});

const Relationship = Schema.Struct({
  propertyPath: Schema.Array(Schema.String),
  targets: Schema.Array(RelationshipTarget),
});

/**
 * The AwsResourceMetadata schema keeps the selected Registry documents beside
 * CDK's relationship information. Generation can use the relationships while
 * compiling validators from the original documents. Import diagnostics remain
 * available because CDK can report a problem and still return a database.
 */
export const AwsResourceMetadata = Schema.Struct({
  resources: Schema.NonEmptyArray(
    Schema.Struct({
      document: Schema.JsonObject,
      definition: RegistryResourceSchema,
      relationships: Schema.Array(Relationship),
    }),
  ),
  diagnostics: Schema.Struct({
    loading: Schema.Int,
    interpreting: Schema.Int,
    patch: Schema.Int,
  }),
  reportDirectory: Schema.NonEmptyString,
});

/**
 * The AwsResourceMetadataImporter service uses CDK's public importer with one
 * region and the caller's selected definitions. Historical CDK types and other
 * regions therefore cannot change the selected resource model. Relationships
 * retain array positions as '*' segments for declaration-schema generation.
 */
export class AwsResourceMetadataImporter extends Context.Service<AwsResourceMetadataImporter>()(
  "nomoss/tools/awsResources/awsResourceMetadata/AwsResourceMetadataImporter",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const encodeJson = Schema.encodeEffect(
        Schema.fromJsonString(Schema.Json),
      );

      /**
       * The prepare service method imports already verified Registry documents
       * and relationship records. It writes CDK diagnostics to the supplied
       * report directory and returns the original definitions for validation.
       * CDK applies its packaged schema corrections to temporary importer
       * inputs and records them in that report. The original verified documents
       * remain the authority for generated validators. Schema validation uses
       * CDK's warning mode because newer Registry keywords can exceed its
       * bundled schema. Missing resources and unresolved recursive definitions
       * fail preparation. Temporary inputs are released when the operation
       * finishes.
       */
      const prepare = Effect.fn("AwsResourceMetadataImporter.prepare")(
        function* (input: unknown) {
          // Import selection is validated before temporary files are created.
          // Decode original definitions here so later catalogs retain the
          // Registry's property classifications even when CDK corrects its copy.
          const request = yield* Schema.decodeUnknownEffect(ImportInput)(input);
          const definitions = yield* Effect.forEach(
            request.documents,
            (document) =>
              Schema.decodeUnknownEffect(RegistryResourceSchema)(document),
          );

          // CDK's Registry importer requires files grouped by region. Temporary
          // copies let its corrections run while the verified originals remain
          // available for Nomoss validation and resource identity classification.
          const directory = yield* fs.makeTempDirectoryScoped({
            prefix: "nomoss-cdk-definitions-",
          });
          const schemasDirectory = path.join(directory, "schemas");
          const regionDirectory = path.join(schemasDirectory, request.region);

          yield* fs.makeDirectory(regionDirectory, { recursive: true });

          yield* Effect.forEach(request.documents, (document, index) =>
            encodeJson(document).pipe(
              Effect.flatMap((json) =>
                fs.writeFileString(
                  path.join(
                    regionDirectory,
                    `${Str.toLowerCase(definitions[index].typeName).replaceAll("::", "-")}.json`,
                  ),
                  json,
                ),
              ),
            ),
          );

          // Relationship records belong to their owning resource type. Limit
          // owners to the selected definitions while retaining targets outside
          // that selection, which applications can declare separately.
          const selected = Record.filter(request.relationships, (_, typeName) =>
            Arr.some(
              definitions,
              (definition) => definition.typeName === typeName,
            ),
          );
          const relationshipsPath = path.join(directory, "relationships.json");

          yield* encodeJson(selected).pipe(
            Effect.flatMap((json) =>
              fs.writeFileString(relationshipsPath, json),
            ),
          );

          // Registry validation warnings remain in the CDK report because its
          // bundled schema can lag published keywords. Nomoss compiles value
          // validation from the originals and requires every selected resource
          // to be present in the imported database below.
          const imported = yield* Effect.tryPromise({
            try: () =>
              new DatabaseBuilder(emptyDatabase(), { validate: false })
                .importCloudFormationRegistryResources(schemasDirectory)
                .importOobRelationships(relationshipsPath)
                .build(),
            catch: (cause) =>
              new ResourceSourceInvalid({
                typeName: Arr.map(
                  definitions,
                  (definition) => definition.typeName,
                ).join(", "),
                message: `CDK definition import failed: ${String(cause)}`,
              }),
          });

          // Persist the import report before consuming interpreted metadata.
          // A report-write failure stops generation because accepted corrections
          // and warnings must remain available for review.
          yield* Effect.tryPromise({
            try: () => imported.report.write(request.reportDirectory),
            catch: (cause) =>
              new ResourceSourceInvalid({
                typeName: request.region,
                message: `CDK import report could not be saved: ${String(cause)}`,
              }),
          });

          const database = new RichSpecDatabase(imported.db);

          /**
           * The propertyTasks helper retains the definitions visited on each
           * property's path. Reusing a definition in another property is valid; a
           * reference back into the same path cannot produce a finite mapping.
           */
          const propertyTasks = (
            properties: ResourceProperties,
            propertyPath: ReadonlyArray<string>,
            visited: ReadonlySet<string>,
          ) =>
            Arr.map(Record.toEntries(properties), ([name, property]) => ({
              type: property.type,
              propertyPath: [...propertyPath, name],
              visited,
              references: property.relationshipRefs,
            }));

          const resources = yield* Effect.forEach(
            definitions,
            (definition, index) =>
              Effect.try({
                try: () =>
                  database.resourceByType(definition.typeName).properties,
                catch: (cause) =>
                  new ResourceSourceInvalid({
                    typeName: definition.typeName,
                    message: `CDK resource metadata is unavailable: ${String(cause)}. See ${request.reportDirectory}`,
                  }),
              }).pipe(
                Effect.flatMap((properties) =>
                  // Relationship paths follow nested objects and use '*' for
                  // collection members. Stream.unfold carries the remaining
                  // tasks immutably and infers failures from each expansion.
                  Stream.unfold(
                    propertyTasks(properties, [], new Set()),
                    (pending) =>
                      Arr.match(pending, {
                        onEmpty: () => Effect.succeed(undefined),
                        onNonEmpty: ([task, ...remaining]) =>
                          Effect.gen(function* () {
                            const { type, propertyPath, visited } = task;

                            // A relationship on an array property describes its
                            // members. Target names are escaped JSON pointer tokens
                            // and must be decoded before core resolves their values.
                            const referencePath = Match.value(type.type).pipe(
                              Match.when("array", () => [...propertyPath, "*"]),
                              Match.orElse(() => propertyPath),
                            );
                            const relationships = Option.match(
                              Option.fromUndefinedOr(task.references),
                              {
                                onNone: () => [],
                                onSome: (references) => [
                                  {
                                    propertyPath: referencePath,
                                    targets: Arr.map(
                                      references,
                                      (reference) => ({
                                        typeName: reference.cloudFormationType,
                                        propertyPath: Arr.map(
                                          Str.split(
                                            reference.propertyName,
                                            "/",
                                          ),
                                          JsonPointer.unescapeToken,
                                        ),
                                      }),
                                    ),
                                  },
                                ],
                              },
                            );

                            // Collection types add a member position; union members
                            // describe the same input position. Referenced definitions
                            // add their properties at the current position and must
                            // resolve without revisiting a definition on that path.
                            const nested = yield* Match.value(type).pipe(
                              Match.discriminator("type")("ref", (reference) =>
                                Effect.fromOption(
                                  Option.fromUndefinedOr(
                                    database.tryFindDef(reference),
                                  ).pipe(
                                    Option.filter(
                                      (definition) =>
                                        !visited.has(definition.$id),
                                    ),
                                  ),
                                  () =>
                                    new ResourceSourceInvalid({
                                      typeName: reference.reference.$ref,
                                      message: `CDK definition ${reference.reference.$ref} at ${propertyPath.join("/")} is missing or recursive; relationship generation requires a resolvable definition`,
                                    }),
                                ).pipe(
                                  Effect.map((definition) =>
                                    propertyTasks(
                                      definition.properties,
                                      propertyPath,
                                      new Set([...visited, definition.$id]),
                                    ),
                                  ),
                                ),
                              ),
                              Match.orElse((type) =>
                                Effect.succeed(
                                  Match.value(type).pipe(
                                    Match.discriminator("type")(
                                      "array",
                                      "map",
                                      ({ element }) => [
                                        {
                                          type: element,
                                          propertyPath: [...propertyPath, "*"],
                                          visited,
                                          references: undefined,
                                        },
                                      ],
                                    ),
                                    Match.discriminator("type")(
                                      "union",
                                      ({ types }) =>
                                        Arr.map(types, (type) => ({
                                          type,
                                          propertyPath,
                                          visited,
                                          references: undefined,
                                        })),
                                    ),
                                    Match.orElse(() => []),
                                  ),
                                ),
                              ),
                            );

                            return [
                              relationships,
                              [...nested, ...remaining],
                            ] as const;
                          }),
                      }),
                  ).pipe(Stream.runCollect, Effect.map(Arr.flatten)),
                ),
                Effect.map((collected) => {
                  // Union members can report the same relationship repeatedly.
                  // Group by input position and retain distinct source outputs
                  // so declaration generation can detect ambiguous selections.
                  const grouped = Arr.groupBy(collected, (relationship) =>
                    JsonPointer.formatUriFragment(relationship.propertyPath),
                  );
                  const relationships = Arr.map(
                    Record.values(grouped),
                    (group) => ({
                      propertyPath: group[0].propertyPath,
                      targets: Arr.dedupeWith(
                        Arr.flatMap(
                          group,
                          (relationship) => relationship.targets,
                        ),
                        Schema.toEquivalence(RelationshipTarget),
                      ),
                    }),
                  );

                  return {
                    document: request.documents[index],
                    definition,
                    relationships,
                  };
                }),
              ),
          );

          const prepared: typeof AwsResourceMetadata.Type =
            yield* Schema.decodeEffect(AwsResourceMetadata)({
              resources,
              diagnostics: imported.report.counts,
              reportDirectory: request.reportDirectory,
            });

          return prepared;
        },
        Effect.scoped,
      );

      return { prepare };
    }),
  },
) {}

export const awsResourceMetadataImporterLayer = Layer.effect(
  AwsResourceMetadataImporter,
  AwsResourceMetadataImporter.make,
);
