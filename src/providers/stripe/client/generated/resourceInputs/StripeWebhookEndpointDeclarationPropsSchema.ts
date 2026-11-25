import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeWebhookEndpointLocalPropsSchema } from "./StripeWebhookEndpointLocalPropsSchema.js";
import {
  StripeWebhookEndpointRequestPropsSchema,
  StripeWebhookEndpointResourceSchema,
} from "./StripeWebhookEndpointRequestPropsSchema.js";

/**
 * The StripeWebhookEndpointDeclarationPropsSchema schema preserves local lifecycle controls
 * in saved declarations. The configured provider property supplies the values
 * sent through the generated operation contract.
 */
export const StripeWebhookEndpointDeclarationPropsSchema =
  annotateResourceSchema(
    Schema.Struct({
      ...StripeWebhookEndpointLocalPropsSchema.fields,
      endpoint: StripeWebhookEndpointRequestPropsSchema,
    }),
    StripeWebhookEndpointResourceSchema,
  );

export type StripeWebhookEndpointDeclarationProps =
  (typeof StripeWebhookEndpointDeclarationPropsSchema)["Type"];
