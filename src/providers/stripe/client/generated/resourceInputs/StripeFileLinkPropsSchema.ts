// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeFileLinkProps = {
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly file: string;
  readonly metadata?: { readonly [x: string]: string } | "";
};

export const StripeFileLinkResourceSchema = ResourceSchemaAnnotationSchema.make(
  {
    provider: "stripe",
    service: "billing",
    resource: "file-link",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/FileLinkId"],
  },
);
export const StripeFileLinkPropsSchema = annotateResourceSchema(
  Schema.Struct({
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    expires_at: Schema.optionalKey(
      Schema.Number.annotate({
        description: "The link isn't usable after this future timestamp.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    file: Schema.String.annotate({
      description:
        "The ID of the file. The file's `purpose` must be one of the following: `business_icon`, `business_logo`, `customer_signature`, `dispute_evidence`, `finance_report_run`, `financial_account_statement`, `identity_document_downloadable`, `issuing_regulatory_reporting`, `pci_document`, `selfie`, `sigma_scheduled_query`, `tax_document_user_upload`, `terminal_android_apk`, or `terminal_reader_splashscreen`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
  }),
  StripeFileLinkResourceSchema,
);
