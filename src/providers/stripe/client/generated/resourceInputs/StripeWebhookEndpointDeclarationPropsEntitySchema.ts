import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeWebhookEndpointLocalPropsSchema } from "./StripeWebhookEndpointLocalPropsSchema.js";
import { StripeWebhookEndpointRequestPropsEntitySchema } from "./StripeWebhookEndpointRequestPropsEntitySchema.js";
import { StripeWebhookEndpointResourceSchema } from "./StripeWebhookEndpointRequestPropsSchema.js";

/**
 * The StripeWebhookEndpointDeclarationPropsEntitySchema schema preserves local lifecycle controls
 * in saved declarations. The configured provider property supplies the values
 * sent through the generated operation contract.
 */
export const StripeWebhookEndpointDeclarationPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      ...StripeWebhookEndpointLocalPropsSchema.fields,
      endpoint: StripeWebhookEndpointRequestPropsEntitySchema,
    }),
    StripeWebhookEndpointResourceSchema,
  );

export type StripeWebhookEndpointDeclarationPropsEntity =
  (typeof StripeWebhookEndpointDeclarationPropsEntitySchema)["Type"];
