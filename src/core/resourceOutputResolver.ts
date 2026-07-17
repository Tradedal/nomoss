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

import { type ResourceNode, ResourceNodeSchema } from "./model.js";
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

export class ResourceOutputPropertyPathInvalid extends Data.TaggedError(
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
      function replaceJsonProperty(
        props: Schema.Json,
        property: string,
        value: Schema.Json,
      ): Option.Option<Schema.Json> {
        const arrayIndex = (segment: string) =>
          Option.map(
            Option.fromNullishOr(segment.match(/^(?:0|[1-9]\d*)$/)),
            () => Number.parseInt(segment, 10),
          );
        const replaceAtPath = (
          current: Schema.Json,
          remainingSegments: ReadonlyArray<string>,
        ): Option.Option<Schema.Json> =>
          Option.match(Arr.head(remainingSegments), {
            onNone: () => Option.some(value),
            onSome: (segment) =>
              Option.orElse(
                Option.flatMap(
                  Schema.decodeUnknownOption(
                    Schema.Record(Schema.String, Schema.Json),
                  )(current),
                  (record) =>
                    Option.flatMap(
                      Option.fromUndefinedOr(record[segment]),
                      (child) =>
                        Option.map(
                          replaceAtPath(child, Arr.drop(remainingSegments, 1)),
                          (updatedChild) =>
                            Schema.Json.make(
                              Rec.set(record, segment, updatedChild),
                            ),
                        ),
                    ),
                ),
                () =>
                  Option.flatMap(
                    Schema.decodeUnknownOption(Schema.Array(Schema.Json))(
                      current,
                    ),
                    (array) =>
                      Option.flatMap(arrayIndex(segment), (index) =>
                        Option.flatMap(Arr.get(array, index), (child) =>
                          Option.map(
                            replaceAtPath(
                              child,
                              Arr.drop(remainingSegments, 1),
                            ),
                            (updatedChild) =>
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
          });

        return replaceAtPath(props, property.split("."));
      }

      const resolveNodeProps = (
        node: ResourceNode,
        resources: ReadonlyArray<ResourceNode>,
        dependencies: ReadonlyArray<ResourceDependency>,
      ) =>
        Stream.runFoldEffect(
          Stream.fromIterable(dependencies),
          () => node.props,
          (props, dependency) =>
            Arr.findFirst(
              resources,
              (resource) =>
                resource.key.logicalId === dependency.source.logicalId,
            ).pipe(
              Effect.fromOption(
                () =>
                  new ResourceOutputResolutionMissing({
                    property: dependency.edge.sourceProperty,
                    sourceLogicalId: dependency.source.logicalId,
                  }),
              ),
              Effect.flatMap((resource) =>
                Schema.decodeUnknownEffect(
                  Schema.Record(Schema.String, Schema.Json),
                )(resource.outputs),
              ),
              Effect.flatMap((outputs) =>
                Effect.fromOption(
                  () =>
                    new ResourceOutputResolutionMissing({
                      property: dependency.edge.sourceProperty,
                      sourceLogicalId: dependency.source.logicalId,
                    }),
                )(
                  Option.fromUndefinedOr(
                    outputs[dependency.edge.sourceProperty],
                  ),
                ),
              ),
              Effect.flatMap((value) =>
                Effect.fromOption(
                  () =>
                    new ResourceOutputPropertyPathInvalid({
                      logicalId: node.key.logicalId,
                      property: dependency.edge.property,
                    }),
                )(replaceJsonProperty(props, dependency.edge.property, value)),
              ),
            ),
        );

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
