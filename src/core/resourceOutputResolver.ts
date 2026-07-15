import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Option,
  Record as Rec,
  Schema,
  Stream,
} from "effect";

import {
  type ResourceKey,
  type ResourceNode,
  ResourceNodeSchema,
} from "./model.js";
import type { ResourceDependency } from "./resourceGraphStore.js";

/**
 * Stack lifecycle needs a typed failure when a planned resource depends on an
 * upstream output that is absent from the applied stack state. The error carries
 * the referenced logical id and property so failure recording can report the
 * missing dependency without inventing a resource-specific placeholder value.
 */
export class ResourceOutputResolutionMissing extends Data.TaggedError(
  "ResourceOutputResolutionMissing",
)<{
  readonly property: string;
  readonly sourceLogicalId: string;
}> {}

class ResourceOutputPropertyPathInvalid extends Data.TaggedError(
  "ResourceOutputPropertyPathInvalid",
)<{
  readonly logicalId: string;
  readonly property: string;
}> {}

/**
 * Stack lifecycle passes graph dependency edges here so create/update props can
 * receive applied output values before `ResourceCommandPolicy` runs.
 */
export class ResourceOutputResolver extends Context.Service<ResourceOutputResolver>()(
  "nomoss/core/resourceOutputResolver",
  {
    make: Effect.gen(function* () {
      function readAppliedOutputValue(
        source: ResourceKey,
        property: string,
        resources: ReadonlyArray<ResourceNode>,
      ) {
        return Effect.gen(function* () {
          const resource = yield* Arr.findFirst(
            resources,
            (resource) => resource.key.logicalId === source.logicalId,
          ).pipe(
            Option.match({
              onNone: () =>
                Effect.fail(
                  new ResourceOutputResolutionMissing({
                    property,
                    sourceLogicalId: source.logicalId,
                  }),
                ),
              onSome: Effect.succeed,
            }),
          );
          const outputValue = yield* Schema.decodeUnknownEffect(
            Schema.Record(Schema.String, Schema.Json),
          )(resource.outputs).pipe(
            Effect.flatMap((outputs) =>
              Option.fromUndefinedOr(outputs[property]).pipe(
                Option.match({
                  onNone: () =>
                    Effect.fail(
                      new ResourceOutputResolutionMissing({
                        property,
                        sourceLogicalId: source.logicalId,
                      }),
                    ),
                  onSome: Effect.succeed,
                }),
              ),
            ),
          );

          return outputValue;
        });
      }

      function replaceJsonProperty(
        node: ResourceNode,
        props: Schema.Json,
        property: string,
        value: Schema.Json,
      ) {
        return Effect.gen(function* () {
          const segments = property.split(".");
          const arrayIndex = (segment: string) =>
            /^(?:0|[1-9]\d*)$/.test(segment)
              ? Option.some(Number.parseInt(segment, 10))
              : Option.none<number>();
          const replaceAtPath = (
            current: Schema.Json,
            remainingSegments: ReadonlyArray<string>,
          ): Option.Option<Schema.Json> =>
            Arr.head(remainingSegments).pipe(
              Option.match({
                onNone: () => Option.some(value),
                onSome: (segment) =>
                  Schema.decodeUnknownOption(
                    Schema.Record(Schema.String, Schema.Json),
                  )(current).pipe(
                    Option.flatMap((record) =>
                      Option.fromUndefinedOr(record[segment]).pipe(
                        Option.flatMap((child) =>
                          replaceAtPath(child, Arr.drop(remainingSegments, 1)),
                        ),
                        Option.map((updatedChild) =>
                          Schema.Json.make(
                            Rec.set(record, segment, updatedChild),
                          ),
                        ),
                      ),
                    ),
                    Option.orElse(() =>
                      Schema.decodeUnknownOption(Schema.Array(Schema.Json))(
                        current,
                      ).pipe(
                        Option.flatMap((array) =>
                          arrayIndex(segment).pipe(
                            Option.flatMap((index) =>
                              Arr.get(array, index).pipe(
                                Option.flatMap((child) =>
                                  replaceAtPath(
                                    child,
                                    Arr.drop(remainingSegments, 1),
                                  ),
                                ),
                                Option.map((updatedChild) =>
                                  Schema.Json.make(
                                    Arr.appendAll(
                                      Arr.append(
                                        Arr.take(array, index),
                                        updatedChild,
                                      ),
                                      Arr.drop(array, index + 1),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
              }),
            );
          const resolvedProps = yield* replaceAtPath(props, segments).pipe(
            Option.match({
              onNone: () =>
                Effect.fail(
                  new ResourceOutputPropertyPathInvalid({
                    logicalId: node.key.logicalId,
                    property,
                  }),
                ),
              onSome: Effect.succeed,
            }),
          );

          return resolvedProps;
        });
      }

      function resolveNodeProps(
        node: ResourceNode,
        resources: ReadonlyArray<ResourceNode>,
        dependencies: ReadonlyArray<ResourceDependency>,
      ) {
        return Stream.runFoldEffect(
          Stream.fromIterable(dependencies),
          () => node.props,
          (props, dependency) =>
            readAppliedOutputValue(
              dependency.source,
              dependency.edge.sourceProperty,
              resources,
            ).pipe(
              Effect.flatMap((value) =>
                replaceJsonProperty(
                  node,
                  props,
                  dependency.edge.property,
                  value,
                ),
              ),
            ),
        );
      }

      return {
        resolveNode: Effect.fn("ResourceOutputResolver.resolveNode")(function* (
          node: ResourceNode,
          resources: ReadonlyArray<ResourceNode>,
          dependencies: ReadonlyArray<ResourceDependency>,
        ) {
          const resolvedProps = yield* resolveNodeProps(
            node,
            resources,
            dependencies,
          );
          const resolvedNode = yield* ResourceNodeSchema.makeEffect({
            key: node.key,
            schema: node.schema,
            props: resolvedProps,
            outputs: node.outputs,
          });

          return resolvedNode;
        }),
      };
    }),
  },
) {}
