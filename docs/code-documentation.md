# Code Documentation

Comments supply the nonlocal fact a reader needs when arriving at a declaration cold. They explain what real repository concern the declaration represents, why that concern reaches this code, and what other code, stored fact, or decision depends on it.

Every claim in a comment must come from an accepted design, an external contract, or established repository behavior. State that fact directly. Do not invent a reason from a symbol name, type, or local implementation.

Start with the actual thing. Words such as `policy`, `evaluation`, `request`, `state`, `result`, or `flow` are empty until the comment identifies their referent in the same sentence: a resource command, provider event, persisted record, or lifecycle decision.

Documentation on a schema explains why that schema is the contract at that point. Connect it to the command, durable record, or provider payload that supplies it and to the consumer or decision that requires the decoded value. Do not paraphrase its fields or type.

Documentation on a service, operation, or durable decision names the situation it handles and the consequence another part of Nomoss needs. Do not narrate internal steps, list fields, or explain framework mechanics.

Source material behind a comment is review evidence, not production code. Do not add source labels, research notes, requirement tags, or narration about finding a requirement beside a declaration.

A comment may state current or intended behavior only when the governing design establishes it. Name the behavior precisely and name the declaration's role in it. Do not document an assumption, proposed use, or guessed future consumer.

This comment establishes the provider contract and the consumer that needs it:

```ts
/**
 * S3 bucket notifications address the queue by ARN, while the queue policy
 * owns the permission that allows S3 to send those notifications. This schema
 * keeps that cross-resource contract explicit so the graph can order the
 * policy before the bucket notification is applied.
 */
export const BucketNotificationSchema = ...
```

This comment does not add context; it only paraphrases the declaration:

```ts
/**
 * Bucket notification inputs define the bucket, queue, and events.
 */
export const BucketNotificationSchema = ...
```
