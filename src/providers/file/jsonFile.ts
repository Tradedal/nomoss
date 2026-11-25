import {
  Context,
  Effect,
  FileSystem,
  Layer,
  Option,
  Path,
  Schema,
} from "effect";

/**
 * The JsonFile service lets file resources publish the values produced by an
 * applied stack for applications that read configuration from disk. The caller
 * supplies the document schema because each application defines the fields
 * and values its configuration requires.
 * Resource reconciliation uses the same schema when reading the file: absence
 * permits recreation, while invalid contents or a failed read stop reconciliation
 * and leave the resource's saved ownership available for recovery.
 */
export class JsonFile extends Context.Service<JsonFile>()(
  "nomoss/providers/file/jsonFile",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      /**
       * The write service method publishes application data after resource
       * dependencies have supplied their values. The document schema selects
       * the fields to publish and checks their values before filesystem changes
       * begin. Success returns the written path so resource execution can save
       * it for subsequent reads and teardown. A failed write leaves saved state
       * unchanged, although the destination may have been partially written.
       */
      const write = Effect.fn("JsonFile.write")(function* <
        Document extends Schema.JsonObject,
      >(outputPath: string, schema: Schema.Codec<Document>, input: unknown) {
        const document = yield* Schema.decodeUnknownEffect(schema)(input);
        const encoded = yield* Schema.encodeEffect(
          Schema.fromJsonString(schema),
        )(document);

        yield* fs.makeDirectory(path.dirname(outputPath), { recursive: true });
        yield* fs.writeFileString(outputPath, encoded);

        const published: string = outputPath;

        return published;
      });

      /**
       * The read service method lets resource reconciliation observe the file
       * at its saved path. Some contains the document accepted by the application's
       * schema, and None confirms that the file is absent. Invalid JSON, rejected
       * field values, and filesystem failures stop the read so reconciliation
       * preserves ownership instead of treating an unreadable file as missing.
       */
      const read = Effect.fn("JsonFile.read")(function* <
        Document extends Schema.JsonObject,
      >(outputPath: string, schema: Schema.Codec<Document>) {
        const observed: Option.Option<Document> = yield* fs
          .readFileString(outputPath)
          .pipe(
            Effect.flatMap(Schema.decodeEffect(Schema.fromJsonString(schema))),
            Effect.asSome,
            Effect.catchReason("PlatformError", "NotFound", () =>
              Effect.succeed(Option.none<Document>()),
            ),
          );

        return observed;
      });

      /**
       * The remove service method deletes the path retained by a managed file
       * resource. An absent file completes teardown because there is no file
       * left to remove. Other filesystem failures stop teardown so the stack
       * retains the saved path for a later retry.
       */
      const remove = Effect.fn("JsonFile.remove")((outputPath: string) =>
        fs.remove(outputPath, { force: true }),
      );

      return { write, read, remove };
    }),
  },
) {}

/**
 * The jsonFileLayer Layer lets the application supply the filesystem used for
 * both file publication and later observations. Its path service determines
 * the parent directory to create when publishing a document.
 */
export const jsonFileLayer = Layer.effect(JsonFile, JsonFile.make);
