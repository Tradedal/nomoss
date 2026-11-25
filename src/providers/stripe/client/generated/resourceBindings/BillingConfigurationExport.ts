import { Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import type { StripeBillingConfigurationExportPropsEntity } from "../resourceInputs/StripeBillingConfigurationExportPropsEntitySchema.js";
import {
  type StripeBillingConfigurationExportOutputs,
  StripeBillingConfigurationExportOutputsSchema,
} from "../resourceOutputs.js";

export const StripeBillingConfigurationExportResourceTypeSchema = Schema.Struct(
  {
    provider: Schema.Literal("stripe"),
    service: Schema.Literal("billing"),
    resource: Schema.Literal("configuration-export"),
  },
);

/**
 * The StripeBillingConfigurationExportResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeBillingConfigurationExportResource<
  Props = StripeBillingConfigurationExportPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "configuration-export";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "stripe",
        service: "billing",
        resource: "configuration-export",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get OutputPath(): Required<StripeBillingConfigurationExportOutputs>["OutputPath"] {
    const value: Required<StripeBillingConfigurationExportOutputs>["OutputPath"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "OutputPath",
        StripeBillingConfigurationExportOutputsSchema.fields.OutputPath,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeBillingConfigurationExportDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeBillingConfigurationExportResource<Props> {
  const resource: StripeBillingConfigurationExportResource<Props> =
    new StripeBillingConfigurationExportResource<Props>(key, props, binding);

  return resource;
}
