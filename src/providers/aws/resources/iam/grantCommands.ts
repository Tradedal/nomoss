import { Data, Effect, Layer, Match, Option, Schedule, Schema } from "effect";
import { Digest } from "effect/crypto";
import {
  type ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../../../core/resource/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  resourceModelLayer,
} from "../../../../core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandStackName,
} from "../../../../core/resource/resourceCommandPolicy.js";
import { providerCommandPolicyTag } from "../../../resourceCommandPolicyLayer.js";
import { makeIAMClient } from "../../client/generated/iam.js";
import {
  RoleGrantOutputs,
  RoleGrantRequest,
  roleGrantSchema,
} from "./grant.js";
import { decodeIamPolicy, encodeIamPolicy } from "./policyDocument.js";

class IamGrantConflict extends Data.TaggedError("IamGrantConflict")<{
  readonly message: string;
}> {}

const Identity = RoleGrantOutputs;
type Identity = typeof Identity.Type;
type GrantRequest = typeof RoleGrantRequest.Type;

const PolicyOwner = Schema.Struct({
  Statement: Schema.Tuple([Schema.Struct({ Sid: Schema.String })]),
});

const sameDocument = Schema.toEquivalence(Schema.JsonObject);

const policyDocument = (identity: Identity, request: GrantRequest) => {
  const statement = {
    Sid: identity.PolicyName,
    Effect: request.Effect ?? "Allow",
    Action: request.Actions,
    Resource: request.Resource,
  };

  const scoped = Option.match(Option.fromUndefinedOr(request.Condition), {
    onNone: () => statement,
    onSome: (Condition) => ({ ...statement, Condition }),
  });

  return { Version: "2012-10-17", Statement: [scoped] };
};

/**
 * The grantCommands Layer owns one inline policy per grant. It checks the
 * role's immutable ID and the policy's statement ID before changing or
 * deleting an existing policy. A retry addresses the same policy name.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetRole, GetRolePolicy, PutRolePolicy and DeleteRolePolicy)
 */
export const grantCommands = Layer.effect(
  providerCommandPolicyTag(roleGrantSchema),
  Effect.gen(function* () {
    const iam = yield* makeIAMClient;
    const model = yield* ResourceModel;
    const digest = yield* Digest.Digest;

    const readRole = (RoleName: string) =>
      iam.getRole({ RoleName }).pipe(
        Effect.map(({ Role }) => Option.some(Role.RoleId)),
        Effect.catchTag("AwsServiceError", (error) =>
          Match.value(error.code).pipe(
            Match.when("NoSuchEntity", () =>
              Effect.succeed(Option.none<string>()),
            ),
            Match.orElse(() => Effect.fail(error)),
          ),
        ),
      );

    /**
     * The readPolicy operation confirms that the inline policy is owned by
     * the grant before a caller can overwrite it or revoke it.
     */
    const readPolicy = Effect.fn("IamGrant.readPolicy")(function* (
      identity: Identity,
    ) {
      const { PolicyName, RoleName } = identity;
      const role = yield* readRole(RoleName);

      const sameRole = Option.exists(role, (id) => id === identity.RoleId);
      const current = yield* iam.getRolePolicy({ RoleName, PolicyName }).pipe(
        Effect.flatMap(({ PolicyDocument }) => decodeIamPolicy(PolicyDocument)),
        Effect.asSome,
        Effect.catchTag("AwsServiceError", (error) =>
          Match.value(error.code).pipe(
            Match.when("NoSuchEntity", () =>
              Effect.succeed(Option.none<Schema.JsonObject>()),
            ),
            Match.orElse(() => Effect.fail(error)),
          ),
        ),
        Effect.when(Effect.succeed(sameRole)),
        Effect.map(Option.flatten),
      );

      const ownsStatement = Schema.is(PolicyOwner);
      const conflict = Option.exists(
        current,
        (doc) => !ownsStatement(doc) || doc.Statement[0].Sid !== PolicyName,
      );

      yield* Effect.fail(
        new IamGrantConflict({
          message: `IAM policy "${PolicyName}" belongs to another declaration on role "${RoleName}".`,
        }),
      ).pipe(Effect.when(Effect.succeed(conflict)));

      return current;
    });

    const identityFor = Effect.fn("IamGrant.identityFor")(function* (
      node: ResourceNode,
      request: GrantRequest,
    ) {
      const stack = yield* ResourceCommandStackName.pipe(
        Effect.flatMap(Effect.fromOption),
      );

      const seed = yield* Schema.encodeEffect(
        Schema.fromJsonString(Schema.Json),
      )([stack, node.key.logicalId, request.Principal.RoleId]);

      const hash = yield* digest.digestHex(
        Digest.sha256,
        new TextEncoder().encode(seed),
      );

      return { ...request.Principal, PolicyName: `Nomoss${hash}` };
    });

    const write = Effect.fn("IamGrant.write")(function* (
      node: ResourceNode,
      identity: Identity,
      request: GrantRequest,
    ) {
      const { RoleName, PolicyName, RoleId } = identity;
      const role = yield* readRole(RoleName);

      const sameRole = Option.exists(role, (id) => id === RoleId);

      yield* Effect.fail(
        new IamGrantConflict({
          message: `The saved IAM role identity for "${RoleName}" is unavailable.`,
        }),
      ).pipe(Effect.when(Effect.succeed(!sameRole)));

      const current = yield* readPolicy(identity);
      const desired = policyDocument(identity, request);

      const unchanged = Option.exists(current, (doc) =>
        sameDocument(doc, desired),
      );

      yield* encodeIamPolicy(desired).pipe(
        Effect.flatMap((PolicyDocument) =>
          iam.putRolePolicy({ RoleName, PolicyName, PolicyDocument }),
        ),
        Effect.when(Effect.succeed(!unchanged)),
      );

      yield* readPolicy(identity).pipe(
        Effect.repeat({
          while: (policy) =>
            !Option.exists(policy, (doc) => sameDocument(doc, desired)),
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("30 seconds"),
      );

      return yield* model.withOutputs(node, identity);
    });

    const create = Effect.fn("IamGrant.create")(function* (node: ResourceNode) {
      const request = yield* model.decodeProps(node, RoleGrantRequest);
      const identity = yield* identityFor(node, request);
      const applied = yield* write(node, identity, request);

      return ResourceCommandResult.Created({ node: applied });
    });

    const update = Effect.fn("IamGrant.update")(function* (
      node: ResourceNode,
      current: ResourceNode,
    ) {
      const request = yield* model.decodeProps(node, RoleGrantRequest);
      const identity = yield* model.decodeOutputs(current, Identity);

      const principalChanged = request.Principal.RoleId !== identity.RoleId;

      yield* Effect.fail(
        new IamGrantConflict({
          message:
            "The grant's principal has changed. Plan a replacement before applying the grant to another IAM role.",
        }),
      ).pipe(Effect.when(Effect.succeed(principalChanged)));

      const applied = yield* write(node, identity, request);

      return ResourceCommandResult.Updated({ node: applied });
    });

    const read = Effect.fn("IamGrant.read")(function* (node: ResourceNode) {
      const identity = yield* model.decodeOutputs(node, Identity);
      const document = yield* readPolicy(identity);

      const observation = Option.match(document, {
        onNone: () => ResourceObservation.Missing({ node }),
        onSome: (observed) => ResourceObservation.Present({ node, observed }),
      });

      return ResourceCommandResult.Observed({ observation });
    });

    const destroy = Effect.fn("IamGrant.destroy")(function* (
      node: ResourceNode,
    ) {
      const identity = yield* model.decodeOutputs(node, Identity);
      const { RoleName, PolicyName } = identity;
      const document = yield* readPolicy(identity);

      yield* iam.deleteRolePolicy({ RoleName, PolicyName }).pipe(
        Effect.catchTag("AwsServiceError", (error) =>
          Match.value(error.code).pipe(
            Match.when("NoSuchEntity", () => Effect.void),
            Match.orElse(() => Effect.fail(error)),
          ),
        ),
        Effect.when(Effect.succeed(Option.isSome(document))),
      );

      yield* readPolicy(identity).pipe(
        Effect.repeat({
          while: Option.isSome,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("30 seconds"),
      );

      return ResourceCommandResult.Destroyed({ node });
    });

    const execute = Effect.fn("IamGrant.execute")(
      (command: ResourceCommand) => {
        const action = Match.value(command).pipe(
          Match.tag("Apply", ({ decision }) => decision),
          Match.orElse((direct) => direct),
        );

        return Match.value(action).pipe(
          Match.tag("Create", ({ node }) => create(node)),
          Match.when(
            { _tag: "Update", current: Match.defined },
            ({ node, current }) => update(node, current),
          ),
          Match.tag("Read", ({ node }) => read(node)),
          Match.tag("Delete", "Destroy", ({ node }) => destroy(node)),
          Match.orElse(() =>
            Effect.fail(new ResourceCommandUnsupported({ command })),
          ),
          Effect.mapError(
            (cause) => new ResourceCommandExecutionFailed({ command, cause }),
          ),
        );
      },
    );

    return { execute };
  }),
).pipe(Layer.provide(resourceModelLayer));
