import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Redacted,
  Schema,
  Struct,
} from "effect";
import { HttpClient } from "effect/http";
import { KeyValueStore } from "effect/persistence";
import {
  annotateResourceSchema,
  ResourceModel,
  ResourceTypeSchema,
} from "../../src/core/resource/model.js";
import { ResourceGraphBuilder } from "../../src/core/resource/resourceGraphBuilder.js";
import { resourceStackRuntimeLayer } from "../../src/core/runtime/stackRuntimeLayer.js";
import { ResourceStackLifecycle } from "../../src/core/stack/resourceStackLifecycle.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import { ResourceStateStore } from "../../src/core/state/stateStore.js";
import { providerResourceCommandPolicyLayerLive } from "../../src/providers/resourceCommandPolicyLayer.js";
import { stripeClientLayer } from "../../src/providers/stripe/client/stripeClient.js";
import { StripeClientConfig } from "../../src/providers/stripe/client/stripeClientConfig.js";
import { StripePayload } from "../../src/providers/stripe/client/stripeClientModel.js";
import type { StripeResourceOperation } from "../../src/providers/stripe/management/resourceConfiguration.js";
import { stripeResourcePolicyRegistration } from "../../src/providers/stripe/management/resourcePolicy.js";
import { OperationCatalogs } from "../../tools/codegen/operationCatalogs.js";
import { ResourceCatalogs } from "../../tools/codegen/resourceCatalogs.js";
import { StripeAnnotations } from "../../tools/stripe/generator/stripeAnnotations.js";
import { StripeResourceInputs } from "../../tools/stripe/generator/stripeResourceInputs.js";
import {
  resourceCatalogSource,
  resourceNestedGeneratorDocument,
  resourceNestedHints,
  resourceSchemaTestLayer,
} from "../support/resourceCatalogFixture.js";
import { StripeLifecycleFixture } from "../support/stripeLifecycleFixture.js";

const ownerOutputs = Schema.Struct({ OwnerId: Schema.String });
const thingOutputs = Schema.Struct({
  ThingId: Schema.String,
  ParentId: Schema.String,
});
const dependentOutputs = Schema.Struct({ DependentId: Schema.String });
const ownerResponse = Schema.Struct({ id: Schema.String });
const thingResponse = Schema.Struct({
  id: Schema.String,
  object: Schema.Literal("thing"),
});
const thingOperationResponse = Schema.Struct({
  id: Schema.String,
  object: Schema.Literals(["thing", "other"]),
});
const removedResponse = Schema.Struct({ deleted: Schema.Boolean });
const failureResponse = Schema.Struct({
  error: Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
});

const operation = <State extends StripePayload>(
  name: string,
  method: "POST" | "GET" | "DELETE",
  path: string,
  pathParameters: ReadonlyArray<string>,
  input: Schema.Codec<StripePayload, StripePayload>,
  output: Schema.Codec<State, Schema.Json>,
): StripeResourceOperation<State> => ({
  name,
  method,
  path,
  pathParameters,
  input,
  output,
  queryParameters: [],
  contentType: "application/json",
  apiVersion: "1",
  baseUrl: "https://stripe.test",
  error: failureResponse,
});

class NestedResourceContracts extends Context.Service<NestedResourceContracts>()(
  "nomoss/tests/stripe/stripeResourcePolicy.test/NestedResourceContracts",
  {
    make: Effect.gen(function* () {
      const catalogs = yield* OperationCatalogs;
      const resourceCatalogs = yield* ResourceCatalogs;
      const inputs = yield* StripeResourceInputs;
      const annotations = yield* StripeAnnotations;
      const catalog = yield* catalogs.buildOperationCatalog(
        resourceCatalogSource,
        resourceNestedGeneratorDocument,
      );
      const discovered = yield* resourceCatalogs.buildDiscoveredCatalog(
        catalog,
        resourceNestedHints,
      );
      const entities = yield* inputs.prepareResourceInputSchemas(
        catalog,
        discovered.resources,
      );
      const values = yield* inputs.prepareResourceInputSchemas(
        catalog,
        discovered.resources,
        "values",
      );
      const [ownerAnnotation, thingAnnotation, dependentAnnotation] =
        yield* Effect.forEach(
          [
            "Example::Core::Owner",
            "Example::Core::Thing",
            "Example::Core::Dependent",
          ],
          (type) =>
            annotations.prepareResourceAnnotation(discovered.resources[type]),
        );
      const ownerProps = annotateResourceSchema(
        Schema.toType(values[0].pipe(Schema.decodeTo(StripePayload))),
        ownerAnnotation,
      );
      const thingProps = annotateResourceSchema(
        Schema.toType(values[1].pipe(Schema.decodeTo(StripePayload))),
        thingAnnotation,
      );
      const dependentProps = annotateResourceSchema(
        Schema.toType(values[2].pipe(Schema.decodeTo(StripePayload))),
        dependentAnnotation,
      );
      const ownerIdentity = Schema.Struct({ thing_id: Schema.String });
      const thingIdentity = Schema.Struct({
        parent_id: Schema.String,
        thing_id: Schema.String,
      });
      const dependentIdentity = Schema.Struct({ dependent_id: Schema.String });
      const owner = {
        propsSchema: ownerProps,
        outputsSchema: ownerOutputs,
        identify: (outputs: typeof ownerOutputs.Type) => ({
          thing_id: outputs.OwnerId,
        }),
        projectOutputs: (state: typeof ownerResponse.Type) => ({
          OwnerId: state.id,
        }),
        operations: {
          create: operation(
            "CreateOwner",
            "POST",
            "/owners",
            [],
            ownerProps,
            ownerResponse,
          ),
          read: operation(
            "ReadOwner",
            "GET",
            "/owners/{thing_id}",
            ["thing_id"],
            ownerIdentity,
            ownerResponse,
          ),
          remove: operation(
            "RemoveOwner",
            "DELETE",
            "/owners/{thing_id}",
            ["thing_id"],
            ownerIdentity,
            removedResponse,
          ),
        },
        removalValues: {},
        deletedResponseMeansMissing: false,
      };
      const thing = {
        propsSchema: thingProps,
        outputsSchema: thingOutputs,
        identify: (outputs: typeof thingOutputs.Type) => ({
          parent_id: outputs.ParentId,
          thing_id: outputs.ThingId,
        }),
        projectOutputs: (state: typeof thingOperationResponse.Type) => ({
          ThingId: state.id,
        }),
        inputOutputs: { ParentId: "parent_id" },
        responseSchema: thingResponse,
        operations: {
          create: operation(
            "CreateThing",
            "POST",
            "/owners/{parent_id}/things",
            ["parent_id"],
            thingProps,
            thingOperationResponse,
          ),
          read: operation(
            "ReadThing",
            "GET",
            "/owners/{parent_id}/things/{thing_id}",
            ["parent_id", "thing_id"],
            thingIdentity,
            thingOperationResponse,
          ),
          remove: operation(
            "RemoveThing",
            "DELETE",
            "/owners/{parent_id}/things/{thing_id}",
            ["parent_id", "thing_id"],
            thingIdentity,
            removedResponse,
          ),
        },
        removalValues: {},
        deletedResponseMeansMissing: false,
      };
      const dependent = {
        propsSchema: dependentProps,
        outputsSchema: dependentOutputs,
        identify: (outputs: typeof dependentOutputs.Type) => ({
          dependent_id: outputs.DependentId,
        }),
        projectOutputs: (state: typeof ownerResponse.Type) => ({
          DependentId: state.id,
        }),
        operations: {
          create: operation(
            "CreateDependent",
            "POST",
            "/dependents",
            [],
            dependentProps,
            ownerResponse,
          ),
          read: operation(
            "ReadDependent",
            "GET",
            "/dependents/{dependent_id}",
            ["dependent_id"],
            dependentIdentity,
            ownerResponse,
          ),
          remove: operation(
            "RemoveDependent",
            "DELETE",
            "/dependents/{dependent_id}",
            ["dependent_id"],
            dependentIdentity,
            removedResponse,
          ),
        },
        removalValues: {},
        deletedResponseMeansMissing: false,
      };

      return {
        owner,
        thing,
        dependent,
        ownerDeclaration: annotateResourceSchema(entities[0], ownerAnnotation),
        thingDeclaration: annotateResourceSchema(entities[1], thingAnnotation),
        dependentDeclaration: annotateResourceSchema(
          entities[2],
          dependentAnnotation,
        ),
      };
    }),
  },
) {}

const contractsLayer = Layer.effect(
  NestedResourceContracts,
  NestedResourceContracts.make,
).pipe(Layer.provide(resourceSchemaTestLayer));
const commandsLayer = (allowDependentRemoval: boolean) =>
  Layer.unwrap(
    Effect.gen(function* () {
      const definitions = yield* NestedResourceContracts;
      const dependentOperations = Match.value(allowDependentRemoval).pipe(
        Match.when(true, () => definitions.dependent.operations),
        Match.orElse(() =>
          Struct.pick(definitions.dependent.operations, ["create", "read"]),
        ),
      );
      return Layer.mergeAll(
        stripeResourcePolicyRegistration(definitions.owner),
        stripeResourcePolicyRegistration(definitions.thing),
        stripeResourcePolicyRegistration({
          ...definitions.dependent,
          operations: dependentOperations,
        }),
      );
    }),
  );
const applicationLayer = (allowDependentRemoval: boolean) =>
  resourceStackRuntimeLayer.pipe(
    Layer.provideMerge(providerResourceCommandPolicyLayerLive),
    Layer.provideMerge(commandsLayer(allowDependentRemoval)),
    Layer.provideMerge(contractsLayer),
    Layer.provide(stripeClientLayer),
    Layer.provide([
      Layer.effect(
        HttpClient.HttpClient,
        Effect.map(StripeLifecycleFixture, (fixture) => fixture.transport),
      ),
      Layer.succeed(StripeClientConfig, {
        apiKey: Redacted.make("test-key"),
        apiBaseUrl: "https://stripe.test",
      }),
      StateSecretServiceDefaultLayer,
    ]),
  );
const transportAndStateLayer = Layer.mergeAll(
  Layer.effect(StripeLifecycleFixture, StripeLifecycleFixture.make),
  KeyValueStore.layerMemory,
);

const declareApplication = Effect.fn("NestedApplication.declare")(function* () {
  const graph = yield* ResourceGraphBuilder;
  const model = yield* ResourceModel;
  const lifecycle = yield* ResourceStackLifecycle;
  const definitions = yield* NestedResourceContracts;
  const ownerDeclaration = yield* graph.resource({ logicalId: "Owner" });
  const owner = yield* ownerDeclaration.register({
    propsSchema: definitions.ownerDeclaration,
    outputsSchema: ownerOutputs,
    requestSchema: definitions.owner.propsSchema,
    props: { name: "Owner" },
  });
  const ownerEntity = yield* model.entityFromNode(owner, ResourceTypeSchema);
  const thingDeclaration = yield* graph.resource({ logicalId: "Thing" });
  const thing = yield* thingDeclaration.register({
    propsSchema: definitions.thingDeclaration,
    outputsSchema: thingOutputs,
    requestSchema: definitions.thing.propsSchema,
    props: { name: "Thing", parent_id: ownerEntity },
  });
  const thingEntity = yield* model.entityFromNode(thing, ResourceTypeSchema);
  const dependentDeclaration = yield* graph.resource({
    logicalId: "Dependent",
  });
  yield* dependentDeclaration.register({
    propsSchema: definitions.dependentDeclaration,
    outputsSchema: dependentOutputs,
    requestSchema: definitions.dependent.propsSchema,
    props: { destination: thingEntity },
  });

  return yield* lifecycle.prepare("nested-application");
});

const reopenApplication = Effect.fn("NestedApplication.reconcileAndDestroy")(
  function* () {
    const lifecycle = yield* ResourceStackLifecycle;
    const state = yield* ResourceStateStore;
    const prepared = yield* declareApplication();
    const before = yield* state.loadResources(prepared.stackName);
    const rejected = yield* lifecycle.reconcile(prepared).pipe(Effect.flip);
    const afterRejection = yield* state.loadResources(prepared.stackName);
    const observed = yield* lifecycle.reconcile(prepared);
    const destroyed = yield* lifecycle.destroy(prepared);
    const remaining = yield* state.loadResources(prepared.stackName);

    return { before, rejected, afterRejection, observed, destroyed, remaining };
  },
);

layer(transportAndStateLayer, { buildPerTest: true })(
  "Parent-scoped resource applications",
  (it) => {
    it.effect(
      "A reopened application reconciles and removes linked resources through their saved parent identity",
      () =>
        Effect.gen(function* () {
          const transport = yield* StripeLifecycleFixture;
          yield* transport.enqueueResponses("POST", "/owners", [
            Response.json({ id: "owner_one" }),
          ]);
          yield* transport.enqueueResponses(
            "POST",
            "/owners/owner_one/things",
            [Response.json({ id: "thing_one", object: "thing" })],
          );
          yield* transport.enqueueResponses("POST", "/dependents", [
            Response.json({ id: "dep_one" }),
          ]);

          const applied = yield* ResourceStackLifecycle.pipe(
            Effect.flatMap((lifecycle) =>
              declareApplication().pipe(
                Effect.flatMap((prepared) => lifecycle.apply(prepared)),
              ),
            ),
            Effect.provide(applicationLayer(true)),
          );

          expect(
            Arr.findFirst(
              applied.resources,
              (resource) => resource.key.logicalId === "Thing",
            ).pipe(
              Option.map((resource) => resource.outputs),
              Option.getOrUndefined,
            ),
          ).toEqual({ ThingId: "thing_one", ParentId: "owner_one" });
          const [dependentRequest] = yield* transport.requestsFor(
            "POST",
            "/dependents",
          );
          expect(yield* Effect.promise(() => dependentRequest.json())).toEqual({
            destination: "thing_one",
          });

          yield* transport.enqueueResponses("GET", "/owners/owner_one", [
            Response.json({ id: "owner_one" }),
            Response.json({ id: "owner_one" }),
          ]);
          yield* transport.enqueueResponses(
            "GET",
            "/owners/owner_one/things/thing_one",
            [
              Response.json({ id: "thing_one", object: "other" }),
              Response.json({ id: "thing_one", object: "thing" }),
            ],
          );
          yield* transport.enqueueResponses("GET", "/dependents/dep_one", [
            Response.json({ id: "dep_one" }),
          ]);
          yield* transport.enqueueResponses("DELETE", "/dependents/dep_one", [
            Response.json({ deleted: true }),
          ]);
          yield* transport.enqueueResponses(
            "DELETE",
            "/owners/owner_one/things/thing_one",
            [Response.json({ deleted: true })],
          );
          yield* transport.enqueueResponses("DELETE", "/owners/owner_one", [
            Response.json({ deleted: true }),
          ]);

          const reopened = yield* reopenApplication().pipe(
            Effect.provide(Layer.fresh(applicationLayer(true))),
          );
          expect(reopened.rejected._tag).toBe("ResourceCommandExecutionFailed");
          expect(reopened.afterRejection).toEqual(reopened.before);
          expect(
            Arr.findFirst(
              reopened.observed.resources,
              (resource) => resource.key.logicalId === "Thing",
            ).pipe(
              Option.map((resource) => resource.outputs),
              Option.getOrUndefined,
            ),
          ).toEqual({ ThingId: "thing_one", ParentId: "owner_one" });
          expect(reopened.destroyed.destroyed).toBe(true);
          expect(reopened.remaining).toEqual([]);
        }),
    );
    it.effect(
      "An application can create a resource with no removal capability and retains it when teardown is unsupported",
      () =>
        Effect.gen(function* () {
          const transport = yield* StripeLifecycleFixture;
          yield* transport.enqueueResponses("POST", "/owners", [
            Response.json({ id: "owner_one" }),
          ]);
          yield* transport.enqueueResponses(
            "POST",
            "/owners/owner_one/things",
            [Response.json({ id: "thing_one", object: "thing" })],
          );
          yield* transport.enqueueResponses("POST", "/dependents", [
            Response.json({ id: "dep_one" }),
          ]);
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const prepared = yield* declareApplication();
          const applied = yield* lifecycle.apply(prepared);
          const saved = yield* state.loadResources(prepared.stackName);
          expect(applied.applied).toBe(true);
          expect(
            Arr.findFirst(
              saved,
              (resource) => resource.key.logicalId === "Dependent",
            ).pipe(
              Option.map((resource) => resource.outputs),
              Option.getOrUndefined,
            ),
          ).toEqual({ DependentId: "dep_one" });

          const unsupported = yield* lifecycle
            .destroy(prepared)
            .pipe(Effect.flip);
          expect(unsupported).toMatchObject({
            _tag: "ResourceCommandExecutionFailed",
            cause: { _tag: "ResourceCommandUnsupported" },
          });
          expect(yield* state.loadResources(prepared.stackName)).toEqual(saved);
          expect(
            Arr.some(
              yield* transport.requests,
              (request) => request.method === "DELETE",
            ),
          ).toBe(false);
        }).pipe(Effect.provide(applicationLayer(false))),
    );
  },
);
