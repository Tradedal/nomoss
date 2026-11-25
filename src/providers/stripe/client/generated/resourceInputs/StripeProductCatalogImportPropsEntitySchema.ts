// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeProductCatalogImportResourceSchema } from "./StripeProductCatalogImportPropsSchema.js";

export type StripeProductCatalogImportPropsEntity = {
  readonly feed_type: "inventory" | "pricing" | "product" | "promotion";
  readonly metadata: { readonly [x: string]: string };
  readonly mode: "replace" | "upsert";
} & { readonly [x: string]: Schema.Json };

export const StripeProductCatalogImportPropsEntitySchema =
  annotateResourceSchema(
    Schema.StructWithRest(
      Schema.Struct({
        feed_type: Schema.Literals([
          "inventory",
          "pricing",
          "product",
          "promotion",
        ]).annotate({ description: "The type of catalog data to import." }),
        metadata: Schema.Record(Schema.String, Schema.String).annotate({
          description:
            "Additional information about the import in a structured format.",
        }),
        mode: Schema.Literals(["replace", "upsert"]).annotate({
          description:
            "The strategy for handling existing catalog data during import.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ),
    StripeProductCatalogImportResourceSchema,
  );
