# Resource mapping

An application can declare a Stripe product and a price that belongs to that product before Stripe has created either object. The Product declaration returns a resource entity, a typed handle to that declaration. The application passes that entity into the Price declaration, and Nomoss must obtain the product's eventual Stripe ID when it creates the price.

A resource mapping defines which resource entities a declaration property accepts and which provider values Nomoss needs from those entities. The mapping must also retain the information needed to read or change the resulting objects on later runs. This specification covers provider resources, such as Stripe products and AWS queues, and local resources, such as BillingConfigurationExport, which writes application configuration to a file.

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

A Price.product reference must point to a Product declaration registered in the application. Passing a Customer entity, or claiming the Product type for another registered resource, must fail before Stripe receives a request. Before creating the price, Nomoss must wait for the product to apply successfully and obtain its validated ProductId. The completed price request must satisfy Stripe's request schema before Nomoss sends it.

Application authors must be able to express the same relationships inside objects and arrays and between compatible resources from different providers. Nomoss must register the required schemas and determine dependencies internally. Declarations, provider execution, and application output reads must share the application's configured runtime so they agree on the registered resources, provider configuration, and saved values. The [resource graph specification](resource-graph.md) defines the complete relationship contract.

After a successful apply, the application can read an ordinary value such as price.PriceId. A new declaration has no applied outputs, so reading an unavailable value must fail with ResourceOutputResolutionMissing. Nomoss must validate provider outputs before it exposes them to the application or uses them in another request. The [output specification](resource-outputs.md) explains when those values become available.

## Validate declarations against the provider's rules

An application declaration must reject values that violate the provider's requirements before Nomoss sends a mutation. Stripe's OpenAPI document defines its request properties and response models. For AWS, CloudFormation Registry defines resource properties, while Smithy defines the Cloud Control requests that carry those properties. A local resource must retain the validation defined by its registered Effect schema. These source definitions must govern both generated TypeScript inputs and runtime validation.

For an AWS declaration, the Registry's property classification determines whether an author can supply or change a value. A read-only value comes from the provider, and a creation-only value requires replacement when it changes. A write-only value needs an explicit retention rule because later reads omit it. The provider integration must specify that rule in a resource policy, which defines the allowed lifecycle behavior for that resource. If the Registry leaves mutability or retention unspecified, the policy must establish the rule before Nomoss applies a change or accepts an observation.

An application that exports its resulting resource values through BillingConfigurationExport needs the file contents and destination to satisfy the file resource's existing Effect schema. References inside the exported document must resolve before the writer receives it. Nomoss must save outputPath as OutputPath because later reads and removal need the location of the published file.

## Generate declarations that remain manageable on later runs

An application that creates a Stripe customer must be able to inspect that same customer on a later run. Nomoss therefore needs a creation request that returns an identity and a read request that accepts the saved identity. For Customer, POST /v1/customers returns id and GET /v1/customers/{customer} accepts it as customer. A generated declaration must establish that both operations describe the same resource model. Stripe generation currently requires that model to supply a required string id.

A provider can offer several valid creation and read pairs for the same resource. Source configuration must select the pair intended for the application. A hint selecting an operation or response model outside the available candidates must fail with ResourceSourceInvalid. If the response makes id optional, or a read requires unavailable values beyond the saved identity and parent parameters, Nomoss must record that missing requirement in the resource definition. The recorded reason must explain why the application has no callable declaration for that resource.

To create a bank account under a declared Stripe account and read it on a later run, Nomoss needs both provider identities. Stripe creates the bank account under /v1/accounts/{account}/external_accounts, and its read adds /{id}. Nomoss must keep the owning account ID alongside the bank account's own ID. For every required parent parameter, source configuration must identify which declared resource supplies its value. The selected read must accept those parent values as well as the resource ID.

## Specify relationships missing from provider definitions

An application must be able to pass a declared bank account or card into Payout.destination. Nomoss must obtain BankAccountId from the bank-account entity or CardId from the card entity when it creates the payout. Passing a Product entity must fail before any payout request is sent. The provider integration must use Stripe's response definitions to identify the permitted targets and retain every declared alternative, including relationships inside objects and arrays. If a target's identity remains unresolved, Nomoss must retain its source and report that the entity relationship is unavailable.

When the provider omits a relationship or uses different property names in requests and responses, the provider integration must supply a reviewed relationship hint. The hint must identify the creation input and reference the permitted resource models in the provider document. Nomoss must derive their validation and identity mappings from those definitions. The hint must preserve the provider as the authority for property schemas. The [Stripe configuration guide](../../tools/stripe/README.md#configure-resource-relationships) shows how to supply the missing account relationship and use the resulting declarations.

An application declaring a BankAccount needs bank-account validation even though Stripe uses one creation operation for both bank accounts and cards. Stripe's external_account response permits either object type. The responseSchema hint must select bank_account for the BankAccount declaration and card for the Card declaration. Each resource policy must validate the selected model before accepting outputs. A card response for a BankAccount declaration must fail validation and preserve the previous saved state.

## Retain the identities needed by later requests

An application may use generated names such as CustomerId and ProductId, while Stripe's requests use their own parameter names. A Customer read needs CustomerId in customer, and a Product read needs ProductId in id. The generated resource contract must define these conversions so the application can read the same resource on later runs through its saved outputs. Each saved output must retain the validation of the source field or creation parameter that supplies it.

An AWS queue illustrates why declaration inputs and saved provider identity serve different needs. An application can declare the queue before AWS assigns QueueUrl. CloudFormation Registry names QueueUrl as the queue's primary identifier, but Cloud Control also returns an opaque Identifier that subsequent requests require with the resource type. Nomoss must retain that Identifier separately and preserve the complete returned resource model for observations and saved state, including for resources with no read-only properties. Cloud Control requests and responses must pass their generated Smithy contracts through the internal client described in the [AWS resource specification](aws-resource-lifecycle-management.md).

On a later run, Nomoss must read the provider object using its identity from the last successful apply. Invalid saved outputs must fail validation before a provider request. If a response identifies another object, Nomoss must report ResourceIdentityMismatch and preserve the previous state. A mapped read with no last applied resource must fail with ResourceReadIdentityMissing. A new declaration must first complete creation and save the returned provider identity before it can use a later-read operation.

A later read may need its saved identity in a path or query parameter. The mapping must identify the request location as well as the parameter name, since a path argument and a header can have the same name and still represent separate inputs. The value must satisfy every constraint on the selected parameter. A read that additionally requires a body or fixed inputs remains unavailable until its mapping supplies those inputs and the provider integration establishes their meaning; the resource must retain the reason and source selection that prevent that read from being generated.

## Use current resource values after reload and replacement

An application must keep its declared relationships after reload and after a source resource is replaced. Dependent requests must use the replacement's current identity. Nomoss must therefore save a serializable relationship that identifies the source declaration, its allowed types, the destination within the dependent input, and the mapping to the required request value. The saved relationship must remain separate from the source entity's properties and object graph. Before each dependent mutation, Nomoss must obtain the current validated source outputs. The core contract must support mappings that require several values or a structured request value.

## Preserve outputs that later provider reads omit

An application that verifies Stripe webhooks still needs WebhookSigningSecret after Nomoss reads the webhook on a later run. Stripe can return that secret at creation and omit it on later reads, so Nomoss must use a newly returned secret when available and otherwise retain the saved secret. If neither value exists, output validation must fail. Every other optional output also needs an explicit rule for absence before generation can expose it as usable. Nomoss must validate the current response's resource identity before accepting either the returned secret or the retained secret.

A failed read must preserve useful saved state until the provider has established that the object is absent. For Customer, a 404 or a validated deleted-customer response can establish absence. Nomoss must verify the requested identity before it removes saved state for a deleted-customer response. Authentication, permission, transport, and response-validation failures must remain failures. When Nomoss converts a response into saved outputs, the requirements of that conversion must be limited to the selected customer fields.

## Apply the change the application requested

An application must be able to change a Price amount even though Stripe requires a new price for that change. Nomoss must retire the old price, create the replacement, and make its identity available to dependent declarations. For Product, removing the declaration must deactivate the existing Stripe product. The provider integration must define these application behaviors in a resource policy before it offers the corresponding change.

A resource can support creation and later reads while lacking an operation for update or removal. Nomoss must make the supported commands available and reject an unconfigured mutation with ResourceCommandUnsupported before contacting the provider. The rejection must preserve the saved resource. Applications must receive these failures through the existing resource command and observation contracts so planning, execution, and persistence continue to interpret the same outcomes.

## Preserve validation when provider definitions change

When a provider definition needs a reviewed correction, the application declaration and eventual provider request must still enforce the same rule. Resource generation and client generation must therefore use the same corrected document and operation selection. A provider maintainer must be able to trace a generated input, output, or relationship to the schema that governs it in that document. A reference to a request body or response must retain the location of its resolved definition. Keeping those references must preserve one authoritative definition of each requirement.

To read a resource on a later run, Nomoss needs an identity that every accepted creation response supplies. In an allOf model, one object must satisfy all contributing schemas. For anyOf or oneOf, the saved identity must be required by every accepted alternative, or source configuration must select the alternative used by that declaration. A schema alias must continue to refer to the same resource. An inherited base model contributes validation to that resource's single declaration.

To use a provider response field as a saved output, Nomoss needs to know that the field is available or how to retain it when a later response omits it. Generated provider outputs currently support top-level fields that are required or have a retention policy. If several schema branches define a selected field, preparation of the executable resource must fail because generation currently cannot preserve their combined constraints. Creation parameters saved as parent identities must retain the validation of those parameters even when the response omits their values.

Applications must remain able to use provider models that reuse definitions or refer recursively to themselves. Generation must preserve those references and terminate its traversal of recursive models. An absent referenced definition must fail preparation and identify where the missing reference occurs. Generated types and runtime validation must agree on the provider's required fields, optional fields, constraints, and permitted resource entities. The [generation architecture](generation-architecture.md) defines how compilation must preserve those provider requirements.

## Keep applications and saved state compatible

Applications can publish resource output names in their own configuration, so regeneration must preserve existing output names and provider registration names. Standard identity outputs must use the resource name followed by Id, and versioned resources must retain the source title and service namespace needed to distinguish them. A reviewed alias may name a selected response field or parent parameter, but unused aliases and name conflicts must fail before publication. Changing the meaning of an identity or saved output requires an explicit migration decision.

An application must be able to reopen state saved by an earlier Nomoss version. Older records may omit metadata about which fields identify a resource, so Nomoss must use the rules in the resource's currently registered contract when it validates them. Regenerating provider declarations must preserve the meaning of saved resource records and provider observations. The [resource command specification](resource-command-policy-stage.md) defines the shared contracts that the existing state engine must continue to accept.

Regenerating a client must leave the last working generated files available when source preparation, compilation, or lint rejects the candidates. The generator must validate the candidates before replacing the published files. This protects applications that already import the client from losing their declarations because a new provider definition could not be generated.

A provider maintainer needs to understand why a resource has no callable declaration. Nomoss must publish a resource catalog, an index of resource definitions that the maintainer can inspect for that explanation. Every resource type must have an entry, including local resources and provider resources whose creation or read request cannot be generated. The entry must identify the relevant source definitions and explain which relationship targets, saved outputs, and provider operations are available or unresolved. Full resource type names must distinguish services that share a short resource name.

## Evidence required for supported workflows

A provider maintainer must be able to check the declarations produced by a mapping change without provider credentials or a reference checkout. Tests with small provider documents must establish which declarations become usable, which entities their inputs accept, and which missing requirements prevent a resource from being generated. Separate comparisons with the AWS Queue Registry model, corrected Stripe specification, and BillingConfigurationExport's Effect schema must establish that published names, validation, relationships, saved identities, and retention rules still agree with their sources. An invalid output policy must fail before publication. The [testing contract](../development/testing.md) defines the checks for these outcomes.

A linked billing application must create its Product and Price, read the same objects on a later run, apply a price replacement, and resolve dependent requests from the replacement's current identity. Evidence for relationship support must also cover compatible entities across providers and inside objects and arrays, mappings that require several values, reload, and recovery after failure. Unrelated resource types must fail before a dependent mutation. Tests must exercise production lifecycle and state services under the [testing contract](../development/testing.md), including secret retention, failed reads, and teardown retries.

For an application that sends S3 upload events to SQS, acceptance must include an actual object upload and receipt of its notification from the queue. The workflow must create and remove its managed resources through the generated Cloud Control declarations.

## Current limits

Generated Stripe entity inputs accept relationships whose resource targets resolve. Relationships that still have unresolved targets retain their existing value schemas, and AWS entity input generation remains unfinished. The core must support complete request mappings, but the current Stripe relationship compiler selects one saved output for each resolved target. The [resource mapping tracker](../../attempts/dev-attempts_resource-mapping.md) records unresolved relationships separately from unavailable lifecycle operations.

The recorded live Stripe workflow covers linked Customer, Product, and Price creation and price replacement. Webhook, portal, configuration export, account, and AWS workflows still need the acceptance recorded in the tracker. Importing provider objects created outside Nomoss, finding resources when no saved identity exists, replacing credentials, and generating lifecycle support for an entire provider API remain outside this assignment.
