import { randomUUID } from "node:crypto";

import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  Match,
  Option,
  Record,
  Schema,
  String as Str,
} from "effect";

const PhysicalNameFileSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  names: Schema.Record(Schema.String, Schema.String),
});

type PhysicalNameFile = Schema.Schema.Type<typeof PhysicalNameFileSchema>;

const PhysicalNameJsonSchema = Schema.fromJsonString(PhysicalNameFileSchema);

/**
 * Generated provider names must remain stable across local runs when callers
 * omit explicit names. Destroy clears those mappings so recreated stacks do not
 * reuse stale names during provider cooldown windows.
 */
export class PhysicalNameStore extends Context.Service<PhysicalNameStore>()(
  "nomoss/core/physicalNameStore",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const emptyState = PhysicalNameFileSchema.make({
        schemaVersion: 1,
        names: {},
      });
      const readState = Effect.fn("PhysicalNameStore.readState")(function* () {
        const exists = yield* fs.exists("./.nomoss/physical-names.json");
        const readExisting = fs
          .readFileString("./.nomoss/physical-names.json")
          .pipe(
            Effect.flatMap(Schema.decodeUnknownEffect(PhysicalNameJsonSchema)),
          );

        return yield* Match.value(exists).pipe(
          Match.when(true, () => readExisting),
          Match.orElse(() => Effect.succeed(emptyState)),
        );
      });
      const writeState = Effect.fn("PhysicalNameStore.writeState")(function* (
        state: PhysicalNameFile,
      ) {
        const encoded = yield* Schema.encodeEffect(PhysicalNameJsonSchema)(
          state,
        );

        yield* fs.makeDirectory("./.nomoss", { recursive: true });
        yield* fs.writeFileString("./.nomoss/physical-names.json", encoded);
      });
      const createMissingBucketName = Effect.fn(
        "PhysicalNameStore.createMissingBucketName",
      )(function* (state: PhysicalNameFile, logicalId: string) {
        const uuid = yield* Effect.sync(randomUUID);
        const suffix = Str.takeLeft(
          Arr.join(
            Arr.filter(Str.split(uuid, ""), (character) => character !== "-"),
            "",
          ),
          8,
        );
        const sanitized = Arr.reduce(
          Str.split(logicalId, ""),
          {
            pendingSeparator: Boolean(false),
            text: String(Str.empty),
          },
          (nameState, character) =>
            Match.value(Str.toLowerCase(character)).pipe(
              Match.when(
                (candidate) =>
                  Str.includes(candidate)(
                    "abcdefghijklmnopqrstuvwxyz0123456789",
                  ),
                Option.some,
              ),
              Match.when(
                (candidate) => Str.includes(candidate)("-"),
                Option.some,
              ),
              Match.orElse(() => Option.none<string>()),
              Option.match({
                onNone: () => ({
                  pendingSeparator: Str.isNonEmpty(nameState.text),
                  text: nameState.text,
                }),
                onSome: (nameCharacter) => ({
                  pendingSeparator: false,
                  text: `${nameState.text}${Match.value(
                    nameState.pendingSeparator,
                  ).pipe(
                    Match.when(true, () => "-"),
                    Match.orElse(() => ""),
                  )}${nameCharacter}`,
                }),
              }),
            ),
        ).text;
        const name = `nomoss-${sanitized}-${suffix}`;
        const nextState: PhysicalNameFile = {
          schemaVersion: 1,
          names: Record.set(state.names, logicalId, name),
        };

        yield* writeState(nextState);

        return name;
      });
      const createMissingQueueName = Effect.fn(
        "PhysicalNameStore.createMissingQueueName",
      )(function* (state: PhysicalNameFile, logicalId: string) {
        const uuid = yield* Effect.sync(randomUUID);
        const suffix = Str.takeLeft(
          Arr.join(
            Arr.filter(Str.split(uuid, ""), (character) => character !== "-"),
            "",
          ),
          8,
        );
        const sanitized = Arr.reduce(
          Str.split(logicalId, ""),
          {
            pendingSeparator: Boolean(false),
            text: String(Str.empty),
          },
          (nameState, character) =>
            Match.value(Str.toLowerCase(character)).pipe(
              Match.when(
                (candidate) =>
                  Str.includes(candidate)(
                    "abcdefghijklmnopqrstuvwxyz0123456789",
                  ),
                Option.some,
              ),
              Match.when(
                (candidate) => Str.includes(candidate)("_-"),
                Option.some,
              ),
              Match.orElse(() => Option.none<string>()),
              Option.match({
                onNone: () => ({
                  pendingSeparator: Str.isNonEmpty(nameState.text),
                  text: nameState.text,
                }),
                onSome: (nameCharacter) => ({
                  pendingSeparator: false,
                  text: `${nameState.text}${Match.value(
                    nameState.pendingSeparator,
                  ).pipe(
                    Match.when(true, () => "-"),
                    Match.orElse(() => ""),
                  )}${nameCharacter}`,
                }),
              }),
            ),
        ).text;
        const name = `nomoss-${sanitized}-${suffix}`;
        const nextState: PhysicalNameFile = {
          schemaVersion: 1,
          names: Record.set(state.names, logicalId, name),
        };

        yield* writeState(nextState);

        return name;
      });
      const bucketNameFor = Effect.fn("PhysicalNameStore.bucketNameFor")(
        function* (logicalId: string) {
          const state = yield* readState();
          const existing = Option.fromUndefinedOr(state.names[logicalId]);

          return yield* Match.value(existing).pipe(
            Match.when({ _tag: "Some" }, ({ value }) => Effect.succeed(value)),
            Match.when({ _tag: "None" }, () =>
              createMissingBucketName(state, logicalId),
            ),
            Match.exhaustive,
          );
        },
      );
      const queueNameFor = Effect.fn("PhysicalNameStore.queueNameFor")(
        function* (logicalId: string) {
          const state = yield* readState();
          const existing = Option.fromUndefinedOr(state.names[logicalId]);

          return yield* Match.value(existing).pipe(
            Match.when({ _tag: "Some" }, ({ value }) => Effect.succeed(value)),
            Match.when({ _tag: "None" }, () =>
              createMissingQueueName(state, logicalId),
            ),
            Match.exhaustive,
          );
        },
      );

      return {
        bucketNameFor,
        queueNameFor,

        deleteNames: Effect.fn("PhysicalNameStore.deleteNames")(function* (
          logicalIds: ReadonlyArray<string>,
        ) {
          const state = yield* readState();
          const names = Arr.reduce(
            logicalIds,
            state.names,
            (remaining, logicalId) => Record.remove(remaining, logicalId),
          );
          const nextState: PhysicalNameFile = {
            schemaVersion: 1,
            names,
          };

          yield* writeState(nextState);
        }),
      };
    }),
  },
) {}
