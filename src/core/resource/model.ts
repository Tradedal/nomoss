import {
  Context,
  Data,
  Effect,
  HashMap,
  Layer,
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
 * ResourcePropertyPath identifies the declared input that output resolution
 * will replace. Segments name object properties or decimal array indexes; an
 * empty path addresses all props. Property names retain punctuation so a name
 * containing a period is not interpreted as several nested fields.
 */
export const ResourcePropertyPathSchema = Schema.Array(Schema.String);

export type ResourcePropertyPath = typeof ResourcePropertyPathSchema.Type;

/**
 * Property dependencies require the source resource to finish before its
 * output can be used in the target's provider request. The edge identifies
 * which output supplies the value and which target input receives it.
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
 * Prerequisite dependencies require an earlier resource operation to finish
 * without substituting any of its outputs into the target's properties.
 * Their recorded reason explains the resource behavior requiring that order.
 */
export const PrerequisiteDependencyEdgeSchema = Schema.Struct({
  kind: Schema.Literal("prerequisite"),
  reason: Schema.NonEmptyString,
});

export type PrerequisiteDependencyEdge = Schema.Schema.Type<
  typeof PrerequisiteDependencyEdgeSchema
>;

/**
 * DependencyEdge preserves both kinds of ordering constraint in the resource
 * graph. Property edges additionally authorize output substitution, which
 * input resolution must not attempt for a prerequisite edge.
 */
export const DependencyEdgeSchema = Schema.Union([
  PropertyDependencyEdgeSchema,
  PrerequisiteDependencyEdgeSchema,
]);

export type DependencyEdge = Schema.Schema.Type<typeof DependencyEdgeSchema>;

/**
 * ResourceOutputRef lets a declaration use another resource's output before
 * its provider value exists. Its JSON representation survives planning and
 * identifies the source value that apply must obtain for the dependent input.
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
 * ResourceOutputReferences exposes each declared output name for use by other
 * resources before creation. An optional provider output still has a reference;
 * reading that reference later requires an actual value.
 */
export type ResourceOutputReferences<Outputs> = {
  readonly [Property in keyof Outputs]-?: ResourceOutputRef;
};

/**
 * ResourceDeclaration gives stack code the declared resource together with
 * typed references usable by subsequent declarations. Those references can
 * connect resources without making provider requests during declaration.
 */
export interface ResourceDeclaration<Props, Outputs> {
  readonly key: ResourceKey;
  readonly props: Props;
  readonly outputs: ResourceOutputReferences<Outputs>;
}

/**
 * ResourceSchemaAnnotation preserves provider identity and lifecycle rules in
 * saved nodes. Command dispatch can then select the registered provider after
 * a restart, and secret storage can recognize outputs requiring external
 * storage without access to the original schema declaration.
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
 * ResourceOutputResolutionMissing identifies a value required by an output
 * read when either its source resource or requested field is absent. The
 * source logical id and output name let callers identify the missing value.
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
 * ResourceModel validates resource values and converts them to and from JSON
 * for declaration, provider operations, and persistence. Its registered output
 * schemas remain available to provider reads in the same runtime, and its
 * resource labels keep plans and diagnostics consistent.
 */
export class ResourceModel extends Context.Service<ResourceModel>()(
  "nomoss/core/resource/model/ResourceModel",
  {
    make: Effect.gen(function* () {
      const outputSchemas = yield* Ref.make(
        HashMap.empty<string, Schema.Decoder<Schema.Json>>(),
      );

      /**
       * registerOutputsSchema retains a declaration's schema for provider
       * outputs read later in this runtime. Validation uses decoded values
       * without requiring services used only for transport decoding.
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
       * validateResourceOutputs checks declared outputs and returns the full
       * provider JSON model for observations and persistence. The output schema
       * must be registered before this operation can succeed.
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

      /**
       * nodeFromResource returns a validated JSON node from a typed declaration.
       * Provider metadata is required, and the output schema remains registered
       * in this model for later provider reads and output resolution. Invalid
       * inputs fail before a node is available for graph registration.
       */
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
       * withOutputs returns a node containing validated provider outputs for
       * persistence and dependent resources. Invalid outputs fail before a node
       * containing them can be returned.
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

      /**
       * decodeProps returns typed declared properties using the supplied domain
       * schema. A resource policy receives a schema failure when saved or
       * resolved properties do not satisfy its operation's contract.
       */
      const decodeProps = Effect.fn("ResourceModel.decodeProps")(function* <
        Props,
      >(node: ResourceNode, schema: Schema.Schema<Props>) {
        const props: Props = yield* decodeJson(schema, node.props);

        return props;
      });

      /**
       * decodeOutputs returns the complete output document decoded through the
       * caller's schema, which may permit absent fields. decodeOutput and
       * resolveOutput require a particular output value to be present.
       */
      const decodeOutputs = Effect.fn("ResourceModel.decodeOutputs")(function* <
        Outputs,
      >(node: ResourceNode, schema: Schema.Schema<Outputs>) {
        const outputs: Outputs = yield* decodeJson(schema, node.outputs);

        return outputs;
      });

      /**
       * decodeOutput returns one output validated against the registered
       * provider model and the caller's field schema. An absent field fails
       * with ResourceOutputResolutionMissing; a value rejected by
       * either schema fails with SchemaError.
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

      /**
       * decodeJson validates a stored JSON value against a schema's decoded
       * type. Transport-only transformations and their required services do not
       * participate in reading an already decoded resource value.
       */
      const decodeJson = Effect.fn("ResourceModel.decodeJson")(function* <
        Resource,
      >(schema: Schema.Schema<Resource>, encoded: Schema.Json) {
        const decoded: Resource = yield* Schema.decodeUnknownEffect(
          Schema.toType(schema),
        )(encoded);

        return decoded;
      });

      /**
       * encodeJson validates a decoded domain value and converts it to JSON for
       * graph storage. Values incompatible with either the domain schema or
       * JSON fail before entering the resource node.
       */
      const encodeJson = Effect.fn("ResourceModel.encodeJson")(function* <
        Resource,
      >(schema: Schema.Schema<Resource>, value: NoInfer<Resource>) {
        const json: Schema.Json = yield* Schema.decodeEffect(
          Schema.toType(schema).pipe(Schema.decodeTo(Schema.Json)),
        )(value);

        return json;
      });

      /**
       * propsEqual compares declared JSON properties for mutation selection.
       * Provider outputs and other node metadata do not make otherwise equal
       * desired properties count as an update.
       */
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

/**
 * Declaration and provider execution reuse this Layer so output schemas
 * registered while declaring resources remain available during execution.
 */
export const resourceModelLayer = Layer.effect(
  ResourceModel,
  ResourceModel.make,
);
