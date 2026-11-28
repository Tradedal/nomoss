import {
  AttachGroupPolicyRequest,
  AttachRolePolicyRequest,
  AttachUserPolicyRequest,
  iamOperations,
  makeIAMClient,
  Policy,
  PolicyGroup,
  PolicyRole,
  PolicyUser,
  PolicyVersion,
} from "@nomoss/aws/iam";
import { AwsArn, AwsServiceError } from "@nomoss/aws/model";
import {
  Array as Arr,
  Context,
  Effect,
  Option,
  Order,
  Schema,
  Stream,
  Struct,
} from "effect";
import {
  AWSManagedPolicyOutputsSchema,
  AWSManagedPolicyRequestSchema,
  AWSManagedPolicyResourceSchema,
} from "nomoss/providers/aws/iam/managedpolicy";
import {
  ResourceIdentityMismatch,
  ResourceModel,
  type ResourceNode,
} from "../../../../../src/core/resource/model.js";
import { ResourceLifecycle } from "../../../../../src/core/resource/resourceLifecycle.js";
import { IamPolicyId } from "../../mappings/iam/iamIdentity.js";
import { iamLifecycleSettings } from "../../mappings/iam/iamLifecycleSettings.js";
import {
  AssociationNames,
  AwsResourceAssociationOperations,
} from "../../resourceAssociations.js";
import { AwsResourceMapping } from "../../resourceMapping.js";
import {
  awsJsonDocument,
  awsJsonDocumentValue,
  resourceRequest,
} from "../../resourceOperation.js";

const identity = Schema.Struct({
  PolicyArn: AwsArn,
  PolicyId: IamPolicyId,
});

const metadata = Schema.Struct({
  ...AWSManagedPolicyOutputsSchema.fields,
  ...identity.fields,
  ManagedPolicyName: Schema.requiredKey(Policy.schema.fields.PolicyName),
  Description: Policy.schema.fields.Description,
  Path: Policy.schema.fields.Path,
  DefaultVersionId: Schema.requiredKey(Policy.schema.fields.DefaultVersionId),
});

const nativeMetadata = metadata.pipe(
  Schema.encodeKeys({ PolicyArn: "Arn", ManagedPolicyName: "PolicyName" }),
);

const observation = Schema.Struct({
  ...metadata.fields,
  PolicyDocument: Schema.JsonObject,
  Groups: AssociationNames,
  Roles: AssociationNames,
  Users: AssociationNames,
});

type ManagedPolicyObservation = typeof observation.Type;
type ManagedPolicyRequest = typeof AWSManagedPolicyRequestSchema.Type;

const version = Schema.Struct({
  Document: Schema.requiredKey(PolicyVersion.schema.fields.Document),
});

const versionSummary = Schema.Struct({
  VersionId: Schema.requiredKey(PolicyVersion.schema.fields.VersionId),
  IsDefaultVersion: Schema.requiredKey(
    PolicyVersion.schema.fields.IsDefaultVersion,
  ),
  CreateDate: Schema.requiredKey(PolicyVersion.schema.fields.CreateDate),
});

const group = Schema.Struct({
  Parent: AttachGroupPolicyRequest.schema.fields.PolicyArn,
  Member: AttachGroupPolicyRequest.schema.fields.GroupName,
}).pipe(Schema.encodeKeys({ Parent: "PolicyArn", Member: "GroupName" }));

const role = Schema.Struct({
  Parent: AttachRolePolicyRequest.schema.fields.PolicyArn,
  Member: AttachRolePolicyRequest.schema.fields.RoleName,
}).pipe(Schema.encodeKeys({ Parent: "PolicyArn", Member: "RoleName" }));

const user = Schema.Struct({
  Parent: AttachUserPolicyRequest.schema.fields.PolicyArn,
  Member: AttachUserPolicyRequest.schema.fields.UserName,
}).pipe(Schema.encodeKeys({ Parent: "PolicyArn", Member: "UserName" }));

const missing = AwsServiceError.hasCode("NoSuchEntity");
const sameDocument = Schema.toEquivalence(Schema.JsonObject);

const encodeDocument = Schema.encodeEffect(
  Schema.fromJsonString(Schema.JsonObject),
);

const memberNames = (names: ReadonlyArray<string> | undefined) =>
  Option.fromUndefinedOr(names).pipe(Option.toArray, Arr.flatten);

type Attachments = Pick<ManagedPolicyRequest, "Groups" | "Roles" | "Users">;

const emptyAttachments: Required<Attachments> = {
  Groups: [],
  Roles: [],
  Users: [],
};

/**
 * The ManagedPolicyManagement service confirms the document IAM uses for
 * authorization. IAM stores updates as new versions. A version has no effect
 * on attached principals until IAM makes it the default.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetPolicyVersion and CreatePolicyVersion)
 */
export class ManagedPolicyManagement extends Context.Service<ManagedPolicyManagement>()(
  "nomoss/providers/aws/management/operations/iam/managedPolicy/ManagedPolicyManagement",
  {
    make: Effect.gen(function* () {
      const iam = yield* makeIAMClient;
      const model = yield* ResourceModel;
      const names = yield* AwsResourceMapping;

      const groups = yield* AwsResourceAssociationOperations.make(
        iamLifecycleSettings,
        {
          add: resourceRequest(iamOperations.AttachGroupPolicy, group),
          remove: resourceRequest(iamOperations.DetachGroupPolicy, group),
        },
      );

      const roles = yield* AwsResourceAssociationOperations.make(
        iamLifecycleSettings,
        {
          add: resourceRequest(iamOperations.AttachRolePolicy, role),
          remove: resourceRequest(iamOperations.DetachRolePolicy, role),
        },
      );

      const users = yield* AwsResourceAssociationOperations.make(
        iamLifecycleSettings,
        {
          add: resourceRequest(iamOperations.AttachUserPolicy, user),
          remove: resourceRequest(iamOperations.DetachUserPolicy, user),
        },
      );

      yield* model.registerOutputsSchema(
        AWSManagedPolicyResourceSchema,
        AWSManagedPolicyOutputsSchema,
      );

      const propsFor = (node: ResourceNode) =>
        model.decodeProps(node, AWSManagedPolicyRequestSchema);

      /**
       * The readAttachments operation reads every page before an update may
       * detach anyone. The IAM request selects attached permission policies.
       * An entity that uses the policy as a permissions limit does not count
       * as an attachment that the stack can detach.
       *
       * @see ../../../../../refs/effect/packages/effect/src/Stream.ts (runCollect)
       */
      const readAttachments = Effect.fn("ManagedPolicy.readAttachments")(
        function* (PolicyArn: string) {
          const pages = yield* iam
            .listEntitiesForPolicyPages({
              PolicyArn,
              PolicyUsageFilter: "PermissionsPolicy",
            })
            .pipe(Stream.runCollect);

          const lists = yield* Effect.forEach(pages, (page) =>
            Schema.decodeUnknownEffect(
              Schema.Struct({
                PolicyGroups: Schema.Array(
                  Schema.Struct({
                    GroupName: Schema.requiredKey(
                      PolicyGroup.schema.fields.GroupName,
                    ),
                  }),
                ).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
                PolicyRoles: Schema.Array(
                  Schema.Struct({
                    RoleName: Schema.requiredKey(
                      PolicyRole.schema.fields.RoleName,
                    ),
                  }),
                ).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
                PolicyUsers: Schema.Array(
                  Schema.Struct({
                    UserName: Schema.requiredKey(
                      PolicyUser.schema.fields.UserName,
                    ),
                  }),
                ).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
              }),
            )(page),
          );

          return {
            Groups: Arr.flatMap(lists, ({ PolicyGroups }) =>
              Arr.map(PolicyGroups, ({ GroupName }) => GroupName),
            ),
            Roles: Arr.flatMap(lists, ({ PolicyRoles }) =>
              Arr.map(PolicyRoles, ({ RoleName }) => RoleName),
            ),
            Users: Arr.flatMap(lists, ({ PolicyUsers }) =>
              Arr.map(PolicyUsers, ({ UserName }) => UserName),
            ),
          };
        },
      );

      /**
       * The lookup operation reads the document for the exact version IAM
       * reports as current. If that version disappears during a concurrent
       * change, the next confirmation can read the new default.
       */
      const lookup = Effect.fn("ManagedPolicy.lookup")(
        function* ({ PolicyArn }: typeof identity.Type) {
          const response = yield* iam.getPolicy({ PolicyArn });

          const policy = yield* Schema.decodeUnknownEffect(nativeMetadata)(
            response.Policy,
          );

          const reply = yield* iam.getPolicyVersion({
            PolicyArn,
            VersionId: policy.DefaultVersionId,
          });

          const current = yield* Schema.decodeUnknownEffect(version)(
            reply.PolicyVersion,
          );
          const PolicyDocument = yield* Schema.decodeEffect(awsJsonDocument)(
            current.Document,
          );

          const attachments = yield* readAttachments(PolicyArn);

          const observed: ManagedPolicyObservation = {
            ...policy,
            ...attachments,
            PolicyDocument,
          };

          return Option.some(observed);
        },
        Effect.catchIf(missing, () => Effect.succeedNone),
      );

      const lifecycle = yield* ResourceLifecycle.make(
        {
          identity,
          lookup,
          ownership: {
            matches: (saved, observed) => saved.PolicyId === observed.PolicyId,
            onMismatch: (saved) =>
              new ResourceIdentityMismatch({
                property: "PolicyId",
                expected: saved.PolicyId,
                actual: null,
              }),
          },
        },
        iamLifecycleSettings.timeout,
      );

      /**
       * The create operation returns the policy ARN and ID before the stack
       * makes any attachments. An interrupted apply can find that policy
       * again from its checkpoint.
       */
      const create = Effect.fn("ManagedPolicy.create")(function* (
        node: ResourceNode,
      ) {
        const props = yield* propsFor(node);

        const PolicyName = yield* names.resolveName(
          node,
          props.ManagedPolicyName,
          128,
        );

        const desired = yield* Schema.decodeEffect(awsJsonDocumentValue)(
          props.PolicyDocument,
        );
        const PolicyDocument = yield* encodeDocument(desired);

        const request = Struct.assign(
          Struct.pick(props, ["Description", "Path"]),
          {
            PolicyName,
            PolicyDocument,
          },
        );

        const reply = yield* iam.createPolicy(request);

        const saved = yield* Schema.decodeUnknownEffect(nativeMetadata)(
          reply.Policy,
        );

        return {
          ...emptyAttachments,
          ...saved,
          PolicyDocument: desired,
        };
      });

      /**
       * The reconcileAttachments operation keeps group, role, and user names
       * separate. IAM permits the same name in all three namespaces. The
       * returned check accepts a fresh read only after each set agrees.
       */
      const reconcileAttachments = Effect.fn(
        "ManagedPolicy.reconcileAttachments",
      )(function* (
        observed: ManagedPolicyObservation,
        previous: Attachments,
        desired: Attachments,
      ) {
        const { PolicyArn } = observed;

        const acceptsGroup = yield* groups.reconcile(
          PolicyArn,
          observed.Groups,
          memberNames(previous.Groups),
          memberNames(desired.Groups),
        );

        const acceptsRole = yield* roles.reconcile(
          PolicyArn,
          observed.Roles,
          memberNames(previous.Roles),
          memberNames(desired.Roles),
        );

        const acceptsUser = yield* users.reconcile(
          PolicyArn,
          observed.Users,
          memberNames(previous.Users),
          memberNames(desired.Users),
        );

        return (confirmed: typeof observed) =>
          acceptsGroup(confirmed.Groups) &&
          acceptsRole(confirmed.Roles) &&
          acceptsUser(confirmed.Users);
      });

      /**
       * The readVersions operation requires each IAM version to identify
       * itself and say whether it is the default. Only nondefault versions
       * are eligible for deletion.
       */
      const readVersions = Effect.fn("ManagedPolicy.readVersions")(
        (PolicyArn: string) =>
          iam.listPolicyVersionsPages({ PolicyArn }).pipe(
            Stream.mapEffect(({ Versions }) =>
              Schema.decodeUnknownEffect(Schema.Array(versionSummary))(
                Versions,
              ),
            ),
            Stream.runCollect,
            Effect.map(Arr.flatten),
          ),
      );

      /**
       * The publishDocument operation frees one slot only when the policy
       * reaches IAM's five-version limit. It keeps the default active until
       * IAM accepts the new version as its replacement.
       */
      const publishDocument = Effect.fn("ManagedPolicy.publishDocument")(
        function* (PolicyArn: string, desired: Schema.JsonObject) {
          const PolicyDocument = yield* encodeDocument(desired);

          const versions = yield* readVersions(PolicyArn);
          const inactive = Arr.filter(
            versions,
            (value) => !value.IsDefaultVersion,
          );

          yield* Arr.head(
            Arr.sortWith(inactive, (value) => value.CreateDate, Order.String),
          ).pipe(
            Effect.fromOption,
            Effect.flatMap(({ VersionId }) =>
              iam.deletePolicyVersion({ PolicyArn, VersionId }),
            ),
            Effect.when(Effect.succeed(versions.length >= 5)),
          );

          yield* iam.createPolicyVersion({
            PolicyArn,
            PolicyDocument,
            SetAsDefault: true,
          });
        },
      );

      const update = lifecycle.observedUpdate(
        (node, current) =>
          Effect.all({ desired: propsFor(node), previous: propsFor(current) }),
        Effect.fnUntraced(function* (observed, { previous, desired }) {
          const expected = yield* Schema.decodeEffect(awsJsonDocumentValue)(
            desired.PolicyDocument,
          );

          yield* publishDocument(observed.PolicyArn, expected).pipe(
            Effect.when(
              Effect.succeed(!sameDocument(observed.PolicyDocument, expected)),
            ),
          );

          const accepts = yield* reconcileAttachments(
            observed,
            previous,
            desired,
          );

          return (confirmed: typeof observed) =>
            sameDocument(confirmed.PolicyDocument, expected) &&
            accepts(confirmed);
        }),
      );

      /**
       * The remove operation clears the nondefault versions before it asks
       * IAM to delete the policy. If an external attachment remains, IAM can
       * reject the delete and the stack retains the policy record.
       */
      const remove = Effect.fn("ManagedPolicy.remove")(
        function* ({ PolicyArn }: typeof identity.Type) {
          const versions = yield* readVersions(PolicyArn);

          yield* Effect.forEach(
            Arr.filter(versions, (value) => !value.IsDefaultVersion),
            ({ VersionId }) =>
              iam
                .deletePolicyVersion({ PolicyArn, VersionId })
                .pipe(Effect.catchIf(missing, () => Effect.void)),
            { discard: true },
          );

          yield* iam.deletePolicy({ PolicyArn });
        },
        Effect.catchIf(missing, () => Effect.void),
      );

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: (command) => lifecycle.observe(command),
          Create: lifecycle.create(create, {
            checkpoint: observation,
            configure: (node, observed) =>
              propsFor(node).pipe(
                Effect.flatMap((desired) =>
                  reconcileAttachments(observed, emptyAttachments, desired),
                ),
              ),
          }),
          Update: lifecycle.update(update),
          Destroy: lifecycle.remove(remove, {
            cleanup: (observed, node) =>
              propsFor(node).pipe(
                Effect.flatMap((previous) =>
                  reconcileAttachments(observed, previous, emptyAttachments),
                ),
              ),
          }),
        }),
      );
    }),
  },
) {}
