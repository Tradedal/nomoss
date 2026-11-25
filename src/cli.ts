import { Effect, FileSystem, Path, Schema } from "effect";

export {
  nomossCliCommand,
  stackCommandRuntimeLayer,
  stackLifecycleCommands,
  stackStateCommand,
  withStackCommands,
} from "./cliCommand.js";
export { renderCliFailure } from "./cliDiagnostics.js";

const PackageVersion = Schema.fromJsonString(
  Schema.Struct({ version: Schema.NonEmptyString }),
);

/**
 * nomossCliVersion reads the installed package version for application command
 * entry points. Version output then identifies the Nomoss build that
 * executes the command tree.
 */
export const nomossCliVersion = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;

  const packagePath: string = yield* path.fromFileUrl(
    new URL("../package.json", import.meta.url),
  );

  const metadata = yield* fs
    .readFileString(packagePath)
    .pipe(Effect.flatMap(Schema.decodeEffect(PackageVersion)));

  const version: string = metadata.version;

  return version;
});
