import { loadAwsManagementDefinition } from "../management/resourceManagementModule.js";

/**
 * The awsManagementLoaders registry lets teardown find the AWS lifecycle
 * from the resource type in saved state after you remove its declaration.
 * Run `yarn generate:aws-management` after a change to a management export.
 */
export const awsManagementLoaders = {
  "iam:accesskey:create": loadAwsManagementDefinition(
    "iam:accesskey:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/operations/iam/accessKey.js"),
    (module) => module.AccessKeyManagement.make,
  ),

  "iam:group:create": loadAwsManagementDefinition(
    "iam:group:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/group.js"),
    (module) => module.makeGroupManagement,
  ),

  "iam:grouppolicy:create": loadAwsManagementDefinition(
    "iam:grouppolicy:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/inlinePolicies.js"),
    (module) => module.makeGroupPolicyManagement,
  ),

  "iam:instanceprofile:create": loadAwsManagementDefinition(
    "iam:instanceprofile:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/instanceProfile.js"),
    (module) => module.makeInstanceProfileManagement,
  ),

  "iam:managedpolicy:create": loadAwsManagementDefinition(
    "iam:managedpolicy:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/operations/iam/managedPolicy.js"),
    (module) => module.ManagedPolicyManagement.make,
  ),

  "iam:oidcprovider:create": loadAwsManagementDefinition(
    "iam:oidcprovider:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/oidcProvider.js"),
    (module) => module.makeOIDCProviderManagement,
  ),

  "iam:policy:create": loadAwsManagementDefinition(
    "iam:policy:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/operations/iam/policy.js"),
    (module) => module.PolicyManagement.make,
  ),

  "iam:role:create": loadAwsManagementDefinition(
    "iam:role:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/role.js"),
    (module) => module.makeRoleManagement,
  ),

  "iam:rolepolicy:create": loadAwsManagementDefinition(
    "iam:rolepolicy:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/inlinePolicies.js"),
    (module) => module.makeRolePolicyManagement,
  ),

  "iam:samlprovider:create": loadAwsManagementDefinition(
    "iam:samlprovider:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/samlProvider.js"),
    (module) => module.makeSAMLProviderManagement,
  ),

  "iam:servercertificate:create": loadAwsManagementDefinition(
    "iam:servercertificate:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/serverCertificate.js"),
    (module) => module.makeServerCertificateManagement,
  ),

  "iam:servicelinkedrole:create": loadAwsManagementDefinition(
    "iam:servicelinkedrole:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/operations/iam/serviceLinkedRole.js"),
    (module) => module.ServiceLinkedRoleManagement.make,
  ),

  "iam:user:create": loadAwsManagementDefinition(
    "iam:user:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/user.js"),
    (module) => module.makeUserManagement,
  ),

  "iam:userpolicy:create": loadAwsManagementDefinition(
    "iam:userpolicy:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/inlinePolicies.js"),
    (module) => module.makeUserPolicyManagement,
  ),

  "iam:usertogroupaddition:create": loadAwsManagementDefinition(
    "iam:usertogroupaddition:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/mappings/iam/userToGroupAddition.js"),
    (module) => module.makeUserToGroupAdditionManagement,
  ),

  "iam:virtualmfadevice:create": loadAwsManagementDefinition(
    "iam:virtualmfadevice:create",
    () =>
      // biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.
      import("../management/operations/iam/virtualMfaDevice.js"),
    (module) => module.VirtualMfaDeviceManagement.make,
  ),
};
