# Document code for its consumers

A comment must explain what the documented entity lets its consumer do and which conditions affect that behavior. Support every claim with a requirement, contract, or the complete operation and its consumers. Do not compress the explanation into noun chains, gerund phrases, contextless introductions, or slogans.

The first sentence must name the entity and identify its kind, such as a function, helper, class, service, or service method. For example, write "the Indexer property helper" or "the compileSchemas service method." A bare identifier followed by a verb does not tell the reader what kind of entity the comment documents.

An inline comment must identify the domain entity or operation implemented by its block. Name the relevant schema module, client constructor, or other entity and explain the behavior or constraint its consumer relies on. Place this explanation beside each large body within a method so the reader can understand its purpose at that location.

A comment must add a supported contract, condition, failure, or consequence that the declaration and adjacent statements do not explain. Do not narrate code content or implementation stages.

Write relationships in complete sentences with articles, verbs, and prepositions. Unpack phrases such as "provider field access" into ordinary English that says which field a helper reads and why its name needs quotes.

## Explain the decisions that schemas validate

Give every regular expression its own named declaration beside the code that uses it. Document what the pattern matches, why the caller needs that distinction, and examples of matching and nonmatching input. For a search or replacement, show what happens to the example text. Apply the same rule to expressions emitted by generators so readers of the generated code can understand them at their declaration.

For a schema, explain what the application decides from a value and why its validation matters to that decision. The declaration already shows the fields and their types, so a field catalogue adds no explanation.

An output reference lets one resource depend on a provider value that another resource has not yet produced. Explain how the reference expresses that dependency and why the eventual value needs validation. The schema already shows how the reference is represented.

## Explain how callers use public methods

Every public method gets documentation that explains what a caller can accomplish and how to interpret its result. Exported functions and helpers have the same requirement. Generated APIs must receive documentation through their generator so their consumers get the same explanation.

Input requirements and failures describe conditions that affect the call. Lifecycle constraints explain cancellation, refreshed credentials, or recovery after interruption when those affect the caller.

Review every complete comment with the humanizer skill and the [writing guidance](unslop.md). Replace noun chains and gerund phrases with sentences that identify who acts and what happens. Remove repeated facts and unsupported claims, and check that the sentences develop one related explanation.

## Rewrite comments around the documented capability

During remediation, read each comment with its declaration, complete operation, and consumers. Rewrite the complete comment if it opens with a validation scenario, a contextless statement, a bare identifier, or narration followed by parameter details. The replacement must identify the documented entity and explain what its consumer can accomplish.

The following comment makes a validation scenario its subject and leaves the invocation method implicit. Its factual accuracy does not satisfy the requirement to identify the documented method and explain its capability:

```ts
/**
 * Stripe requests can pass input validation with values that
 * violate a parameter's constraints when a body field has the
 * same name. A caller cannot supply different values for those
 * two request locations through the current invocation contract.
 */
```

Replace the complete comment. A renamed subject or a different sentence order would retain the same explanation of a validation scenario.

The replacement identifies the method and explains the capability:

```ts
/**
 * The invoke service method binds a Stripe operation to its request and response
 * schemas so generated clients can validate caller input and decode Stripe
 * responses.
 */
```
