import { assert } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Match, Option, Path } from "effect";
import { ChildProcess } from "effect/process";
import { AWSAccessKey } from "nomoss/providers/aws/iam/accesskey";
import { AWSGroup } from "nomoss/providers/aws/iam/group";
import { AWSGroupPolicy } from "nomoss/providers/aws/iam/grouppolicy";
import { AWSInstanceProfile } from "nomoss/providers/aws/iam/instanceprofile";
import { AWSManagedPolicy } from "nomoss/providers/aws/iam/managedpolicy";
import { AWSOIDCProvider } from "nomoss/providers/aws/iam/oidcprovider";
import { AWSPolicy } from "nomoss/providers/aws/iam/policy";
import { AWSRole } from "nomoss/providers/aws/iam/role";
import { AWSRolePolicy } from "nomoss/providers/aws/iam/rolepolicy";
import { AWSSAMLProvider } from "nomoss/providers/aws/iam/samlprovider";
import { AWSServerCertificate } from "nomoss/providers/aws/iam/servercertificate";
import { AWSServiceLinkedRole } from "nomoss/providers/aws/iam/servicelinkedrole";
import { AWSUser } from "nomoss/providers/aws/iam/user";
import { AWSUserPolicy } from "nomoss/providers/aws/iam/userpolicy";
import { AWSUserToGroupAddition } from "nomoss/providers/aws/iam/usertogroupaddition";
import { AWSVirtualMFADevice } from "nomoss/providers/aws/iam/virtualmfadevice";
import { ResourceGraphStore } from "../../../../src/core/resource/resourceGraphStore.js";

const logicalId = "Resource";
const path = "/nomoss-integration/";

const document = {
  Version: "2012-10-17",
  Statement: [{ Effect: "Deny", Action: "s3:ListAllMyBuckets", Resource: "*" }],
};

const trust = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: { Service: "ec2.amazonaws.com" },
      Action: "sts:AssumeRole",
    },
  ],
};

const certificate = Effect.fn("IAM integration certificate")(function* () {
  const fs = yield* FileSystem.FileSystem;
  const paths = yield* Path.Path;

  const directory = yield* fs.makeTempDirectoryScoped();

  const keyFile = paths.join(directory, "key.pem");
  const certFile = paths.join(directory, "cert.pem");

  const process = yield* ChildProcess.make(
    "openssl",
    [
      "req",
      "-x509",
      "-newkey",
      "rsa:2048",
      "-nodes",
      "-days",
      "2",
      "-subj",
      "/CN=nomoss-integration.example.com",
      "-keyout",
      keyFile,
      "-out",
      certFile,
    ],
    { stderr: "ignore" },
  );

  assert.strictEqual(
    yield* process.exitCode,
    0,
    "Generate an IAM test certificate",
  );

  return yield* Effect.all({
    CertificateBody: fs.readFileString(certFile),
    PrivateKey: fs.readFileString(keyFile),
  });
}, Effect.scoped);

const policyDocument = (revision: number) => ({
  Version: document.Version,
  Statement: [
    {
      Sid: `Revision${revision}`,
      Effect: "Deny",
      Action: "s3:ListAllMyBuckets",
      Resource: "*",
    },
  ],
});

const policyPrincipals = Effect.fn("IAM integration policy principals")(
  function* (name: string) {
    const user = yield* AWSUser({
      logicalId: "User",
      props: { UserName: name, Path: path },
    });

    const group = yield* AWSGroup({
      logicalId: "Group",
      props: { GroupName: name, Path: path },
    });

    const role = yield* AWSRole({
      logicalId: "Role",
      props: { RoleName: name, Path: path, AssumeRolePolicyDocument: trust },
    });

    return { user, group, role };
  },
);

/**
 * The managedPolicyPhase fixture applies several revisions to one policy.
 * An application must still be able to change its active document after
 * IAM reaches its five-version limit.
 */
const managedPolicyPhase = (name: string, revision: number) => {
  const PolicyDocument = policyDocument(revision);

  const expected = Match.value(revision === 0).pipe(
    Match.when(true, () => ({ Groups: [], Roles: [], Users: [name] })),
    Match.orElse(() => ({ Groups: [name], Roles: [name], Users: [] })),
  );

  return {
    declaration: Effect.gen(function* () {
      const { user, group, role } = yield* policyPrincipals(name);

      const attachments = Match.value(revision === 0).pipe(
        Match.when(true, () => ({ Users: [user] })),
        Match.orElse(() => ({ Groups: [group], Roles: [role] })),
      );

      yield* AWSManagedPolicy({
        logicalId,
        props: {
          ManagedPolicyName: name,
          Path: path,
          PolicyDocument,
          ...attachments,
        },
      });
    }),
    expected: {
      ManagedPolicyName: name,
      Path: path,
      PolicyDocument,
      ...expected,
    },
  };
};

/**
 * The inlinePolicyPhase fixture moves an inline policy from a user to
 * a group and a role while the user remains in the stack. A stale copy
 * would leave the user subject to permissions the declaration removed.
 */
const inlinePolicyPhase = (name: string, revision: number) => {
  const PolicyDocument = policyDocument(revision);

  const targets = Match.value(revision === 0).pipe(
    Match.when(true, () => ({ Groups: [], Roles: [], Users: [name] })),
    Match.orElse(() => ({ Groups: [name], Roles: [name], Users: [] })),
  );

  return {
    declaration: Effect.gen(function* () {
      const graph = yield* ResourceGraphStore;

      const { user, group, role } = yield* policyPrincipals(name);

      const policy = yield* AWSPolicy({
        logicalId,
        props: { PolicyName: name, PolicyDocument, ...targets },
      });

      yield* Effect.forEach(
        [user.key, group.key, role.key],
        (key) =>
          graph.addDependency(key, policy.key, {
            kind: "prerequisite",
            reason: "IAM inline policies require their target principals",
          }),
        { discard: true },
      );
    }),
    expected: { PolicyName: name, PolicyDocument, ...targets },
  };
};

/**
 * The inlinePolicyConflictPhase fixture puts a policy on the user before a
 * second declaration requests that policy name for both the user and group.
 * The stack must reject the request and preserve the user's original document.
 */
const inlinePolicyConflictPhase = (name: string, conflict: boolean) => {
  const declaration = Effect.gen(function* () {
    const graph = yield* ResourceGraphStore;

    const { user, group } = yield* policyPrincipals(name);

    const existing = yield* AWSUserPolicy({
      logicalId,
      props: { UserName: user, PolicyName: name, PolicyDocument: document },
    });

    yield* AWSPolicy({
      logicalId: "Conflict",
      props: {
        PolicyName: name,
        PolicyDocument: policyDocument(1),
        Groups: [name],
        Users: [name],
      },
    }).pipe(
      Effect.flatMap((proposed) =>
        Effect.forEach(
          [existing.key, group.key],
          (key) =>
            graph.addDependency(key, proposed.key, {
              kind: "prerequisite",
              reason:
                "The proposed policy targets a group and a user with an existing policy",
            }),
          { discard: true },
        ),
      ),
      Effect.when(Effect.succeed(conflict)),
    );
  });

  return {
    declaration,
    expected: { UserName: name, PolicyName: name, PolicyDocument: document },
    rejection: Option.liftPredicate(Boolean)(conflict).pipe(
      Option.map(() => `Inline policy "${name}" already exists`),
      Option.getOrUndefined,
    ),
  };
};

/**
 * The iamResourceLifecycleCases table gives each IAM type a provider value
 * to verify after apply. Cases declare their own prerequisites to exercise
 * attachment and deletion without modifying existing IAM users or roles.
 *
 * @see ../../../../refs/effect/packages/vitest/src/index.ts (Tester.each)
 */
const cases = [
  {
    resource: "IAM User",
    configure: (name: string) => {
      const props = { UserName: name, Path: path };

      return { declaration: AWSUser({ logicalId, props }), expected: props };
    },
  },
  {
    resource: "IAM Group",
    configure: (name: string) => {
      const props = { GroupName: name, Path: path };

      return { declaration: AWSGroup({ logicalId, props }), expected: props };
    },
  },
  {
    resource: "IAM Role",
    configure: (name: string) => {
      const props = {
        RoleName: name,
        Path: path,
        AssumeRolePolicyDocument: trust,
      };

      return { declaration: AWSRole({ logicalId, props }), expected: props };
    },
  },
  {
    resource: "IAM AccessKey",
    configure: (name: string) => {
      const props = { UserName: name, Status: "Inactive" };

      return {
        declaration: Effect.gen(function* () {
          const graph = yield* ResourceGraphStore;

          const user = yield* AWSUser({
            logicalId: "User",
            props: { UserName: name, Path: path },
          });

          const key = yield* AWSAccessKey({ logicalId, props });

          yield* graph.addDependency(user.key, key.key, {
            kind: "prerequisite",
            reason: "IAM access keys are issued to an existing user",
          });
        }),
        expected: props,
      };
    },
  },
  {
    resource: "IAM GroupPolicy",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const group = yield* AWSGroup({
          logicalId: "Group",
          props: { GroupName: name, Path: path },
        });

        yield* AWSGroupPolicy({
          logicalId,
          props: {
            GroupName: group,
            PolicyName: name,
            PolicyDocument: document,
          },
        });
      }),
      expected: { GroupName: name, PolicyName: name, PolicyDocument: document },
    }),
  },
  {
    resource: "IAM RolePolicy",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const role = yield* AWSRole({
          logicalId: "Role",
          props: {
            RoleName: name,
            Path: path,
            AssumeRolePolicyDocument: trust,
          },
        });

        yield* AWSRolePolicy({
          logicalId,
          props: { RoleName: role, PolicyName: name, PolicyDocument: document },
        });
      }),
      expected: { RoleName: name, PolicyName: name, PolicyDocument: document },
    }),
  },
  {
    resource: "IAM UserPolicy",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const user = yield* AWSUser({
          logicalId: "User",
          props: { UserName: name, Path: path },
        });

        yield* AWSUserPolicy({
          logicalId,
          props: { UserName: user, PolicyName: name, PolicyDocument: document },
        });
      }),
      expected: { UserName: name, PolicyName: name, PolicyDocument: document },
    }),
  },
  {
    resource: "IAM InstanceProfile",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const role = yield* AWSRole({
          logicalId: "Role",
          props: {
            RoleName: name,
            Path: path,
            AssumeRolePolicyDocument: trust,
          },
        });

        yield* AWSInstanceProfile({
          logicalId,
          props: { InstanceProfileName: name, Path: path, Roles: [role] },
        });
      }),
      expected: { InstanceProfileName: name, Path: path, Roles: [name] },
    }),
  },
  {
    resource: "IAM ManagedPolicy",
    outcome: "revises policy past IAM's version limit",
    configure: (name: string) => managedPolicyPhase(name, 0),
    updates: (name: string) =>
      Arr.map(Arr.range(1, 5), (revision) =>
        managedPolicyPhase(name, revision),
      ),
  },
  {
    resource: "IAM Policy",
    outcome: "moves the policy to a group and role",
    configure: (name: string) => inlinePolicyPhase(name, 0),
    updates: (name: string) => [inlinePolicyPhase(name, 1)],
  },
  {
    resource: "IAM Policy",
    outcome: "rejects a duplicate and keeps the policy",
    configure: (name: string) => inlinePolicyConflictPhase(name, false),
    updates: (name: string) => [inlinePolicyConflictPhase(name, true)],
  },
  {
    resource: "IAM OIDCProvider",
    configure: (name: string) => {
      const props = {
        Url: `https://example.com/${name}`,
        ClientIdList: [name],
        ThumbprintList: ["0000000000000000000000000000000000000000"],
      };

      return {
        declaration: AWSOIDCProvider({ logicalId, props }),
        expected: props,
      };
    },
  },
  {
    resource: "IAM SAMLProvider",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const { CertificateBody } = yield* certificate();

        const signingCertificate = CertificateBody.replaceAll(
          /-----[^\n]+-----|\s+/g,
          "",
        );

        const SamlMetadataDocument = `<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" entityID="https://example.com/${name}"><IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><KeyDescriptor use="signing"><KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#"><X509Data><X509Certificate>${signingCertificate}</X509Certificate></X509Data></KeyInfo></KeyDescriptor><SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://example.com/${name}/sso"/></IDPSSODescriptor></EntityDescriptor>`;

        yield* AWSSAMLProvider({
          logicalId,
          props: {
            Name: name,
            SamlMetadataDocument,
            AssertionEncryptionMode: "Allowed",
          },
        });
      }),
      expected: { AssertionEncryptionMode: "Allowed" },
    }),
  },
  {
    resource: "IAM ServerCertificate",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const material = yield* certificate();

        yield* AWSServerCertificate({
          logicalId,
          props: { ...material, ServerCertificateName: name, Path: path },
        });
      }),
      expected: { ServerCertificateName: name, Path: path },
    }),
  },
  {
    resource: "IAM ServiceLinkedRole",
    configure: (name: string) => {
      const props = {
        AWSServiceName: "autoscaling.amazonaws.com",
        CustomSuffix: name.substring(name.length - 24),
        Description: name,
      };

      return {
        declaration: AWSServiceLinkedRole({ logicalId, props }),
        expected: { Description: name },
      };
    },
  },
  {
    resource: "IAM UserToGroupAddition",
    configure: (name: string) => ({
      declaration: Effect.gen(function* () {
        const group = yield* AWSGroup({
          logicalId: "Group",
          props: { GroupName: name, Path: path },
        });

        const user = yield* AWSUser({
          logicalId: "User",
          props: { UserName: name, Path: path },
        });

        yield* AWSUserToGroupAddition({
          logicalId,
          props: { GroupName: group, Users: [user] },
        });
      }),
      expected: { GroupName: name, Users: [name] },
    }),
  },
  {
    resource: "IAM VirtualMFADevice",
    configure: (name: string) => {
      const props = { VirtualMfaDeviceName: name, Path: path, Users: [] };

      return {
        declaration: AWSVirtualMFADevice({ logicalId, props }),
        expected: props,
      };
    },
  },
];

export const iamResourceLifecycleCases = Arr.map(cases, (entry) => ({
  ...entry,
  outcome: entry.outcome ?? "reads and removes the saved resource",
}));
