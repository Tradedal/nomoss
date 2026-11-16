import {
  Array as Arr,
  Context,
  Data,
  Effect,
  JsonPatch,
  JsonPointer,
  Layer,
  Match,
  Option,
  Record as Rec,
  Schema,
} from "effect";

import {
  DependencyEdgeSchema,
  ResourceModel,
  type ResourceNode,
  ResourceOutput,
  ResourceOutputReference,
  ResourceOutputResolutionMissing,
  type ResourcePropertyPath,
  type ResourceReferenceRecord,
  resourceModelLayer,
} from "./model.js";
import type { ResourceDependency } from "./resourceGraphStore.js";

/**
 * ResourceOutputPropertyPathInvalid identifies a dependency whose target input
 * does not exist in the declared props. Resolution fails before the provider
 * call so the request cannot silently omit the required output substitution.
 */
export class ResourceOutputPropertyPathInvalid extends Data.TaggedError(
  "ResourceOutputPropertyPathInvalid",
)<{
  readonly logicalId: string;
  readonly property: ResourcePropertyPath;
}> {}

/**
 * Dependent provider requests use the output schemas registered during
 * declaration to validate their source values. Execution must share that
 * ResourceModel instance so missing or invalid values stop the dependent
 * mutation before provider I/O.
 */
export class ResourceOutputResolver extends Context.Service<ResourceOutputResolver>()(
  "nomoss/core/resource/resourceOutputResolver",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;

      /**
       * The replaceProperty service method requires an existing request
       * location. A malformed mapping fails instead of silently adding a
       * property that the declaration never supplied.
       */
      const replaceProperty = Effect.fn(
        "ResourceOutputResolver.replaceProperty",
      )(function* (
        logicalId: string,
        props: Schema.Json,
        property: ResourcePropertyPath,
        value: Schema.Json,
      ) {
        const path = Match.value(property.length).pipe(
          Match.when(0, () => ""),
          Match.orElse(
            () =>
              `/${Arr.join(Arr.map(property, JsonPointer.escapeToken), "/")}`,
          ),
        );
        const updated: Schema.Json = yield* Effect.try({
          try: () => JsonPatch.apply([{ op: "replace", path, value }], props),
          catch: () =>
            new ResourceOutputPropertyPathInvalid({ logicalId, property }),
        });

        return updated;
      });

      /**
       * The resolveReference service method obtains request values from the
       * current applied entity. The source must match the declared resource
       * type and its complete outputs must pass their registered schema before
       * any selected value can be used.
       */
      // CLEANUP_Q [resource-entities] Related resources receive the current provider values they
      // need, even when a dependency is replaced or belongs to another provider.
      const resolveReference = Effect.fn(
        "ResourceOutputResolver.resolveReference",
      )(function* (
        reference: ResourceReferenceRecord,
        resources: ReadonlyArray<ResourceNode>,
      ) {
        const source = yield* Arr.findFirst(
          resources,
          (node) => node.key.logicalId === reference.source.logicalId,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceOutputResolutionMissing({
                sourceLogicalId: reference.source.logicalId,
                property: JsonPointer.formatUriFragment(
                  reference.mapping.outputs[0].source,
                ),
              }),
          ),
        );

        yield* model.validateResourceReference(reference, source);

        const outputs = yield* model.validateResourceOutputs(
          source.schema,
          source.outputs,
        );

        const value: Schema.Json = yield* Effect.reduce(
          reference.mapping.outputs,
          () => reference.mapping.value,
          (current, mapping) =>
            Effect.gen(function* () {
              const output = yield* Effect.reduce(
                mapping.source,
                () => outputs,
                (current, segment) =>
                  Match.value(current).pipe(
                    Match.when(Schema.is(Schema.Array(Schema.Json)), (values) =>
                      Option.fromNullishOr(
                        segment.match(/^(?:0|[1-9]\d*)$/),
                      ).pipe(
                        Option.flatMap(() => Arr.get(values, Number(segment))),
                      ),
                    ),
                    Match.when(
                      Schema.is(Schema.Record(Schema.String, Schema.Json)),
                      (values) => Rec.get<string, Schema.Json>(values, segment),
                    ),
                    Match.orElse(() => Option.none<Schema.Json>()),
                    Effect.fromOption,
                    Effect.mapError(
                      () =>
                        new ResourceOutputResolutionMissing({
                          sourceLogicalId: source.key.logicalId,
                          property: JsonPointer.formatUriFragment(
                            mapping.source,
                          ),
                        }),
                    ),
                  ),
              );

              const mapped: Schema.Json = yield* replaceProperty(
                source.key.logicalId,
                current,
                mapping.target,
                output,
              );

              return mapped;
            }),
        );

        return value;
      });

      /**
       * Deferred request descriptors require an applied source before execution
       * can substitute their values. A compatible schema can add constraints.
       * Missing resources or fields produce ResourceOutputResolutionMissing;
       * invalid provider data or a rejected value produces SchemaError.
       */
      const resolveOutput = Effect.fn("ResourceOutputResolver.resolveOutput")(
        function* <Value>(
          output: ResourceOutput<Value>,
          resources: ReadonlyArray<ResourceNode>,
          schema?: Schema.Schema<NoInfer<Value>>,
        ) {
          const reference = output[ResourceOutputReference];
          const source = yield* Arr.findFirst(
            resources,
            (resource) => resource.key.logicalId === reference.source.logicalId,
          ).pipe(
            Effect.fromOption,
            Effect.mapError(
              () =>
                new ResourceOutputResolutionMissing({
                  property: reference.property,
                  sourceLogicalId: reference.source.logicalId,
                }),
            ),
          );

          const providerValue = yield* model.decodeOutput(
            source,
            reference.property,
            output.schema,
          );

          const value: Value = yield* Option.match(
            Option.fromUndefinedOr(schema),
            {
              onNone: () => Effect.succeed(providerValue),
              onSome: (expected) =>
                Schema.decodeUnknownEffect(Schema.toType(expected))(
                  providerValue,
                ),
            },
          );

          return value;
        },
      );

      /**
       * resolveNode returns a node with its property references resolved for
       * the provider request.
       * Each target must already exist as an object field or array element;
       * prerequisites affect execution order and do not substitute values.
       * Resolution preserves the node's provider identifier, metadata, and outputs.
       */
      // CLEANUP_Q [resource-entities] Applications can apply complex resource configurations
      // containing related resources and recover interrupted work with the relationships intact.
      const resolveNode = Effect.fn("ResourceOutputResolver.resolveNode")(
        function* (
          node: ResourceNode,
          resources: ReadonlyArray<ResourceNode>,
          dependencies: ReadonlyArray<ResourceDependency>,
        ) {
          const savedRelationships: ReadonlyArray<ResourceDependency> = Arr.map(
            node.relationships ?? [],
            ({ property, reference }) => ({
              source: reference.source,
              target: node.key,
              edge: { kind: "relationship", property, reference },
            }),
          );
          const incoming = Arr.dedupeWith(
            Arr.appendAll(
              Arr.filter(
                dependencies,
                (dependency) =>
                  dependency.target.logicalId === node.key.logicalId,
              ),
              savedRelationships,
            ),
            (left: ResourceDependency, right: ResourceDependency) =>
              left.source.logicalId === right.source.logicalId &&
              Schema.toEquivalence(DependencyEdgeSchema)(left.edge, right.edge),
          );

          const props = yield* Effect.reduce(
            incoming,
            () => node.props,
            (current, dependency) =>
              Match.value(dependency.edge).pipe(
                Match.when({ kind: "relationship" }, (edge) =>
                  resolveReference(edge.reference, resources).pipe(
                    Effect.flatMap((value) =>
                      replaceProperty(
                        node.key.logicalId,
                        current,
                        edge.property,
                        value,
                      ),
                    ),
                  ),
                ),
                Match.when(
                  { kind: "property" },
                  Effect.fn(function* (edge) {
                    const value = yield* resolveOutput(
                      new ResourceOutput(
                        dependency.source,
                        edge.sourceProperty,
                        Schema.Json,
                      ),
                      resources,
                    );

                    const resolvedProps: Schema.Json = yield* replaceProperty(
                      node.key.logicalId,
                      current,
                      edge.property,
                      value,
                    );

                    return resolvedProps;
                  }),
                ),
                Match.orElse(() => Effect.succeed(current)),
              ),
          );

          const resolvedNode: ResourceNode = { ...node, props };

          yield* model
            .validateResourceRequest(resolvedNode)
            .pipe(
              Effect.when(
                Effect.succeed(
                  Arr.some(
                    incoming,
                    (dependency) => dependency.edge.kind === "relationship",
                  ),
                ),
              ),
            );

          return resolvedNode;
        },
      );

      return { resolveOutput, resolveNode, resolveReference, replaceProperty };
    }),
  },
) {}

export const resourceOutputResolverLayer = Layer.effect(
  ResourceOutputResolver,
  ResourceOutputResolver.make,
).pipe(Layer.provideMerge(resourceModelLayer));
