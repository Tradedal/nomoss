import { Data, Effect, Option, Ref, type Schema } from "effect";
import type { ResourceStateStore } from "../state/stateStore.js";
import {
  type ResourceKey,
  type ResourceModel,
  ResourceOutputResolutionMissing,
} from "./model.js";

type ResourceOutputOwner = {
  readonly stackName: string;
  readonly store: (typeof ResourceStateStore)["Service"];
  readonly model: (typeof ResourceModel)["Service"];
};

/**
 * The ResourceOutputStackMismatch error prevents an existing declaration's
 * outputs from being redirected to another stack. A separate declaration graph
 * is required when applications manage the same logical IDs in different stacks.
 */
export class ResourceOutputStackMismatch extends Data.TaggedError(
  "ResourceOutputStackMismatch",
)<{
  readonly existing: string;
  readonly requested: string;
}> {}

/**
 * The ResourceOutputBinding class keeps a declaration's owning stack fixed
 * across graph resets, including when another graph uses the same logical IDs.
 * Ordinary property access uses that stack's materialized lifecycle records,
 * so earlier resource objects observe replacement and removal without I/O.
 */
export class ResourceOutputBinding {
  constructor(
    private readonly owner: Ref.Ref<Option.Option<ResourceOutputOwner>>,
  ) {}

  /**
   * The make operation reserves an unprepared declaration graph. Its outputs
   * cannot supply provider values until stack preparation establishes ownership.
   */
  static readonly make = Effect.gen(function* () {
    const owner = yield* Ref.make(Option.none<ResourceOutputOwner>());
    const binding: ResourceOutputBinding = new ResourceOutputBinding(owner);
    return binding;
  });

  /**
   * The bind method associates outputs with the services used by stack
   * execution. Repeated preparation of that stack retains the association;
   * another stack name fails before ownership can change.
   */
  bind(
    stackName: string,
    store: (typeof ResourceStateStore)["Service"],
    model: (typeof ResourceModel)["Service"],
  ) {
    const owner = this.owner;
    return Effect.gen(function* () {
      const existing = yield* Ref.get(owner);
      yield* Effect.forEach(Option.toArray(existing), (current) =>
        Effect.fail(
          new ResourceOutputStackMismatch({
            existing: current.stackName,
            requested: stackName,
          }),
        ).pipe(Effect.when(Effect.succeed(current.stackName !== stackName))),
      );
      yield* Ref.set(owner, Option.some({ stackName, store, model }));
      yield* store.loadResourceStates(stackName);
      const bound: string = stackName;
      return bound;
    });
  }

  /**
   * The value method supplies an ordinary resource property from the owning
   * state's working records. Lifecycle operations perform persistence and
   * secret restoration before this access. An absent binding, resource, or
   * field throws ResourceOutputResolutionMissing synchronously.
   */
  static value<Value>(
    binding: ResourceOutputBinding | undefined,
    source: ResourceKey,
    property: string,
    schema: Schema.Schema<Value>,
  ) {
    const current = Option.getOrThrowWith(
      Option.flatMap(Option.fromUndefinedOr(binding), (binding) =>
        Ref.getUnsafe(binding.owner),
      ),
      () =>
        new ResourceOutputResolutionMissing({
          sourceLogicalId: source.logicalId,
          property,
        }),
    );
    const node = Option.getOrThrowWith(
      current.store.currentResource(current.stackName, source),
      () =>
        new ResourceOutputResolutionMissing({
          sourceLogicalId: source.logicalId,
          property,
        }),
    );
    const value: Value = current.model.readAppliedOutput(
      node,
      property,
      schema,
    );
    return value;
  }
}
