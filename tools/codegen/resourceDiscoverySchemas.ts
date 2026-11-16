import {
  type Graph,
  type HashMap,
  type HashSet,
  type Option,
  Schema,
} from "effect";
import {
  type ClientOperation,
  OperationJsonSchema,
  type OperationParameter,
} from "./operationSchemas.js";

export const OpenApiSchemaNode = Schema.Struct({
  path: Schema.String,
  schema: OperationJsonSchema,
});
export type OpenApiSchemaNode = typeof OpenApiSchemaNode.Type;

/**
 * The OpenApiSchemaConnection interface retains the target definition and its
 * relationship to the originating schema. Property resolution uses the same
 * connection data as requirement propagation and expansion discovery.
 */
export interface OpenApiSchemaConnection {
  readonly edge: OpenApiSchemaEdge;
  readonly target: OpenApiSchemaNode;
}

/**
 * The OpenApiSchemaChild interface preserves the parent path of a structural
 * definition so graph construction can connect it after assigning node indices.
 */
export interface OpenApiSchemaChild {
  readonly parent: string;
  readonly node: OpenApiSchemaNode;
  readonly edge: OpenApiSchemaEdge;
}

/**
 * The OpenApiSchemaLevel interface retains discovered children with their
 * parent nodes so graph construction can reuse the same discovery result.
 */
export interface OpenApiSchemaLevel {
  readonly nodes: ReadonlyArray<OpenApiSchemaNode>;
  readonly children: ReadonlyArray<OpenApiSchemaChild>;
}

/**
 * The OpenApiPropertyQuery interface tracks ancestry for one request and
 * response path. Separate ancestry sets preserve relationships reached through
 * different fields while stopping recursive pairs on the current path.
 */
export interface OpenApiPropertyQuery {
  readonly input: string;
  readonly output: string;
  readonly path: ReadonlyArray<string>;
  readonly ancestors: HashSet.HashSet<string>;
}

/**
 * The OpenApiPropertyResolution interface retains relationships found at the
 * current request and response pair with the descendant pairs still to visit.
 */
export interface OpenApiPropertyResolution {
  readonly links: ReadonlyArray<OpenApiPropertyLink>;
  readonly children: ReadonlyArray<OpenApiPropertyQuery>;
}

/**
 * The OpenApiSchemaReference interface retains source and target paths until
 * graph construction resolves them to indices and validates the target.
 */
export interface OpenApiSchemaReference {
  readonly source: string;
  readonly target: string;
  readonly data: OpenApiSchemaEdge;
}

/**
 * The OpenApiSchemaTraversal interface tracks visited source paths separately
 * from pending definitions so recursive aliases contribute each schema once.
 */
export interface OpenApiSchemaTraversal {
  readonly pending: ReadonlyArray<OpenApiSchemaNode>;
  readonly visited: HashSet.HashSet<string>;
}

/**
 * The OpenApiSchemaRequirementRule interface distinguishes inherited
 * requirements from requirements shared by every branch of an alternative.
 * References can form cycles, so the rule retains paths to their current sets.
 */
export interface OpenApiSchemaRequirementRule {
  readonly declared: HashSet.HashSet<string>;
  readonly inherited: ReadonlyArray<string>;
  readonly alternatives: ReadonlyArray<ReadonlyArray<string>>;
}

/**
 * The OpenApiRequiredProperties map associates each schema path with its
 * required-property set. Native equality compares the sets during propagation
 * so recursive references stop when every schema's requirements are stable.
 */
export type OpenApiRequiredProperties = HashMap.HashMap<
  string,
  HashSet.HashSet<string>
>;

/**
 * The OpenApiResourceReadCandidate interface keeps the saved identity parameter
 * with its operation after parent parameters and path compatibility have been
 * checked. Response validation can retain that decision without another search.
 */
export interface OpenApiResourceReadCandidate {
  readonly operation: ClientOperation;
  readonly parameter: typeof OperationParameter.Type;
}

/**
 * The OpenApiParameterBindings interface records which request parameters can
 * use saved outputs. Missing parameters, unsupported locations, and repeated
 * names each prevent an unambiguous provider request.
 */
export interface OpenApiParameterBindings {
  readonly bound: ReadonlyArray<typeof OperationParameter.Type>;
  readonly unbound: ReadonlyArray<typeof OperationParameter.Type>;
  readonly unsupported: ReadonlyArray<typeof OperationParameter.Type>;
  readonly ambiguous: boolean;
}

export const OpenApiSchemaEdge = Schema.Struct({
  kind: Schema.Literals([
    "property",
    "items",
    "alternative",
    "schema",
    "reference",
    "expansion",
  ]),
  name: Schema.String,
});
export type OpenApiSchemaEdge = typeof OpenApiSchemaEdge.Type;

export const OpenApiOperationRoot = Schema.Struct({
  operationId: Schema.String,
  direction: Schema.Literals(["input", "output"]),
  status: Schema.String,
  mediaType: Schema.String,
  path: Schema.String,
});
export type OpenApiOperationRoot = typeof OpenApiOperationRoot.Type;

/**
 * The OpenApiOperationSchemas interface retains an operation's input location
 * and successful response definitions. Named resource models remain available
 * alongside the resolved schemas so discovery can select a model or preserve
 * an unnamed response with its source evidence.
 */
export interface OpenApiOperationSchemas {
  readonly input: Option.Option<OpenApiOperationRoot>;
  readonly responseRoots: ReadonlyArray<OpenApiOperationRoot>;
  readonly responses: ReadonlyArray<OpenApiSchemaNode>;
  readonly resources: ReadonlyArray<OpenApiSchemaNode>;
}

/**
 * Source locations identify graph nodes across discovery calls. The graph
 * retains provider schemas so inferred links can be checked against their source.
 */
export interface OpenApiResourceGraph {
  readonly graph: Graph.DirectedGraph<OpenApiSchemaNode, OpenApiSchemaEdge>;
  readonly indices: ReadonlyMap<string, Graph.NodeIndex>;
  readonly roots: ReadonlyArray<OpenApiOperationRoot>;
}

export const OpenApiDiscoveredProperty = Schema.Struct({
  name: Schema.String,
  schemaPath: Schema.String,
  schema: OperationJsonSchema,
  required: Schema.Boolean,
});
export type OpenApiDiscoveredProperty = typeof OpenApiDiscoveredProperty.Type;

/**
 * Input and response schema locations let callers check the evidence for an
 * inferred property relationship. Multiple target schemas remain alternatives
 * for the caller to assess.
 */
export const OpenApiPropertyLink = Schema.Struct({
  propertyPath: Schema.Array(Schema.String),
  inputSchemaPath: Schema.String,
  responseSchemaPath: Schema.String,
  targetSchemas: Schema.Array(Schema.String),
});
export type OpenApiPropertyLink = typeof OpenApiPropertyLink.Type;

export const OpenApiDiscoveredResource = Schema.Struct({
  name: Schema.String,
  schemaPath: Schema.String,
  createOperation: Schema.String,
  inputSchemaPath: Schema.NullOr(Schema.String),
});
export type OpenApiDiscoveredResource = typeof OpenApiDiscoveredResource.Type;

export const OpenApiResourceBinding = Schema.Struct({
  createOperation: Schema.NonEmptyString,
  schemaPath: Schema.NonEmptyString,
  inputSchemaPath: Schema.NonEmptyString,
  readOperation: Schema.NonEmptyString,
  readParameter: Schema.NonEmptyString,
  identityProperty: Schema.NonEmptyString,
  parentParameters: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
});
export type OpenApiResourceBinding = typeof OpenApiResourceBinding.Type;

/**
 * An unresolved operation remains visible on its resource with the reason its
 * source cannot establish the contract required by resource execution.
 */
export const OpenApiResourceDiscoveryIssue = Schema.Struct({
  operationId: Schema.NonEmptyString,
  reason: Schema.NonEmptyString,
});
export type OpenApiResourceDiscoveryIssue =
  typeof OpenApiResourceDiscoveryIssue.Type;

export interface OpenApiResourceDiscovery {
  readonly resources: ReadonlyArray<OpenApiDiscoveredResource>;
  readonly unresolved: ReadonlyArray<OpenApiResourceDiscoveryIssue>;
}
