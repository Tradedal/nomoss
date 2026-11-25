import { fileURLToPath } from "node:url";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  FileSystem,
  HashMap,
  Layer,
  Match,
  Option,
  Order,
  Path,
  Record,
  Ref,
  Schema,
  Struct,
  Tuple,
} from "effect";
import { Digest } from "effect/crypto";
import { Base64 } from "effect/encoding";
import { build } from "esbuild";
import { type Zippable, type ZippableFile, zipSync } from "fflate";

/** The sourceSchema schema selects file packaging or a source build before Nomoss computes the deployment digest. */
const sourceSchema = Schema.Union([
  Schema.TaggedStruct("File", { path: Schema.NonEmptyString }),
  Schema.TaggedStruct("Build", {
    path: Schema.NonEmptyString,
    platform: Schema.Literals(["node", "browser", "neutral"]),
    target: Schema.NonEmptyString,
    format: Schema.Literals(["esm", "cjs"]),
    external: Schema.Array(Schema.String),
  }),
]);

/**
 * The AssetSchema schema preserves a local source and its planned digest in
 * resource properties. Core prepares these sources before comparing resources,
 * so every resource service can consume the bytes selected by its plan.
 *
 * @see ../../refs/aws-cdk-generator/packages/aws-cdk-lib/core/lib/assets.ts (AssetHashType.OUTPUT)
 */
export const AssetSchema = Schema.TaggedStruct("Asset", {
  source: sourceSchema,
  digest: Schema.optionalKey(Schema.NonEmptyString),
});

export type Asset = typeof AssetSchema.Type;

/** The AssetError error identifies the source that Nomoss could not prepare or retrieve. */
export class AssetError extends Data.TaggedError("AssetError")<{
  readonly path: string;
  readonly message: string;
  readonly cause?: unknown;
}> {}

/**
 * The Asset namespace supplies local files, directories, and source builds to
 * resource declarations. These functions describe the source without reading
 * it. Planning reads or builds the source before selecting resource changes.
 */
export const Asset = {
  /**
   * The fromPath function describes a file to upload unchanged or a directory
   * to package as a ZIP. A directory includes all regular files recursively.
   * Planning rejects symbolic links and special files. Relative paths use the
   * process's working directory. Use a file URL resolved against import.meta.url
   * to select a source beside the calling module.
   */
  fromPath: (path: string | URL): Asset => {
    const sourcePath = Match.value(path).pipe(
      Match.when(Match.string, (path) => path),
      Match.orElse(fileURLToPath),
    );

    return AssetSchema.make({
      _tag: "Asset",
      source: { _tag: "File", path: sourcePath },
    });
  },

  /**
   * The fromBuild function selects an entry point and build settings. Planning
   * bundles its imports into index.mjs or index.cjs and packages that output.
   * The format defaults to ESM. Imports listed in external must be available
   * in the deployment runtime. Relative paths use the process's working directory.
   *
   * @see ../../refs/aws-sdk-js-v3/packages-internal/core/scripts/browser-build/esbuild.js (build)
   * @see ../../node_modules/esbuild/lib/main.d.ts (BuildOptions.write and BuildResult.outputFiles)
   */
  fromBuild: (
    entry: string | URL,
    options: {
      readonly platform: "node" | "browser" | "neutral";
      readonly target: string;
      readonly format?: "esm" | "cjs";
      readonly external?: ReadonlyArray<string>;
    },
  ): Asset => {
    const path = Match.value(entry).pipe(
      Match.when(Match.string, (path) => path),
      Match.orElse(fileURLToPath),
    );

    return AssetSchema.make({
      _tag: "Asset",
      source: {
        _tag: "Build",
        path,
        platform: options.platform,
        target: options.target,
        format: options.format ?? "esm",
        external: options.external ?? [],
      },
    });
  },
};

/**
 * The Assets service prepares local inputs and retains artifacts by their
 * SHA-256 digest for the application runtime. Resource services read retained
 * bytes during apply. A source edit after review is included only in a new
 * plan. Plans and resource services must use the same Assets instance.
 */
export class Assets extends Context.Service<Assets>()(
  "nomoss/core/asset/Assets",
  {
    make: Effect.gen(function* () {
      const artifacts = yield* Ref.make(HashMap.empty<string, Uint8Array>());
      const hashing = yield* Digest.Digest;
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      const archive = Effect.fn("Assets.archive")(
        (path: string, files: Zippable) =>
          Effect.try({
            // The zipSync operation accepts file entries and per-file metadata.
            // Fixed timestamps and sorted entries keep repeated packages identical.
            // See node_modules/fflate/README.md, "You can create multi-file ZIP archives".
            try: () =>
              zipSync(files, { mtime: "1980-01-01T00:00:00", level: 6 }),
            catch: (cause) =>
              new AssetError({
                path,
                message: `Could not package asset ${path}.`,
                cause,
              }),
          }),
      );

      /** The packageDirectory function archives regular files in sorted order and preserves their permissions. */
      const packageDirectory = Effect.fn("Assets.packageDirectory")(function* (
        directory: string,
      ) {
        const names = yield* fs.readDirectory(directory, { recursive: true });
        const entries = yield* Effect.forEach(
          Arr.sort(names, Order.String),
          (name) =>
            fs.lstat(path.join(directory, name)).pipe(
              Effect.filterOrFail(
                (info) => info.type === "File" || info.type === "Directory",
                () =>
                  new AssetError({
                    path: directory,
                    message: `Asset ${directory} contains an unsupported file: ${name}. Use regular files and directories.`,
                  }),
              ),
              Effect.map((info) => ({ name, info })),
            ),
        );
        const files = yield* Effect.forEach(
          Arr.filter(entries, ({ info }) => info.type === "File"),
          Effect.fnUntraced(function* ({ name, info }) {
            const bytes = yield* fs.readFile(path.join(directory, name));
            const file: ZippableFile = [
              bytes,
              { os: 3, attrs: info.mode << 16 },
            ];

            return Tuple.make(Arr.join(name.split(path.sep), "/"), file);
          }),
        );

        return yield* archive(directory, Record.fromEntries(files));
      });

      /** The compile function builds an entry point through the build API and packages its output files. */
      const compile = Effect.fn("Assets.compile")(function* (
        source: Extract<typeof sourceSchema.Type, { readonly _tag: "Build" }>,
      ) {
        const outfile = Match.value(source.format).pipe(
          Match.when("esm", () => "index.mjs"),
          Match.orElse(() => "index.cjs"),
        );
        const result = yield* Effect.tryPromise({
          try: () =>
            build({
              entryPoints: [source.path],
              platform: source.platform,
              target: source.target,
              format: source.format,
              external: Arr.fromIterable(source.external),
              bundle: true,
              write: false,
              outfile,
              logLevel: "silent",
            }),
          catch: (cause) =>
            new AssetError({
              path: source.path,
              message: `Could not build asset ${source.path}. Check that the entry exists and that its imports and build settings are valid.`,
              cause,
            }),
        });

        return yield* archive(
          source.path,
          Record.fromEntries(
            Arr.map(result.outputFiles, (file) =>
              Tuple.make(path.basename(file.path), file.contents),
            ),
          ),
        );
      });

      const read = Effect.fn("Assets.read")(function* (
        source: Extract<typeof sourceSchema.Type, { readonly _tag: "File" }>,
      ) {
        const info = yield* fs.lstat(source.path);

        return yield* Match.value(info.type).pipe(
          Match.when("File", () => fs.readFile(source.path)),
          Match.when("Directory", () => packageDirectory(source.path)),
          Match.orElse(() =>
            Effect.fail(
              new AssetError({
                path: source.path,
                message: `Asset ${source.path} must be a regular file or directory.`,
              }),
            ),
          ),
        );
      });

      /** The prepareAsset service method prepares a source and returns the digest used to retrieve its retained bytes. */
      const prepareAsset = Effect.fn("Assets.prepareAsset")(function* (
        asset: Asset,
      ) {
        const bytes = yield* Match.value(asset.source).pipe(
          Match.tag("Build", compile),
          Match.tag("File", read),
          Match.exhaustive,
          Effect.catchTag("PlatformError", (cause) =>
            Effect.fail(
              new AssetError({
                path: asset.source.path,
                message: `Could not read asset ${asset.source.path}. Check that the source exists and is readable.`,
                cause,
              }),
            ),
          ),
        );
        const digest = Base64.encode(
          yield* hashing.digest(Digest.sha256, bytes),
        );

        yield* Ref.update(artifacts, HashMap.set(digest, bytes));

        const prepared: Asset = Struct.assign(asset, { digest });

        return prepared;
      });

      /**
       * The prepare service method prepares every asset inside JSON resource
       * properties. The returned descriptors retain paths and digests for review
       * and saved state; archive bytes remain in this runtime.
       *
       * @see ../../node_modules/effect/src/Effect.ts (Effect.fn.Return for recursive functions)
       */
      const prepare = Effect.fn("Assets.prepare")(function* (
        value: Schema.Json,
      ): Effect.fn.Return<Schema.Json, AssetError, never> {
        const children: ReadonlyArray<readonly [string, Schema.Json]> =
          Match.value(value).pipe(
            Match.when(Schema.is(Schema.Array(Schema.Json)), (values) =>
              Arr.map(values, (value, index) =>
                Tuple.make(String(index), value),
              ),
            ),
            Match.when(Schema.is(Schema.JsonObject), (record) =>
              Record.toEntries(record),
            ),
            Match.orElse(() => []),
          );
        const entries = yield* Effect.forEach(children, ([key, value]) =>
          prepare(value).pipe(Effect.map((value) => Tuple.make(key, value))),
        );
        const result: Schema.Json = Match.value(value).pipe(
          Match.when(Schema.is(Schema.Array(Schema.Json)), () =>
            Arr.map(entries, ([, value]) => value),
          ),
          Match.when(Schema.is(Schema.JsonObject), () =>
            Record.fromEntries(entries),
          ),
          Match.orElse((value) => value),
        );

        return yield* Option.match(
          Option.liftPredicate(result, Schema.is(AssetSchema)),
          { onSome: prepareAsset, onNone: () => Effect.succeed(result) },
        );
      });

      /**
       * The bytes service method returns a copy of the artifact retained by
       * planning. An absent digest or an artifact prepared in another runtime
       * fails with AssetError; callers must prepare a new plan in this runtime.
       */
      const bytes = Effect.fn("Assets.bytes")((asset: Asset) =>
        Ref.get(artifacts).pipe(
          Effect.map((values) => HashMap.get(values, asset.digest ?? "")),
          Effect.flatMap(Effect.fromOption),
          Effect.map((bytes) => Uint8Array.from(bytes)),
          Effect.mapError(
            () =>
              new AssetError({
                path: asset.source.path,
                message: `Asset ${asset.source.path} has no prepared artifact. Prepare a new plan in this runtime.`,
              }),
          ),
        ),
      );

      return { prepare, prepareAsset, bytes };
    }),
  },
) {}

/**
 * The assetsLayer Layer provides one Assets service with SHA-256 hashing.
 * Applications supply FileSystem and Path through their platform Layer.
 *
 * @see ../../node_modules/effect/src/Layer.ts (effect and provide)
 * @see ../../node_modules/effect/src/crypto/Digest.ts (layerWebCrypto)
 */
export const assetsLayer = Layer.effect(Assets, Assets.make).pipe(
  Layer.provide(Digest.layerWebCrypto),
);
