import { AwsServiceError } from "@tradedal/aws-client-core/model";
import { makeIAMClient } from "@tradedal/aws-client-iam";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Exit,
  Match,
  Option,
  Schema,
} from "effect";
import {
  AWSPolicyOutputsSchema,
  AWSPolicyRequestSchema,
  AWSPolicyResourceSchema,
} from "nomoss/providers/aws/iam/policy";
import {
  ResourceModel,
  type ResourceNode,
} from "../../../../../src/core/resource/model.js";
import { ResourceLifecycle } from "../../../../../src/core/resource/resourceLifecycle.js";
import { iamLifecycleSettings } from "../../mappings/iam/iamLifecycleSettings.js";
import { AwsResourceMapping } from "../../resourceMapping.js";
import {
  awsJsonDocument,
  awsJsonDocumentValue,
} from "../../resourceOperation.js";

const identity = Schema.Struct({
  Id: Schema.requiredKey(AWSPolicyOutputsSchema.fields.Id),
});

const principal = Schema.Struct({
  kind: Schema.Literals(["Groups", "Roles", "Users"]),
  name: Schema.String,
});
type Principal = typeof principal.Type;

const inlinePolicy = Schema.Struct({
  principal,
  document: Schema.JsonObject,
});

const observation = Schema.Struct({
  ...identity.fields,
  PolicyName: AWSPolicyRequestSchema.fields.PolicyName,
  copies: Schema.Array(inlinePolicy),
});
type InlinePolicyObservation = typeof observation.Type;

class InlinePolicyConflict extends Data.TaggedError("InlinePolicyConflict")<{
  readonly policyName: string;
  readonly principal: Principal;
}> {
  override get message() {
    return `Inline policy "${this.policyName}" already exists on ${this.principal.kind} "${this.principal.name}".`;
  }
}

class InlinePolicyPrincipalRequired extends Data.TaggedError(
  "InlinePolicyPrincipalRequired",
)<{
  readonly policyName: string;
}> {
  override get message() {
    return `Inline policy "${this.policyName}" requires a group, role, or user.`;
  }
}

const missing = AwsServiceError.hasCode("NoSuchEntity");
const samePrincipal = Schema.toEquivalence(principal);

const sameDocument = Schema.toEquivalence(Schema.JsonObject);
const encodeDocument = Schema.encodeEffect(
  Schema.fromJsonString(Schema.JsonObject),
);

const principalNames = (names: ReadonlyArray<string> | undefined) =>
  Option.fromUndefinedOr(names).pipe(Option.toArray, Arr.flatten, Arr.dedupe);

/**
 * The PolicyManagement service manages copies of one inline document on
 * IAM groups, roles, and users. IAM gives each copy the name of the policy
 * and its principal. The stack has one stable ID for the entire declaration.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetGroupPolicy, GetRolePolicy, and GetUserPolicy)
 */
export class PolicyManagement extends Context.Service<PolicyManagement>()(
  "nomoss/providers/aws/management/operations/iam/policy/PolicyManagement",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;
      const names = yield* AwsResourceMapping;

      const iam = yield* makeIAMClient;

      yield* model.registerOutputsSchema(
        AWSPolicyResourceSchema,
        AWSPolicyOutputsSchema,
      );

      /**
       * The prepare operation requires at least one principal. IAM has no
       * inline policy to read or delete until the declaration names a group,
       * role, or user.
       */
      const prepare = Effect.fn("Policy.prepare")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, AWSPolicyRequestSchema);

        const principals: ReadonlyArray<Principal> = [
          ...Arr.map(
            principalNames(props.Groups),
            (name): Principal => ({ kind: "Groups", name }),
          ),
          ...Arr.map(
            principalNames(props.Roles),
            (name): Principal => ({ kind: "Roles", name }),
          ),
          ...Arr.map(
            principalNames(props.Users),
            (name): Principal => ({ kind: "Users", name }),
          ),
        ];

        yield* new InlinePolicyPrincipalRequired({
          policyName: props.PolicyName,
        }).pipe(
          Effect.when(Effect.succeed(Arr.isReadonlyArrayEmpty(principals))),
        );

        const document = yield* Schema.decodeEffect(awsJsonDocumentValue)(
          props.PolicyDocument,
        );

        return { PolicyName: props.PolicyName, principals, document };
      });

      /**
       * The readCopy operation checks one principal and policy name. IAM's
       * absence error can mean either the policy or the principal is gone.
       * An authorization error leaves the copy's presence unknown.
       */
      const readCopy = Effect.fn("Policy.readCopy")(
        (PolicyName: string, target: Principal) =>
          Match.value(target.kind).pipe(
            Match.when("Groups", () =>
              iam.getGroupPolicy({ GroupName: target.name, PolicyName }),
            ),
            Match.when("Roles", () =>
              iam.getRolePolicy({ RoleName: target.name, PolicyName }),
            ),
            Match.when("Users", () =>
              iam.getUserPolicy({ UserName: target.name, PolicyName }),
            ),
            Match.exhaustive,
            Effect.flatMap((reply) =>
              Schema.decodeEffect(awsJsonDocument)(reply.PolicyDocument),
            ),
            Effect.map((document) =>
              Option.some({ principal: target, document }),
            ),
            Effect.catchIf(missing, () => Effect.succeedNone),
          ),
      );

      const putCopy = (
        PolicyName: string,
        PolicyDocument: string,
        target: Principal,
      ) =>
        Match.value(target.kind).pipe(
          Match.when("Groups", () =>
            iam.putGroupPolicy({
              GroupName: target.name,
              PolicyName,
              PolicyDocument,
            }),
          ),
          Match.when("Roles", () =>
            iam.putRolePolicy({
              RoleName: target.name,
              PolicyName,
              PolicyDocument,
            }),
          ),
          Match.when("Users", () =>
            iam.putUserPolicy({
              UserName: target.name,
              PolicyName,
              PolicyDocument,
            }),
          ),
          Match.exhaustive,
        );

      const removeCopy = (PolicyName: string, target: Principal) =>
        Match.value(target.kind).pipe(
          Match.when("Groups", () =>
            iam.deleteGroupPolicy({ GroupName: target.name, PolicyName }),
          ),
          Match.when("Roles", () =>
            iam.deleteRolePolicy({ RoleName: target.name, PolicyName }),
          ),
          Match.when("Users", () =>
            iam.deleteUserPolicy({ UserName: target.name, PolicyName }),
          ),
          Match.exhaustive,
          Effect.catchIf(missing, () => Effect.void),
        );

      /**
       * The readCopies operation reports the documents on the selected
       * principals. A successful read on one principal says nothing about
       * the others, even when they use the same policy name.
       */
      const readCopies = Effect.fn("Policy.readCopies")(
        (PolicyName: string, principals: ReadonlyArray<Principal>) =>
          Effect.forEach(principals, (target) =>
            readCopy(PolicyName, target),
          ).pipe(Effect.map(Arr.getSomes)),
      );

      /**
       * The lookup operation checks the principals from the declaration
       * for the current command. After an update, that declaration can
       * name a different set of principals under the same saved stack ID.
       */
      const lookup = Effect.fn("Policy.lookup")(function* (
        { Id }: typeof identity.Type,
        node: ResourceNode,
      ) {
        const { PolicyName, principals } = yield* prepare(node);

        const copies = yield* readCopies(PolicyName, principals);

        return Option.liftPredicate(Arr.isReadonlyArrayNonEmpty)(copies).pipe(
          Option.map(
            (): InlinePolicyObservation => ({ Id, PolicyName, copies }),
          ),
        );
      });

      const lifecycle = yield* ResourceLifecycle.make(
        { identity, lookup },
        iamLifecycleSettings.timeout,
      );

      const confirms = (
        observed: InlinePolicyObservation,
        desired: Effect.Success<ReturnType<typeof prepare>>,
      ) =>
        Arr.every(desired.principals, (target) =>
          Arr.some(
            observed.copies,
            (copy) =>
              samePrincipal(target, copy.principal) &&
              sameDocument(copy.document, desired.document),
          ),
        );

      /**
       * The requireAbsent operation checks every new address before the
       * stack writes any copy. IAM's Put operations would otherwise replace
       * a document already present at that principal and policy name.
       */
      const requireAbsent = Effect.fn("Policy.requireAbsent")(function* (
        PolicyName: string,
        targets: ReadonlyArray<Principal>,
      ) {
        const existing = yield* readCopies(PolicyName, targets);

        yield* Arr.head(existing).pipe(
          Option.map(({ principal }) =>
            Effect.fail(
              new InlinePolicyConflict({ policyName: PolicyName, principal }),
            ),
          ),
          Effect.transposeOption,
        );
      });

      /**
       * The addCopies operation registers cleanup for each new copy. Call it
       * after the target addresses pass the conflict check. During an update,
       * keep the scope open until the stack confirms the new configuration.
       * If confirmation fails, the saved declaration still describes the
       * old addresses and cannot locate the new copies for cleanup.
       *
       * @see ../../../../../refs/effect/packages/effect/src/Effect.ts (acquireRelease and scoped)
       */
      const addCopies = Effect.fn("Policy.addCopies")(function* (
        PolicyName: string,
        PolicyDocument: string,
        added: ReadonlyArray<Principal>,
      ) {
        yield* Effect.forEach(
          added,
          (target) =>
            Effect.acquireRelease(
              putCopy(PolicyName, PolicyDocument, target),
              (_, exit) =>
                removeCopy(PolicyName, target).pipe(
                  Effect.when(Effect.succeed(Exit.isFailure(exit))),
                  Effect.orDie,
                ),
            ),
          { discard: true },
        );
      });

      /**
       * The create operation rejects a collision on any selected principal
       * before it writes the first copy. Its checkpoint lets an apply resume
       * confirmation of the copies it already submitted.
       */
      const create = Effect.fn("Policy.create")(function* (node: ResourceNode) {
        const desired = yield* prepare(node);

        const Id = yield* names.resolveName(node, undefined, 128);

        const encoded = yield* encodeDocument(desired.document);

        yield* requireAbsent(desired.PolicyName, desired.principals);

        yield* addCopies(desired.PolicyName, encoded, desired.principals).pipe(
          Effect.scoped,
        );

        return {
          Id,
          PolicyName: desired.PolicyName,
          copies: Arr.map(desired.principals, (principal) => ({
            principal,
            document: desired.document,
          })),
        };
      });

      /**
       * The update operation writes the requested document to the selected
       * principals and verifies that retired copies are gone. A policy rename
       * uses new addresses, so it checks every destination for a collision.
       */
      const update = Effect.fn("Policy.update")(function* (
        node: ResourceNode,
        current: ResourceNode,
      ) {
        const desired = yield* prepare(node);
        const previous = yield* prepare(current);

        const sameName = previous.PolicyName === desired.PolicyName;
        const retained = Arr.filter(
          desired.principals,
          (target) =>
            sameName &&
            Arr.some(previous.principals, (prior) =>
              samePrincipal(prior, target),
            ),
        );

        const added = Arr.filter(
          desired.principals,
          (target) =>
            !Arr.some(retained, (prior) => samePrincipal(prior, target)),
        );

        const retired = Arr.filter(
          previous.principals,
          (target) =>
            !Arr.some(retained, (next) => samePrincipal(target, next)),
        );

        const encoded = yield* encodeDocument(desired.document);

        yield* requireAbsent(desired.PolicyName, added);

        yield* Effect.forEach(
          retained,
          (target) => putCopy(desired.PolicyName, encoded, target),
          { discard: true },
        );
        yield* addCopies(desired.PolicyName, encoded, added);

        yield* Effect.forEach(
          retired,
          (target) => removeCopy(previous.PolicyName, target),
          { discard: true },
        );

        return (observed: InlinePolicyObservation) =>
          readCopies(previous.PolicyName, retired).pipe(
            Effect.map(
              (copies) =>
                Arr.isReadonlyArrayEmpty(copies) && confirms(observed, desired),
            ),
          );
      });

      /**
       * The remove operation deletes copies from the saved declaration only.
       * An inline policy with the same name on another principal remains in IAM.
       */
      const remove = Effect.fn("Policy.remove")(function* (
        _saved: typeof identity.Type,
        node: ResourceNode,
      ) {
        const { PolicyName, principals } = yield* prepare(node);

        yield* Effect.forEach(
          principals,
          (target) => removeCopy(PolicyName, target),
          { discard: true },
        );
      });

      /**
       * The project function reports the principals IAM still returns. It
       * exposes one common PolicyDocument only if every observed copy agrees.
       * The copies also expose a difference that affects only one principal.
       */
      const project = (observed: InlinePolicyObservation) => {
        const first = Arr.head(observed.copies);
        const common = Option.filter(first, ({ document }) =>
          Arr.every(observed.copies, (copy) =>
            sameDocument(copy.document, document),
          ),
        );

        const namesFor = (kind: Principal["kind"]) =>
          Arr.map(
            Arr.filter(observed.copies, (copy) => copy.principal.kind === kind),
            (copy) => copy.principal.name,
          );

        return {
          ...observed,
          ...Option.match(common, {
            onNone: () => ({}),
            onSome: ({ document }) => ({ PolicyDocument: document }),
          }),
          Groups: namesFor("Groups"),
          Roles: namesFor("Roles"),
          Users: namesFor("Users"),
        };
      };

      const confirmUpdate = lifecycle.update(update);

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: (command) =>
            lifecycle.observe(command, (outputs) =>
              Effect.succeed(project(outputs)),
            ),
          Create: lifecycle.create(create, {
            checkpoint: observation,
            matches: (created, observed) =>
              Arr.every(created.copies, (desired) =>
                Arr.some(
                  observed.copies,
                  (copy) =>
                    samePrincipal(copy.principal, desired.principal) &&
                    sameDocument(copy.document, desired.document),
                ),
              ),
          }),
          Update: (command) => confirmUpdate(command).pipe(Effect.scoped),
          Destroy: lifecycle.remove(remove),
        }),
      );
    }),
  },
) {}
