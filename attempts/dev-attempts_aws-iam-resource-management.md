# Native IAM resource management

## Tracker maintenance

Record delivered outcomes under Completed work. Give each open task a result and a way to verify it.

## Scope statement

Deliver native management for all 16 IAM resource types in the pinned [resource manifest](../tools/awsServiceResources/sources/resources.json). Use the full set to establish how contributors add resource management as Nomoss grows. Generate the selected SQS, API Gateway V2, and Lambda clients and declarations. Management in this tracker covers IAM only.

## Direction

Generate resource schemas from the CloudFormation Registry and typed client operations from Smithy. Select the IAM operations needed to manage the declared resources. Use declarative management definitions to select AWS operations, map properties, and define how Nomoss reads back changes. Write typed IAM code where AWS requires a workflow, such as publishing and activating a managed policy version.

Use the same association rules for group membership and managed policy attachments. Nomoss reads the current associations, adds the requested entries that AWS lacks, and removes entries only when the previous declaration named them. IAM definitions supply the association identities and AWS operations. Rules unique to an AWS resource stay with its definition.

## Completed work

- [x] The resource manifest selects all 16 IAM types. See [IAM coverage](../docs/application/aws-resource-coverage.md#iam).
- [x] Ran the [generator commands](../tools/awsServiceResources/README.md) for all four clients and 27 selected declarations. The generated files match the checkpoint.
- [x] Added Jaeger spans for source preparation, emission, validation, and publication. Excluded `warn-native-collections` from generated files and removed standard library loading from declaration emission.
- [x] Instance profiles and group memberships use the same association operations. The [instance profile mapping](../providers/aws/management/mappings/iam/instanceProfile.ts) configures one role slot on a resource that IAM creates. The [group membership mapping](../providers/aws/management/mappings/iam/userToGroupAddition.ts) manages memberships on an existing group and leaves the group in place on teardown.
- [x] The generated registry resolves the management exports for all 16 IAM types. Its lazy imports let a stack resolve management from saved state after the resource declaration is gone.
- [x] The native IAM suite verifies create, a provider read from saved state, and teardown for every selected type. The [coverage table](../docs/application/aws-resource-coverage.md#iam) identifies the resource behavior each case verifies.
- [x] The shared test runner accepts revisions of the same stack. The managed policy case verifies that IAM activates each document revision without a replacement, including a revision past the five-version limit. It also verifies that the policy moves from a user to a group and a role. The inline policy case verifies that the new principals receive the revised document and teardown can remove the original user after the old policy copy is gone.
- [x] The live conflict case verifies that a proposed inline policy fails if one of its principals already has that policy name. The original document remains in IAM and teardown confirms that the stack left no managed resources. The full suite passed 17 cases across the 16 IAM types.

### Generation performance

The declaration timings cover the same 27 resources. The baseline is the faster of two runs before the emission change. The new range covers three runs after the change. The IAM Biome baseline came from the generator's original run with the full preset.

| Work measured | Baseline | After |
| --- | ---: | ---: |
| IAM client Biome validation | 157 s | 1.69 s |
| TypeScript declaration emission | 5.06 s | 2.01–2.36 s |
| Full declaration generation | 9.38 s | 6.22–6.90 s |

The CPU profile attributed 2.8 seconds to TypeScript's import organizer. Declaration emission created a separate project for each resource, and those projects loaded standard library declarations they did not need. [Baseline declaration trace](http://127.0.0.1:16686/trace/f82472cf5045fa8a17a07f7f1dc950b4) · [New declaration trace](http://127.0.0.1:16686/trace/8e78826c72b42e84319c359a60e4c447) · [New IAM client trace](http://127.0.0.1:16686/trace/642c010c3bca09dde471bb779880088e).

## Tasks

- [ ] Extend property-level IAM coverage beyond the representative live cases. Use the [IAM Smithy model](../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json) and the Registry definitions to identify which changes require a separate operation or replacement. Start with changes to a role trust policy and enrollment for a virtual MFA device, which have different IAM prerequisites from the verified cases.
- [ ] Verify startup as the generated registry grows past IAM. Use a fixed stack to establish which resource definitions load from a catalog with hundreds of entries.
