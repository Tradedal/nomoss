# Resource mapping

An application can declare a Stripe product and its price before either exists in Stripe. The Product declaration returns a typed resource entity. The application passes that entity to the Price declaration, and Nomoss supplies the product's assigned ID when it creates the price.

A resource mapping identifies the entities a property accepts and the provider values each entity supplies. It also specifies how a later run identifies the object to read or change. The same contract applies to provider resources and to local resources such as BillingConfigurationExport, which writes application configuration to a file.

## Declare related resources before they exist

Inside an application declaration, the StripeResources service supplies the resource functions used below. The product variable identifies the declared Product even though its Stripe ID is still unavailable.

```ts
const stripe = yield* StripeResources;
const product = yield* stripe.Product({
  logicalId: "Product",
  props: { name: "Membership" },
});

const price = yield* stripe.Price({
  logicalId: "MonthlyPrice",
  props: {
    product,
    currency: "usd",
    unit_amount: 2900,
    recurring: { interval: "month" },
  },
});
```

Price.product accepts a Product registered in the application. A Customer, even one with a claimed Product type, fails validation before Stripe receives a request. Nomoss waits for the product to apply, reads its validated ProductId, and checks the complete price request against Stripe's schema.

The relationship contract extends to nested objects and arrays and to compatible entities across providers. Nomoss owns schema registration and dependency resolution. One application runtime gives declarations, provider calls, and output reads access to the same registered resources, configuration, and saved values. [resource graph specification](resource-graph.md)

After apply, the application can read price.PriceId directly. A read before the value exists fails with ResourceOutputResolutionMissing. Only validated provider outputs are available to applications and dependent requests. [output specification](resource-outputs.md)

## Validate declarations against the provider's rules

A declaration rejects invalid inputs before a provider mutation. The same source governs TypeScript and runtime validation. For Stripe that source is OpenAPI. AWS uses CloudFormation Registry for resource properties and Smithy for Cloud Control requests. A local resource uses its registered Effect schema.

Registry classifications determine which AWS properties an application can set or change. AWS supplies read-only values. A change to a create-only property requires replacement. A write-only value needs a retention rule because provider reads omit it. Where Registry leaves mutability or retention open, the resource policy defines the rule before Nomoss applies a change or accepts an observation.

BillingConfigurationExport resolves resource references before the writer receives the document. The file contents and destination conform to its registered Effect schema. The resource saves outputPath as OutputPath so subsequent reads and removal address the published file.

## Generate declarations that remain manageable on later runs

A later read uses the identity returned at creation. For Customer, POST /v1/customers returns id and GET /v1/customers/{customer} accepts that value as customer. Stripe discovery pairs these operations only when both describe the same model with a required string id.

When several operation pairs qualify, source configuration selects the intended pair. An operation or response model outside the candidate set produces ResourceSourceInvalid. An optional id or a read that needs unavailable inputs prevents a callable declaration. The catalog entry identifies the missing requirement.

A nested Stripe bank account needs both its own ID and the parent account ID. Creation uses /v1/accounts/{account}/external_accounts and the read adds /{id}. Support for this resource requires source configuration that identifies the declaration for each parent parameter and a saved read mapping that supplies both identities.

## Specify relationships missing from provider definitions

Support for Payout.destination requires a bank account or card reference. The payout request takes BankAccountId from a bank account or CardId from a card. A Product fails validation before the payout request. Stripe's response definitions determine the allowed alternatives, even within nested objects and arrays. If discovery cannot establish a target's identity, the catalog retains the source and explains why the relationship is unavailable.

When a relationship is absent or its request and response paths differ, a reviewed hint connects the creation input to the allowed models in the provider document. Those definitions govern validation and identity. The Stripe guide applies this rule to an account relationship. [Stripe configuration guide](../../tools/stripe/README.md#configure-resource-relationships)

Stripe's external_account operation can return a bank account or a card. The responseSchema hint selects bank_account for BankAccount and card for Card. Each policy validates its selected model before it accepts outputs. A card returned for BankAccount fails validation and leaves previous state intact.

## Retain the identities needed by later requests

Generated identity names can differ from provider parameter names. A Customer read passes CustomerId as customer. A Product read passes ProductId as id. The resource contract maps each saved output to the parameter and preserves the constraints of the source field or creation parameter.

An application declares a queue before AWS assigns QueueUrl, its Registry primary identifier. Cloud Control also returns an opaque Identifier. Later requests require that value and the resource type, so Nomoss saves it separately from the complete observed resource model, even for types without read-only properties. The internal client validates Cloud Control requests and responses against their Smithy contracts. [AWS resource specification](aws-resource-lifecycle-management.md)

A mapped read uses the identity from the last successful apply. A new declaration first needs a successful creation and saved identity. ResourceReadIdentityMissing identifies a read without that applied record. Invalid saved outputs stop the request locally. If the response identifies a different object, Nomoss reports ResourceIdentityMismatch and preserves the previous state.

The read mapping specifies both parameter name and request location. A path parameter and a header can share a name and still impose distinct constraints. The saved value satisfies the selected parameter's schema. A read that also requires a body or a constant remains unavailable until the integration defines its meaning and supplies it. The catalog records the reason and source selection.

## Use current resource values after reload and replacement

A saved relationship identifies the source declaration and its allowed types. Its mapping defines where the current source outputs belong in the dependent input, even when the request needs several outputs or a structured value. The source's own properties stay in its record. After reload or replacement, Nomoss resolves the reference against validated source state immediately before the dependent mutation.

## Preserve outputs that later provider reads omit

Stripe can omit WebhookSigningSecret after creation. Once Nomoss verifies the response identity, it uses a newly returned secret if available and otherwise retains the saved secret. Output validation fails if both are absent. Every optional output needs an explicit rule for absence before applications can rely on it.

Nomoss preserves saved state until a read confirms absence. For Customer, a 404 or a validated deleted-customer response establishes absence. The latter requires an identity match before Nomoss removes state. Authentication, permission, transport, and validation errors propagate to the caller. The output projection requires only the selected customer fields.

## Apply the change the application requested

A Price amount change retires the old price, creates a replacement, and supplies its identity to dependents. Removal of a Product declaration deactivates the Stripe product. A provider offers each change only once its resource policy defines that behavior.

Each resource exposes the commands its policy supports. An unsupported change returns ResourceCommandUnsupported before any provider request and leaves saved state intact. The shared command and observation contracts give the planner, executor, and state service the same interpretation of that result.

## Preserve validation when provider definitions change

Resource declarations and clients derive validation from the same corrected provider document and operation selection. A maintainer can trace a generated input, output, or relationship to its governing schema because each request or response reference retains the location of its resolved definition.

Every accepted creation response supplies the identity for a later read. An allOf model satisfies all constituent schemas. With anyOf or oneOf, every accepted alternative requires the identity, or configuration selects a specific alternative. An alias identifies the same resource, and an inherited base schema contributes validation to that resource's single declaration.

Generated outputs currently support top-level fields that are required or have a retention policy. If several branches define the same selected field, preparation fails because the generator cannot yet preserve their combined constraints. A saved parent identity retains its creation parameter's validation even when the response omits that parameter.

Generated types and runtime schemas agree on field constraints, optionality, and compatible entities. Discovery preserves shared and recursive references and terminates on recursive models. An absent definition stops preparation with the location of the broken reference. [generation architecture](generation-architecture.md)

## Keep applications and saved state compatible

Regeneration preserves published output names and provider registration names. A standard identity output uses the resource name followed by Id. Versioned resources retain their source title and service namespace. A reviewed alias can name a selected response field or parent parameter. Unused aliases and name conflicts stop publication. A change to a saved identity or output's meaning requires an explicit migration decision.

Older records can omit identity field metadata. Nomoss validates those records with the currently registered resource contract. Regeneration preserves the meaning of saved records and provider observations so the state engine can reopen an existing stack. [resource command specification](resource-command-policy-stage.md)

Applications keep the last working client if source preparation, compilation, or lint fails. Publication replaces generated modules only after the candidates pass validation.

The published resource catalog explains which declarations a maintainer can use and why others remain unavailable. Each local or provider resource has a service-qualified entry that cites its definitions and identifies available or unresolved relationships, outputs, and operations. A resource stays in the catalog even if it lacks an executable creation or read request.

## Evidence required for supported workflows

Small provider documents let maintainers check generated declarations and accepted entity types without credentials or a reference checkout. These cases also identify which missing requirements prevent generation. Source comparisons cover the AWS Queue Registry model, the corrected Stripe specification, and the BillingConfigurationExport schema. They establish compatibility of public names and validation as well as relationship, identity, and retention rules. An invalid output policy stops publication. [testing contract](../development/testing.md)

In the billing acceptance workflow, a later run reads the original Product and Price. After price replacement, dependent requests use the new identity. Production lifecycle and state coverage also exercises nested and cross-provider relationships, multi-value mappings, and recovery after reload or failure. An unrelated type stops the dependent mutation. Failed reads and teardown retries preserve the state and secrets needed for recovery. [testing contract](../development/testing.md)

The S3-to-SQS acceptance workflow creates its resources through generated Cloud Control declarations, uploads an object, receives the event from SQS, and removes the managed resources.

## Current limits

Generated Stripe inputs accept entities at resolved relationship paths. Unresolved targets retain their existing value schemas. AWS entity input generation remains incomplete. The contract permits multi-value request mappings, while the Stripe compiler currently selects one saved output per target. The tracker distinguishes these gaps from unavailable lifecycle operations. [resource mapping tracker](../../attempts/dev-attempts_resource-mapping.md)

Live Stripe coverage establishes linked Customer, Product, and Price creation and price replacement. The tracker retains separate acceptance work for webhook, portal, configuration export, account, and AWS workflows. External import, discovery without saved identity, credential replacement, and provider-wide lifecycle generation have separate scope.
