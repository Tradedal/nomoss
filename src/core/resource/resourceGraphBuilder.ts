import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Record,
  Ref,
  Schema,
} from "effect";
import {
  type DependencyEdge,
  DependencyEdgeSchema,
  type ResourceEntity,
  type ResourceKey,
  ResourceModel,
  type ResourceNode,
  type ResourceOutput,
  ResourceOutputReference,
  ResourceOutputRefSchema,
  type ResourcePropertyPath,
  ResourceReferenceRecordSchema,
  type ResourceType,
} from "./model.js";
import {
  ResourceGraphStore,
  resourceGraphStoreLayer,
} from "./resourceGraphStore.js";

export type ResourceDependencyInput = {
  readonly source: ResourceKey;
  readonly target: ResourceKey;
  readonly edge: DependencyEdge;
};

export type ResourceDeclarationInput<
  Props,
  Outputs,
  PropsSchema extends Schema.Schema<Props>,
  OutputsSchema extends Schema.Schema<Outputs>,
> = {
  readonly propsSchema: PropsSchema;
  readonly outputsSchema: OutputsSchema;
  readonly requestSchema?: Schema.Schema<Schema.Json> | undefined;
  readonly props: NoInfer<PropsSchema["Type"]>;
  readonly outputs?: NoInfer<OutputsSchema["Type"]> | undefined;
};

/**
 * ResourceGraphBuilder registers declarations and their dependencies for stack
 * planning. Output schemas belong to the shared ResourceModel so provider
 * execution can validate the values promised by those declarations.
 */
export class ResourceGraphBuilder extends Context.Service<ResourceGraphBuilder>()(
  "nomoss/core/resource/resourceGraphBuilder",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphStore;
      const model = yield* ResourceModel;

      /**
       * The registerNode service method publishes a declaration with all of its
       * dependencies. Missing or incompatible source entities fail before the
       * graph changes, so a rejected declaration cannot leave a partial node.
       */
      const registerNode = Effect.fn("ResourceGraphBuilder.registerNode")(
        function* (
          node: ResourceNode,
          explicit: ReadonlyArray<ResourceDependencyInput> = [],
        ) {
          const references = (
            value: Schema.Json,
            property: ResourcePropertyPath,
          ): ReadonlyArray<ResourceDependencyInput> =>
            Match.value(value).pipe(
              Match.when(
                Schema.is(ResourceReferenceRecordSchema),
                (reference): ReadonlyArray<ResourceDependencyInput> => [
                  {
                    source: reference.source,
                    target: node.key,
                    edge: { kind: "relationship", property, reference },
                  },
                ],
              ),
              Match.when(
                Schema.is(ResourceOutputRefSchema),
                (output): ReadonlyArray<ResourceDependencyInput> => [
                  {
                    source: output.source,
                    target: node.key,
                    edge: {
                      kind: "property",
                      property,
                      sourceProperty: output.property,
                    },
                  },
                ],
              ),
              Match.when(Schema.is(Schema.Array(Schema.Json)), (values) =>
                Arr.flatMap(values, (child, index) =>
                  references(child, [...property, String(index)]),
                ),
              ),
              Match.when(
                Schema.is(Schema.Record(Schema.String, Schema.Json)),
                (record) =>
                  Arr.flatMap(Record.toEntries(record), ([name, child]) =>
                    references(child, [...property, name]),
                  ),
              ),
              Match.orElse(() => []),
            );

          const saved: ReadonlyArray<ResourceDependencyInput> = Arr.map(
            node.relationships ?? [],
            ({ property, reference }) => ({
              source: reference.source,
              target: node.key,
              edge: { kind: "relationship", property, reference },
            }),
          );
          const dependencies = Arr.dedupeWith(
            Arr.appendAll(
              Arr.appendAll(references(node.props, []), saved),
              explicit,
            ),
            (left: ResourceDependencyInput, right: ResourceDependencyInput) =>
              left.source.logicalId === right.source.logicalId &&
              left.target.logicalId === right.target.logicalId &&
              Schema.toEquivalence(DependencyEdgeSchema)(left.edge, right.edge),
          );

          yield* graph.addResource(node, dependencies);

          const registered: ResourceNode = node;

          return registered;
        },
      );

      const resource = Effect.fn("ResourceGraphBuilder.resource")(function* (
        key: ResourceKey,
      ) {
        const outputBinding = yield* graph.outputBinding;
        const dependencies = yield* Ref.make<
          ReadonlyArray<ResourceDependencyInput>
        >([]);

        /**
         * dependsOn declares an input to replace with another resource's output
         * during apply. It supports initial values whose dependencies are not
         * already expressed as output references in props.
         */
        const dependsOn = Effect.fn("ResourceGraphBuilder.resource.dependsOn")(
          function* <Value>(
            output: ResourceOutput<Value>,
            property: ResourcePropertyPath,
          ) {
            const dependency: ResourceDependencyInput = {
              source: output[ResourceOutputReference].source,
              target: key,
              edge: {
                kind: "property",
                property,
                sourceProperty: output[ResourceOutputReference].property,
              },
            };

            yield* Ref.update(dependencies, Arr.append(dependency));
          },
        );

        /**
         * The register service method retains the schemas that validate a
         * resource's inputs and eventual outputs. Source resources must already
         * be registered before they can be referenced, including inside JSON
         * objects and arrays or through an explicit dependsOn declaration.
         * Omit outputs until creation completes so unresolved values remain
         * absent before the provider supplies them.
         */
        const register = Effect.fn("ResourceGraphBuilder.resource.register")(
          function* <
            Props,
            Outputs,
            PropsSchema extends Schema.Schema<Props>,
            OutputsSchema extends Schema.Schema<Outputs>,
          >(
            input: ResourceDeclarationInput<
              Props,
              Outputs,
              PropsSchema,
              OutputsSchema
            >,
          ) {
            const node: ResourceNode = yield* model.nodeFromResource({
              key,
              propsSchema: input.propsSchema,
              outputsSchema: input.outputsSchema,
              requestSchema: input.requestSchema,
              props: input.props,
              outputs: input.outputs,
            });

            const resourceDependencies = yield* Ref.get(dependencies);

            const registered: ResourceNode = yield* registerNode(
              node,
              resourceDependencies,
            );

            return registered;
          },
        );

        /**
         * The registerEntity service method gives a provider function an entity
         * that other declarations can pass directly. Its resource type must
         * match the canonical declaration schema before registration succeeds.
         */
        const registerEntity = Effect.fn(
          "ResourceGraphBuilder.resource.registerEntity",
        )(function* <
          Type extends ResourceType,
          Props,
          Outputs,
          PropsSchema extends Schema.Schema<Props>,
          OutputsSchema extends Schema.Schema<Outputs>,
        >(
          resourceType: Schema.Schema<Type>,
          input: ResourceDeclarationInput<
            Props,
            Outputs,
            PropsSchema,
            OutputsSchema
          >,
        ) {
          const node = yield* model.nodeFromResource({
            key,
            propsSchema: input.propsSchema,
            outputsSchema: input.outputsSchema,
            requestSchema: input.requestSchema,
            props: input.props,
            outputs: input.outputs,
          });
          const entity: ResourceEntity<Type> = yield* model.entityFromNode(
            node,
            resourceType,
          );
          const resourceDependencies = yield* Ref.get(dependencies);

          yield* registerNode(node, resourceDependencies);

          return entity;
        });

        /**
         * valueFrom returns a validated declaration-time output and records
         * the input it will supply during apply. A failed read leaves no
         * dependency behind. ResourceOutputResolver reads applied provider
         * values after execution.
         */
        const valueFrom = Effect.fn("ResourceGraphBuilder.resource.valueFrom")(
          function* <S extends Schema.Constraint>(
            output: ResourceOutput<S["Type"]>,
            property: ResourcePropertyPath,
            schema: S,
          ) {
            const decodedOutput: S["Type"] = yield* graph.outputValue(
              output[ResourceOutputReference].source,
              output[ResourceOutputReference].property,
              schema,
            );

            yield* dependsOn(output, property);

            return decodedOutput;
          },
        );

        /**
         * stringFrom returns a declaration-time string output and records its
         * dependency only if the read succeeds. A missing value identifies the
         * source resource and output so callers can report the unresolved input.
         */
        const stringFrom = Effect.fn(
          "ResourceGraphBuilder.resource.stringFrom",
        )(function* (
          output: ResourceOutput<string>,
          property: ResourcePropertyPath,
        ) {
          const value: string = yield* valueFrom(
            output,
            property,
            Schema.String,
          );

          return value;
        });

        return {
          dependsOn,
          register,
          registerEntity,
          outputs: outputBinding,
          valueFrom,
          stringFrom,
        };
      });

      return { resource, registerNode };
    }),
  },
) {}

export const resourceGraphBuilderLayer = Layer.effect(
  ResourceGraphBuilder,
  ResourceGraphBuilder.make,
).pipe(Layer.provideMerge(resourceGraphStoreLayer));
