import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Layer, Path } from "effect";
import {
  TypeScriptModulePublisher,
  typeScriptModulePublisherLayer,
} from "../tools/typeScriptModulePublisher.js";

layer(
  typeScriptModulePublisherLayer.pipe(Layer.provideMerge(NodeServices.layer)),
)("TypeScriptModulePublisher", (it) => {
  it.effect(
    "A lint rejection preserves every existing destination in a publication batch",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const publisher = yield* TypeScriptModulePublisher;
        const directory = yield* fs.makeTempDirectoryScoped();
        const outputPath = path.join(directory, "policy.ts");
        const previous = "export const policy = true;\n";
        const catalogPath = path.join(directory, "catalog.ts");
        const previousCatalog = "export const catalog = {};\n";

        yield* fs.writeFileString(outputPath, previous);
        yield* fs.writeFileString(catalogPath, previousCatalog);

        const failure = yield* publisher
          .publishModules(directory, [
            {
              outputPath: catalogPath,
              source: "export const catalog = { updated: true };",
            },
            {
              outputPath,
              source:
                "export const choose = (value: boolean) => { if (value) { return 1; } return 0; };",
            },
          ])
          .pipe(Effect.flip);

        expect(failure._tag).toBe("TypeScriptModulesValidationFailed");
        expect(yield* fs.readFileString(outputPath)).toBe(previous);
        expect(yield* fs.readFileString(catalogPath)).toBe(previousCatalog);
      }),
    { timeout: 30_000 },
  );
  it.effect(
    "Publication writes the complete validated batch and preserves unrelated files",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const publisher = yield* TypeScriptModulePublisher;
        const directory = yield* fs.makeTempDirectoryScoped();
        const catalogPath = path.join(directory, "catalog.ts");
        const policyPath = path.join(directory, "nested/policy.ts");
        const clientPath = path.join(directory, "client.ts");
        const client = "export const client = true;\n";

        yield* fs.writeFileString(catalogPath, "export const catalog = {};\n");
        yield* fs.writeFileString(clientPath, client);

        const catalog = "export const catalog = { updated: true };\n";
        const policy = "export const policy = true;\n";
        const published = yield* publisher.publishModules(directory, [
          {
            outputPath: catalogPath,
            source: catalog,
          },
          { outputPath: policyPath, source: policy },
        ]);

        expect(published).toEqual([catalogPath, policyPath]);
        expect(yield* fs.readFileString(catalogPath)).toBe(catalog);
        expect(yield* fs.readFileString(policyPath)).toBe(policy);
        expect(yield* fs.readFileString(clientPath)).toBe(client);
      }),
    { timeout: 30_000 },
  );
  it.effect(
    "An invalid module rejects the complete batch and preserves the existing destination",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const publisher = yield* TypeScriptModulePublisher;
        const directory = yield* fs.makeTempDirectoryScoped();
        const outputPath = path.join(directory, "catalog.ts");
        const previous = "export const catalog = {};\n";
        yield* fs.writeFileString(outputPath, previous);
        const failure = yield* publisher
          .publishModules(directory, [
            { outputPath, source: "export const catalog = { valid: true };" },
            {
              outputPath: path.join(directory, "broken.ts"),
              source: "export const broken = ;",
            },
          ])
          .pipe(Effect.flip);
        expect(failure._tag).toBe("TypeScriptModulesValidationFailed");
        expect(yield* fs.readFileString(outputPath)).toBe(previous);
        expect(yield* fs.exists(path.join(directory, "broken.ts"))).toBe(false);
      }),
    { timeout: 30_000 },
  );
});
