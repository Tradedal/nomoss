import { Schema } from "effect";

export const ProviderIdSchema = Schema.Literals(["aws", "stripe"]);

export type ProviderId = Schema.Schema.Type<typeof ProviderIdSchema>;
