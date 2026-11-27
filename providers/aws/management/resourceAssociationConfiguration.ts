import { Context, Effect, Record, Schema } from "effect";
import {
  ResourceModel,
  type ResourceNode,
} from "../../../src/core/resource/model.js";
import {
  AssociationNames,
  AwsResourceAssociationOperations,
  type ResourceAssociationOperations,
} from "./resourceAssociations.js";
import type { AwsLifecycleSettings } from "./resourceLifecycleRegistration.js";

/**
 * The AwsAssociationConfiguration definition applies when AWS needs the
 * parent object to exist before it accepts a member. For example, IAM
 * requires an instance profile before it can attach a role to it.
 */
export interface AwsAssociationConfiguration
  extends ResourceAssociationOperations {
  readonly property: string;
  readonly parent: string;
  readonly capacity: number;
}

/**
 * The AwsResourceAssociationConfiguration service is for member properties
 * of resources the stack creates and deletes. The member list stays part of
 * the resource declaration, and the lifecycle applies it after AWS creates
 * the parent.
 */
export class AwsResourceAssociationConfiguration extends Context.Service<AwsResourceAssociationConfiguration>()(
  "nomoss/providers/aws/management/resourceAssociationConfiguration/AwsResourceAssociationConfiguration",
  {
    make: Effect.fn("AwsResourceAssociationConfiguration.make")(function* (
      settings: AwsLifecycleSettings,
      definition: AwsAssociationConfiguration,
    ) {
      const model = yield* ResourceModel;

      const operations = yield* AwsResourceAssociationOperations.make(
        settings,
        definition,
      );

      const members = Schema.decodeUnknownEffect(AssociationNames);

      const desired = Schema.decodeUnknownEffect(
        AssociationNames.check(Schema.isMaxLength(definition.capacity)),
      );

      const parent = Schema.decodeUnknownEffect(Schema.String);

      /**
       * The createProperties service method returns a request for the parent.
       * It rejects a member list above the provider's limit first, so an invalid
       * declaration cannot leave an empty parent behind.
       */
      const createProperties = Effect.fnUntraced(function* (
        properties: Schema.JsonObject,
      ) {
        yield* desired(properties[definition.property]);

        return Record.filter(
          properties,
          (_, key) => key !== definition.property,
        );
      });

      /**
       * The readSelection service method returns the member names for an apply.
       * Resolve resource references before this call so the provider receives
       * actual names. The provider's capacity applies to that resolved list.
       */
      const readSelection = Effect.fnUntraced(function* (node: ResourceNode) {
        const properties = yield* model.decodeProps(node, Schema.JsonObject);

        return yield* desired(properties[definition.property]);
      });

      /**
       * The reconcile service method accepts a provider observation of the parent
       * and applies the requested member changes. Pass its check a fresh observation
       * before you save the new state. The check requires the provider to return
       * the member list.
       */
      const reconcile = Effect.fnUntraced(function* (
        observed: Schema.JsonObject,
        previous: typeof AssociationNames.Type,
        selection: typeof AssociationNames.Type,
      ) {
        const Parent = yield* parent(observed[definition.parent]);

        const current = yield* members(observed[definition.property]);

        const accepts = yield* operations.reconcile(
          Parent,
          current,
          previous,
          selection,
        );

        return (confirmed: Schema.JsonObject) => {
          const selection = confirmed[definition.property];

          return Schema.is(AssociationNames)(selection) && accepts(selection);
        };
      });

      return { createProperties, readSelection, reconcile };
    }),
  },
) {}
