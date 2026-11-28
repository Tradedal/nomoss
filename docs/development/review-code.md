# Code remediation checklist

## Prepare or commit the review batch

Read the active task before changing code. Choose one required result that a caller can observe. For a generator change, identify the source rule, the declaration it produces, and the caller that uses that declaration. Apply the checks below as soon as that operation is complete and correct it before extending the pattern to another resource.

Organize the batch around changes that must work together. Keep a changed interface with the callers migrated to it, because reviewing either part requires the other. Keep changed tests with the implementation they exercise.

Make batches easy to review and size them so review can advance without breaking related work into disconnected files or producing one large dump.

When the user has staged selected work, compare the index with HEAD and the working tree with the index. Inspect both versions of a partially staged file and check whether its imports require untracked files. Preserve the user's staging choices. When preparing a batch for integration, validate the proposed staged contents independently so that local files cannot conceal a missing dependency.

Keep the batch in the working tree until the user requests staging or a commit.

## Check for clamped code

Clamping means statements from different logical steps are stacked together without a blank line between them. Keep the statements for one step together. Insert a blank line where the next step begins. For example, keep the statements that recover a queue name from its URL together, then leave a blank line before collecting tags.

- [ ] Read every changed function and test for missing logical breaks after formatting. Apply the same check to generated code and fix missing breaks in the generator. When spacing is the issue, inserting the blank line completes the fix.

## Required behavior and public APIs

- [ ] Compare the completed implementation with the accepted requirements through the public API the application is supposed to use. Follow the call to the result its consumer receives. Restore missing behavior within the assignment. Report a conflict that needs a user decision before changing the required API or narrowing what counts as complete.

- [ ] Read the resource test beside the application declaration. Exercise the declaration form the application uses, since a property on a parent and a separate resource can have different lifecycles. Verify which provider values change and which state the stack preserves.

- [ ] Trace successful returns to the work they claim to complete. Replace placeholder results, unexecuted Effects, or successful defaults that skip required work with calls to the responsible production services. Verify the actual result and saved state; a method name or return type does not establish that the operation happened.

- [ ] Check whether callers must perform engine procedures after a cleanup or type repair. Keep registration, declaration isolation, preparation, and output resolution inside the engine where the accepted design assigns them. Fix the service composition if a caller must invoke an internal procedure to use the public API.

- [ ] Compare resource-specific branches with the general capability required by the assignment. Move behavior implemented only for an example into the responsible core service or generator. Verify that other supported resources use the same implementation. Keep examples as consumers of that capability.

- [ ] Resolve changed imports to their existing declarations. Stop the affected implementation when a declaration is missing and report the missing reference. Keep deleted symbols absent until the user supplies a reference or authorizes their implementation.

## Effect types and service composition

- [ ] Inspect changed Effect and Layer types for manual success, error, or dependency declarations, casts, and caller annotations that hide missing services. Remove those declarations and supply the dependency in the operation or Layer that needs it. Construct dependencies before their consumers and check that the producing operation infers its public types without any or unknown.

- [ ] Check unnamed exported types at the export that produces them. Expose a smaller service or domain value whose public contract the consumer can name, while preserving its required operation and inferred types. Remove handwritten reconstructions of Layer requirements or repeated type parameters used only to transport the service graph.

- [ ] Follow state written by an operation to the service its consumer reads. Ensure both use the same instance in the shared Layer graph. Replace consumer-local graphs, copied state, and captured contexts used to bypass dependency composition with the established service connections.

- [ ] Follow subscriptions, watchers, and other persistent streams through replacement and shutdown. Keep their fibers scoped, or retain and interrupt the active fiber before replacement. Correct work that survives its owning scope or continues under an old identity; remove daemon forks used for that work.

## Operations and generated contracts

- [ ] Read each changed service method with its callbacks and callers. Keep validation, decisions, dependency calls, and the completed result together. Put reusable domain work in public service methods. Ensure the constructor returns its public API explicitly and each method returns a named final value with an explicit domain type.

- [ ] Inspect lint fixes for deeply nested callbacks, unrelated inputs collected into an object, or helpers added only to silence a diagnostic. Rewrite the affected operation through readable native Effect composition. Preserve execution order and keep local parsing and decisions beside the work that uses them.

- [ ] Read each changed operation and its generated result from top to bottom. Give a condition a name that states the resource rule, then keep the value or failure it selects beside it. Use a local name when a nested expression makes the reader reconstruct a schema or request before they can see what it does.

- [ ] Read each rejection condition as a rule a caller must satisfy. For example, a configured value prefix requires a string property with a relationship at that exact path. Express the conditions in those terms and keep the typed failure beside the decision. Check that a reader can identify invalid input without reversing several nested tests.

- [ ] Trace how the runtime finds each resource's management definition. A new type that uses an existing lifecycle must leave provider Layer composition unchanged. Check that the stack loads definitions by type and can manage a resource it knows only from saved state. Use the [resource management development guide](effect-native-development.md#develop-resource-management) to assess the design at catalog scale.

- [ ] Read the generator beside one emitted module. Check the source comment where the generator makes a domain decision and the emitted documentation where the application author uses the result. For a generated import, follow the imported symbol to the expression that needs it and document the reason for that dependency beside the owning block. Cite the checked-in library guide or API that supports the operation. Apply the [code documentation requirements](code-documentation.md) to both files.

- [ ] Check validation against the canonical schema for the domain. Replace copied contracts and local validators that make a business decision with that schema and the responsible service operation. Preserve the typed failures promised to callers instead of hiding them through fallback values.

- [ ] Review generator changes with the contracts their consumers import. Make corrections in the generator and reproduce its output through TypeScript AST operations and Effect schema compilation. Remove hand-edited generated contracts and source templates. For AWS operations, verify the generated Smithy contract is executed by the internal client under the [AWS resource contract](../application/aws-resource-lifecycle-management.md).

## Evidence and completion

- [ ] For each resource management case, identify the requirement, the action taken through the public stack API, and the observation that would distinguish correct behavior from a regression. Apply the [resource test structure](testing.md#structure-resource-management-tests) before accepting the case. Move declaration details out of the workflow and remove assertions that only confirm fixture inputs. A new case must cover a specific outcome the existing cases leave open.

- [ ] Follow each behavior test through the production operation. Use the shared fixture and real consumer so the test exercises that operation. Keep the provider responses the fixture needs. Verify the results the consumer receives after a write or a retry when the requirement covers those outcomes.

- [ ] Compare changed assertions, snapshots, and examples with the accepted behavior before accepting them. Correct evidence that merely follows the new implementation or uses an available internal API in place of the required public API. Add coverage only for a specific behavior gap under the [testing contract](testing.md).

- [ ] Run scoped Biome lint, the project Effect and TypeScript check, and the smallest relevant behavior suites under the [linting workflow](linting.md). Confirm that the checks processed the completed changes. Retain valid results for unchanged work, repeat checks after relevant repairs, and report failures outside the batch without expanding the assignment.

- [ ] Review changed comments and documentation through the writing checks in [review-docs.md](review-docs.md#meaning-and-requirements).
