import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Match,
  Option,
  Record as Rec,
  Schema,
} from "effect";

import {
  keyString,
  ResourceModel,
  type ResourceNode,
  type ResourceOutputRef,
  ResourceOutputResolutionMissing,
  type ResourcePropertyPath,
  resourceOutputRef,
} from "./model.js";
import type { ResourceDependency } from "./resourceGraphStore.js";

/**
 * The input path recorded for a dependency does not exist in the resource's
 * props. Lifecycle execution reports the resource and path before calling
 * its provider.
 */
export class ResourceOutputPropertyPathInvalid extends Data.TaggedError(
  "ResourceOutputPropertyPathInvalid",
)<{
  readonly logicalId: string;
  readonly property: ResourcePropertyPath;
}> {}

/**
 * Stack execution uses this service to read outputs from applied resources and
 * put their values into dependent inputs. It checks outputs through the same
 * ResourceModel that registered the declarations' output schemas.
 */
export class ResourceOutputResolver extends Context.Service<ResourceOutputResolver>()(
  "nomoss/core/resource/resourceOutputResolver",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;

      /**
       * Reads the referenced output from applied resource nodes using the
       * caller's schema. A missing resource or field fails with
       * ResourceOutputResolutionMissing. Invalid provider data or a value that
       * fails the caller's schema produces SchemaError.
       */
      const resolveOutput = Effect.fn("ResourceOutputResolver.resolveOutput")(
        function* <S extends Schema.Constraint>(
          output: ResourceOutputRef,
          resources: ReadonlyArray<ResourceNode>,
          schema: S,
        ) {
          const source = yield* Arr.findFirst(
            resources,
            (resource) => keyString(resource.key) === keyString(output.source),
          ).pipe(
            Effect.fromOption,
            Effect.mapError(
              () =>
                new ResourceOutputResolutionMissing({
                  property: output.property,
                  sourceLogicalId: output.source.logicalId,
                }),
            ),
          );

          const value: S["Type"] = yield* model.decodeOutput(
            source,
            output.property,
            schema,
          );

          return value;
        },
      );

      /**
       * Stack lifecycle calls this method before invoking the provider. It
       * copies outputs from applied resources into this node's props. Each
       * property dependency must point to an existing object field or array
       * element. Prerequisites determine execution order and need no property
       * replacement. The returned node keeps its provider identifier,
       * metadata, and outputs.
       */
      const resolveNode = Effect.fn("ResourceOutputResolver.resolveNode")(
        function* (
          node: ResourceNode,
          resources: ReadonlyArray<ResourceNode>,
          dependencies: ReadonlyArray<ResourceDependency>,
        ) {
          const replaceAtPath = (
            current: Schema.Json,
            segments: ReadonlyArray<string>,
            value: Schema.Json,
          ): Option.Option<Schema.Json> =>
            Option.match(Arr.head(segments), {
              onNone: () => Option.some(value),
              onSome: (segment) =>
                Schema.decodeUnknownOption(
                  Schema.Record(Schema.String, Schema.Json),
                )(current).pipe(
                  Option.flatMap((record) =>
                    Rec.get(record, segment).pipe(
                      Option.flatMap((child) =>
                        replaceAtPath(child, Arr.drop(segments, 1), value),
                      ),
                      Option.map((updatedChild) =>
                        Rec.set(record, segment, updatedChild),
                      ),
                    ),
                  ),
                  Option.orElse(() =>
                    Schema.decodeUnknownOption(Schema.Array(Schema.Json))(
                      current,
                    ).pipe(
                      Option.flatMap((array) =>
                        Option.fromNullishOr(
                          segment.match(/^(?:0|[1-9]\d*)$/),
                        ).pipe(
                          Option.map(() => Number.parseInt(segment, 10)),
                          Option.flatMap((index) =>
                            Arr.get(array, index).pipe(
                              Option.flatMap((child) =>
                                replaceAtPath(
                                  child,
                                  Arr.drop(segments, 1),
                                  value,
                                ),
                              ),
                              Option.flatMap((updatedChild) =>
                                Arr.replace(array, index, updatedChild),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
            });

          const incoming = Arr.filter(
            dependencies,
            (dependency) =>
              keyString(dependency.target) === keyString(node.key),
          );

          const props = yield* Effect.reduce(
            incoming,
            () => node.props,
            (current, dependency) =>
              Match.value(dependency.edge).pipe(
                Match.when(
                  { kind: "property" },
                  Effect.fn(function* (edge) {
                    const value = yield* resolveOutput(
                      resourceOutputRef(dependency.source, edge.sourceProperty),
                      resources,
                      Schema.Json,
                    );

                    const resolvedProps: Schema.Json = yield* replaceAtPath(
                      current,
                      edge.property,
                      value,
                    ).pipe(
                      Effect.fromOption,
                      Effect.mapError(
                        () =>
                          new ResourceOutputPropertyPathInvalid({
                            logicalId: node.key.logicalId,
                            property: edge.property,
                          }),
                      ),
                    );

                    return resolvedProps;
                  }),
                ),
                Match.orElse(() => Effect.succeed(current)),
              ),
          );

          const resolvedNode: ResourceNode = { ...node, props };

          return resolvedNode;
        },
      );

      return { resolveOutput, resolveNode };
    }),
  },
) {}
