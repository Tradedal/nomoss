import {
  Array as Arr,
  Data,
  Effect,
  Exit,
  Layer,
  Match,
  Option,
  pipe,
  Schedule,
  Schema,
  Struct,
  Tuple,
} from "effect";
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
  resourceGeneration,
  resourceModelLayer,
} from "../../../../core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandStackName,
} from "../../../../core/resource/resourceCommandPolicy.js";
import { providerCommandPolicyTag } from "../../../resourceCommandPolicyLayer.js";
import type { AwsServiceError } from "../../client/awsClientModel.js";
import { makeIAMClient, type Role } from "../../client/generated/iam.js";
import {
  AWSRoleRequestSchema,
  AWSRoleResourceSchema,
} from "../generated/native/iam/role/index.js";
import { encodeIamPolicy } from "./policyDocument.js";

const Identity = Schema.Struct({
  RoleName: Schema.String,
  RoleId: Schema.String,
  Arn: Schema.String,
});

type RoleRequest = typeof AWSRoleRequestSchema.Type;

class IamRoleIdentityChanged extends Data.TaggedError(
  "IamRoleIdentityChanged",
)<{
  readonly roleName: string;
}> {
  override get message() {
    return `IAM role "${this.roleName}" has a different RoleId than the saved role`;
  }
}

const isMissingRole = (error: { readonly _tag: string }) =>
  error._tag === "AwsServiceError" &&
  "code" in error &&
  error.code === "NoSuchEntity";

const missingIsSuccess = (failure: AwsServiceError) =>
  Match.value(failure.code).pipe(
    Match.when("NoSuchEntity", () => Effect.void),
    Match.orElse(() => Effect.fail(failure)),
  );

const sameJson = Schema.toEquivalence(Schema.Json);

/**
 * The roleCommands Layer manages role trust and permissions. Configuration
 * changes detach only policies and tags recorded in the last request, so an
 * IAM role read does not grant ownership over unrelated assignments.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (CreateRole, AttachRolePolicy, PutRolePolicy, GetRole and DeleteRole)
 */
export const roleCommands = Layer.effect(
  providerCommandPolicyTag(AWSRoleResourceSchema),
  Effect.gen(function* () {
    const iam = yield* makeIAMClient;
    const model = yield* ResourceModel;
    const digest = yield* Digest.Digest;

    const readRole = (RoleName: string) =>
      iam.getRole({ RoleName }).pipe(
        Effect.map(({ Role }) => Option.some(Role)),
        Effect.catchIf(isMissingRole, () =>
          Effect.succeed(Option.none<Role>()),
        ),
      );

    const confirmRole = (RoleName: string) =>
      readRole(RoleName).pipe(
        Effect.repeat({
          while: Option.isNone,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("30 seconds"),
        Effect.flatMap(Effect.fromOption),
      );

    /**
     * The roleName helper generates the same name for the same declaration
     * across retries. A user-supplied name remains the requested IAM name.
     *
     * @see ../../../../../docs/application/resource-operations.md (resource identity and creation retries)
     */
    const roleName = Effect.fn("IamRole.roleName")(function* (
      node: ResourceNode,
      request: RoleRequest,
    ) {
      return yield* Effect.fromOption(
        Option.fromUndefinedOr(request.RoleName),
      ).pipe(
        Effect.catch(() =>
          ResourceCommandStackName.pipe(
            Effect.flatMap(Effect.fromOption),
            Effect.map((stack) =>
              Tuple.make(stack, node.key.logicalId, resourceGeneration(node)),
            ),
            Effect.flatMap(
              Schema.encodeEffect(Schema.fromJsonString(Schema.Json)),
            ),
            Effect.flatMap((seed) =>
              digest.digestHex(Digest.sha256, new TextEncoder().encode(seed)),
            ),
            Effect.map((hash) => `nomoss-${hash.substring(0, 56)}`),
          ),
        ),
      );
    });

    /**
     * The applyPolicies operation updates the role's declared assignments.
     * Names present only in the previous request are removed explicitly.
     *
     * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (AttachRolePolicy and PutRolePolicy)
     */
    const applyPolicies = Effect.fn("IamRole.applyPolicies")(function* (
      RoleName: string,
      desired: Pick<RoleRequest, "ManagedPolicyArns" | "Policies">,
      previous: Pick<RoleRequest, "ManagedPolicyArns" | "Policies">,
    ) {
      const wanted = desired.ManagedPolicyArns ?? [];
      const saved = previous.ManagedPolicyArns ?? [];

      yield* Effect.forEach(
        Arr.difference(saved, wanted),
        (PolicyArn) =>
          iam
            .detachRolePolicy({ RoleName, PolicyArn })
            .pipe(Effect.catchTag("AwsServiceError", missingIsSuccess)),
        { discard: true },
      );

      yield* Effect.forEach(
        Arr.difference(wanted, saved),
        (PolicyArn) => iam.attachRolePolicy({ RoleName, PolicyArn }),
        { discard: true },
      );

      const inline = desired.Policies ?? [];
      const priorInline = previous.Policies ?? [];
      const wantedNames = Arr.map(inline, (policy) => policy.PolicyName);

      const removed = Arr.filter(
        priorInline,
        ({ PolicyName }) => !Arr.contains(wantedNames, PolicyName),
      );

      const changed = Arr.filter(
        inline,
        (policy) => !Arr.some(priorInline, (saved) => sameJson(saved, policy)),
      );

      yield* Effect.forEach(
        changed,
        ({ PolicyName, PolicyDocument }) =>
          encodeIamPolicy(PolicyDocument).pipe(
            Effect.flatMap((document) =>
              iam.putRolePolicy({
                RoleName,
                PolicyName,
                PolicyDocument: document,
              }),
            ),
          ),
        { discard: true },
      );

      yield* Effect.forEach(
        removed,
        ({ PolicyName }) =>
          iam
            .deleteRolePolicy({ RoleName, PolicyName })
            .pipe(Effect.catchTag("AwsServiceError", missingIsSuccess)),
        { discard: true },
      );
    });

    const removeRole = Effect.fn("IamRole.removeRole")(function* (
      RoleName: string,
      assigned: Pick<RoleRequest, "ManagedPolicyArns" | "Policies">,
    ) {
      yield* applyPolicies(RoleName, {}, assigned);

      yield* iam
        .deleteRole({ RoleName })
        .pipe(Effect.catchTag("AwsServiceError", missingIsSuccess));

      yield* readRole(RoleName).pipe(
        Effect.repeat({
          while: Option.isSome,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("30 seconds"),
      );
    });

    const create = Effect.fn("IamRole.create")(function* (node: ResourceNode) {
      const desired = yield* model.decodeProps(node, AWSRoleRequestSchema);
      const RoleName = yield* roleName(node, desired);
      const AssumeRolePolicyDocument = yield* encodeIamPolicy(
        desired.AssumeRolePolicyDocument,
      );

      const fields = Struct.pick(desired, [
        "Description",
        "MaxSessionDuration",
        "Path",
        "PermissionsBoundary",
        "Tags",
      ]);

      // Role creation retains the role after successful configuration and
      // removes it after failure or interruption. Effect.acquireUseRelease
      // protects acquisition and cleanup as documented in
      // node_modules/effect/src/Effect.ts, "acquireUseRelease".
      const applied = yield* Effect.acquireUseRelease(
        iam.createRole({ ...fields, RoleName, AssumeRolePolicyDocument }),
        Effect.fnUntraced(function* ({ Role }) {
          yield* confirmRole(RoleName);
          yield* applyPolicies(RoleName, desired, {});

          return yield* model.withOutputs(node, Role);
        }),
        (_, exit) =>
          Exit.match(exit, {
            onSuccess: () => Effect.void,
            onFailure: () => removeRole(RoleName, desired),
          }),
      );

      return ResourceCommandResult.Created({ node: applied });
    });

    /**
     * The checkRole operation verifies the immutable RoleId before changing
     * an existing role. A new IAM role can have the same name as a deleted
     * role and still belong to someone else.
     *
     * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (Role)
     */
    const checkRole = Effect.fn("IamRole.checkRole")(function* (
      node: ResourceNode,
    ) {
      const saved = yield* model.decodeOutputs(node, Identity);

      return yield* readRole(saved.RoleName).pipe(
        Effect.filterOrFail(
          (role) =>
            !Option.exists(role, ({ RoleId }) => saved.RoleId !== RoleId),
          () => new IamRoleIdentityChanged({ roleName: saved.RoleName }),
        ),
      );
    });

    const update = Effect.fn("IamRole.update")(function* (
      node: ResourceNode,
      current: ResourceNode,
    ) {
      const saved = yield* model.decodeOutputs(current, Identity);
      const previous = yield* model.decodeProps(current, AWSRoleRequestSchema);
      const desired = yield* model.decodeProps(node, AWSRoleRequestSchema);

      yield* checkRole(current).pipe(Effect.flatMap(Effect.fromOption));

      const { RoleName } = saved;
      const Description = desired.Description ?? "";
      const MaxSessionDuration = desired.MaxSessionDuration ?? 3600;
      const configurationChanged =
        desired.Description !== previous.Description ||
        desired.MaxSessionDuration !== previous.MaxSessionDuration;

      yield* iam
        .updateRole({ RoleName, Description, MaxSessionDuration })
        .pipe(Effect.when(Effect.succeed(configurationChanged)));

      const trustChanged = !sameJson(
        desired.AssumeRolePolicyDocument,
        previous.AssumeRolePolicyDocument,
      );

      yield* encodeIamPolicy(desired.AssumeRolePolicyDocument).pipe(
        Effect.flatMap((PolicyDocument) =>
          iam.updateAssumeRolePolicy({ RoleName, PolicyDocument }),
        ),
        Effect.when(Effect.succeed(trustChanged)),
      );

      const permissionsChanged =
        desired.PermissionsBoundary !== previous.PermissionsBoundary;

      yield* Option.match(Option.fromUndefinedOr(desired.PermissionsBoundary), {
        onNone: () => iam.deleteRolePermissionsBoundary({ RoleName }),
        onSome: (PermissionsBoundary) =>
          iam.putRolePermissionsBoundary({ RoleName, PermissionsBoundary }),
      }).pipe(Effect.when(Effect.succeed(permissionsChanged)));

      const tags = desired.Tags ?? [];
      const savedTags = previous.Tags ?? [];

      const keys = Arr.map(tags, (tag) => tag.Key);
      const TagKeys = Arr.difference(
        Arr.map(savedTags, (tag) => tag.Key),
        keys,
      );

      const Tags = Arr.filter(
        tags,
        ({ Key, Value }) =>
          !Arr.some(
            savedTags,
            (saved) => Key === saved.Key && Value === saved.Value,
          ),
      );

      yield* iam
        .untagRole({ RoleName, TagKeys })
        .pipe(
          Effect.when(Effect.succeed(Arr.isReadonlyArrayNonEmpty(TagKeys))),
        );

      yield* iam
        .tagRole({ RoleName, Tags })
        .pipe(Effect.when(Effect.succeed(Arr.isReadonlyArrayNonEmpty(Tags))));

      yield* applyPolicies(RoleName, desired, previous);

      const observed = yield* confirmRole(RoleName);

      const applied = yield* model.withObservedOutputs(
        { ...node, outputs: current.outputs },
        observed,
      );

      return ResourceCommandResult.Updated({ node: applied });
    });

    const read = Effect.fn("IamRole.read")(function* (node: ResourceNode) {
      const role = yield* checkRole(node);

      const present = yield* pipe(
        role,
        Option.map((observed) =>
          model
            .withObservedOutputs(node, observed)
            .pipe(
              Effect.map((node) =>
                ResourceObservation.Present({ node, observed }),
              ),
            ),
        ),
        Effect.transposeOption,
      );

      const observation = Option.match(present, {
        onNone: () => ResourceObservation.Missing({ node }),
        onSome: (value) => value,
      });

      return ResourceCommandResult.Observed({ observation });
    });

    const destroy = Effect.fn("IamRole.destroy")(function* (
      node: ResourceNode,
    ) {
      const { RoleName } = yield* model.decodeOutputs(node, Identity);
      const assigned = yield* model.decodeProps(node, AWSRoleRequestSchema);
      const role = yield* checkRole(node);

      yield* removeRole(RoleName, assigned).pipe(
        Effect.when(Effect.succeed(Option.isSome(role))),
      );

      return ResourceCommandResult.Destroyed({ node });
    });

    const execute = Effect.fn("IamRole.execute")((command: ResourceCommand) => {
      const action = Match.value(command).pipe(
        Match.tag("Apply", ({ decision }) => decision),
        Match.orElse((direct) => direct),
      );

      return Match.value(action).pipe(
        Match.tag("Create", ({ node }) => create(node)),
        Match.tag("Read", ({ node }) => read(node)),
        Match.when(
          { _tag: "Update", current: Match.defined },
          ({ node, current }) => update(node, current),
        ),
        Match.tag("Delete", "Destroy", ({ node }) => destroy(node)),
        Match.orElse(() =>
          Effect.fail(new ResourceCommandUnsupported({ command })),
        ),
        Effect.mapError(
          (cause) => new ResourceCommandExecutionFailed({ command, cause }),
        ),
      );
    });

    return { execute };
  }),
).pipe(Layer.provide(resourceModelLayer));
