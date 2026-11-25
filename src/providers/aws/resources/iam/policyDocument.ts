import { Effect, Match, Schema } from "effect";

const PolicyJson = Schema.fromJsonString(Schema.JsonObject);

/**
 * The encodeIamPolicy function validates a policy document and returns the
 * JSON string IAM operations accept. Both embedded and standalone policies
 * use the same encoding.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (policyDocumentType)
 */
export const encodeIamPolicy = (document: Schema.JsonObject | string) =>
  Match.value(document).pipe(
    Match.when(Match.string, (text) => Schema.decodeEffect(PolicyJson)(text)),
    Match.orElse((json) => Effect.succeed(json)),
    Effect.flatMap(Schema.encodeEffect(PolicyJson)),
  );

/**
 * The decodeIamPolicy function reads the policy document returned by IAM.
 * GetRolePolicy can return a URL-encoded JSON document.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetRolePolicyResponse)
 */
export const decodeIamPolicy = Schema.decodeEffect(
  Schema.Union([
    PolicyJson,
    Schema.StringFromUriComponent.pipe(Schema.decodeTo(PolicyJson)),
  ]),
);
