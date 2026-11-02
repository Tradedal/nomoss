import {
  Context,
  Data,
  Effect,
  HashMap,
  Option,
  Record,
  Ref,
  Schema,
} from "effect";

import { ProviderIdSchema } from "../../providers/provider.js";

export const ResourceKeySchema = Schema.Struct({
  logicalId: Schema.NonEmptyString,
});

export type ResourceKey = Schema.Schema.Type<typeof ResourceKeySchema>;

/**
 * A path selects a value inside resource props. Its segments are object
 * property names or decimal array indexes. An empty path selects all props,
 * and punctuation in a property name is part of the name.
 */
export const ResourcePropertyPathSchema = Schema.Array(Schema.String);

export type ResourcePropertyPath = typeof ResourcePropertyPathSchema.Type;

/**
 * One resource uses another resource's output as an input. This edge tells
 * ResourceOutputResolver which output to read and where to put its value in
 * the dependent resource's props before calling the provider.
 */
export const PropertyDependencyEdgeSchema = Schema.Struct({
  kind: Schema.Literal("property"),
  property: ResourcePropertyPathSchema,
  sourceProperty: Schema.NonEmptyString,
});

export type PropertyDependencyEdge = Schema.Schema.Type<
  typeof PropertyDependencyEdgeSchema
>;

/**
 * A resource can require another resource's operation to finish even when it
 * uses none of that resource's outputs. This edge tells the planner to apply
 * the prerequisite first.
 */
export const PrerequisiteDependencyEdgeSchema = Schema.Struct({
  kind: Schema.Literal("prerequisite"),
  reason: Schema.NonEmptyString,
});

export type PrerequisiteDependencyEdge = Schema.Schema.Type<
  typeof PrerequisiteDependencyEdgeSchema
>;

/**
 * Both property dependencies and prerequisites determine the order of resource
 * operations. The planner uses both kinds of edge to group actions. Output
 * resolution reads property edges to fill in dependent inputs.
 */
export const DependencyEdgeSchema = Schema.Union([
  PropertyDependencyEdgeSchema,
  PrerequisiteDependencyEdgeSchema,
]);

export type DependencyEdge = Schema.Schema.Type<typeof DependencyEdgeSchema>;

/**
 * A declaration can refer to an output before the provider returns its value.
 * The reference records the source resource and output name as JSON. During
 * apply, lifecycle execution reads the value from the applied source resource.
 */
export const ResourceOutputRefSchema = Schema.TaggedStruct(
  "ResourceOutputRef",
  {
    source: ResourceKeySchema,
    property: Schema.NonEmptyString,
  },
);

export type ResourceOutputRef = Schema.Schema.Type<
  typeof ResourceOutputRefSchema
>;

/**
 * Generated declarations return a reference for each output property. Apply
 * reads the actual values from resource state when it prepares requests for
 * dependent resources.
 */
export type ResourceOutputReferences<Outputs> = {
  readonly [Property in keyof Outputs]-?: ResourceOutputRef;
};

/**
 * A resource declaration returns its validated inputs and references to its
 * outputs. Stack code can pass those references to other declarations. Apply
 * reads their values from the source resource's applied state.
 */
export interface ResourceDeclaration<Props, Outputs> {
  readonly key: ResourceKey;
  readonly props: Props;
  readonly outputs: ResourceOutputReferences<Outputs>;
}

/**
 * Provider declarations attach this metadata to their props schema.
 * `ResourceModel.nodeFromResource` saves it with each `ResourceNode` so
 * lifecycle planning can select the provider command from saved state.
 * `ResourceStateStore` also uses it to identify secret outputs and keep their
 * values out of the state file.
 */
export const ResourceSchemaAnnotationSchema = Schema.Struct({
  provider: ProviderIdSchema,
  service: Schema.NonEmptyString,
  resource: Schema.NonEmptyString,
  operation: Schema.Literals(["create", "read", "update", "delete"]),
  stateSecretOutputKeys: Schema.Array(Schema.NonEmptyString),
  cloudControl: Schema.optionalKey(
    Schema.Struct({
      typeName: Schema.NonEmptyString,
      primaryIdentifier: Schema.Array(Schema.NonEmptyString),
      readOnlyProperties: Schema.Array(Schema.NonEmptyString),
      createOnlyProperties: Schema.Array(Schema.NonEmptyString),
      writeOnlyProperties: Schema.Array(Schema.NonEmptyString),
    }),
  ),
});

export type ResourceSchemaAnnotation = Schema.Schema.Type<
  typeof ResourceSchemaAnnotationSchema
>;

export const ResourceSchemaAnnotationId = Symbol.for(
  "@nomoss/resourceSchemaAnnotation",
);

export const CloudFormationPropertyReferenceSchema = Schema.Struct({
  targetCloudFormationType: Schema.NonEmptyString,
  targetPropertyPath: Schema.NonEmptyString,
});

export type CloudFormationPropertyReference = Schema.Schema.Type<
  typeof CloudFormationPropertyReferenceSchema
>;

export const CloudFormationPropertyReferencesAnnotationId = Symbol.for(
  "@nomoss/cloudFormationPropertyReferences",
);

declare module "effect/Schema" {
  namespace Annotations {
    interface Annotations {
      readonly [ResourceSchemaAnnotationId]?: ResourceSchemaAnnotation;
      readonly [CloudFormationPropertyReferencesAnnotationId]?: ReadonlyArray<CloudFormationPropertyReference>;
    }
  }
}

export const ResourceNodeSchema = Schema.Struct({
  key: ResourceKeySchema,
  schema: ResourceSchemaAnnotationSchema,
  props: Schema.Json,
  outputs: Schema.Json,
  cloudControlIdentifier: Schema.optionalKey(Schema.NonEmptyString),
});

export type ResourceNode = Schema.Schema.Type<typeof ResourceNodeSchema>;

export type PlanAction = Data.TaggedEnum<{
  Create: {
    readonly node: ResourceNode;
  };
  Update: {
    readonly node: ResourceNode;
    readonly current: ResourceNode;
  };
  Delete: {
    readonly node: ResourceNode;
  };
  Destroy: {
    readonly node: ResourceNode;
  };
}>;

export const PlanAction = Data.taggedEnum<PlanAction>();

export type ResourcePlan = {
  readonly createOrUpdate: ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly delete: ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly destroy: ReadonlyArray<ReadonlyArray<PlanAction>>;
};

export class ResourceSchemaAnnotationMissing extends Data.TaggedError(
  "ResourceSchemaAnnotationMissing",
)<{
  readonly logicalId: string;
}> {}

export class ResourceOutputSchemaMissing extends Data.TaggedError(
  "ResourceOutputSchemaMissing",
)<{ readonly schema: ResourceSchemaAnnotation }> {}

/**
 * An output read could not find the source resource or the requested field.
 * The error identifies both so callers can report which value is missing.
 */
export class ResourceOutputResolutionMissing extends Data.TaggedError(
  "ResourceOutputResolutionMissing",
)<{
  readonly property: string;
  readonly sourceLogicalId: string;
}> {}

export const keyString = (key: ResourceKey) => {
  const logicalId: string = key.logicalId;

  return logicalId;
};

export const resourceSchemaString = (schema: ResourceSchemaAnnotation) => {
  const schemaKey: string = `${schema.provider}:${schema.service}:${schema.resource}:${schema.operation}`;

  return schemaKey;
};

export const annotateResourceSchema = <
  Resource,
  ResourceSchema extends Schema.Schema<Resource>,
>(
  schema: ResourceSchema,
  annotation: ResourceSchemaAnnotation,
) =>
  schema.annotate({
    [ResourceSchemaAnnotationId]:
      ResourceSchemaAnnotationSchema.make(annotation),
  });

export const readResourceSchemaAnnotation = <Resource>(
  schema: Schema.Schema<Resource>,
) =>
  Option.fromUndefinedOr(
    Schema.resolveAnnotations(schema)?.[ResourceSchemaAnnotationId],
  ).pipe(
    Option.flatMap((annotation) =>
      ResourceSchemaAnnotationSchema.makeOption(annotation),
    ),
  );

export const resourceOutputRef = (
  source: ResourceKey,
  property: string,
): ResourceOutputRef => {
  const outputRef: ResourceOutputRef = ResourceOutputRefSchema.make({
    _tag: "ResourceOutputRef",
    source,
    property,
  });

  return outputRef;
};

/**
 * Resource declarations and provider policies use this service to validate
 * resource data and convert it to and from JSON. The service stores output
 * schemas so later provider reads use the same validation as declarations.
 * It also supplies resource labels for plans and diagnostics.
 */
export class ResourceModel extends Context.Service<ResourceModel>()(
  "nomoss/core/resource/model/ResourceModel",
  {
    make: Effect.gen(function* () {
      const outputSchemas = yield* Ref.make(
        HashMap.empty<string, Schema.Decoder<Schema.Json>>(),
      );

      /**
       * Registers the resource's output schema for later provider reads in
       * this runtime. Schema.toType checks decoded values without requiring
       * the services used to decode the transport format.
       */
      const registerOutputsSchema = Effect.fn(
        "ResourceModel.registerOutputsSchema",
      )(function* <Outputs>(
        schema: ResourceSchemaAnnotation,
        outputsSchema: Schema.Schema<Outputs>,
      ) {
        const decoder: Schema.Decoder<Schema.Json> = Schema.toType(
          outputsSchema,
        ).pipe(Schema.decodeTo(Schema.Json));

        yield* Ref.update(
          outputSchemas,
          HashMap.set(resourceSchemaString(schema), decoder),
        );

        const registered: ResourceSchemaAnnotation = schema;

        return registered;
      });

      /**
       * Checks provider outputs against the registered resource schema and
       * returns the complete JSON model for observations and saved state.
       * The read fails if the output schema has not been registered.
       */
      const validateResourceOutputs = Effect.fn(
        "ResourceModel.validateResourceOutputs",
      )(function* (schema: ResourceSchemaAnnotation, model: Schema.Json) {
        const contracts = yield* Ref.get(outputSchemas);

        const decoder = yield* Effect.fromOption(
          HashMap.get(contracts, resourceSchemaString(schema)),
        ).pipe(
          Effect.mapError(() => new ResourceOutputSchemaMissing({ schema })),
        );

        yield* Schema.decodeEffect(decoder)(model);

        const outputs: Schema.Json = model;

        return outputs;
      });

      const nodeFromResource = Effect.fn("ResourceModel.nodeFromResource")(
        function* <
          Props,
          Outputs,
          PropsSchema extends Schema.Schema<Props>,
          OutputsSchema extends Schema.Schema<Outputs>,
        >(input: {
          readonly key: ResourceKey;
          readonly propsSchema: PropsSchema;
          readonly outputsSchema: OutputsSchema;
          readonly props: NoInfer<Props>;
          readonly outputs: NoInfer<Outputs>;
        }) {
          const schema = yield* readResourceSchemaAnnotation(
            input.propsSchema,
          ).pipe(
            Effect.fromOption,
            Effect.mapError(
              () =>
                new ResourceSchemaAnnotationMissing({
                  logicalId: input.key.logicalId,
                }),
            ),
          );

          const resourceProps = yield* encodeJson(
            input.propsSchema,
            input.props,
          );

          const resourceOutputs = yield* encodeJson(
            input.outputsSchema,
            input.outputs,
          );

          yield* registerOutputsSchema(schema, input.outputsSchema);

          const resourceNode: ResourceNode = yield* Schema.decodeEffect(
            ResourceNodeSchema,
          )({
            key: input.key,
            schema,
            props: resourceProps,
            outputs: resourceOutputs,
          });

          return resourceNode;
        },
      );

      /**
       * Provider policies call this method to check outputs against the
       * registered schema and attach them to the node before saving it.
       */
      const withOutputs = Effect.fn("ResourceModel.withOutputs")(function* (
        node: ResourceNode,
        outputs: Schema.Json,
      ) {
        const validated = yield* validateResourceOutputs(node.schema, outputs);

        const updated: ResourceNode = yield* Schema.decodeEffect(
          ResourceNodeSchema,
        )({ ...node, outputs: validated });

        return updated;
      });

      const decodeProps = Effect.fn("ResourceModel.decodeProps")(function* <
        Props,
      >(node: ResourceNode, schema: Schema.Schema<Props>) {
        const props: Props = yield* decodeJson(schema, node.props);

        return props;
      });

      /**
       * Reads all outputs using the caller's schema. Fields marked optional
       * in that schema can be absent. Use decodeOutput or
       * ResourceOutputResolver.resolveOutput when a particular field is needed.
       */
      const decodeOutputs = Effect.fn("ResourceModel.decodeOutputs")(function* <
        Outputs,
      >(node: ResourceNode, schema: Schema.Schema<Outputs>) {
        const outputs: Outputs = yield* decodeJson(schema, node.outputs);

        return outputs;
      });

      /**
       * Checks the resource's outputs against its registered schema, then
       * reads the requested field using the caller's schema. A missing field
       * fails with ResourceOutputResolutionMissing. Invalid values fail with
       * SchemaError. The output schema must be registered in this ResourceModel.
       */
      const decodeOutput = Effect.fn("ResourceModel.decodeOutput")(function* <
        S extends Schema.Constraint,
      >(node: ResourceNode, property: string, schema: S) {
        const validated = yield* validateResourceOutputs(
          node.schema,
          node.outputs,
        );

        const outputs = yield* Schema.decodeUnknownEffect(
          Schema.Record(Schema.String, Schema.Json),
        )(validated);

        const value = yield* Record.get(outputs, property).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceOutputResolutionMissing({
                property,
                sourceLogicalId: node.key.logicalId,
              }),
          ),
        );

        const output: S["Type"] = yield* Schema.decodeEffect(schema)(value);

        return output;
      });

      const decodeJson = Effect.fn("ResourceModel.decodeJson")(function* <
        Resource,
      >(schema: Schema.Schema<Resource>, encoded: Schema.Json) {
        const decoded: Resource = yield* Schema.decodeUnknownEffect(
          Schema.toType(schema),
        )(encoded);

        return decoded;
      });

      const encodeJson = Effect.fn("ResourceModel.encodeJson")(function* <
        Resource,
      >(schema: Schema.Schema<Resource>, value: NoInfer<Resource>) {
        const json: Schema.Json = yield* Schema.decodeEffect(
          Schema.toType(schema).pipe(Schema.decodeTo(Schema.Json)),
        )(value);

        return json;
      });

      const propsEqual = (left: ResourceNode, right: ResourceNode) => {
        const equal: boolean = Schema.toEquivalence(Schema.Json)(
          left.props,
          right.props,
        );

        return equal;
      };

      const resourceLabel = (node: ResourceNode) => {
        const label: string = `${node.schema.provider}:${node.schema.service}:${node.schema.resource}/${keyString(node.key)}`;

        return label;
      };

      const actionString = (action: PlanAction) => {
        const description: string = `${action._tag} ${resourceLabel(action.node)}`;

        return description;
      };

      return {
        registerOutputsSchema,
        validateResourceOutputs,
        nodeFromResource,
        withOutputs,
        decodeProps,
        decodeOutputs,
        decodeOutput,
        decodeJson,
        encodeJson,
        propsEqual,
        resourceLabel,
        actionString,
      };
    }),
  },
) {}
