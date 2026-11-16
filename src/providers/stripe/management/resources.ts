import { Context, Layer } from "effect";
import { resourceGraphBuilderLayer } from "../../../core/resource/resourceGraphBuilder.js";
import { makeStripeResourceDeclarations } from "../client/generated/resourceDeclarations.js";
import type { StripeBillingPortalConfigurationPropsEntity } from "../client/generated/resourceInputs/StripeBillingPortalConfigurationPropsEntitySchema.js";
import type { StripeCustomerPropsEntity } from "../client/generated/resourceInputs/StripeCustomerPropsEntitySchema.js";
import type { StripeProductPropsEntity } from "../client/generated/resourceInputs/StripeProductPropsEntitySchema.js";

export interface StripeCustomerInput {
  readonly logicalId: string;
  readonly props: StripeCustomerPropsEntity;
}
export interface StripeProductInput {
  readonly logicalId: string;
  readonly props: StripeProductPropsEntity;
}
export interface StripeBillingPortalConfigurationInput {
  readonly logicalId: string;
  readonly props: StripeBillingPortalConfigurationPropsEntity;
}

/**
 * Related declarations accept the returned entities before Stripe creates
 * their identities. Registration validates those relationships in the shared
 * graph; provider requests run when the stack applies the declarations.
 */
export class StripeResources extends Context.Service<StripeResources>()(
  "nomoss/providers/stripe/management/resources/StripeResources",
  {
    make: makeStripeResourceDeclarations,
  },
) {}

export const stripeResourcesLayer = Layer.effect(
  StripeResources,
  StripeResources.make,
).pipe(Layer.provideMerge(resourceGraphBuilderLayer));
