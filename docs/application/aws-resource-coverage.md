# AWS provider resource coverage

Nomoss manages the IAM resources listed below through native AWS operations. The [declaration manifest](../../tools/awsServiceResources/sources/resources.json) also lists resources that applications can declare while their native lifecycle is still under development.

## IAM

Nomoss generates declarations for all 16 IAM types. The native integration suite verifies that a stack can create each type, read it from saved state, and remove it from AWS. The policy cases also verify changes to documents and principals.

| Resource type | Coverage |
| --- | --- |
| `AWS::IAM::Group` | The stack manages a group with a name and path. Separate declarations manage its inline policies and selected memberships. |
| `AWS::IAM::Role` | The stack creates a role with a trust policy and reads the trust document from IAM. |
| `AWS::IAM::User` | The stack manages a user with a name and path. Separate declarations manage its inline policies, access keys, and group memberships. |
| `AWS::IAM::GroupPolicy` | The stack applies an inline policy to one group and verifies its document. |
| `AWS::IAM::RolePolicy` | The stack applies an inline permissions policy to one role. The live STS case verifies that the source role is denied before the grant, can assume the target role after apply, and runs a signed request as the target session. |
| `AWS::IAM::UserPolicy` | The stack applies an inline policy to one user and verifies its document. |
| `AWS::IAM::AccessKey` | The stack issues a key for a declared user and confirms the requested inactive status. |
| `AWS::IAM::InstanceProfile` | The stack attaches a declared role after IAM creates the profile. Teardown removes that role from the profile before it deletes the profile. |
| `AWS::IAM::ManagedPolicy` | The stack confirms the default policy document and the attached principals. The live case changes both and continues to publish revisions after IAM reaches its five-version limit. |
| `AWS::IAM::OIDCProvider` | The stack verifies the issuer URL, client ID list, and thumbprints. |
| `AWS::IAM::Policy` | The stack manages inline copies on selected principals. The live cases confirm that a policy can move from a user to a group and a role, and that a conflicting create leaves the original document intact. |
| `AWS::IAM::SAMLProvider` | The stack creates a provider with SAML metadata and verifies its encryption mode. |
| `AWS::IAM::ServerCertificate` | The stack uploads a certificate and verifies the name and path in IAM's certificate metadata. |
| `AWS::IAM::ServiceLinkedRole` | The stack waits for IAM to confirm that its deletion task succeeded. |
| `AWS::IAM::UserToGroupAddition` | The stack verifies the selected users in their group and removes those memberships on teardown. |
| `AWS::IAM::VirtualMFADevice` | The stack manages an unassigned virtual MFA device. Enrollment requires authenticator codes and takes place separately. |
