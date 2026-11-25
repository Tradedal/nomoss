// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeAppsInstallResourceSchema } from "./StripeAppsInstallPropsSchema.js";

export type StripeAppsInstallPropsEntity = {
  readonly app: string;
  readonly channel?: "private_live" | "private_test" | "public" | "testing";
  readonly code_challenge?: string;
  readonly code_challenge_method?: string;
  readonly expand?: ReadonlyArray<string>;
};

export const StripeAppsInstallPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    app: Schema.String.annotate({
      description: "The ID of the app to install.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    channel: Schema.optionalKey(
      Schema.Literals([
        "private_live",
        "private_test",
        "public",
        "testing",
      ]).annotate({
        description:
          "The distribution channel to install from. Defaults to `public`, which only app developers and embedding platforms can use. An account installing its own private app must pass `private_test` or `private_live`, matching the mode of the API key.",
      }),
    ),
    code_challenge: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For OAuth apps, the PKCE code challenge used to issue the `auth_code` returned on the install. Must be 43 to 128 characters and contain only letters, numbers, `-`, `.`, `_`, and `~`. Only applies to installs made by the app developer or an embedding platform; ignored when an account installs its own private app.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    code_challenge_method: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The method used to derive `code_challenge`. Required when `code_challenge` is provided, and must be `S256`.",
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
  }),
  StripeAppsInstallResourceSchema,
);
