// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeIdentityVerificationSessionResourceSchema } from "./StripeIdentityVerificationSessionPropsSchema.js";

export type StripeIdentityVerificationSessionPropsEntity = {
  readonly client_reference_id?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly options?: {
    readonly document?:
      | ({
          readonly allowed_types?: ReadonlyArray<
            "driving_license" | "id_card" | "passport"
          >;
          readonly require_id_number?: boolean;
          readonly require_live_capture?: boolean;
          readonly require_matching_selfie?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly provided_details?: {
    readonly email?: string;
    readonly phone?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly related_customer?: string;
  readonly related_customer_account?: string;
  readonly related_person?: {
    readonly account: string;
    readonly person: string;
  } & { readonly [x: string]: Schema.Json };
  readonly return_url?: string;
  readonly type?: "document" | "id_number";
  readonly verification_flow?: string;
};

export const StripeIdentityVerificationSessionPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      client_reference_id: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
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
      metadata: Schema.optionalKey(
        Schema.Record(Schema.String, Schema.String).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
        }),
      ),
      options: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            document: Schema.optionalKey(
              Schema.Union([
                Schema.StructWithRest(
                  Schema.Struct({
                    allowed_types: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "driving_license",
                          "id_card",
                          "passport",
                        ]),
                      ),
                    ),
                    require_id_number: Schema.optionalKey(Schema.Boolean),
                    require_live_capture: Schema.optionalKey(Schema.Boolean),
                    require_matching_selfie: Schema.optionalKey(Schema.Boolean),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "document_options" }),
                Schema.Literal(""),
              ]),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "session_options_param",
          description:
            "A set of options for the session’s verification checks.",
        }),
      ),
      provided_details: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            email: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(800).annotate({
                  expected: "a string with at most 800 code points",
                }),
              ),
            ),
            phone: Schema.optionalKey(Schema.String),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "provided_details_param",
          description:
            "Details provided about the user being verified. These details might be shown to the user.",
        }),
      ),
      related_customer: Schema.optionalKey(
        Schema.String.annotate({ description: "Customer ID" }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      related_customer_account: Schema.optionalKey(
        Schema.String.annotate({
          description: "The ID of the Account representing a customer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      related_person: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            account: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            person: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "related_person_param",
          description:
            "Tokens referencing a Person resource and its associated account.",
        }),
      ),
      return_url: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The URL that the user will be redirected to upon completing the verification flow.",
        }),
      ),
      type: Schema.optionalKey(
        Schema.Literals(["document", "id_number"]).annotate({
          description:
            "The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed. You must provide a `type` if not passing `verification_flow`.",
        }),
      ),
      verification_flow: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The ID of a verification flow from the Dashboard. See https://docs.stripe.com/identity/verification-flows.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    StripeIdentityVerificationSessionResourceSchema,
  );
