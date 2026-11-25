export const stripeResourceCatalog = {
  "Stripe::Billing::AccountLink": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::AccountLink",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "account_link",
    schemaPath: "#/components/schemas/account_link",
    creations: [
      {
        operationId: "PostAccountLinks",
        inputSchemaPath:
          "#/paths/~1v1~1account_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/account_link",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountLinks",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1account_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::AccountSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::AccountSession",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "account_session",
    schemaPath: "#/components/schemas/account_session",
    creations: [
      {
        operationId: "PostAccountSessions",
        inputSchemaPath:
          "#/paths/~1v1~1account_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/account_session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountSessions",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1account_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::V1Account": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::V1Account",
    resource: "v1-account",
    propsSchema: "StripeV1AccountPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/V1AccountId"],
    operations: {
      create: "PostAccounts",
      read: {
        operationId: "GetAccountsAccount",
        parameters: {
          account: "V1AccountId",
        },
      },
      update: {
        operationId: "PostAccountsAccount",
        parameters: {
          account: "V1AccountId",
        },
      },
      remove: {
        operationId: "DeleteAccountsAccount",
        parameters: {
          account: "V1AccountId",
        },
      },
    },
    outputs: {
      V1AccountId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/account/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "account",
    schemaPath: "#/components/schemas/account",
    creations: [
      {
        operationId: "PostAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["settings", "branding", "icon"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/settings/properties/branding/properties/icon",
        responseSchemaPath:
          "#/components/schemas/account_branding_settings/properties/icon",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["settings", "branding", "logo"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/settings/properties/branding/properties/logo",
        responseSchemaPath:
          "#/components/schemas/account_branding_settings/properties/logo",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["company", "verification", "document", "back"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/company/properties/verification/properties/document/properties/back",
        responseSchemaPath:
          "#/components/schemas/legal_entity_company_verification_document/properties/back",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["company", "verification", "document", "front"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/company/properties/verification/properties/document/properties/front",
        responseSchemaPath:
          "#/components/schemas/legal_entity_company_verification_document/properties/front",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "individual",
          "verification",
          "additional_document",
          "back",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/individual/properties/verification/properties/additional_document/properties/back",
        responseSchemaPath:
          "#/components/schemas/legal_entity_person_verification_document/properties/back",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "individual",
          "verification",
          "additional_document",
          "front",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/individual/properties/verification/properties/additional_document/properties/front",
        responseSchemaPath:
          "#/components/schemas/legal_entity_person_verification_document/properties/front",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["individual", "verification", "document", "back"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/individual/properties/verification/properties/document/properties/back",
        responseSchemaPath:
          "#/components/schemas/legal_entity_person_verification_document/properties/back",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["individual", "verification", "document", "front"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/individual/properties/verification/properties/document/properties/front",
        responseSchemaPath:
          "#/components/schemas/legal_entity_person_verification_document/properties/front",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::ExternalAccount": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ExternalAccount",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "external_account",
    schemaPath: "#/components/schemas/external_account",
    creations: [
      {
        operationId: "PostAccountsAccountBankAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1bank_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/external_account",
      },
      {
        operationId: "PostAccountsAccountExternalAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/external_account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountsAccountBankAccounts",
        reason: "Required creation parameters need relationship hints: account",
      },
      {
        operationId: "PostAccountsAccountExternalAccounts",
        reason: "Required creation parameters need relationship hints: account",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1accounts~1%7Baccount%7D~1bank_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::BankAccount": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BankAccount",
    resource: "bank-account",
    propsSchema: "StripeBankAccountPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BankAccountId", "/properties/AccountId"],
    operations: {
      create: "PostAccountsAccountExternalAccounts",
      read: {
        operationId: "GetAccountsAccountExternalAccountsId",
        parameters: {
          id: "BankAccountId",
          account: "AccountId",
        },
      },
      update: {
        operationId: "PostAccountsAccountExternalAccountsId",
        parameters: {
          id: "BankAccountId",
          account: "AccountId",
        },
      },
      remove: {
        operationId: "DeleteAccountsAccountExternalAccountsId",
        parameters: {
          id: "BankAccountId",
          account: "AccountId",
        },
      },
    },
    responseSchema: "#/components/schemas/bank_account",
    outputs: {
      BankAccountId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/bank_account/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
      AccountId: {
        schema: {
          maxLength: 5000,
          type: "string",
        },
        schemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/parameters/0/schema",
        valuePath: "/account",
        required: true,
        retainOnRead: false,
        inputParameter: "account",
      },
    },
    providerResource: "bank_account",
    schemaPath: "#/components/schemas/bank_account",
    creations: [
      {
        operationId: "PostAccountsAccountExternalAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/bank_account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountsAccountExternalAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["account"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/parameters/0/schema",
        responseSchemaPath: "#/components/schemas/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Card": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Card",
    resource: "card",
    propsSchema: "StripeCardPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/CardId", "/properties/AccountId"],
    operations: {
      create: "PostAccountsAccountExternalAccounts",
      read: {
        operationId: "GetAccountsAccountExternalAccountsId",
        parameters: {
          id: "CardId",
          account: "AccountId",
        },
      },
      update: {
        operationId: "PostAccountsAccountExternalAccountsId",
        parameters: {
          id: "CardId",
          account: "AccountId",
        },
      },
      remove: {
        operationId: "DeleteAccountsAccountExternalAccountsId",
        parameters: {
          id: "CardId",
          account: "AccountId",
        },
      },
    },
    responseSchema: "#/components/schemas/card",
    outputs: {
      CardId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/card/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
      AccountId: {
        schema: {
          maxLength: 5000,
          type: "string",
        },
        schemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/parameters/0/schema",
        valuePath: "/account",
        required: true,
        retainOnRead: false,
        inputParameter: "account",
      },
    },
    providerResource: "card",
    schemaPath: "#/components/schemas/card",
    creations: [
      {
        operationId: "PostAccountsAccountExternalAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/card",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountsAccountExternalAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["account"],
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1external_accounts/post/parameters/0/schema",
        responseSchemaPath: "#/components/schemas/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::LoginLink": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::LoginLink",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "login_link",
    schemaPath: "#/components/schemas/login_link",
    creations: [
      {
        operationId: "PostAccountsAccountLoginLinks",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1login_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/login_link",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountsAccountLoginLinks",
        reason: "Required creation parameters need relationship hints: account",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1accounts~1%7Baccount%7D~1login_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::Person": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Person",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "person",
    schemaPath: "#/components/schemas/person",
    creations: [
      {
        operationId: "PostAccountsAccountPeople",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1people/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/person",
      },
      {
        operationId: "PostAccountsAccountPersons",
        inputSchemaPath:
          "#/paths/~1v1~1accounts~1%7Baccount%7D~1persons/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/person",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAccountsAccountPeople",
        reason: "Required creation parameters need relationship hints: account",
      },
      {
        operationId: "PostAccountsAccountPersons",
        reason: "Required creation parameters need relationship hints: account",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1accounts~1%7Baccount%7D~1people/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::ApplePayDomain": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ApplePayDomain",
    resource: "apple-pay-domain",
    propsSchema: "StripeApplePayDomainPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ApplePayDomainId"],
    operations: {
      create: "PostApplePayDomains",
      read: {
        operationId: "GetApplePayDomainsDomain",
        parameters: {
          domain: "ApplePayDomainId",
        },
      },
      remove: {
        operationId: "DeleteApplePayDomainsDomain",
        parameters: {
          domain: "ApplePayDomainId",
        },
      },
    },
    outputs: {
      ApplePayDomainId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/apple_pay_domain/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "apple_pay_domain",
    schemaPath: "#/components/schemas/apple_pay_domain",
    creations: [
      {
        operationId: "PostApplePayDomains",
        inputSchemaPath:
          "#/paths/~1v1~1apple_pay~1domains/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/apple_pay_domain",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostApplePayDomains",
        reason:
          "No update operation matches the saved-identity resource path /v1/apple_pay/domains/{domain}",
      },
      {
        operationId: "PostApplePayDomains",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1apple_pay~1domains/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::FeeRefund": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::FeeRefund",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "fee_refund",
    schemaPath: "#/components/schemas/fee_refund",
    creations: [
      {
        operationId: "PostApplicationFeesIdRefunds",
        inputSchemaPath:
          "#/paths/~1v1~1application_fees~1%7Bid%7D~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/fee_refund",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostApplicationFeesIdRefunds",
        reason: "Required creation parameters need relationship hints: id",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1application_fees~1%7Bid%7D~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::AppsInstall": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::AppsInstall",
    resource: "apps-install",
    propsSchema: "StripeAppsInstallPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/AppsInstallId"],
    operations: {
      create: "PostAppsInstalls",
      read: {
        operationId: "GetAppsInstallsId",
        parameters: {
          id: "AppsInstallId",
        },
      },
      update: {
        operationId: "PostAppsInstallsId",
        parameters: {
          id: "AppsInstallId",
        },
      },
    },
    outputs: {
      AppsInstallId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/apps.install/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "apps.install",
    schemaPath: "#/components/schemas/apps.install",
    creations: [
      {
        operationId: "PostAppsInstalls",
        inputSchemaPath:
          "#/paths/~1v1~1apps~1installs/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/apps.install",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostAppsInstalls",
        reason:
          "No remove operation matches the saved-identity resource path /v1/apps/installs/{id}",
      },
      {
        operationId: "PostAppsInstalls",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1apps~1installs/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::BillingAlert": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingAlert",
    resource: "billing-alert",
    propsSchema: "StripeBillingAlertPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingAlertId"],
    operations: {
      create: "PostBillingAlerts",
      read: {
        operationId: "GetBillingAlertsId",
        parameters: {
          id: "BillingAlertId",
        },
      },
    },
    outputs: {
      BillingAlertId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/billing.alert/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "billing.alert",
    schemaPath: "#/components/schemas/billing.alert",
    creations: [
      {
        operationId: "PostBillingAlerts",
        inputSchemaPath:
          "#/paths/~1v1~1billing~1alerts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing.alert",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingAlerts",
        reason:
          "No update operation matches the saved-identity resource path /v1/billing/alerts/{id}",
      },
      {
        operationId: "PostBillingAlerts",
        reason:
          "No remove operation matches the saved-identity resource path /v1/billing/alerts/{id}",
      },
      {
        operationId: "PostBillingAlerts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing~1alerts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["usage_threshold", "meter"],
        inputSchemaPath:
          "#/paths/~1v1~1billing~1alerts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/usage_threshold/properties/meter",
        responseSchemaPath:
          "#/components/schemas/thresholds_resource_usage_threshold_config/properties/meter",
        targets: [
          {
            resource: "billing.meter",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/billing.meter/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["usage_threshold", "filters", "*", "customer"],
        inputSchemaPath:
          "#/paths/~1v1~1billing~1alerts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/usage_threshold/properties/filters/items/properties/customer",
        responseSchemaPath:
          "#/components/schemas/thresholds_resource_usage_alert_filter/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::BillingCreditGrant": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingCreditGrant",
    resource: "billing-credit-grant",
    propsSchema: "StripeBillingCreditGrantPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingCreditGrantId"],
    operations: {
      create: "PostBillingCreditGrants",
      read: {
        operationId: "GetBillingCreditGrantsId",
        parameters: {
          id: "BillingCreditGrantId",
        },
      },
      update: {
        operationId: "PostBillingCreditGrantsId",
        parameters: {
          id: "BillingCreditGrantId",
        },
      },
    },
    outputs: {
      BillingCreditGrantId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/billing.credit_grant/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "billing.credit_grant",
    schemaPath: "#/components/schemas/billing.credit_grant",
    creations: [
      {
        operationId: "PostBillingCreditGrants",
        inputSchemaPath:
          "#/paths/~1v1~1billing~1credit_grants/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing.credit_grant",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingCreditGrants",
        reason:
          "No remove operation matches the saved-identity resource path /v1/billing/credit_grants/{id}",
      },
      {
        operationId: "PostBillingCreditGrants",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing~1credit_grants/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1billing~1credit_grants/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/billing.credit_grant/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::BillingFeedbackOption": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingFeedbackOption",
    resource: "billing-feedback-option",
    propsSchema: "StripeBillingFeedbackOptionPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingFeedbackOptionId"],
    operations: {
      create: "PostBillingFeedbackOptions",
      read: {
        operationId: "GetBillingFeedbackOptionsId",
        parameters: {
          id: "BillingFeedbackOptionId",
        },
      },
      update: {
        operationId: "PostBillingFeedbackOptionsId",
        parameters: {
          id: "BillingFeedbackOptionId",
        },
      },
    },
    outputs: {
      BillingFeedbackOptionId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/billing.feedback_option/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "billing.feedback_option",
    schemaPath: "#/components/schemas/billing.feedback_option",
    creations: [
      {
        operationId: "PostBillingFeedbackOptions",
        inputSchemaPath:
          "#/paths/~1v1~1billing~1feedback_options/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing.feedback_option",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingFeedbackOptions",
        reason:
          "No remove operation matches the saved-identity resource path /v1/billing/feedback_options/{id}",
      },
      {
        operationId: "PostBillingFeedbackOptions",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing~1feedback_options/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::BillingMeterEventAdjustment": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingMeterEventAdjustment",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "billing.meter_event_adjustment",
    schemaPath: "#/components/schemas/billing.meter_event_adjustment",
    creations: [
      {
        operationId: "PostBillingMeterEventAdjustments",
        inputSchemaPath:
          "#/paths/~1v1~1billing~1meter_event_adjustments/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath:
          "#/components/schemas/billing.meter_event_adjustment",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingMeterEventAdjustments",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing~1meter_event_adjustments/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::BillingMeterEvent": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingMeterEvent",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "billing.meter_event",
    schemaPath: "#/components/schemas/billing.meter_event",
    creations: [
      {
        operationId: "PostBillingMeterEvents",
        inputSchemaPath:
          "#/paths/~1v1~1billing~1meter_events/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing.meter_event",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingMeterEvents",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing~1meter_events/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::BillingMeter": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingMeter",
    resource: "billing-meter",
    propsSchema: "StripeBillingMeterPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingMeterId"],
    operations: {
      create: "PostBillingMeters",
      read: {
        operationId: "GetBillingMetersId",
        parameters: {
          id: "BillingMeterId",
        },
      },
      update: {
        operationId: "PostBillingMetersId",
        parameters: {
          id: "BillingMeterId",
        },
      },
    },
    outputs: {
      BillingMeterId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/billing.meter/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "billing.meter",
    schemaPath: "#/components/schemas/billing.meter",
    creations: [
      {
        operationId: "PostBillingMeters",
        inputSchemaPath:
          "#/paths/~1v1~1billing~1meters/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing.meter",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingMeters",
        reason:
          "No remove operation matches the saved-identity resource path /v1/billing/meters/{id}",
      },
      {
        operationId: "PostBillingMeters",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing~1meters/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::BillingPortalConfiguration": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingPortalConfiguration",
    resource: "billing-portal-configuration",
    propsSchema: "StripeBillingPortalConfigurationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingPortalConfigurationId"],
    operations: {
      create: "PostBillingPortalConfigurations",
      read: {
        operationId: "GetBillingPortalConfigurationsConfiguration",
        parameters: {
          configuration: "BillingPortalConfigurationId",
        },
      },
      update: {
        operationId: "PostBillingPortalConfigurationsConfiguration",
        parameters: {
          configuration: "BillingPortalConfigurationId",
        },
      },
      remove: {
        operationId: "PostBillingPortalConfigurationsConfiguration",
        parameters: {
          configuration: "BillingPortalConfigurationId",
        },
        values: {
          active: false,
        },
      },
    },
    outputs: {
      BillingPortalConfigurationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/billing_portal.configuration/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "billing_portal.configuration",
    schemaPath: "#/components/schemas/billing_portal.configuration",
    creations: [
      {
        operationId: "PostBillingPortalConfigurations",
        inputSchemaPath:
          "#/paths/~1v1~1billing_portal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing_portal.configuration",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingPortalConfigurations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing_portal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: [
          "features",
          "subscription_cancel",
          "cancellation_reason",
          "feedback_options",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1billing_portal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/features/properties/subscription_cancel/properties/cancellation_reason/properties/feedback_options/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/portal_subscription_cancellation_reason/properties/feedback_options/items",
        targets: [
          {
            resource: "billing.feedback_option",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/billing.feedback_option/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "features",
          "subscription_update",
          "products",
          "*",
          "product",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1billing_portal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/features/properties/subscription_update/properties/products/anyOf/0/items/properties/product",
        responseSchemaPath:
          "#/components/schemas/portal_subscription_update_product/properties/product",
        targets: [
          {
            resource: "product",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/product/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "features",
          "subscription_update",
          "products",
          "*",
          "prices",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1billing_portal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/features/properties/subscription_update/properties/products/anyOf/0/items/properties/prices/items",
        responseSchemaPath:
          "#/components/schemas/portal_subscription_update_product/properties/prices/items",
        targets: [
          {
            resource: "price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/price/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::BillingPortalSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::BillingPortalSession",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "billing_portal.session",
    schemaPath: "#/components/schemas/billing_portal.session",
    creations: [
      {
        operationId: "PostBillingPortalSessions",
        inputSchemaPath:
          "#/paths/~1v1~1billing_portal~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/billing_portal.session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostBillingPortalSessions",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1billing_portal~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::Charge": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Charge",
    resource: "charge",
    propsSchema: "StripeChargePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ChargeId"],
    operations: {
      create: "PostCharges",
      read: {
        operationId: "GetChargesCharge",
        parameters: {
          charge: "ChargeId",
        },
      },
      update: {
        operationId: "PostChargesCharge",
        parameters: {
          charge: "ChargeId",
        },
      },
    },
    outputs: {
      ChargeId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/charge/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "charge",
    schemaPath: "#/components/schemas/charge",
    creations: [
      {
        operationId: "PostCharges",
        inputSchemaPath:
          "#/paths/~1v1~1charges/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/charge",
      },
      {
        operationId: "PostChargesChargeRefund",
        inputSchemaPath:
          "#/paths/~1v1~1charges~1%7Bcharge%7D~1refund/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/charge",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCharges",
        reason:
          "No remove operation matches the saved-identity resource path /v1/charges/{charge}",
      },
      {
        operationId: "PostCharges",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostChargesChargeRefund",
        reason: "Required creation parameters need relationship hints: charge",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1charges/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1charges/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath: "#/components/schemas/charge/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1charges/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/charge/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1charges/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/transfer_data/properties/destination",
        responseSchemaPath:
          "#/components/schemas/charge_transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Refund": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Refund",
    resource: "refund",
    propsSchema: "StripeRefundPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/RefundId"],
    operations: {
      create: "PostRefunds",
      read: {
        operationId: "GetRefundsRefund",
        parameters: {
          refund: "RefundId",
        },
      },
      update: {
        operationId: "PostRefundsRefund",
        parameters: {
          refund: "RefundId",
        },
      },
    },
    outputs: {
      RefundId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/refund/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "refund",
    schemaPath: "#/components/schemas/refund",
    creations: [
      {
        operationId: "PostChargesChargeRefunds",
        inputSchemaPath:
          "#/paths/~1v1~1charges~1%7Bcharge%7D~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/refund",
      },
      {
        operationId: "PostRefunds",
        inputSchemaPath:
          "#/paths/~1v1~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/refund",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostRefunds",
        reason:
          "No remove operation matches the saved-identity resource path /v1/refunds/{refund}",
      },
      {
        operationId: "PostRefunds",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostChargesChargeRefunds",
        reason: "Required creation parameters need relationship hints: charge",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["charge"],
        inputSchemaPath:
          "#/paths/~1v1~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/charge",
        responseSchemaPath: "#/components/schemas/refund/properties/charge",
        targets: [
          {
            resource: "charge",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/charge/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath: "#/components/schemas/refund/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["payment_intent"],
        inputSchemaPath:
          "#/paths/~1v1~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/payment_intent",
        responseSchemaPath:
          "#/components/schemas/refund/properties/payment_intent",
        targets: [
          {
            resource: "payment_intent",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_intent/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::CheckoutSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::CheckoutSession",
    resource: "checkout-session",
    propsSchema: "StripeCheckoutSessionPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/CheckoutSessionId"],
    operations: {
      create: "PostCheckoutSessions",
      read: {
        operationId: "GetCheckoutSessionsSession",
        parameters: {
          session: "CheckoutSessionId",
        },
      },
      update: {
        operationId: "PostCheckoutSessionsSession",
        parameters: {
          session: "CheckoutSessionId",
        },
      },
    },
    outputs: {
      CheckoutSessionId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/checkout.session/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "checkout.session",
    schemaPath: "#/components/schemas/checkout.session",
    creations: [
      {
        operationId: "PostCheckoutSessions",
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/checkout.session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCheckoutSessions",
        reason:
          "No remove operation matches the saved-identity resource path /v1/checkout/sessions/{session}",
      },
      {
        operationId: "PostCheckoutSessions",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/checkout.session/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["automatic_tax", "liability", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "coupon"],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/items/properties/coupon",
        responseSchemaPath:
          "#/components/schemas/payment_pages_checkout_session_discount/properties/coupon",
        targets: [
          {
            resource: "coupon",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/coupon/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/payment_pages_checkout_session_discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["shipping_options", "*", "shipping_rate"],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/shipping_options/items/properties/shipping_rate",
        responseSchemaPath:
          "#/components/schemas/payment_pages_checkout_session_shipping_option/properties/shipping_rate",
        targets: [
          {
            resource: "shipping_rate",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/shipping_rate/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "invoice_creation",
          "invoice_data",
          "account_tax_ids",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_creation/properties/invoice_data/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/payment_pages_checkout_session_invoice_settings/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice_creation", "invoice_data", "issuer", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1checkout~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_creation/properties/invoice_data/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::ClimateOrder": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ClimateOrder",
    resource: "climate-order",
    propsSchema: "StripeClimateOrderPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ClimateOrderId"],
    operations: {
      create: "PostClimateOrders",
      read: {
        operationId: "GetClimateOrdersOrder",
        parameters: {
          order: "ClimateOrderId",
        },
      },
      update: {
        operationId: "PostClimateOrdersOrder",
        parameters: {
          order: "ClimateOrderId",
        },
      },
    },
    outputs: {
      ClimateOrderId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/climate.order/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "climate.order",
    schemaPath: "#/components/schemas/climate.order",
    creations: [
      {
        operationId: "PostClimateOrders",
        inputSchemaPath:
          "#/paths/~1v1~1climate~1orders/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/climate.order",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostClimateOrders",
        reason:
          "No remove operation matches the saved-identity resource path /v1/climate/orders/{order}",
      },
      {
        operationId: "PostClimateOrders",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1climate~1orders/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["product"],
        inputSchemaPath:
          "#/paths/~1v1~1climate~1orders/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/product",
        responseSchemaPath:
          "#/components/schemas/climate.order/properties/product",
        targets: [
          {
            resource: "climate.product",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/climate.product/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Coupon": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Coupon",
    resource: "coupon",
    propsSchema: "StripeCouponPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/CouponId"],
    operations: {
      create: "PostCoupons",
      read: {
        operationId: "GetCouponsCoupon",
        parameters: {
          coupon: "CouponId",
        },
      },
      update: {
        operationId: "PostCouponsCoupon",
        parameters: {
          coupon: "CouponId",
        },
      },
      remove: {
        operationId: "DeleteCouponsCoupon",
        parameters: {
          coupon: "CouponId",
        },
      },
    },
    outputs: {
      CouponId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/coupon/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "coupon",
    schemaPath: "#/components/schemas/coupon",
    creations: [
      {
        operationId: "PostCoupons",
        inputSchemaPath:
          "#/paths/~1v1~1coupons/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/coupon",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCoupons",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1coupons/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::CreditNote": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::CreditNote",
    resource: "credit-note",
    propsSchema: "StripeCreditNotePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/CreditNoteId"],
    operations: {
      create: "PostCreditNotes",
      read: {
        operationId: "GetCreditNotesId",
        parameters: {
          id: "CreditNoteId",
        },
      },
      update: {
        operationId: "PostCreditNotesId",
        parameters: {
          id: "CreditNoteId",
        },
      },
    },
    outputs: {
      CreditNoteId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/credit_note/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "credit_note",
    schemaPath: "#/components/schemas/credit_note",
    creations: [
      {
        operationId: "PostCreditNotes",
        inputSchemaPath:
          "#/paths/~1v1~1credit_notes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/credit_note",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCreditNotes",
        reason:
          "No remove operation matches the saved-identity resource path /v1/credit_notes/{id}",
      },
      {
        operationId: "PostCreditNotes",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1credit_notes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["invoice"],
        inputSchemaPath:
          "#/paths/~1v1~1credit_notes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice",
        responseSchemaPath:
          "#/components/schemas/credit_note/properties/invoice",
        targets: [
          {
            resource: "invoice",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/invoice/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["shipping_cost", "shipping_rate"],
        inputSchemaPath:
          "#/paths/~1v1~1credit_notes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/shipping_cost/properties/shipping_rate",
        responseSchemaPath:
          "#/components/schemas/invoices_resource_shipping_cost/properties/shipping_rate",
        targets: [
          {
            resource: "shipping_rate",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/shipping_rate/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["refunds", "*", "refund"],
        inputSchemaPath:
          "#/paths/~1v1~1credit_notes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/refunds/items/properties/refund",
        responseSchemaPath:
          "#/components/schemas/credit_note_refund/properties/refund",
        targets: [
          {
            resource: "refund",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/refund/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::CustomerSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::CustomerSession",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "customer_session",
    schemaPath: "#/components/schemas/customer_session",
    creations: [
      {
        operationId: "PostCustomerSessions",
        inputSchemaPath:
          "#/paths/~1v1~1customer_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/customer_session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCustomerSessions",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1customer_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::Customer": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Customer",
    resource: "customer",
    propsSchema: "StripeCustomerPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/CustomerId"],
    operations: {
      create: "PostCustomers",
      read: {
        operationId: "GetCustomersCustomer",
        parameters: {
          customer: "CustomerId",
        },
      },
      update: {
        operationId: "PostCustomersCustomer",
        parameters: {
          customer: "CustomerId",
        },
      },
      remove: {
        operationId: "DeleteCustomersCustomer",
        parameters: {
          customer: "CustomerId",
        },
      },
    },
    deletedResponseMeansMissing: true,
    outputs: {
      CustomerId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/customer/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "customer",
    schemaPath: "#/components/schemas/customer",
    creations: [
      {
        operationId: "PostCustomers",
        inputSchemaPath:
          "#/paths/~1v1~1customers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/customer",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCustomers",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1customers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["test_clock"],
        inputSchemaPath:
          "#/paths/~1v1~1customers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/test_clock",
        responseSchemaPath:
          "#/components/schemas/customer/properties/test_clock",
        targets: [
          {
            resource: "test_helpers.test_clock",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/test_helpers.test_clock/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice_settings", "default_payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1customers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_settings/properties/default_payment_method",
        responseSchemaPath:
          "#/components/schemas/invoice_setting_customer_setting/properties/default_payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::CustomerBalanceTransaction": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::CustomerBalanceTransaction",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "customer_balance_transaction",
    schemaPath: "#/components/schemas/customer_balance_transaction",
    creations: [
      {
        operationId: "PostCustomersCustomerBalanceTransactions",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1balance_transactions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/customer_balance_transaction",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCustomersCustomerBalanceTransactions",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1customers~1%7Bcustomer%7D~1balance_transactions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::PaymentSource": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PaymentSource",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "payment_source",
    schemaPath: "#/components/schemas/payment_source",
    creations: [
      {
        operationId: "PostCustomersCustomerBankAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1bank_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_source",
      },
      {
        operationId: "PostCustomersCustomerCards",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1cards/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_source",
      },
      {
        operationId: "PostCustomersCustomerSources",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1sources/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_source",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCustomersCustomerBankAccounts",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
      {
        operationId: "PostCustomersCustomerCards",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
      {
        operationId: "PostCustomersCustomerSources",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1customers~1%7Bcustomer%7D~1bank_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::FundingInstructions": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::FundingInstructions",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "funding_instructions",
    schemaPath: "#/components/schemas/funding_instructions",
    creations: [
      {
        operationId: "PostCustomersCustomerFundingInstructions",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1funding_instructions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/funding_instructions",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostCustomersCustomerFundingInstructions",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1customers~1%7Bcustomer%7D~1funding_instructions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::Subscription": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Subscription",
    resource: "subscription",
    propsSchema: "StripeSubscriptionPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/SubscriptionId"],
    operations: {
      create: "PostSubscriptions",
      read: {
        operationId: "GetSubscriptionsSubscriptionExposedId",
        parameters: {
          subscription_exposed_id: "SubscriptionId",
        },
      },
      update: {
        operationId: "PostSubscriptionsSubscriptionExposedId",
        parameters: {
          subscription_exposed_id: "SubscriptionId",
        },
      },
      remove: {
        operationId: "DeleteSubscriptionsSubscriptionExposedId",
        parameters: {
          subscription_exposed_id: "SubscriptionId",
        },
      },
    },
    outputs: {
      SubscriptionId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/subscription/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "subscription",
    schemaPath: "#/components/schemas/subscription",
    creations: [
      {
        operationId: "PostCustomersCustomerSubscriptions",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/subscription",
      },
      {
        operationId: "PostSubscriptions",
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/subscription",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostSubscriptions",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostCustomersCustomerSubscriptions",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/subscription/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_payment_method",
        responseSchemaPath:
          "#/components/schemas/subscription/properties/default_payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_source"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_source",
        responseSchemaPath:
          "#/components/schemas/subscription/properties/default_source",
        targets: [
          {
            resource: "bank_account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/bank_account/properties/id",
          },
          {
            resource: "card",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/card/properties/id",
          },
          {
            resource: "source",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/source/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/subscription/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/transfer_data/properties/destination",
        responseSchemaPath:
          "#/components/schemas/subscription_transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["automatic_tax", "liability", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice_settings", "account_tax_ids", "*"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_settings/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/subscriptions_resource_subscription_invoice_settings/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice_settings", "issuer", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_settings/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["billing_schedules", "*", "applies_to", "*", "price"],
        inputSchemaPath:
          "#/paths/~1v1~1subscriptions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/billing_schedules/items/properties/applies_to/items/properties/price",
        responseSchemaPath:
          "#/components/schemas/subscriptions_resource_billing_schedules_applies_to/properties/price",
        targets: [
          {
            resource: "price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/price/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::TaxId": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TaxId",
    resource: "tax-id",
    propsSchema: "StripeTaxIdPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TaxIdId"],
    operations: {
      create: "PostTaxIds",
      read: {
        operationId: "GetTaxIdsId",
        parameters: {
          id: "TaxIdId",
        },
      },
      remove: {
        operationId: "DeleteTaxIdsId",
        parameters: {
          id: "TaxIdId",
        },
      },
    },
    outputs: {
      TaxIdId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/tax_id/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "tax_id",
    schemaPath: "#/components/schemas/tax_id",
    creations: [
      {
        operationId: "PostCustomersCustomerTaxIds",
        inputSchemaPath:
          "#/paths/~1v1~1customers~1%7Bcustomer%7D~1tax_ids/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax_id",
      },
      {
        operationId: "PostTaxIds",
        inputSchemaPath:
          "#/paths/~1v1~1tax_ids/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax_id",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTaxIds",
        reason:
          "No update operation matches the saved-identity resource path /v1/tax_ids/{id}",
      },
      {
        operationId: "PostTaxIds",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostCustomersCustomerTaxIds",
        reason:
          "Required creation parameters need relationship hints: customer",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tax_ids/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["owner", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1tax_ids/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/owner/properties/account",
        responseSchemaPath:
          "#/components/schemas/tax_i_ds_owner/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["owner", "customer"],
        inputSchemaPath:
          "#/paths/~1v1~1tax_ids/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/owner/properties/customer",
        responseSchemaPath:
          "#/components/schemas/tax_i_ds_owner/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::EntitlementsFeature": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::EntitlementsFeature",
    resource: "entitlements-feature",
    propsSchema: "StripeEntitlementsFeaturePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/EntitlementsFeatureId"],
    operations: {
      create: "PostEntitlementsFeatures",
      read: {
        operationId: "GetEntitlementsFeaturesId",
        parameters: {
          id: "EntitlementsFeatureId",
        },
      },
      update: {
        operationId: "PostEntitlementsFeaturesId",
        parameters: {
          id: "EntitlementsFeatureId",
        },
      },
    },
    outputs: {
      EntitlementsFeatureId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/entitlements.feature/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "entitlements.feature",
    schemaPath: "#/components/schemas/entitlements.feature",
    creations: [
      {
        operationId: "PostEntitlementsFeatures",
        inputSchemaPath:
          "#/paths/~1v1~1entitlements~1features/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/entitlements.feature",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostEntitlementsFeatures",
        reason:
          "No remove operation matches the saved-identity resource path /v1/entitlements/features/{id}",
      },
      {
        operationId: "PostEntitlementsFeatures",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1entitlements~1features/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::EphemeralKey": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::EphemeralKey",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "ephemeral_key",
    schemaPath: "#/components/schemas/ephemeral_key",
    creations: [
      {
        operationId: "PostEphemeralKeys",
        inputSchemaPath:
          "#/paths/~1v1~1ephemeral_keys/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/ephemeral_key",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostEphemeralKeys",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1ephemeral_keys/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::FileLink": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::FileLink",
    resource: "file-link",
    propsSchema: "StripeFileLinkPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/FileLinkId"],
    operations: {
      create: "PostFileLinks",
      read: {
        operationId: "GetFileLinksLink",
        parameters: {
          link: "FileLinkId",
        },
      },
      update: {
        operationId: "PostFileLinksLink",
        parameters: {
          link: "FileLinkId",
        },
      },
    },
    outputs: {
      FileLinkId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/file_link/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "file_link",
    schemaPath: "#/components/schemas/file_link",
    creations: [
      {
        operationId: "PostFileLinks",
        inputSchemaPath:
          "#/paths/~1v1~1file_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/file_link",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostFileLinks",
        reason:
          "No remove operation matches the saved-identity resource path /v1/file_links/{link}",
      },
      {
        operationId: "PostFileLinks",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1file_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["file"],
        inputSchemaPath:
          "#/paths/~1v1~1file_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/file",
        responseSchemaPath: "#/components/schemas/file_link/properties/file",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::File": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::File",
    resource: "file",
    propsSchema: "StripeFilePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/FileId"],
    outputs: {
      FileId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/file/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "file",
    schemaPath: "#/components/schemas/file",
    creations: [
      {
        operationId: "PostFiles",
        inputSchemaPath:
          "#/paths/~1v1~1files/post/requestBody/content/multipart~1form-data/schema",
        responseSchemaPath: "#/components/schemas/file",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostFiles",
        reason:
          "No update operation matches the saved-identity resource path /v1/files/{file}",
      },
      {
        operationId: "PostFiles",
        reason:
          "No remove operation matches the saved-identity resource path /v1/files/{file}",
      },
      {
        operationId: "PostFiles",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostFiles",
        reason:
          "StripeClient does not support the declared request encoding: multipart/form-data",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1files/post/requestBody/content/multipart~1form-data/schema",
    relationships: [],
  },
  "Stripe::Billing::FinancialConnectionsSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::FinancialConnectionsSession",
    resource: "financial-connections-session",
    propsSchema: "StripeFinancialConnectionsSessionPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/FinancialConnectionsSessionId"],
    operations: {
      create: "PostFinancialConnectionsSessions",
      read: {
        operationId: "GetFinancialConnectionsSessionsSession",
        parameters: {
          session: "FinancialConnectionsSessionId",
        },
      },
    },
    outputs: {
      FinancialConnectionsSessionId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/financial_connections.session/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "financial_connections.session",
    schemaPath: "#/components/schemas/financial_connections.session",
    creations: [
      {
        operationId: "PostFinancialConnectionsSessions",
        inputSchemaPath:
          "#/paths/~1v1~1financial_connections~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath:
          "#/components/schemas/financial_connections.session",
      },
      {
        operationId: "PostLinkAccountSessions",
        inputSchemaPath:
          "#/paths/~1v1~1link_account_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath:
          "#/components/schemas/financial_connections.session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostFinancialConnectionsSessions",
        reason:
          "No update operation matches the saved-identity resource path /v1/financial_connections/sessions/{session}",
      },
      {
        operationId: "PostFinancialConnectionsSessions",
        reason:
          "No remove operation matches the saved-identity resource path /v1/financial_connections/sessions/{session}",
      },
      {
        operationId: "PostFinancialConnectionsSessions",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1financial_connections~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["account_holder", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1financial_connections~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/account_holder/properties/account",
        responseSchemaPath:
          "#/components/schemas/bank_connections_resource_accountholder/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["account_holder", "customer"],
        inputSchemaPath:
          "#/paths/~1v1~1financial_connections~1sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/account_holder/properties/customer",
        responseSchemaPath:
          "#/components/schemas/bank_connections_resource_accountholder/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::ForwardingRequest": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ForwardingRequest",
    resource: "forwarding-request",
    propsSchema: "StripeForwardingRequestPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ForwardingRequestId"],
    operations: {
      create: "PostForwardingRequests",
      read: {
        operationId: "GetForwardingRequestsId",
        parameters: {
          id: "ForwardingRequestId",
        },
      },
    },
    outputs: {
      ForwardingRequestId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/forwarding.request/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "forwarding.request",
    schemaPath: "#/components/schemas/forwarding.request",
    creations: [
      {
        operationId: "PostForwardingRequests",
        inputSchemaPath:
          "#/paths/~1v1~1forwarding~1requests/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/forwarding.request",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostForwardingRequests",
        reason:
          "No update operation matches the saved-identity resource path /v1/forwarding/requests/{id}",
      },
      {
        operationId: "PostForwardingRequests",
        reason:
          "No remove operation matches the saved-identity resource path /v1/forwarding/requests/{id}",
      },
      {
        operationId: "PostForwardingRequests",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1forwarding~1requests/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::IdentityVerificationSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IdentityVerificationSession",
    resource: "identity-verification-session",
    propsSchema: "StripeIdentityVerificationSessionPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IdentityVerificationSessionId"],
    operations: {
      create: "PostIdentityVerificationSessions",
      read: {
        operationId: "GetIdentityVerificationSessionsSession",
        parameters: {
          session: "IdentityVerificationSessionId",
        },
      },
      update: {
        operationId: "PostIdentityVerificationSessionsSession",
        parameters: {
          session: "IdentityVerificationSessionId",
        },
      },
    },
    outputs: {
      IdentityVerificationSessionId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/identity.verification_session/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "identity.verification_session",
    schemaPath: "#/components/schemas/identity.verification_session",
    creations: [
      {
        operationId: "PostIdentityVerificationSessions",
        inputSchemaPath:
          "#/paths/~1v1~1identity~1verification_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath:
          "#/components/schemas/identity.verification_session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostIdentityVerificationSessions",
        reason:
          "No remove operation matches the saved-identity resource path /v1/identity/verification_sessions/{session}",
      },
      {
        operationId: "PostIdentityVerificationSessions",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1identity~1verification_sessions/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::Invoiceitem": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Invoiceitem",
    resource: "invoiceitem",
    propsSchema: "StripeInvoiceitemPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/InvoiceitemId"],
    operations: {
      create: "PostInvoiceitems",
      read: {
        operationId: "GetInvoiceitemsInvoiceitem",
        parameters: {
          invoiceitem: "InvoiceitemId",
        },
      },
      update: {
        operationId: "PostInvoiceitemsInvoiceitem",
        parameters: {
          invoiceitem: "InvoiceitemId",
        },
      },
      remove: {
        operationId: "DeleteInvoiceitemsInvoiceitem",
        parameters: {
          invoiceitem: "InvoiceitemId",
        },
      },
    },
    outputs: {
      InvoiceitemId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/invoiceitem/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "invoiceitem",
    schemaPath: "#/components/schemas/invoiceitem",
    creations: [
      {
        operationId: "PostInvoiceitems",
        inputSchemaPath:
          "#/paths/~1v1~1invoiceitems/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/invoiceitem",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostInvoiceitems",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1invoiceitems/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1invoiceitems/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/invoiceitem/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice"],
        inputSchemaPath:
          "#/paths/~1v1~1invoiceitems/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice",
        responseSchemaPath:
          "#/components/schemas/invoiceitem/properties/invoice",
        targets: [
          {
            resource: "invoice",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/invoice/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1invoiceitems/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Invoice": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Invoice",
    resource: "invoice",
    propsSchema: "StripeInvoicePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/InvoiceId"],
    operations: {
      create: "PostInvoices",
      read: {
        operationId: "GetInvoicesInvoice",
        parameters: {
          invoice: "InvoiceId",
        },
      },
      update: {
        operationId: "PostInvoicesInvoice",
        parameters: {
          invoice: "InvoiceId",
        },
      },
      remove: {
        operationId: "DeleteInvoicesInvoice",
        parameters: {
          invoice: "InvoiceId",
        },
      },
    },
    outputs: {
      InvoiceId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description:
            "Unique identifier for the object. For preview invoices created using the [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint, this id will be prefixed with `upcoming_in`.",
        },
        schemaPath: "#/components/schemas/invoice/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "invoice",
    schemaPath: "#/components/schemas/invoice",
    creations: [
      {
        operationId: "PostInvoices",
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/invoice",
      },
      {
        operationId: "PostInvoicesCreatePreview",
        inputSchemaPath:
          "#/paths/~1v1~1invoices~1create_preview/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/invoice",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostInvoices",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostInvoicesCreatePreview",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath: "#/components/schemas/invoice/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_payment_method",
        responseSchemaPath:
          "#/components/schemas/invoice/properties/default_payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_source"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_source",
        responseSchemaPath:
          "#/components/schemas/invoice/properties/default_source",
        targets: [
          {
            resource: "bank_account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/bank_account/properties/id",
          },
          {
            resource: "card",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/card/properties/id",
          },
          {
            resource: "source",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/source/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/invoice/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["account_tax_ids", "*"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/invoice/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["from_invoice", "invoice"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/from_invoice/properties/invoice",
        responseSchemaPath:
          "#/components/schemas/invoices_resource_from_invoice/properties/invoice",
        targets: [
          {
            resource: "invoice",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/invoice/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["issuer", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["shipping_cost", "shipping_rate"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/shipping_cost/properties/shipping_rate",
        responseSchemaPath:
          "#/components/schemas/invoices_resource_shipping_cost/properties/shipping_rate",
        targets: [
          {
            resource: "shipping_rate",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/shipping_rate/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["automatic_tax", "liability", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1invoices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/deleted_discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::IssuingCardholder": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingCardholder",
    resource: "issuing-cardholder",
    propsSchema: "StripeIssuingCardholderPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingCardholderId"],
    operations: {
      create: "PostIssuingCardholders",
      read: {
        operationId: "GetIssuingCardholdersCardholder",
        parameters: {
          cardholder: "IssuingCardholderId",
        },
      },
      update: {
        operationId: "PostIssuingCardholdersCardholder",
        parameters: {
          cardholder: "IssuingCardholderId",
        },
      },
    },
    outputs: {
      IssuingCardholderId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/issuing.cardholder/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "issuing.cardholder",
    schemaPath: "#/components/schemas/issuing.cardholder",
    creations: [
      {
        operationId: "PostIssuingCardholders",
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1cardholders/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.cardholder",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostIssuingCardholders",
        reason:
          "No remove operation matches the saved-identity resource path /v1/issuing/cardholders/{cardholder}",
      },
      {
        operationId: "PostIssuingCardholders",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1issuing~1cardholders/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["individual", "verification", "document", "back"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1cardholders/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/individual/properties/verification/properties/document/properties/back",
        responseSchemaPath:
          "#/components/schemas/issuing_cardholder_id_document/properties/back",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["individual", "verification", "document", "front"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1cardholders/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/individual/properties/verification/properties/document/properties/front",
        responseSchemaPath:
          "#/components/schemas/issuing_cardholder_id_document/properties/front",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::IssuingCard": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingCard",
    resource: "issuing-card",
    propsSchema: "StripeIssuingCardPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingCardId"],
    operations: {
      create: "PostIssuingCards",
      read: {
        operationId: "GetIssuingCardsCard",
        parameters: {
          card: "IssuingCardId",
        },
      },
      update: {
        operationId: "PostIssuingCardsCard",
        parameters: {
          card: "IssuingCardId",
        },
      },
    },
    outputs: {
      IssuingCardId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/issuing.card/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "issuing.card",
    schemaPath: "#/components/schemas/issuing.card",
    creations: [
      {
        operationId: "PostIssuingCards",
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1cards/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.card",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostIssuingCards",
        reason:
          "No remove operation matches the saved-identity resource path /v1/issuing/cards/{card}",
      },
      {
        operationId: "PostIssuingCards",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1issuing~1cards/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["personalization_design"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1cards/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/personalization_design",
        responseSchemaPath:
          "#/components/schemas/issuing.card/properties/personalization_design",
        targets: [
          {
            resource: "issuing.personalization_design",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/issuing.personalization_design/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["replacement_for"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1cards/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/replacement_for",
        responseSchemaPath:
          "#/components/schemas/issuing.card/properties/replacement_for",
        targets: [
          {
            resource: "issuing.card",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/issuing.card/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::IssuingDispute": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingDispute",
    resource: "issuing-dispute",
    propsSchema: "StripeIssuingDisputePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingDisputeId"],
    operations: {
      create: "PostIssuingDisputes",
      read: {
        operationId: "GetIssuingDisputesDispute",
        parameters: {
          dispute: "IssuingDisputeId",
        },
      },
      update: {
        operationId: "PostIssuingDisputesDispute",
        parameters: {
          dispute: "IssuingDisputeId",
        },
      },
    },
    outputs: {
      IssuingDisputeId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/issuing.dispute/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "issuing.dispute",
    schemaPath: "#/components/schemas/issuing.dispute",
    creations: [
      {
        operationId: "PostIssuingDisputes",
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.dispute",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostIssuingDisputes",
        reason:
          "No remove operation matches the saved-identity resource path /v1/issuing/disputes/{dispute}",
      },
      {
        operationId: "PostIssuingDisputes",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["transaction"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/transaction",
        responseSchemaPath:
          "#/components/schemas/issuing.dispute/properties/transaction",
        targets: [
          {
            resource: "issuing.transaction",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/issuing.transaction/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "canceled", "additional_documentation"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/canceled/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_canceled_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "duplicate", "additional_documentation"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/duplicate/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_duplicate_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "duplicate", "card_statement"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/duplicate/anyOf/0/properties/card_statement",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_duplicate_evidence/properties/card_statement",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "duplicate", "cash_receipt"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/duplicate/anyOf/0/properties/cash_receipt",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_duplicate_evidence/properties/cash_receipt",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "duplicate", "check_image"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/duplicate/anyOf/0/properties/check_image",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_duplicate_evidence/properties/check_image",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "fraudulent", "additional_documentation"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/fraudulent/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_fraudulent_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "evidence",
          "merchandise_not_as_described",
          "additional_documentation",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/merchandise_not_as_described/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_merchandise_not_as_described_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "evidence",
          "no_valid_authorization",
          "additional_documentation",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/no_valid_authorization/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_no_valid_authorization_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "not_received", "additional_documentation"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/not_received/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_not_received_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["evidence", "other", "additional_documentation"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/other/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_other_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "evidence",
          "service_not_as_described",
          "additional_documentation",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1disputes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/evidence/properties/service_not_as_described/anyOf/0/properties/additional_documentation",
        responseSchemaPath:
          "#/components/schemas/issuing_dispute_service_not_as_described_evidence/properties/additional_documentation",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::IssuingPersonalizationDesign": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingPersonalizationDesign",
    resource: "issuing-personalization-design",
    propsSchema: "StripeIssuingPersonalizationDesignPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingPersonalizationDesignId"],
    operations: {
      create: "PostIssuingPersonalizationDesigns",
      read: {
        operationId: "GetIssuingPersonalizationDesignsPersonalizationDesign",
        parameters: {
          personalization_design: "IssuingPersonalizationDesignId",
        },
      },
      update: {
        operationId: "PostIssuingPersonalizationDesignsPersonalizationDesign",
        parameters: {
          personalization_design: "IssuingPersonalizationDesignId",
        },
      },
    },
    outputs: {
      IssuingPersonalizationDesignId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/issuing.personalization_design/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "issuing.personalization_design",
    schemaPath: "#/components/schemas/issuing.personalization_design",
    creations: [
      {
        operationId: "PostIssuingPersonalizationDesigns",
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1personalization_designs/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath:
          "#/components/schemas/issuing.personalization_design",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostIssuingPersonalizationDesigns",
        reason:
          "No remove operation matches the saved-identity resource path /v1/issuing/personalization_designs/{personalization_design}",
      },
      {
        operationId: "PostIssuingPersonalizationDesigns",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1issuing~1personalization_designs/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["card_logo"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1personalization_designs/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/card_logo",
        responseSchemaPath:
          "#/components/schemas/issuing.personalization_design/properties/card_logo",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["physical_bundle"],
        inputSchemaPath:
          "#/paths/~1v1~1issuing~1personalization_designs/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/physical_bundle",
        responseSchemaPath:
          "#/components/schemas/issuing.personalization_design/properties/physical_bundle",
        targets: [
          {
            resource: "issuing.physical_bundle",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/issuing.physical_bundle/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::PaymentIntent": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PaymentIntent",
    resource: "payment-intent",
    propsSchema: "StripePaymentIntentPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentIntentId"],
    operations: {
      create: "PostPaymentIntents",
      read: {
        operationId: "GetPaymentIntentsIntent",
        parameters: {
          intent: "PaymentIntentId",
        },
      },
      update: {
        operationId: "PostPaymentIntentsIntent",
        parameters: {
          intent: "PaymentIntentId",
        },
      },
    },
    outputs: {
      PaymentIntentId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/payment_intent/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "payment_intent",
    schemaPath: "#/components/schemas/payment_intent",
    creations: [
      {
        operationId: "PostPaymentIntents",
        inputSchemaPath:
          "#/paths/~1v1~1payment_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_intent",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPaymentIntents",
        reason:
          "No remove operation matches the saved-identity resource path /v1/payment_intents/{intent}",
      },
      {
        operationId: "PostPaymentIntents",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1payment_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/payment_intent/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/payment_intent/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/payment_method",
        responseSchemaPath:
          "#/components/schemas/payment_intent/properties/payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/transfer_data/properties/destination",
        responseSchemaPath:
          "#/components/schemas/transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::PaymentLink": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PaymentLink",
    resource: "payment-link",
    propsSchema: "StripePaymentLinkPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentLinkId"],
    operations: {
      create: "PostPaymentLinks",
      read: {
        operationId: "GetPaymentLinksPaymentLink",
        parameters: {
          payment_link: "PaymentLinkId",
        },
      },
      update: {
        operationId: "PostPaymentLinksPaymentLink",
        parameters: {
          payment_link: "PaymentLinkId",
        },
      },
    },
    outputs: {
      PaymentLinkId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/payment_link/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "payment_link",
    schemaPath: "#/components/schemas/payment_link",
    creations: [
      {
        operationId: "PostPaymentLinks",
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_link",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPaymentLinks",
        reason:
          "No remove operation matches the saved-identity resource path /v1/payment_links/{payment_link}",
      },
      {
        operationId: "PostPaymentLinks",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/payment_link/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/transfer_data/properties/destination",
        responseSchemaPath:
          "#/components/schemas/payment_links_resource_transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["automatic_tax", "liability", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["shipping_options", "*", "shipping_rate"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/shipping_options/items/properties/shipping_rate",
        responseSchemaPath:
          "#/components/schemas/payment_links_resource_shipping_option/properties/shipping_rate",
        targets: [
          {
            resource: "shipping_rate",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/shipping_rate/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "invoice_creation",
          "invoice_data",
          "account_tax_ids",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_creation/properties/invoice_data/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/payment_links_resource_invoice_settings/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice_creation", "invoice_data", "issuer", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_creation/properties/invoice_data/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "subscription_data",
          "invoice_settings",
          "account_tax_ids",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/subscription_data/properties/invoice_settings/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/payment_links_resource_subscription_data_invoice_settings/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "subscription_data",
          "invoice_settings",
          "issuer",
          "account",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1payment_links/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/subscription_data/properties/invoice_settings/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::PaymentMethodConfiguration": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PaymentMethodConfiguration",
    resource: "payment-method-configuration",
    propsSchema: "StripePaymentMethodConfigurationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentMethodConfigurationId"],
    operations: {
      create: "PostPaymentMethodConfigurations",
      read: {
        operationId: "GetPaymentMethodConfigurationsConfiguration",
        parameters: {
          configuration: "PaymentMethodConfigurationId",
        },
      },
      update: {
        operationId: "PostPaymentMethodConfigurationsConfiguration",
        parameters: {
          configuration: "PaymentMethodConfigurationId",
        },
      },
    },
    outputs: {
      PaymentMethodConfigurationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/payment_method_configuration/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "payment_method_configuration",
    schemaPath: "#/components/schemas/payment_method_configuration",
    creations: [
      {
        operationId: "PostPaymentMethodConfigurations",
        inputSchemaPath:
          "#/paths/~1v1~1payment_method_configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_method_configuration",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPaymentMethodConfigurations",
        reason:
          "No remove operation matches the saved-identity resource path /v1/payment_method_configurations/{configuration}",
      },
      {
        operationId: "PostPaymentMethodConfigurations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1payment_method_configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::PaymentMethodDomain": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PaymentMethodDomain",
    resource: "payment-method-domain",
    propsSchema: "StripePaymentMethodDomainPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentMethodDomainId"],
    operations: {
      create: "PostPaymentMethodDomains",
      read: {
        operationId: "GetPaymentMethodDomainsPaymentMethodDomain",
        parameters: {
          payment_method_domain: "PaymentMethodDomainId",
        },
      },
      update: {
        operationId: "PostPaymentMethodDomainsPaymentMethodDomain",
        parameters: {
          payment_method_domain: "PaymentMethodDomainId",
        },
      },
    },
    outputs: {
      PaymentMethodDomainId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/payment_method_domain/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "payment_method_domain",
    schemaPath: "#/components/schemas/payment_method_domain",
    creations: [
      {
        operationId: "PostPaymentMethodDomains",
        inputSchemaPath:
          "#/paths/~1v1~1payment_method_domains/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_method_domain",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPaymentMethodDomains",
        reason:
          "No remove operation matches the saved-identity resource path /v1/payment_method_domains/{payment_method_domain}",
      },
      {
        operationId: "PostPaymentMethodDomains",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1payment_method_domains/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::PaymentMethod": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PaymentMethod",
    resource: "payment-method",
    propsSchema: "StripePaymentMethodPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentMethodId"],
    operations: {
      create: "PostPaymentMethods",
      read: {
        operationId: "GetPaymentMethodsPaymentMethod",
        parameters: {
          payment_method: "PaymentMethodId",
        },
      },
      update: {
        operationId: "PostPaymentMethodsPaymentMethod",
        parameters: {
          payment_method: "PaymentMethodId",
        },
      },
    },
    outputs: {
      PaymentMethodId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/payment_method/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "payment_method",
    schemaPath: "#/components/schemas/payment_method",
    creations: [
      {
        operationId: "PostPaymentMethods",
        inputSchemaPath:
          "#/paths/~1v1~1payment_methods/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payment_method",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPaymentMethods",
        reason:
          "No remove operation matches the saved-identity resource path /v1/payment_methods/{payment_method}",
      },
      {
        operationId: "PostPaymentMethods",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1payment_methods/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1payment_methods/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/payment_method/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Payout": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Payout",
    resource: "payout",
    propsSchema: "StripePayoutPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PayoutId"],
    operations: {
      create: "PostPayouts",
      read: {
        operationId: "GetPayoutsPayout",
        parameters: {
          payout: "PayoutId",
        },
      },
      update: {
        operationId: "PostPayoutsPayout",
        parameters: {
          payout: "PayoutId",
        },
      },
    },
    outputs: {
      PayoutId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/payout/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "payout",
    schemaPath: "#/components/schemas/payout",
    creations: [
      {
        operationId: "PostPayouts",
        inputSchemaPath:
          "#/paths/~1v1~1payouts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/payout",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPayouts",
        reason:
          "No remove operation matches the saved-identity resource path /v1/payouts/{payout}",
      },
      {
        operationId: "PostPayouts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1payouts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["destination"],
        inputSchemaPath:
          "#/paths/~1v1~1payouts/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/destination",
        responseSchemaPath:
          "#/components/schemas/payout/properties/destination",
        targets: [
          {
            resource: "bank_account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/bank_account/properties/id",
          },
          {
            resource: "card",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/card/properties/id",
          },
          {
            resource: "deleted_bank_account",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/deleted_bank_account/properties/id",
          },
          {
            resource: "deleted_card",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_card/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Plan": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Plan",
    resource: "plan",
    propsSchema: "StripePlanPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PlanId"],
    operations: {
      create: "PostPlans",
      read: {
        operationId: "GetPlansPlan",
        parameters: {
          plan: "PlanId",
        },
      },
      update: {
        operationId: "PostPlansPlan",
        parameters: {
          plan: "PlanId",
        },
      },
      remove: {
        operationId: "DeletePlansPlan",
        parameters: {
          plan: "PlanId",
        },
      },
    },
    outputs: {
      PlanId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/plan/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "plan",
    schemaPath: "#/components/schemas/plan",
    creations: [
      {
        operationId: "PostPlans",
        inputSchemaPath:
          "#/paths/~1v1~1plans/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/plan",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPlans",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1plans/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["product"],
        inputSchemaPath:
          "#/paths/~1v1~1plans/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/product",
        responseSchemaPath: "#/components/schemas/plan/properties/product",
        targets: [
          {
            resource: "product",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/product/properties/id",
          },
          {
            resource: "deleted_product",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_product/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["product", "tax_code"],
        inputSchemaPath:
          "#/paths/~1v1~1plans/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/product/anyOf/0/properties/tax_code",
        responseSchemaPath: "#/components/schemas/product/properties/tax_code",
        targets: [
          {
            resource: "tax_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Price": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Price",
    resource: "price",
    propsSchema: "StripePricePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PriceId"],
    operations: {
      create: "PostPrices",
      read: {
        operationId: "GetPricesPrice",
        parameters: {
          price: "PriceId",
        },
      },
      update: {
        operationId: "PostPricesPrice",
        parameters: {
          price: "PriceId",
        },
      },
      remove: {
        operationId: "PostPricesPrice",
        parameters: {
          price: "PriceId",
        },
        values: {
          active: false,
          lookup_key: "",
        },
      },
    },
    replacement: {
      order: "destroyBeforeCreate",
    },
    outputs: {
      PriceId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/price/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "price",
    schemaPath: "#/components/schemas/price",
    creations: [
      {
        operationId: "PostPrices",
        inputSchemaPath:
          "#/paths/~1v1~1prices/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/price",
      },
    ],
    bindingIssues: [],
    inputSchemaPath:
      "#/paths/~1v1~1prices/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["product"],
        inputSchemaPath:
          "#/paths/~1v1~1prices/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/product",
        responseSchemaPath: "#/components/schemas/price/properties/product",
        targets: [
          {
            resource: "product",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/product/properties/id",
          },
          {
            resource: "deleted_product",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_product/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::ProductCatalogTrialOffer": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ProductCatalogTrialOffer",
    resource: "product-catalog-trial-offer",
    propsSchema: "StripeProductCatalogTrialOfferPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ProductCatalogTrialOfferId"],
    operations: {
      create: "PostProductCatalogTrialOffers",
      read: {
        operationId: "GetProductCatalogTrialOffersId",
        parameters: {
          id: "ProductCatalogTrialOfferId",
        },
      },
      update: {
        operationId: "PostProductCatalogTrialOffersId",
        parameters: {
          id: "ProductCatalogTrialOfferId",
        },
      },
    },
    outputs: {
      ProductCatalogTrialOfferId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/product_catalog.trial_offer/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "product_catalog.trial_offer",
    schemaPath: "#/components/schemas/product_catalog.trial_offer",
    creations: [
      {
        operationId: "PostProductCatalogTrialOffers",
        inputSchemaPath:
          "#/paths/~1v1~1product_catalog~1trial_offers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/product_catalog.trial_offer",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostProductCatalogTrialOffers",
        reason:
          "No remove operation matches the saved-identity resource path /v1/product_catalog/trial_offers/{id}",
      },
      {
        operationId: "PostProductCatalogTrialOffers",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1product_catalog~1trial_offers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["price"],
        inputSchemaPath:
          "#/paths/~1v1~1product_catalog~1trial_offers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/price",
        responseSchemaPath:
          "#/components/schemas/product_catalog.trial_offer/properties/price",
        targets: [
          {
            resource: "price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/price/properties/id",
          },
          {
            resource: "deleted_price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_price/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["end_behavior", "transition", "price"],
        inputSchemaPath:
          "#/paths/~1v1~1product_catalog~1trial_offers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/end_behavior/properties/transition/properties/price",
        responseSchemaPath:
          "#/components/schemas/product_catalog_impl_endpoints_trial_offer_resource_transition/properties/price",
        targets: [
          {
            resource: "price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/price/properties/id",
          },
          {
            resource: "deleted_price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_price/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Product": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Product",
    resource: "product",
    propsSchema: "StripeProductPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ProductId"],
    operations: {
      create: "PostProducts",
      read: {
        operationId: "GetProductsId",
        parameters: {
          id: "ProductId",
        },
      },
      update: {
        operationId: "PostProductsId",
        parameters: {
          id: "ProductId",
        },
      },
      remove: {
        operationId: "PostProductsId",
        parameters: {
          id: "ProductId",
        },
        values: {
          active: false,
        },
      },
    },
    outputs: {
      ProductId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/product/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "product",
    schemaPath: "#/components/schemas/product",
    creations: [
      {
        operationId: "PostProducts",
        inputSchemaPath:
          "#/paths/~1v1~1products/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/product",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostProducts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1products/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["tax_code"],
        inputSchemaPath:
          "#/paths/~1v1~1products/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/tax_code",
        responseSchemaPath: "#/components/schemas/product/properties/tax_code",
        targets: [
          {
            resource: "tax_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::PromotionCode": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PromotionCode",
    resource: "promotion-code",
    propsSchema: "StripePromotionCodePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PromotionCodeId"],
    operations: {
      create: "PostPromotionCodes",
      read: {
        operationId: "GetPromotionCodesPromotionCode",
        parameters: {
          promotion_code: "PromotionCodeId",
        },
      },
      update: {
        operationId: "PostPromotionCodesPromotionCode",
        parameters: {
          promotion_code: "PromotionCodeId",
        },
      },
    },
    outputs: {
      PromotionCodeId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/promotion_code/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "promotion_code",
    schemaPath: "#/components/schemas/promotion_code",
    creations: [
      {
        operationId: "PostPromotionCodes",
        inputSchemaPath:
          "#/paths/~1v1~1promotion_codes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/promotion_code",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostPromotionCodes",
        reason:
          "No remove operation matches the saved-identity resource path /v1/promotion_codes/{promotion_code}",
      },
      {
        operationId: "PostPromotionCodes",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1promotion_codes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1promotion_codes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/promotion_code/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["promotion", "coupon"],
        inputSchemaPath:
          "#/paths/~1v1~1promotion_codes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/promotion/properties/coupon",
        responseSchemaPath:
          "#/components/schemas/promotion_codes_resource_promotion/properties/coupon",
        targets: [
          {
            resource: "coupon",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/coupon/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Quote": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Quote",
    resource: "quote",
    propsSchema: "StripeQuotePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/QuoteId"],
    operations: {
      create: "PostQuotes",
      read: {
        operationId: "GetQuotesQuote",
        parameters: {
          quote: "QuoteId",
        },
      },
      update: {
        operationId: "PostQuotesQuote",
        parameters: {
          quote: "QuoteId",
        },
      },
    },
    outputs: {
      QuoteId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/quote/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "quote",
    schemaPath: "#/components/schemas/quote",
    creations: [
      {
        operationId: "PostQuotes",
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/quote",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostQuotes",
        reason:
          "No remove operation matches the saved-identity resource path /v1/quotes/{quote}",
      },
      {
        operationId: "PostQuotes",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath: "#/components/schemas/quote/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/quote/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["test_clock"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/test_clock",
        responseSchemaPath: "#/components/schemas/quote/properties/test_clock",
        targets: [
          {
            resource: "test_helpers.test_clock",
            propertyPath: "/properties/id",
            schemaPath:
              "#/components/schemas/test_helpers.test_clock/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_tax_rates", "*"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_tax_rates/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/quote/properties/default_tax_rates/items",
        targets: [
          {
            resource: "tax_rate",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_rate/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["from_quote", "quote"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/from_quote/properties/quote",
        responseSchemaPath:
          "#/components/schemas/quotes_resource_from_quote/properties/quote",
        targets: [
          {
            resource: "quote",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/quote/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/transfer_data/anyOf/0/properties/destination",
        responseSchemaPath:
          "#/components/schemas/quotes_resource_transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["automatic_tax", "liability", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["invoice_settings", "issuer", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1quotes/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/invoice_settings/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::RadarPaymentEvaluation": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::RadarPaymentEvaluation",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "radar.payment_evaluation",
    schemaPath: "#/components/schemas/radar.payment_evaluation",
    creations: [
      {
        operationId: "PostRadarPaymentEvaluations",
        inputSchemaPath:
          "#/paths/~1v1~1radar~1payment_evaluations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/radar.payment_evaluation",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostRadarPaymentEvaluations",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1radar~1payment_evaluations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::RadarValueListItem": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::RadarValueListItem",
    resource: "radar-value-list-item",
    propsSchema: "StripeRadarValueListItemPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/RadarValueListItemId"],
    operations: {
      create: "PostRadarValueListItems",
      read: {
        operationId: "GetRadarValueListItemsItem",
        parameters: {
          item: "RadarValueListItemId",
        },
      },
      remove: {
        operationId: "DeleteRadarValueListItemsItem",
        parameters: {
          item: "RadarValueListItemId",
        },
      },
    },
    outputs: {
      RadarValueListItemId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/radar.value_list_item/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "radar.value_list_item",
    schemaPath: "#/components/schemas/radar.value_list_item",
    creations: [
      {
        operationId: "PostRadarValueListItems",
        inputSchemaPath:
          "#/paths/~1v1~1radar~1value_list_items/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/radar.value_list_item",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostRadarValueListItems",
        reason:
          "No update operation matches the saved-identity resource path /v1/radar/value_list_items/{item}",
      },
      {
        operationId: "PostRadarValueListItems",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1radar~1value_list_items/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::RadarValueList": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::RadarValueList",
    resource: "radar-value-list",
    propsSchema: "StripeRadarValueListPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/RadarValueListId"],
    operations: {
      create: "PostRadarValueLists",
      read: {
        operationId: "GetRadarValueListsValueList",
        parameters: {
          value_list: "RadarValueListId",
        },
      },
      update: {
        operationId: "PostRadarValueListsValueList",
        parameters: {
          value_list: "RadarValueListId",
        },
      },
      remove: {
        operationId: "DeleteRadarValueListsValueList",
        parameters: {
          value_list: "RadarValueListId",
        },
      },
    },
    outputs: {
      RadarValueListId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/radar.value_list/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "radar.value_list",
    schemaPath: "#/components/schemas/radar.value_list",
    creations: [
      {
        operationId: "PostRadarValueLists",
        inputSchemaPath:
          "#/paths/~1v1~1radar~1value_lists/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/radar.value_list",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostRadarValueLists",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1radar~1value_lists/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::ReportingReportRun": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ReportingReportRun",
    resource: "reporting-report-run",
    propsSchema: "StripeReportingReportRunPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ReportingReportRunId"],
    operations: {
      create: "PostReportingReportRuns",
      read: {
        operationId: "GetReportingReportRunsReportRun",
        parameters: {
          report_run: "ReportingReportRunId",
        },
      },
    },
    outputs: {
      ReportingReportRunId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/reporting.report_run/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "reporting.report_run",
    schemaPath: "#/components/schemas/reporting.report_run",
    creations: [
      {
        operationId: "PostReportingReportRuns",
        inputSchemaPath:
          "#/paths/~1v1~1reporting~1report_runs/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/reporting.report_run",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostReportingReportRuns",
        reason:
          "No update operation matches the saved-identity resource path /v1/reporting/report_runs/{report_run}",
      },
      {
        operationId: "PostReportingReportRuns",
        reason:
          "No remove operation matches the saved-identity resource path /v1/reporting/report_runs/{report_run}",
      },
      {
        operationId: "PostReportingReportRuns",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1reporting~1report_runs/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::SetupIntent": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::SetupIntent",
    resource: "setup-intent",
    propsSchema: "StripeSetupIntentPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/SetupIntentId"],
    operations: {
      create: "PostSetupIntents",
      read: {
        operationId: "GetSetupIntentsIntent",
        parameters: {
          intent: "SetupIntentId",
        },
      },
      update: {
        operationId: "PostSetupIntentsIntent",
        parameters: {
          intent: "SetupIntentId",
        },
      },
    },
    outputs: {
      SetupIntentId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/setup_intent/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "setup_intent",
    schemaPath: "#/components/schemas/setup_intent",
    creations: [
      {
        operationId: "PostSetupIntents",
        inputSchemaPath:
          "#/paths/~1v1~1setup_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/setup_intent",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostSetupIntents",
        reason:
          "No remove operation matches the saved-identity resource path /v1/setup_intents/{intent}",
      },
      {
        operationId: "PostSetupIntents",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1setup_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1setup_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/setup_intent/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1setup_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/setup_intent/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1setup_intents/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/payment_method",
        responseSchemaPath:
          "#/components/schemas/setup_intent/properties/payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::ShippingRate": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ShippingRate",
    resource: "shipping-rate",
    propsSchema: "StripeShippingRatePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ShippingRateId"],
    operations: {
      create: "PostShippingRates",
      read: {
        operationId: "GetShippingRatesShippingRateToken",
        parameters: {
          shipping_rate_token: "ShippingRateId",
        },
      },
      update: {
        operationId: "PostShippingRatesShippingRateToken",
        parameters: {
          shipping_rate_token: "ShippingRateId",
        },
      },
    },
    outputs: {
      ShippingRateId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/shipping_rate/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "shipping_rate",
    schemaPath: "#/components/schemas/shipping_rate",
    creations: [
      {
        operationId: "PostShippingRates",
        inputSchemaPath:
          "#/paths/~1v1~1shipping_rates/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/shipping_rate",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostShippingRates",
        reason:
          "No remove operation matches the saved-identity resource path /v1/shipping_rates/{shipping_rate_token}",
      },
      {
        operationId: "PostShippingRates",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1shipping_rates/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["tax_code"],
        inputSchemaPath:
          "#/paths/~1v1~1shipping_rates/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/tax_code",
        responseSchemaPath:
          "#/components/schemas/shipping_rate/properties/tax_code",
        targets: [
          {
            resource: "tax_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Source": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Source",
    resource: "source",
    propsSchema: "StripeSourcePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/SourceId"],
    operations: {
      create: "PostSources",
      read: {
        operationId: "GetSourcesSource",
        parameters: {
          source: "SourceId",
        },
      },
      update: {
        operationId: "PostSourcesSource",
        parameters: {
          source: "SourceId",
        },
      },
    },
    outputs: {
      SourceId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/source/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "source",
    schemaPath: "#/components/schemas/source",
    creations: [
      {
        operationId: "PostSources",
        inputSchemaPath:
          "#/paths/~1v1~1sources/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/source",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostSources",
        reason:
          "No remove operation matches the saved-identity resource path /v1/sources/{source}",
      },
      {
        operationId: "PostSources",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1sources/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::SubscriptionItem": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::SubscriptionItem",
    resource: "subscription-item",
    propsSchema: "StripeSubscriptionItemPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/SubscriptionItemId"],
    operations: {
      create: "PostSubscriptionItems",
      read: {
        operationId: "GetSubscriptionItemsItem",
        parameters: {
          item: "SubscriptionItemId",
        },
      },
      update: {
        operationId: "PostSubscriptionItemsItem",
        parameters: {
          item: "SubscriptionItemId",
        },
      },
      remove: {
        operationId: "DeleteSubscriptionItemsItem",
        parameters: {
          item: "SubscriptionItemId",
        },
      },
    },
    outputs: {
      SubscriptionItemId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/subscription_item/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "subscription_item",
    schemaPath: "#/components/schemas/subscription_item",
    creations: [
      {
        operationId: "PostSubscriptionItems",
        inputSchemaPath:
          "#/paths/~1v1~1subscription_items/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/subscription_item",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostSubscriptionItems",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1subscription_items/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_items/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/discount/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::SubscriptionSchedule": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::SubscriptionSchedule",
    resource: "subscription-schedule",
    propsSchema: "StripeSubscriptionSchedulePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/SubscriptionScheduleId"],
    operations: {
      create: "PostSubscriptionSchedules",
      read: {
        operationId: "GetSubscriptionSchedulesSchedule",
        parameters: {
          schedule: "SubscriptionScheduleId",
        },
      },
      update: {
        operationId: "PostSubscriptionSchedulesSchedule",
        parameters: {
          schedule: "SubscriptionScheduleId",
        },
      },
    },
    outputs: {
      SubscriptionScheduleId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/subscription_schedule/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "subscription_schedule",
    schemaPath: "#/components/schemas/subscription_schedule",
    creations: [
      {
        operationId: "PostSubscriptionSchedules",
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/subscription_schedule",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostSubscriptionSchedules",
        reason:
          "No remove operation matches the saved-identity resource path /v1/subscription_schedules/{schedule}",
      },
      {
        operationId: "PostSubscriptionSchedules",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["customer"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/customer",
        responseSchemaPath:
          "#/components/schemas/subscription_schedule/properties/customer",
        targets: [
          {
            resource: "customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/customer/properties/id",
          },
          {
            resource: "deleted_customer",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_customer/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_settings", "default_payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_settings/properties/default_payment_method",
        responseSchemaPath:
          "#/components/schemas/subscription_schedules_resource_default_settings/properties/default_payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_settings", "on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_settings/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/subscription_schedules_resource_default_settings/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["default_settings", "transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_settings/properties/transfer_data/anyOf/0/properties/destination",
        responseSchemaPath:
          "#/components/schemas/subscription_transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "default_payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/default_payment_method",
        responseSchemaPath:
          "#/components/schemas/subscription_schedule_phase_configuration/properties/default_payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "on_behalf_of"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/on_behalf_of",
        responseSchemaPath:
          "#/components/schemas/subscription_schedule_phase_configuration/properties/on_behalf_of",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "default_settings",
          "automatic_tax",
          "liability",
          "account",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_settings/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "default_settings",
          "invoice_settings",
          "account_tax_ids",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_settings/properties/invoice_settings/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/invoice_setting_subscription_schedule_setting/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "default_settings",
          "invoice_settings",
          "issuer",
          "account",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/default_settings/properties/invoice_settings/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "transfer_data", "destination"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/transfer_data/properties/destination",
        responseSchemaPath:
          "#/components/schemas/subscription_transfer_data/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "add_invoice_items", "*", "price"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/add_invoice_items/items/properties/price",
        responseSchemaPath:
          "#/components/schemas/subscription_schedule_add_invoice_item/properties/price",
        targets: [
          {
            resource: "price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/price/properties/id",
          },
          {
            resource: "deleted_price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_price/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "automatic_tax", "liability", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/automatic_tax/properties/liability/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "discounts", "*", "coupon"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/discounts/anyOf/0/items/properties/coupon",
        responseSchemaPath:
          "#/components/schemas/stackable_discount_with_discount_settings_and_discount_end/properties/coupon",
        targets: [
          {
            resource: "coupon",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/coupon/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "discounts", "*", "discount"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/discounts/anyOf/0/items/properties/discount",
        responseSchemaPath:
          "#/components/schemas/stackable_discount_with_discount_settings_and_discount_end/properties/discount",
        targets: [
          {
            resource: "discount",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/discount/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "discounts", "*", "promotion_code"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/stackable_discount_with_discount_settings_and_discount_end/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "phases",
          "*",
          "invoice_settings",
          "account_tax_ids",
          "*",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/invoice_settings/properties/account_tax_ids/anyOf/0/items",
        responseSchemaPath:
          "#/components/schemas/invoice_setting_subscription_schedule_phase_setting/properties/account_tax_ids/items",
        targets: [
          {
            resource: "tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/tax_id/properties/id",
          },
          {
            resource: "deleted_tax_id",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_tax_id/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "invoice_settings", "issuer", "account"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/invoice_settings/properties/issuer/properties/account",
        responseSchemaPath:
          "#/components/schemas/connect_account_reference/properties/account",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "items", "*", "price"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/items/items/properties/price",
        responseSchemaPath:
          "#/components/schemas/subscription_schedule_configuration_item/properties/price",
        targets: [
          {
            resource: "price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/price/properties/id",
          },
          {
            resource: "deleted_price",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/deleted_price/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "phases",
          "*",
          "add_invoice_items",
          "*",
          "discounts",
          "*",
          "coupon",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/add_invoice_items/items/properties/discounts/items/properties/coupon",
        responseSchemaPath:
          "#/components/schemas/discounts_resource_stackable_discount_with_discount_end/properties/coupon",
        targets: [
          {
            resource: "coupon",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/coupon/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "phases",
          "*",
          "add_invoice_items",
          "*",
          "discounts",
          "*",
          "discount",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/add_invoice_items/items/properties/discounts/items/properties/discount",
        responseSchemaPath:
          "#/components/schemas/discounts_resource_stackable_discount_with_discount_end/properties/discount",
        targets: [
          {
            resource: "discount",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/discount/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "phases",
          "*",
          "add_invoice_items",
          "*",
          "discounts",
          "*",
          "promotion_code",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/add_invoice_items/items/properties/discounts/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/discounts_resource_stackable_discount_with_discount_end/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["phases", "*", "items", "*", "discounts", "*", "coupon"],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/items/items/properties/discounts/anyOf/0/items/properties/coupon",
        responseSchemaPath:
          "#/components/schemas/stackable_discount_with_discount_settings/properties/coupon",
        targets: [
          {
            resource: "coupon",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/coupon/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "phases",
          "*",
          "items",
          "*",
          "discounts",
          "*",
          "discount",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/items/items/properties/discounts/anyOf/0/items/properties/discount",
        responseSchemaPath:
          "#/components/schemas/stackable_discount_with_discount_settings/properties/discount",
        targets: [
          {
            resource: "discount",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/discount/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: [
          "phases",
          "*",
          "items",
          "*",
          "discounts",
          "*",
          "promotion_code",
        ],
        inputSchemaPath:
          "#/paths/~1v1~1subscription_schedules/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/phases/items/properties/items/items/properties/discounts/anyOf/0/items/properties/promotion_code",
        responseSchemaPath:
          "#/components/schemas/stackable_discount_with_discount_settings/properties/promotion_code",
        targets: [
          {
            resource: "promotion_code",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/promotion_code/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::TaxCalculation": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TaxCalculation",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "tax.calculation",
    schemaPath: "#/components/schemas/tax.calculation",
    creations: [
      {
        operationId: "PostTaxCalculations",
        inputSchemaPath:
          "#/paths/~1v1~1tax~1calculations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax.calculation",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTaxCalculations",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tax~1calculations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TaxLocation": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TaxLocation",
    resource: "tax-location",
    propsSchema: "StripeTaxLocationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TaxLocationId"],
    operations: {
      create: "PostTaxLocations",
      read: {
        operationId: "GetTaxLocationsLocation",
        parameters: {
          location: "TaxLocationId",
        },
      },
    },
    outputs: {
      TaxLocationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/tax.location/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "tax.location",
    schemaPath: "#/components/schemas/tax.location",
    creations: [
      {
        operationId: "PostTaxLocations",
        inputSchemaPath:
          "#/paths/~1v1~1tax~1locations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax.location",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTaxLocations",
        reason:
          "No update operation matches the saved-identity resource path /v1/tax/locations/{location}",
      },
      {
        operationId: "PostTaxLocations",
        reason:
          "No remove operation matches the saved-identity resource path /v1/tax/locations/{location}",
      },
      {
        operationId: "PostTaxLocations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tax~1locations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TaxRegistration": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TaxRegistration",
    resource: "tax-registration",
    propsSchema: "StripeTaxRegistrationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TaxRegistrationId"],
    operations: {
      create: "PostTaxRegistrations",
      read: {
        operationId: "GetTaxRegistrationsId",
        parameters: {
          id: "TaxRegistrationId",
        },
      },
      update: {
        operationId: "PostTaxRegistrationsId",
        parameters: {
          id: "TaxRegistrationId",
        },
      },
    },
    outputs: {
      TaxRegistrationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/tax.registration/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "tax.registration",
    schemaPath: "#/components/schemas/tax.registration",
    creations: [
      {
        operationId: "PostTaxRegistrations",
        inputSchemaPath:
          "#/paths/~1v1~1tax~1registrations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax.registration",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTaxRegistrations",
        reason:
          "No remove operation matches the saved-identity resource path /v1/tax/registrations/{id}",
      },
      {
        operationId: "PostTaxRegistrations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tax~1registrations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TaxTransaction": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TaxTransaction",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "tax.transaction",
    schemaPath: "#/components/schemas/tax.transaction",
    creations: [
      {
        operationId: "PostTaxTransactionsCreateFromCalculation",
        inputSchemaPath:
          "#/paths/~1v1~1tax~1transactions~1create_from_calculation/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax.transaction",
      },
      {
        operationId: "PostTaxTransactionsCreateReversal",
        inputSchemaPath:
          "#/paths/~1v1~1tax~1transactions~1create_reversal/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax.transaction",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTaxTransactionsCreateFromCalculation",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
      {
        operationId: "PostTaxTransactionsCreateReversal",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tax~1transactions~1create_from_calculation/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TaxRate": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TaxRate",
    resource: "tax-rate",
    propsSchema: "StripeTaxRatePropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TaxRateId"],
    operations: {
      create: "PostTaxRates",
      read: {
        operationId: "GetTaxRatesTaxRate",
        parameters: {
          tax_rate: "TaxRateId",
        },
      },
      update: {
        operationId: "PostTaxRatesTaxRate",
        parameters: {
          tax_rate: "TaxRateId",
        },
      },
    },
    outputs: {
      TaxRateId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/tax_rate/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "tax_rate",
    schemaPath: "#/components/schemas/tax_rate",
    creations: [
      {
        operationId: "PostTaxRates",
        inputSchemaPath:
          "#/paths/~1v1~1tax_rates/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/tax_rate",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTaxRates",
        reason:
          "No remove operation matches the saved-identity resource path /v1/tax_rates/{tax_rate}",
      },
      {
        operationId: "PostTaxRates",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tax_rates/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TerminalConfiguration": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TerminalConfiguration",
    resource: "terminal-configuration",
    propsSchema: "StripeTerminalConfigurationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TerminalConfigurationId"],
    operations: {
      create: "PostTerminalConfigurations",
      read: {
        operationId: "GetTerminalConfigurationsConfiguration",
        parameters: {
          configuration: "TerminalConfigurationId",
        },
      },
      update: {
        operationId: "PostTerminalConfigurationsConfiguration",
        parameters: {
          configuration: "TerminalConfigurationId",
        },
      },
      remove: {
        operationId: "DeleteTerminalConfigurationsConfiguration",
        parameters: {
          configuration: "TerminalConfigurationId",
        },
      },
    },
    outputs: {
      TerminalConfigurationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/terminal.configuration/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "terminal.configuration",
    schemaPath: "#/components/schemas/terminal.configuration",
    creations: [
      {
        operationId: "PostTerminalConfigurations",
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/terminal.configuration",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTerminalConfigurations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["bbpos_wisepad3", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/bbpos_wisepad3/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["bbpos_wisepos_e", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/bbpos_wisepos_e/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["stripe_s700", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/stripe_s700/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["stripe_s710", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/stripe_s710/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["stripe_t600", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/stripe_t600/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["verifone_m425", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/verifone_m425/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["verifone_p400", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/verifone_p400/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["verifone_p630", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/verifone_p630/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["verifone_ux700", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/verifone_ux700/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["verifone_v660p", "splashscreen"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1configurations/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/verifone_v660p/properties/splashscreen",
        responseSchemaPath:
          "#/components/schemas/terminal_configuration_configuration_resource_device_type_specific_config/properties/splashscreen",
        targets: [
          {
            resource: "file",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/file/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::TerminalConnectionToken": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TerminalConnectionToken",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "terminal.connection_token",
    schemaPath: "#/components/schemas/terminal.connection_token",
    creations: [
      {
        operationId: "PostTerminalConnectionTokens",
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1connection_tokens/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/terminal.connection_token",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTerminalConnectionTokens",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1terminal~1connection_tokens/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TerminalLocation": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TerminalLocation",
    resource: "terminal-location",
    propsSchema: "StripeTerminalLocationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TerminalLocationId"],
    operations: {
      create: "PostTerminalLocations",
      read: {
        operationId: "GetTerminalLocationsLocation",
        parameters: {
          location: "TerminalLocationId",
        },
      },
      update: {
        operationId: "PostTerminalLocationsLocation",
        parameters: {
          location: "TerminalLocationId",
        },
      },
      remove: {
        operationId: "DeleteTerminalLocationsLocation",
        parameters: {
          location: "TerminalLocationId",
        },
      },
    },
    outputs: {
      TerminalLocationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/terminal.location/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "terminal.location",
    schemaPath: "#/components/schemas/terminal.location",
    creations: [
      {
        operationId: "PostTerminalLocations",
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1locations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/terminal.location",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTerminalLocations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1terminal~1locations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TerminalOnboardingLink": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TerminalOnboardingLink",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "terminal.onboarding_link",
    schemaPath: "#/components/schemas/terminal.onboarding_link",
    creations: [
      {
        operationId: "PostTerminalOnboardingLinks",
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1onboarding_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/terminal.onboarding_link",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTerminalOnboardingLinks",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1terminal~1onboarding_links/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TerminalReader": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TerminalReader",
    resource: "terminal-reader",
    propsSchema: "StripeTerminalReaderPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TerminalReaderId"],
    operations: {
      create: "PostTerminalReaders",
      read: {
        operationId: "GetTerminalReadersReader",
        parameters: {
          reader: "TerminalReaderId",
        },
      },
      update: {
        operationId: "PostTerminalReadersReader",
        parameters: {
          reader: "TerminalReaderId",
        },
      },
      remove: {
        operationId: "DeleteTerminalReadersReader",
        parameters: {
          reader: "TerminalReaderId",
        },
      },
    },
    outputs: {
      TerminalReaderId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/terminal.reader/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "terminal.reader",
    schemaPath: "#/components/schemas/terminal.reader",
    creations: [
      {
        operationId: "PostTerminalReaders",
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1readers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/terminal.reader",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTerminalReaders",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1terminal~1readers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["location"],
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1readers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/location",
        responseSchemaPath:
          "#/components/schemas/terminal.reader/properties/location",
        targets: [
          {
            resource: "terminal.location",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/terminal.location/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::TerminalRefund": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TerminalRefund",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "terminal.refund",
    schemaPath: "#/components/schemas/terminal.refund",
    creations: [
      {
        operationId: "PostTerminalRefunds",
        inputSchemaPath:
          "#/paths/~1v1~1terminal~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/terminal.refund",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTerminalRefunds",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1terminal~1refunds/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::ConfirmationToken": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ConfirmationToken",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "confirmation_token",
    schemaPath: "#/components/schemas/confirmation_token",
    creations: [
      {
        operationId: "PostTestHelpersConfirmationTokens",
        inputSchemaPath:
          "#/paths/~1v1~1test_helpers~1confirmation_tokens/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/confirmation_token",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTestHelpersConfirmationTokens",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1test_helpers~1confirmation_tokens/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::IssuingAuthorization": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingAuthorization",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "issuing.authorization",
    schemaPath: "#/components/schemas/issuing.authorization",
    creations: [
      {
        operationId: "PostTestHelpersIssuingAuthorizations",
        inputSchemaPath:
          "#/paths/~1v1~1test_helpers~1issuing~1authorizations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.authorization",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTestHelpersIssuingAuthorizations",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1test_helpers~1issuing~1authorizations/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::IssuingSettlement": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingSettlement",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "issuing.settlement",
    schemaPath: "#/components/schemas/issuing.settlement",
    creations: [
      {
        operationId: "PostTestHelpersIssuingSettlements",
        inputSchemaPath:
          "#/paths/~1v1~1test_helpers~1issuing~1settlements/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.settlement",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTestHelpersIssuingSettlements",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1test_helpers~1issuing~1settlements/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::IssuingTransaction": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::IssuingTransaction",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "issuing.transaction",
    schemaPath: "#/components/schemas/issuing.transaction",
    creations: [
      {
        operationId: "PostTestHelpersIssuingTransactionsCreateForceCapture",
        inputSchemaPath:
          "#/paths/~1v1~1test_helpers~1issuing~1transactions~1create_force_capture/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.transaction",
      },
      {
        operationId: "PostTestHelpersIssuingTransactionsCreateUnlinkedRefund",
        inputSchemaPath:
          "#/paths/~1v1~1test_helpers~1issuing~1transactions~1create_unlinked_refund/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/issuing.transaction",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTestHelpersIssuingTransactionsCreateForceCapture",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
      {
        operationId: "PostTestHelpersIssuingTransactionsCreateUnlinkedRefund",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1test_helpers~1issuing~1transactions~1create_force_capture/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TestHelpersTestClock": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TestHelpersTestClock",
    resource: "test-helpers-test-clock",
    propsSchema: "StripeTestHelpersTestClockPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TestHelpersTestClockId"],
    operations: {
      create: "PostTestHelpersTestClocks",
      read: {
        operationId: "GetTestHelpersTestClocksTestClock",
        parameters: {
          test_clock: "TestHelpersTestClockId",
        },
      },
      update: {
        operationId: "PostTestHelpersTestClocksTestClockAdvance",
        parameters: {
          test_clock: "TestHelpersTestClockId",
        },
      },
      remove: {
        operationId: "DeleteTestHelpersTestClocksTestClock",
        parameters: {
          test_clock: "TestHelpersTestClockId",
        },
      },
    },
    outputs: {
      TestHelpersTestClockId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/test_helpers.test_clock/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "test_helpers.test_clock",
    schemaPath: "#/components/schemas/test_helpers.test_clock",
    creations: [
      {
        operationId: "PostTestHelpersTestClocks",
        inputSchemaPath:
          "#/paths/~1v1~1test_helpers~1test_clocks/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/test_helpers.test_clock",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTestHelpersTestClocks",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1test_helpers~1test_clocks/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::ThreeDSecureAuthentication": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::ThreeDSecureAuthentication",
    resource: "three-dsecure-authentication",
    propsSchema: "StripeThreeDSecureAuthenticationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ThreeDSecureAuthenticationId"],
    operations: {
      create: "PostThreeDSecureAuthentications",
      read: {
        operationId: "GetThreeDSecureAuthenticationsAuthentication",
        parameters: {
          authentication: "ThreeDSecureAuthenticationId",
        },
      },
    },
    outputs: {
      ThreeDSecureAuthenticationId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/three_d_secure.authentication/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "three_d_secure.authentication",
    schemaPath: "#/components/schemas/three_d_secure.authentication",
    creations: [
      {
        operationId: "PostThreeDSecureAuthentications",
        inputSchemaPath:
          "#/paths/~1v1~1three_d_secure~1authentications/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath:
          "#/components/schemas/three_d_secure.authentication",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostThreeDSecureAuthentications",
        reason:
          "No update operation matches the saved-identity resource path /v1/three_d_secure/authentications/{authentication}",
      },
      {
        operationId: "PostThreeDSecureAuthentications",
        reason:
          "No remove operation matches the saved-identity resource path /v1/three_d_secure/authentications/{authentication}",
      },
      {
        operationId: "PostThreeDSecureAuthentications",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1three_d_secure~1authentications/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1three_d_secure~1authentications/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/payment_method",
        responseSchemaPath:
          "#/components/schemas/three_d_secure.authentication/properties/payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Token": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Token",
    resource: "token",
    propsSchema: "StripeTokenPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TokenId"],
    operations: {
      create: "PostTokens",
      read: {
        operationId: "GetTokensToken",
        parameters: {
          token: "TokenId",
        },
      },
    },
    outputs: {
      TokenId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/token/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "token",
    schemaPath: "#/components/schemas/token",
    creations: [
      {
        operationId: "PostTokens",
        inputSchemaPath:
          "#/paths/~1v1~1tokens/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/token",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTokens",
        reason:
          "No update operation matches the saved-identity resource path /v1/tokens/{token}",
      },
      {
        operationId: "PostTokens",
        reason:
          "No remove operation matches the saved-identity resource path /v1/tokens/{token}",
      },
      {
        operationId: "PostTokens",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1tokens/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::Topup": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Topup",
    resource: "topup",
    propsSchema: "StripeTopupPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TopupId"],
    operations: {
      create: "PostTopups",
      read: {
        operationId: "GetTopupsTopup",
        parameters: {
          topup: "TopupId",
        },
      },
      update: {
        operationId: "PostTopupsTopup",
        parameters: {
          topup: "TopupId",
        },
      },
    },
    outputs: {
      TopupId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/topup/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "topup",
    schemaPath: "#/components/schemas/topup",
    creations: [
      {
        operationId: "PostTopups",
        inputSchemaPath:
          "#/paths/~1v1~1topups/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/topup",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTopups",
        reason:
          "No remove operation matches the saved-identity resource path /v1/topups/{topup}",
      },
      {
        operationId: "PostTopups",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1topups/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["payment_method"],
        inputSchemaPath:
          "#/paths/~1v1~1topups/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/payment_method",
        responseSchemaPath:
          "#/components/schemas/topup/properties/payment_method",
        targets: [
          {
            resource: "payment_method",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/payment_method/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::Transfer": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::Transfer",
    resource: "transfer",
    propsSchema: "StripeTransferPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TransferId"],
    operations: {
      create: "PostTransfers",
      read: {
        operationId: "GetTransfersTransfer",
        parameters: {
          transfer: "TransferId",
        },
      },
      update: {
        operationId: "PostTransfersTransfer",
        parameters: {
          transfer: "TransferId",
        },
      },
    },
    outputs: {
      TransferId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/transfer/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "transfer",
    schemaPath: "#/components/schemas/transfer",
    creations: [
      {
        operationId: "PostTransfers",
        inputSchemaPath:
          "#/paths/~1v1~1transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/transfer",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTransfers",
        reason:
          "No remove operation matches the saved-identity resource path /v1/transfers/{transfer}",
      },
      {
        operationId: "PostTransfers",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [
      {
        propertyPath: ["destination"],
        inputSchemaPath:
          "#/paths/~1v1~1transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/destination",
        responseSchemaPath:
          "#/components/schemas/transfer/properties/destination",
        targets: [
          {
            resource: "account",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/account/properties/id",
          },
        ],
        unresolved: [],
      },
      {
        propertyPath: ["source_transaction"],
        inputSchemaPath:
          "#/paths/~1v1~1transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema/properties/source_transaction",
        responseSchemaPath:
          "#/components/schemas/transfer/properties/source_transaction",
        targets: [
          {
            resource: "charge",
            propertyPath: "/properties/id",
            schemaPath: "#/components/schemas/charge/properties/id",
          },
        ],
        unresolved: [],
      },
    ],
  },
  "Stripe::Billing::TransferReversal": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TransferReversal",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "transfer_reversal",
    schemaPath: "#/components/schemas/transfer_reversal",
    creations: [
      {
        operationId: "PostTransfersIdReversals",
        inputSchemaPath:
          "#/paths/~1v1~1transfers~1%7Bid%7D~1reversals/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/transfer_reversal",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTransfersIdReversals",
        reason: "Required creation parameters need relationship hints: id",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1transfers~1%7Bid%7D~1reversals/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TreasuryCreditReversal": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TreasuryCreditReversal",
    resource: "treasury-credit-reversal",
    propsSchema: "StripeTreasuryCreditReversalPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryCreditReversalId"],
    operations: {
      create: "PostTreasuryCreditReversals",
      read: {
        operationId: "GetTreasuryCreditReversalsCreditReversal",
        parameters: {
          credit_reversal: "TreasuryCreditReversalId",
        },
      },
    },
    outputs: {
      TreasuryCreditReversalId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/treasury.credit_reversal/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "treasury.credit_reversal",
    schemaPath: "#/components/schemas/treasury.credit_reversal",
    creations: [
      {
        operationId: "PostTreasuryCreditReversals",
        inputSchemaPath:
          "#/paths/~1v1~1treasury~1credit_reversals/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/treasury.credit_reversal",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTreasuryCreditReversals",
        reason:
          "No update operation matches the saved-identity resource path /v1/treasury/credit_reversals/{credit_reversal}",
      },
      {
        operationId: "PostTreasuryCreditReversals",
        reason:
          "No remove operation matches the saved-identity resource path /v1/treasury/credit_reversals/{credit_reversal}",
      },
      {
        operationId: "PostTreasuryCreditReversals",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1treasury~1credit_reversals/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TreasuryDebitReversal": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TreasuryDebitReversal",
    resource: "treasury-debit-reversal",
    propsSchema: "StripeTreasuryDebitReversalPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryDebitReversalId"],
    operations: {
      create: "PostTreasuryDebitReversals",
      read: {
        operationId: "GetTreasuryDebitReversalsDebitReversal",
        parameters: {
          debit_reversal: "TreasuryDebitReversalId",
        },
      },
    },
    outputs: {
      TreasuryDebitReversalId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/treasury.debit_reversal/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "treasury.debit_reversal",
    schemaPath: "#/components/schemas/treasury.debit_reversal",
    creations: [
      {
        operationId: "PostTreasuryDebitReversals",
        inputSchemaPath:
          "#/paths/~1v1~1treasury~1debit_reversals/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/treasury.debit_reversal",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTreasuryDebitReversals",
        reason:
          "No update operation matches the saved-identity resource path /v1/treasury/debit_reversals/{debit_reversal}",
      },
      {
        operationId: "PostTreasuryDebitReversals",
        reason:
          "No remove operation matches the saved-identity resource path /v1/treasury/debit_reversals/{debit_reversal}",
      },
      {
        operationId: "PostTreasuryDebitReversals",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1treasury~1debit_reversals/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TreasuryFinancialAccount": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TreasuryFinancialAccount",
    resource: "treasury-financial-account",
    propsSchema: "StripeTreasuryFinancialAccountPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryFinancialAccountId"],
    operations: {
      create: "PostTreasuryFinancialAccounts",
      read: {
        operationId: "GetTreasuryFinancialAccountsFinancialAccount",
        parameters: {
          financial_account: "TreasuryFinancialAccountId",
        },
      },
      update: {
        operationId: "PostTreasuryFinancialAccountsFinancialAccount",
        parameters: {
          financial_account: "TreasuryFinancialAccountId",
        },
      },
    },
    outputs: {
      TreasuryFinancialAccountId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/treasury.financial_account/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "treasury.financial_account",
    schemaPath: "#/components/schemas/treasury.financial_account",
    creations: [
      {
        operationId: "PostTreasuryFinancialAccounts",
        inputSchemaPath:
          "#/paths/~1v1~1treasury~1financial_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/treasury.financial_account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTreasuryFinancialAccounts",
        reason:
          "No remove operation matches the saved-identity resource path /v1/treasury/financial_accounts/{financial_account}",
      },
      {
        operationId: "PostTreasuryFinancialAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1treasury~1financial_accounts/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TreasuryInboundTransfer": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TreasuryInboundTransfer",
    resource: "treasury-inbound-transfer",
    propsSchema: "StripeTreasuryInboundTransferPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryInboundTransferId"],
    operations: {
      create: "PostTreasuryInboundTransfers",
      read: {
        operationId: "GetTreasuryInboundTransfersId",
        parameters: {
          id: "TreasuryInboundTransferId",
        },
      },
    },
    outputs: {
      TreasuryInboundTransferId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/treasury.inbound_transfer/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "treasury.inbound_transfer",
    schemaPath: "#/components/schemas/treasury.inbound_transfer",
    creations: [
      {
        operationId: "PostTreasuryInboundTransfers",
        inputSchemaPath:
          "#/paths/~1v1~1treasury~1inbound_transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/treasury.inbound_transfer",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTreasuryInboundTransfers",
        reason:
          "No update operation matches the saved-identity resource path /v1/treasury/inbound_transfers/{id}",
      },
      {
        operationId: "PostTreasuryInboundTransfers",
        reason:
          "No remove operation matches the saved-identity resource path /v1/treasury/inbound_transfers/{id}",
      },
      {
        operationId: "PostTreasuryInboundTransfers",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1treasury~1inbound_transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TreasuryOutboundPayment": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TreasuryOutboundPayment",
    resource: "treasury-outbound-payment",
    propsSchema: "StripeTreasuryOutboundPaymentPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryOutboundPaymentId"],
    operations: {
      create: "PostTreasuryOutboundPayments",
      read: {
        operationId: "GetTreasuryOutboundPaymentsId",
        parameters: {
          id: "TreasuryOutboundPaymentId",
        },
      },
    },
    outputs: {
      TreasuryOutboundPaymentId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/treasury.outbound_payment/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "treasury.outbound_payment",
    schemaPath: "#/components/schemas/treasury.outbound_payment",
    creations: [
      {
        operationId: "PostTreasuryOutboundPayments",
        inputSchemaPath:
          "#/paths/~1v1~1treasury~1outbound_payments/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/treasury.outbound_payment",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTreasuryOutboundPayments",
        reason:
          "No update operation matches the saved-identity resource path /v1/treasury/outbound_payments/{id}",
      },
      {
        operationId: "PostTreasuryOutboundPayments",
        reason:
          "No remove operation matches the saved-identity resource path /v1/treasury/outbound_payments/{id}",
      },
      {
        operationId: "PostTreasuryOutboundPayments",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1treasury~1outbound_payments/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::TreasuryOutboundTransfer": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::TreasuryOutboundTransfer",
    resource: "treasury-outbound-transfer",
    propsSchema: "StripeTreasuryOutboundTransferPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryOutboundTransferId"],
    operations: {
      create: "PostTreasuryOutboundTransfers",
      read: {
        operationId: "GetTreasuryOutboundTransfersOutboundTransfer",
        parameters: {
          outbound_transfer: "TreasuryOutboundTransferId",
        },
      },
    },
    outputs: {
      TreasuryOutboundTransferId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/treasury.outbound_transfer/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "treasury.outbound_transfer",
    schemaPath: "#/components/schemas/treasury.outbound_transfer",
    creations: [
      {
        operationId: "PostTreasuryOutboundTransfers",
        inputSchemaPath:
          "#/paths/~1v1~1treasury~1outbound_transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/treasury.outbound_transfer",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostTreasuryOutboundTransfers",
        reason:
          "No update operation matches the saved-identity resource path /v1/treasury/outbound_transfers/{outbound_transfer}",
      },
      {
        operationId: "PostTreasuryOutboundTransfers",
        reason:
          "No remove operation matches the saved-identity resource path /v1/treasury/outbound_transfers/{outbound_transfer}",
      },
      {
        operationId: "PostTreasuryOutboundTransfers",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v1~1treasury~1outbound_transfers/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::WebhookEndpoint": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::WebhookEndpoint",
    resource: "webhook-endpoint",
    propsSchema: "StripeWebhookEndpointRequestPropsSchema",
    stateSecretOutputKeys: ["WebhookSigningSecret"],
    primaryIdentifier: ["/properties/WebhookEndpointId"],
    operations: {
      create: "PostWebhookEndpoints",
      read: {
        operationId: "GetWebhookEndpointsWebhookEndpoint",
        parameters: {
          webhook_endpoint: "WebhookEndpointId",
        },
      },
      update: {
        operationId: "PostWebhookEndpointsWebhookEndpoint",
        parameters: {
          webhook_endpoint: "WebhookEndpointId",
        },
      },
      remove: {
        operationId: "DeleteWebhookEndpointsWebhookEndpoint",
        parameters: {
          webhook_endpoint: "WebhookEndpointId",
        },
      },
    },
    declaration: {
      property: "endpoint",
      properties: {
        rotationKey: {
          type: "string",
        },
      },
    },
    request: {
      urlCredentials: [
        {
          propertyPath: ["url"],
          usernameConfig: "NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_USERNAME",
          passwordConfig: "NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_PASSWORD",
        },
      ],
    },
    replacement: {
      order: "createBeforeDestroy",
      properties: [["rotationKey"]],
    },
    outputs: {
      WebhookEndpointId: {
        schema: {
          maxLength: 5000,
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath: "#/components/schemas/webhook_endpoint/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
      WebhookSigningSecret: {
        schema: {
          maxLength: 5000,
          type: "string",
          description:
            "The endpoint's secret, used to generate [webhook signatures](https://docs.stripe.com/webhooks/signatures). Only returned at creation.",
        },
        schemaPath: "#/components/schemas/webhook_endpoint/properties/secret",
        valuePath: "/secret",
        required: false,
        retainOnRead: true,
      },
    },
    providerResource: "webhook_endpoint",
    schemaPath: "#/components/schemas/webhook_endpoint",
    creations: [
      {
        operationId: "PostWebhookEndpoints",
        inputSchemaPath:
          "#/paths/~1v1~1webhook_endpoints/post/requestBody/content/application~1x-www-form-urlencoded/schema",
        responseSchemaPath: "#/components/schemas/webhook_endpoint",
      },
    ],
    bindingIssues: [],
    inputSchemaPath:
      "#/paths/~1v1~1webhook_endpoints/post/requestBody/content/application~1x-www-form-urlencoded/schema",
    relationships: [],
  },
  "Stripe::Billing::MeterEventAdjustment": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::MeterEventAdjustment",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "v2.billing.meter_event_adjustment",
    schemaPath: "#/components/schemas/v2.billing.meter_event_adjustment",
    creations: [
      {
        operationId: "PostV2BillingMeterEventAdjustments",
        inputSchemaPath:
          "#/paths/~1v2~1billing~1meter_event_adjustments/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.billing.meter_event_adjustment",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2BillingMeterEventAdjustments",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1billing~1meter_event_adjustments/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Billing::MeterEventSession": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::MeterEventSession",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "v2.billing.meter_event_session",
    schemaPath: "#/components/schemas/v2.billing.meter_event_session",
    creations: [
      {
        operationId: "PostV2BillingMeterEventSession",
        inputSchemaPath: null,
        responseSchemaPath:
          "#/components/schemas/v2.billing.meter_event_session",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2BillingMeterEventSession",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath: null,
    relationships: [],
  },
  "Stripe::Billing::PostV2BillingMeterEventStream": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::PostV2BillingMeterEventStream",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "PostV2BillingMeterEventStream",
    schemaPath:
      "#/paths/~1v2~1billing~1meter_event_stream/post/responses/200/content/application~1json/schema",
    creations: [
      {
        operationId: "PostV2BillingMeterEventStream",
        inputSchemaPath:
          "#/paths/~1v2~1billing~1meter_event_stream/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/paths/~1v2~1billing~1meter_event_stream/post/responses/200/content/application~1json/schema",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2BillingMeterEventStream",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1billing~1meter_event_stream/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Billing::MeterEvent": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Billing::MeterEvent",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "v2.billing.meter_event",
    schemaPath: "#/components/schemas/v2.billing.meter_event",
    creations: [
      {
        operationId: "PostV2BillingMeterEvents",
        inputSchemaPath:
          "#/paths/~1v2~1billing~1meter_events/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.billing.meter_event",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2BillingMeterEvents",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1billing~1meter_events/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Commerce::ProductCatalogImport": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Commerce::ProductCatalogImport",
    resource: "product-catalog-import",
    propsSchema: "StripeProductCatalogImportPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ProductCatalogImportId"],
    operations: {
      create: "PostV2CommerceProductCatalogImports",
      read: {
        operationId: "GetV2CommerceProductCatalogImportsId",
        parameters: {
          id: "ProductCatalogImportId",
        },
      },
    },
    outputs: {
      ProductCatalogImportId: {
        schema: {
          type: "string",
          description: "The unique identifier for this ProductCatalogImport.",
        },
        schemaPath:
          "#/components/schemas/v2.commerce.product_catalog_import/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.commerce.product_catalog_import",
    schemaPath: "#/components/schemas/v2.commerce.product_catalog_import",
    creations: [
      {
        operationId: "PostV2CommerceProductCatalogImports",
        inputSchemaPath:
          "#/paths/~1v2~1commerce~1product_catalog~1imports/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.commerce.product_catalog_import",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CommerceProductCatalogImports",
        reason:
          "No update operation matches the saved-identity resource path /v2/commerce/product_catalog/imports/{id}",
      },
      {
        operationId: "PostV2CommerceProductCatalogImports",
        reason:
          "No remove operation matches the saved-identity resource path /v2/commerce/product_catalog/imports/{id}",
      },
      {
        operationId: "PostV2CommerceProductCatalogImports",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1commerce~1product_catalog~1imports/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::AccountLink": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::AccountLink",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "v2.core.account_link",
    schemaPath: "#/components/schemas/v2.core.account_link",
    creations: [
      {
        operationId: "PostV2CoreAccountLinks",
        inputSchemaPath:
          "#/paths/~1v2~1core~1account_links/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.core.account_link",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreAccountLinks",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1account_links/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::AccountToken": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::AccountToken",
    resource: "account-token",
    propsSchema: "StripeAccountTokenPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/AccountTokenId"],
    operations: {
      create: "PostV2CoreAccountTokens",
      read: {
        operationId: "GetV2CoreAccountTokensId",
        parameters: {
          id: "AccountTokenId",
        },
      },
    },
    outputs: {
      AccountTokenId: {
        schema: {
          type: "string",
          description: "Unique identifier for the token.",
        },
        schemaPath: "#/components/schemas/v2.core.account_token/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.core.account_token",
    schemaPath: "#/components/schemas/v2.core.account_token",
    creations: [
      {
        operationId: "PostV2CoreAccountTokens",
        inputSchemaPath:
          "#/paths/~1v2~1core~1account_tokens/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.core.account_token",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreAccountTokens",
        reason:
          "No update operation matches the saved-identity resource path /v2/core/account_tokens/{id}",
      },
      {
        operationId: "PostV2CoreAccountTokens",
        reason:
          "No remove operation matches the saved-identity resource path /v2/core/account_tokens/{id}",
      },
      {
        operationId: "PostV2CoreAccountTokens",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1account_tokens/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::Account": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::Account",
    resource: "account",
    propsSchema: "StripeAccountPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/AccountId"],
    operations: {
      create: "PostV2CoreAccounts",
      read: {
        operationId: "GetV2CoreAccountsId",
        parameters: {
          id: "AccountId",
        },
      },
      update: {
        operationId: "PostV2CoreAccountsId",
        parameters: {
          id: "AccountId",
        },
      },
    },
    outputs: {
      AccountId: {
        schema: {
          type: "string",
          description: "Unique identifier for the Account.",
        },
        schemaPath: "#/components/schemas/v2.core.account/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.core.account",
    schemaPath: "#/components/schemas/v2.core.account",
    creations: [
      {
        operationId: "PostV2CoreAccounts",
        inputSchemaPath:
          "#/paths/~1v2~1core~1accounts/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.core.account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreAccounts",
        reason:
          "No remove operation matches the saved-identity resource path /v2/core/accounts/{id}",
      },
      {
        operationId: "PostV2CoreAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1accounts/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::PersonToken": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::PersonToken",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "v2.core.account_person_token",
    schemaPath: "#/components/schemas/v2.core.account_person_token",
    creations: [
      {
        operationId: "PostV2CoreAccountsAccountIdPersonTokens",
        inputSchemaPath:
          "#/paths/~1v2~1core~1accounts~1%7Baccount_id%7D~1person_tokens/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.core.account_person_token",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreAccountsAccountIdPersonTokens",
        reason:
          "Required creation parameters need relationship hints: account_id",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1accounts~1%7Baccount_id%7D~1person_tokens/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::Person": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::Person",
    primaryIdentifier: [],
    outputs: {},
    providerResource: "v2.core.account_person",
    schemaPath: "#/components/schemas/v2.core.account_person",
    creations: [
      {
        operationId: "PostV2CoreAccountsAccountIdPersons",
        inputSchemaPath:
          "#/paths/~1v2~1core~1accounts~1%7Baccount_id%7D~1persons/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.core.account_person",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreAccountsAccountIdPersons",
        reason:
          "Required creation parameters need relationship hints: account_id",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1accounts~1%7Baccount_id%7D~1persons/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::EventDestination": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::EventDestination",
    resource: "event-destination",
    propsSchema: "StripeEventDestinationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/EventDestinationId"],
    operations: {
      create: "PostV2CoreEventDestinations",
      read: {
        operationId: "GetV2CoreEventDestinationsId",
        parameters: {
          id: "EventDestinationId",
        },
      },
      update: {
        operationId: "PostV2CoreEventDestinationsId",
        parameters: {
          id: "EventDestinationId",
        },
      },
      remove: {
        operationId: "DeleteV2CoreEventDestinationsId",
        parameters: {
          id: "EventDestinationId",
        },
      },
    },
    outputs: {
      EventDestinationId: {
        schema: {
          type: "string",
          description: "Unique identifier for the object.",
        },
        schemaPath:
          "#/components/schemas/v2.core.event_destination/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.core.event_destination",
    schemaPath: "#/components/schemas/v2.core.event_destination",
    creations: [
      {
        operationId: "PostV2CoreEventDestinations",
        inputSchemaPath:
          "#/paths/~1v2~1core~1event_destinations/post/requestBody/content/application~1json/schema",
        responseSchemaPath: "#/components/schemas/v2.core.event_destination",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreEventDestinations",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1event_destinations/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::GBBankAccount": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::GBBankAccount",
    resource: "gbbank-account",
    propsSchema: "StripeGBBankAccountPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/GBBankAccountId"],
    operations: {
      create: "PostV2CoreVaultGbBankAccounts",
      read: {
        operationId: "GetV2CoreVaultGbBankAccountsId",
        parameters: {
          id: "GBBankAccountId",
        },
      },
    },
    outputs: {
      GBBankAccountId: {
        schema: {
          type: "string",
          description: "The ID of the GBBankAccount object.",
        },
        schemaPath:
          "#/components/schemas/v2.core.vault.gb_bank_account/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.core.vault.gb_bank_account",
    schemaPath: "#/components/schemas/v2.core.vault.gb_bank_account",
    creations: [
      {
        operationId: "PostV2CoreVaultGbBankAccounts",
        inputSchemaPath:
          "#/paths/~1v2~1core~1vault~1gb_bank_accounts/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.core.vault.gb_bank_account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreVaultGbBankAccounts",
        reason:
          "No update operation matches the saved-identity resource path /v2/core/vault/gb_bank_accounts/{id}",
      },
      {
        operationId: "PostV2CoreVaultGbBankAccounts",
        reason:
          "No remove operation matches the saved-identity resource path /v2/core/vault/gb_bank_accounts/{id}",
      },
      {
        operationId: "PostV2CoreVaultGbBankAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1vault~1gb_bank_accounts/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Core::USBankAccount": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Core::USBankAccount",
    resource: "usbank-account",
    propsSchema: "StripeUSBankAccountPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/USBankAccountId"],
    operations: {
      create: "PostV2CoreVaultUsBankAccounts",
      read: {
        operationId: "GetV2CoreVaultUsBankAccountsId",
        parameters: {
          id: "USBankAccountId",
        },
      },
      update: {
        operationId: "PostV2CoreVaultUsBankAccountsId",
        parameters: {
          id: "USBankAccountId",
        },
      },
    },
    outputs: {
      USBankAccountId: {
        schema: {
          type: "string",
          description: "The ID of the USBankAccount object.",
        },
        schemaPath:
          "#/components/schemas/v2.core.vault.us_bank_account/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.core.vault.us_bank_account",
    schemaPath: "#/components/schemas/v2.core.vault.us_bank_account",
    creations: [
      {
        operationId: "PostV2CoreVaultUsBankAccounts",
        inputSchemaPath:
          "#/paths/~1v2~1core~1vault~1us_bank_accounts/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.core.vault.us_bank_account",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2CoreVaultUsBankAccounts",
        reason:
          "No remove operation matches the saved-identity resource path /v2/core/vault/us_bank_accounts/{id}",
      },
      {
        operationId: "PostV2CoreVaultUsBankAccounts",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1core~1vault~1us_bank_accounts/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Money_management::FinancialAddress": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Money_management::FinancialAddress",
    resource: "financial-address",
    propsSchema: "StripeFinancialAddressPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/FinancialAddressId"],
    operations: {
      create: "PostV2MoneyManagementFinancialAddresses",
      read: {
        operationId: "GetV2MoneyManagementFinancialAddressesId",
        parameters: {
          id: "FinancialAddressId",
        },
      },
    },
    outputs: {
      FinancialAddressId: {
        schema: {
          type: "string",
          description: "The ID of the FinancialAddress.",
        },
        schemaPath:
          "#/components/schemas/v2.money_management.financial_address/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.money_management.financial_address",
    schemaPath: "#/components/schemas/v2.money_management.financial_address",
    creations: [
      {
        operationId: "PostV2MoneyManagementFinancialAddresses",
        inputSchemaPath:
          "#/paths/~1v2~1money_management~1financial_addresses/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.financial_address",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2MoneyManagementFinancialAddresses",
        reason:
          "No update operation matches the saved-identity resource path /v2/money_management/financial_addresses/{id}",
      },
      {
        operationId: "PostV2MoneyManagementFinancialAddresses",
        reason:
          "No remove operation matches the saved-identity resource path /v2/money_management/financial_addresses/{id}",
      },
      {
        operationId: "PostV2MoneyManagementFinancialAddresses",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1money_management~1financial_addresses/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Money_management::InboundTransfer": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Money_management::InboundTransfer",
    resource: "inbound-transfer",
    propsSchema: "StripeInboundTransferPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/InboundTransferId"],
    operations: {
      create: "PostV2MoneyManagementInboundTransfers",
      read: {
        operationId: "GetV2MoneyManagementInboundTransfersId",
        parameters: {
          id: "InboundTransferId",
        },
      },
    },
    outputs: {
      InboundTransferId: {
        schema: {
          type: "string",
          description: "Unique identifier for the InboundTransfer.",
        },
        schemaPath:
          "#/components/schemas/v2.money_management.inbound_transfer/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.money_management.inbound_transfer",
    schemaPath: "#/components/schemas/v2.money_management.inbound_transfer",
    creations: [
      {
        operationId: "PostV2MoneyManagementInboundTransfers",
        inputSchemaPath:
          "#/paths/~1v2~1money_management~1inbound_transfers/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.inbound_transfer",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2MoneyManagementInboundTransfers",
        reason:
          "No update operation matches the saved-identity resource path /v2/money_management/inbound_transfers/{id}",
      },
      {
        operationId: "PostV2MoneyManagementInboundTransfers",
        reason:
          "No remove operation matches the saved-identity resource path /v2/money_management/inbound_transfers/{id}",
      },
      {
        operationId: "PostV2MoneyManagementInboundTransfers",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1money_management~1inbound_transfers/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Money_management::OutboundPayment": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Money_management::OutboundPayment",
    resource: "outbound-payment",
    propsSchema: "StripeOutboundPaymentPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/OutboundPaymentId"],
    operations: {
      create: "PostV2MoneyManagementOutboundPayments",
      read: {
        operationId: "GetV2MoneyManagementOutboundPaymentsId",
        parameters: {
          id: "OutboundPaymentId",
        },
      },
    },
    outputs: {
      OutboundPaymentId: {
        schema: {
          type: "string",
          description: "Unique identifier for the OutboundPayment.",
        },
        schemaPath:
          "#/components/schemas/v2.money_management.outbound_payment/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.money_management.outbound_payment",
    schemaPath: "#/components/schemas/v2.money_management.outbound_payment",
    creations: [
      {
        operationId: "PostV2MoneyManagementOutboundPayments",
        inputSchemaPath:
          "#/paths/~1v2~1money_management~1outbound_payments/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.outbound_payment",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2MoneyManagementOutboundPayments",
        reason:
          "No update operation matches the saved-identity resource path /v2/money_management/outbound_payments/{id}",
      },
      {
        operationId: "PostV2MoneyManagementOutboundPayments",
        reason:
          "No remove operation matches the saved-identity resource path /v2/money_management/outbound_payments/{id}",
      },
      {
        operationId: "PostV2MoneyManagementOutboundPayments",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1money_management~1outbound_payments/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Money_management::OutboundSetupIntent": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Money_management::OutboundSetupIntent",
    resource: "outbound-setup-intent",
    propsSchema: "StripeOutboundSetupIntentPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/OutboundSetupIntentId"],
    operations: {
      create: "PostV2MoneyManagementOutboundSetupIntents",
      read: {
        operationId: "GetV2MoneyManagementOutboundSetupIntentsId",
        parameters: {
          id: "OutboundSetupIntentId",
        },
      },
      update: {
        operationId: "PostV2MoneyManagementOutboundSetupIntentsId",
        parameters: {
          id: "OutboundSetupIntentId",
        },
      },
    },
    outputs: {
      OutboundSetupIntentId: {
        schema: {
          type: "string",
          description: "ID of the outbound setup intent.",
        },
        schemaPath:
          "#/components/schemas/v2.money_management.outbound_setup_intent/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.money_management.outbound_setup_intent",
    schemaPath:
      "#/components/schemas/v2.money_management.outbound_setup_intent",
    creations: [
      {
        operationId: "PostV2MoneyManagementOutboundSetupIntents",
        inputSchemaPath:
          "#/paths/~1v2~1money_management~1outbound_setup_intents/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.outbound_setup_intent",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2MoneyManagementOutboundSetupIntents",
        reason:
          "No remove operation matches the saved-identity resource path /v2/money_management/outbound_setup_intents/{id}",
      },
      {
        operationId: "PostV2MoneyManagementOutboundSetupIntents",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1money_management~1outbound_setup_intents/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Money_management::PayoutIntent": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Money_management::PayoutIntent",
    resource: "payout-intent",
    propsSchema: "StripePayoutIntentPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PayoutIntentId"],
    operations: {
      create: "PostV2MoneyManagementPayoutIntents",
      read: {
        operationId: "GetV2MoneyManagementPayoutIntentsId",
        parameters: {
          id: "PayoutIntentId",
        },
      },
      update: {
        operationId: "PostV2MoneyManagementPayoutIntentsId",
        parameters: {
          id: "PayoutIntentId",
        },
      },
    },
    outputs: {
      PayoutIntentId: {
        schema: {
          type: "string",
          description: "Unique identifier for the PayoutIntent.",
        },
        schemaPath:
          "#/components/schemas/v2.money_management.payout_intent/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.money_management.payout_intent",
    schemaPath: "#/components/schemas/v2.money_management.payout_intent",
    creations: [
      {
        operationId: "PostV2MoneyManagementPayoutIntents",
        inputSchemaPath:
          "#/paths/~1v2~1money_management~1payout_intents/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.payout_intent",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2MoneyManagementPayoutIntents",
        reason:
          "No remove operation matches the saved-identity resource path /v2/money_management/payout_intents/{id}",
      },
      {
        operationId: "PostV2MoneyManagementPayoutIntents",
        reason: "Replacement properties require a reviewed resource hint",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1money_management~1payout_intents/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Money_management::RecipientVerification": {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    typeName: "Stripe::Money_management::RecipientVerification",
    resource: "recipient-verification",
    propsSchema: "StripeRecipientVerificationPropsSchema",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/RecipientVerificationId"],
    operations: {
      create: "PostV2MoneyManagementRecipientVerifications",
      read: {
        operationId: "GetV2MoneyManagementRecipientVerificationsId",
        parameters: {
          id: "RecipientVerificationId",
        },
      },
    },
    outputs: {
      RecipientVerificationId: {
        schema: {
          type: "string",
          description: "The ID of the RecipientVerification.",
        },
        schemaPath:
          "#/components/schemas/v2.money_management.recipient_verification/properties/id",
        valuePath: "/id",
        required: true,
        retainOnRead: false,
      },
    },
    providerResource: "v2.money_management.recipient_verification",
    schemaPath:
      "#/components/schemas/v2.money_management.recipient_verification",
    creations: [
      {
        operationId: "PostV2MoneyManagementRecipientVerifications",
        inputSchemaPath:
          "#/paths/~1v2~1money_management~1recipient_verifications/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.recipient_verification",
      },
      {
        operationId: "PostV2TestHelpersMoneyManagementRecipientVerifications",
        inputSchemaPath:
          "#/paths/~1v2~1test_helpers~1money_management~1recipient_verifications/post/requestBody/content/application~1json/schema",
        responseSchemaPath:
          "#/components/schemas/v2.money_management.recipient_verification",
      },
    ],
    bindingIssues: [
      {
        operationId: "PostV2MoneyManagementRecipientVerifications",
        reason:
          "No update operation matches the saved-identity resource path /v2/money_management/recipient_verifications/{id}",
      },
      {
        operationId: "PostV2MoneyManagementRecipientVerifications",
        reason:
          "No remove operation matches the saved-identity resource path /v2/money_management/recipient_verifications/{id}",
      },
      {
        operationId: "PostV2MoneyManagementRecipientVerifications",
        reason: "Replacement properties require a reviewed resource hint",
      },
      {
        operationId: "PostV2TestHelpersMoneyManagementRecipientVerifications",
        reason:
          "Creation is cataloged; a compatible saved-identity read binding is unresolved",
      },
    ],
    inputSchemaPath:
      "#/paths/~1v2~1money_management~1recipient_verifications/post/requestBody/content/application~1json/schema",
    relationships: [],
  },
  "Stripe::Billing::BillingConfigurationExport": {
    source: {
      provider: "Stripe",
      service: "Billing",
      name: "tools/stripe/local-resource-source.json",
      format: "JsonSchema",
    },
    typeName: "Stripe::Billing::BillingConfigurationExport",
    resource: "configuration-export",
    propsSchema: "StripeBillingConfigurationExportPropsSchema",
    primaryIdentifier: ["/properties/OutputPath"],
    replacement: {
      order: "destroyBeforeCreate",
      properties: [["outputPath"]],
    },
    documentSchema: "StripeBillingConfigurationExportDocumentSchema",
    references: [
      {
        propertyPath: ["billingPortalConfigurationId"],
        resourceType: "Stripe::Billing::BillingPortalConfiguration",
        output: "BillingPortalConfigurationId",
      },
      {
        propertyPath: ["prices", "activeMonthly"],
        resourceType: "Stripe::Billing::Price",
        output: "PriceId",
      },
      {
        propertyPath: ["prices", "advancedMonthly"],
        resourceType: "Stripe::Billing::Price",
        output: "PriceId",
      },
      {
        propertyPath: ["prices", "starterMonthly"],
        resourceType: "Stripe::Billing::Price",
        output: "PriceId",
      },
      {
        propertyPath: ["products", "active"],
        resourceType: "Stripe::Billing::Product",
        output: "ProductId",
      },
      {
        propertyPath: ["products", "advanced"],
        resourceType: "Stripe::Billing::Product",
        output: "ProductId",
      },
      {
        propertyPath: ["products", "starter"],
        resourceType: "Stripe::Billing::Product",
        output: "ProductId",
      },
      {
        propertyPath: ["webhookEndpoint", "id"],
        resourceType: "Stripe::Billing::WebhookEndpoint",
        output: "WebhookEndpointId",
      },
    ],
    file: {
      pathProperty: "outputPath",
      pathOutput: "OutputPath",
    },
    outputs: {
      OutputPath: {
        schema: {
          type: "string",
          minLength: 1,
        },
        schemaPath:
          "#/resources/Stripe::Billing::BillingConfigurationExport/input/properties/outputPath",
        valuePath: "/outputPath",
        required: true,
      },
    },
  },
};
export const stripeUnresolvedResources = [
  {
    operationId: "PostAccountLinks",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostAccountSessions",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostAccounts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostAccountsAccountBankAccounts",
    reason: "Required creation parameters need relationship hints: account",
  },
  {
    operationId: "PostAccountsAccountExternalAccounts",
    reason: "Required creation parameters need relationship hints: account",
  },
  {
    operationId: "PostAccountsAccountExternalAccounts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostAccountsAccountLoginLinks",
    reason: "Required creation parameters need relationship hints: account",
  },
  {
    operationId: "PostAccountsAccountPeople",
    reason: "Required creation parameters need relationship hints: account",
  },
  {
    operationId: "PostAccountsAccountPersons",
    reason: "Required creation parameters need relationship hints: account",
  },
  {
    operationId: "PostApplePayDomains",
    reason:
      "No update operation matches the saved-identity resource path /v1/apple_pay/domains/{domain}",
  },
  {
    operationId: "PostApplePayDomains",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostApplicationFeesIdRefunds",
    reason: "Required creation parameters need relationship hints: id",
  },
  {
    operationId: "PostAppsInstalls",
    reason:
      "No remove operation matches the saved-identity resource path /v1/apps/installs/{id}",
  },
  {
    operationId: "PostAppsInstalls",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostBillingAlerts",
    reason:
      "No update operation matches the saved-identity resource path /v1/billing/alerts/{id}",
  },
  {
    operationId: "PostBillingAlerts",
    reason:
      "No remove operation matches the saved-identity resource path /v1/billing/alerts/{id}",
  },
  {
    operationId: "PostBillingAlerts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostBillingCreditGrants",
    reason:
      "No remove operation matches the saved-identity resource path /v1/billing/credit_grants/{id}",
  },
  {
    operationId: "PostBillingCreditGrants",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostBillingFeedbackOptions",
    reason:
      "No remove operation matches the saved-identity resource path /v1/billing/feedback_options/{id}",
  },
  {
    operationId: "PostBillingFeedbackOptions",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostBillingMeterEventAdjustments",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostBillingMeterEvents",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostBillingMeters",
    reason:
      "No remove operation matches the saved-identity resource path /v1/billing/meters/{id}",
  },
  {
    operationId: "PostBillingMeters",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostBillingPortalConfigurations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostBillingPortalSessions",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostCharges",
    reason:
      "No remove operation matches the saved-identity resource path /v1/charges/{charge}",
  },
  {
    operationId: "PostCharges",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostChargesChargeRefund",
    reason: "Required creation parameters need relationship hints: charge",
  },
  {
    operationId: "PostRefunds",
    reason:
      "No remove operation matches the saved-identity resource path /v1/refunds/{refund}",
  },
  {
    operationId: "PostRefunds",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostChargesChargeRefunds",
    reason: "Required creation parameters need relationship hints: charge",
  },
  {
    operationId: "PostCheckoutSessions",
    reason:
      "No remove operation matches the saved-identity resource path /v1/checkout/sessions/{session}",
  },
  {
    operationId: "PostCheckoutSessions",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostClimateOrders",
    reason:
      "No remove operation matches the saved-identity resource path /v1/climate/orders/{order}",
  },
  {
    operationId: "PostClimateOrders",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostCoupons",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostCreditNotes",
    reason:
      "No remove operation matches the saved-identity resource path /v1/credit_notes/{id}",
  },
  {
    operationId: "PostCreditNotes",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostCustomerSessions",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostCustomers",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostCustomersCustomerBalanceTransactions",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostCustomersCustomerBankAccounts",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostCustomersCustomerCards",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostCustomersCustomerSources",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostCustomersCustomerFundingInstructions",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostSubscriptions",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostCustomersCustomerSubscriptions",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostTaxIds",
    reason:
      "No update operation matches the saved-identity resource path /v1/tax_ids/{id}",
  },
  {
    operationId: "PostTaxIds",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostCustomersCustomerTaxIds",
    reason: "Required creation parameters need relationship hints: customer",
  },
  {
    operationId: "PostEntitlementsFeatures",
    reason:
      "No remove operation matches the saved-identity resource path /v1/entitlements/features/{id}",
  },
  {
    operationId: "PostEntitlementsFeatures",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostEphemeralKeys",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostFileLinks",
    reason:
      "No remove operation matches the saved-identity resource path /v1/file_links/{link}",
  },
  {
    operationId: "PostFileLinks",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostFiles",
    reason:
      "No update operation matches the saved-identity resource path /v1/files/{file}",
  },
  {
    operationId: "PostFiles",
    reason:
      "No remove operation matches the saved-identity resource path /v1/files/{file}",
  },
  {
    operationId: "PostFiles",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostFinancialConnectionsSessions",
    reason:
      "No update operation matches the saved-identity resource path /v1/financial_connections/sessions/{session}",
  },
  {
    operationId: "PostFinancialConnectionsSessions",
    reason:
      "No remove operation matches the saved-identity resource path /v1/financial_connections/sessions/{session}",
  },
  {
    operationId: "PostFinancialConnectionsSessions",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostForwardingRequests",
    reason:
      "No update operation matches the saved-identity resource path /v1/forwarding/requests/{id}",
  },
  {
    operationId: "PostForwardingRequests",
    reason:
      "No remove operation matches the saved-identity resource path /v1/forwarding/requests/{id}",
  },
  {
    operationId: "PostForwardingRequests",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostIdentityVerificationSessions",
    reason:
      "No remove operation matches the saved-identity resource path /v1/identity/verification_sessions/{session}",
  },
  {
    operationId: "PostIdentityVerificationSessions",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostInvoiceitems",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostInvoices",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostInvoicesCreatePreview",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostIssuingCardholders",
    reason:
      "No remove operation matches the saved-identity resource path /v1/issuing/cardholders/{cardholder}",
  },
  {
    operationId: "PostIssuingCardholders",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostIssuingCards",
    reason:
      "No remove operation matches the saved-identity resource path /v1/issuing/cards/{card}",
  },
  {
    operationId: "PostIssuingCards",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostIssuingDisputes",
    reason:
      "No remove operation matches the saved-identity resource path /v1/issuing/disputes/{dispute}",
  },
  {
    operationId: "PostIssuingDisputes",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostIssuingPersonalizationDesigns",
    reason:
      "No remove operation matches the saved-identity resource path /v1/issuing/personalization_designs/{personalization_design}",
  },
  {
    operationId: "PostIssuingPersonalizationDesigns",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPaymentIntents",
    reason:
      "No remove operation matches the saved-identity resource path /v1/payment_intents/{intent}",
  },
  {
    operationId: "PostPaymentIntents",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPaymentLinks",
    reason:
      "No remove operation matches the saved-identity resource path /v1/payment_links/{payment_link}",
  },
  {
    operationId: "PostPaymentLinks",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPaymentMethodConfigurations",
    reason:
      "No remove operation matches the saved-identity resource path /v1/payment_method_configurations/{configuration}",
  },
  {
    operationId: "PostPaymentMethodConfigurations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPaymentMethodDomains",
    reason:
      "No remove operation matches the saved-identity resource path /v1/payment_method_domains/{payment_method_domain}",
  },
  {
    operationId: "PostPaymentMethodDomains",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPaymentMethods",
    reason:
      "No remove operation matches the saved-identity resource path /v1/payment_methods/{payment_method}",
  },
  {
    operationId: "PostPaymentMethods",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPayouts",
    reason:
      "No remove operation matches the saved-identity resource path /v1/payouts/{payout}",
  },
  {
    operationId: "PostPayouts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPlans",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostProductCatalogTrialOffers",
    reason:
      "No remove operation matches the saved-identity resource path /v1/product_catalog/trial_offers/{id}",
  },
  {
    operationId: "PostProductCatalogTrialOffers",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostProducts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostPromotionCodes",
    reason:
      "No remove operation matches the saved-identity resource path /v1/promotion_codes/{promotion_code}",
  },
  {
    operationId: "PostPromotionCodes",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostQuotes",
    reason:
      "No remove operation matches the saved-identity resource path /v1/quotes/{quote}",
  },
  {
    operationId: "PostQuotes",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostRadarPaymentEvaluations",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostRadarValueListItems",
    reason:
      "No update operation matches the saved-identity resource path /v1/radar/value_list_items/{item}",
  },
  {
    operationId: "PostRadarValueListItems",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostRadarValueLists",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostReportingReportRuns",
    reason:
      "No update operation matches the saved-identity resource path /v1/reporting/report_runs/{report_run}",
  },
  {
    operationId: "PostReportingReportRuns",
    reason:
      "No remove operation matches the saved-identity resource path /v1/reporting/report_runs/{report_run}",
  },
  {
    operationId: "PostReportingReportRuns",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostSetupIntents",
    reason:
      "No remove operation matches the saved-identity resource path /v1/setup_intents/{intent}",
  },
  {
    operationId: "PostSetupIntents",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostShippingRates",
    reason:
      "No remove operation matches the saved-identity resource path /v1/shipping_rates/{shipping_rate_token}",
  },
  {
    operationId: "PostShippingRates",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostSources",
    reason:
      "No remove operation matches the saved-identity resource path /v1/sources/{source}",
  },
  {
    operationId: "PostSources",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostSubscriptionItems",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostSubscriptionSchedules",
    reason:
      "No remove operation matches the saved-identity resource path /v1/subscription_schedules/{schedule}",
  },
  {
    operationId: "PostSubscriptionSchedules",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTaxCalculations",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTaxLocations",
    reason:
      "No update operation matches the saved-identity resource path /v1/tax/locations/{location}",
  },
  {
    operationId: "PostTaxLocations",
    reason:
      "No remove operation matches the saved-identity resource path /v1/tax/locations/{location}",
  },
  {
    operationId: "PostTaxLocations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTaxRegistrations",
    reason:
      "No remove operation matches the saved-identity resource path /v1/tax/registrations/{id}",
  },
  {
    operationId: "PostTaxRegistrations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTaxTransactionsCreateFromCalculation",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTaxTransactionsCreateReversal",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTaxRates",
    reason:
      "No remove operation matches the saved-identity resource path /v1/tax_rates/{tax_rate}",
  },
  {
    operationId: "PostTaxRates",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTerminalConfigurations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTerminalConnectionTokens",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTerminalLocations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTerminalOnboardingLinks",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTerminalReaders",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTerminalRefunds",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTestHelpersConfirmationTokens",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTestHelpersIssuingAuthorizations",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTestHelpersIssuingSettlements",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTestHelpersIssuingTransactionsCreateForceCapture",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTestHelpersIssuingTransactionsCreateUnlinkedRefund",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostTestHelpersTestClocks",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostThreeDSecureAuthentications",
    reason:
      "No update operation matches the saved-identity resource path /v1/three_d_secure/authentications/{authentication}",
  },
  {
    operationId: "PostThreeDSecureAuthentications",
    reason:
      "No remove operation matches the saved-identity resource path /v1/three_d_secure/authentications/{authentication}",
  },
  {
    operationId: "PostThreeDSecureAuthentications",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTokens",
    reason:
      "No update operation matches the saved-identity resource path /v1/tokens/{token}",
  },
  {
    operationId: "PostTokens",
    reason:
      "No remove operation matches the saved-identity resource path /v1/tokens/{token}",
  },
  {
    operationId: "PostTokens",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTopups",
    reason:
      "No remove operation matches the saved-identity resource path /v1/topups/{topup}",
  },
  {
    operationId: "PostTopups",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTransfers",
    reason:
      "No remove operation matches the saved-identity resource path /v1/transfers/{transfer}",
  },
  {
    operationId: "PostTransfers",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTransfersIdReversals",
    reason: "Required creation parameters need relationship hints: id",
  },
  {
    operationId: "PostTreasuryCreditReversals",
    reason:
      "No update operation matches the saved-identity resource path /v1/treasury/credit_reversals/{credit_reversal}",
  },
  {
    operationId: "PostTreasuryCreditReversals",
    reason:
      "No remove operation matches the saved-identity resource path /v1/treasury/credit_reversals/{credit_reversal}",
  },
  {
    operationId: "PostTreasuryCreditReversals",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTreasuryDebitReversals",
    reason:
      "No update operation matches the saved-identity resource path /v1/treasury/debit_reversals/{debit_reversal}",
  },
  {
    operationId: "PostTreasuryDebitReversals",
    reason:
      "No remove operation matches the saved-identity resource path /v1/treasury/debit_reversals/{debit_reversal}",
  },
  {
    operationId: "PostTreasuryDebitReversals",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTreasuryFinancialAccounts",
    reason:
      "No remove operation matches the saved-identity resource path /v1/treasury/financial_accounts/{financial_account}",
  },
  {
    operationId: "PostTreasuryFinancialAccounts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTreasuryInboundTransfers",
    reason:
      "No update operation matches the saved-identity resource path /v1/treasury/inbound_transfers/{id}",
  },
  {
    operationId: "PostTreasuryInboundTransfers",
    reason:
      "No remove operation matches the saved-identity resource path /v1/treasury/inbound_transfers/{id}",
  },
  {
    operationId: "PostTreasuryInboundTransfers",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTreasuryOutboundPayments",
    reason:
      "No update operation matches the saved-identity resource path /v1/treasury/outbound_payments/{id}",
  },
  {
    operationId: "PostTreasuryOutboundPayments",
    reason:
      "No remove operation matches the saved-identity resource path /v1/treasury/outbound_payments/{id}",
  },
  {
    operationId: "PostTreasuryOutboundPayments",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostTreasuryOutboundTransfers",
    reason:
      "No update operation matches the saved-identity resource path /v1/treasury/outbound_transfers/{outbound_transfer}",
  },
  {
    operationId: "PostTreasuryOutboundTransfers",
    reason:
      "No remove operation matches the saved-identity resource path /v1/treasury/outbound_transfers/{outbound_transfer}",
  },
  {
    operationId: "PostTreasuryOutboundTransfers",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2BillingMeterEventAdjustments",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostV2BillingMeterEventSession",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostV2BillingMeterEventStream",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostV2BillingMeterEvents",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostV2CommerceProductCatalogImports",
    reason:
      "No update operation matches the saved-identity resource path /v2/commerce/product_catalog/imports/{id}",
  },
  {
    operationId: "PostV2CommerceProductCatalogImports",
    reason:
      "No remove operation matches the saved-identity resource path /v2/commerce/product_catalog/imports/{id}",
  },
  {
    operationId: "PostV2CommerceProductCatalogImports",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2CoreAccountLinks",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostV2CoreAccountTokens",
    reason:
      "No update operation matches the saved-identity resource path /v2/core/account_tokens/{id}",
  },
  {
    operationId: "PostV2CoreAccountTokens",
    reason:
      "No remove operation matches the saved-identity resource path /v2/core/account_tokens/{id}",
  },
  {
    operationId: "PostV2CoreAccountTokens",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2CoreAccounts",
    reason:
      "No remove operation matches the saved-identity resource path /v2/core/accounts/{id}",
  },
  {
    operationId: "PostV2CoreAccounts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2CoreAccountsAccountIdPersonTokens",
    reason: "Required creation parameters need relationship hints: account_id",
  },
  {
    operationId: "PostV2CoreAccountsAccountIdPersons",
    reason: "Required creation parameters need relationship hints: account_id",
  },
  {
    operationId: "PostV2CoreEventDestinations",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2CoreVaultGbBankAccounts",
    reason:
      "No update operation matches the saved-identity resource path /v2/core/vault/gb_bank_accounts/{id}",
  },
  {
    operationId: "PostV2CoreVaultGbBankAccounts",
    reason:
      "No remove operation matches the saved-identity resource path /v2/core/vault/gb_bank_accounts/{id}",
  },
  {
    operationId: "PostV2CoreVaultGbBankAccounts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2CoreVaultUsBankAccounts",
    reason:
      "No remove operation matches the saved-identity resource path /v2/core/vault/us_bank_accounts/{id}",
  },
  {
    operationId: "PostV2CoreVaultUsBankAccounts",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2MoneyManagementFinancialAddresses",
    reason:
      "No update operation matches the saved-identity resource path /v2/money_management/financial_addresses/{id}",
  },
  {
    operationId: "PostV2MoneyManagementFinancialAddresses",
    reason:
      "No remove operation matches the saved-identity resource path /v2/money_management/financial_addresses/{id}",
  },
  {
    operationId: "PostV2MoneyManagementFinancialAddresses",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2MoneyManagementInboundTransfers",
    reason:
      "No update operation matches the saved-identity resource path /v2/money_management/inbound_transfers/{id}",
  },
  {
    operationId: "PostV2MoneyManagementInboundTransfers",
    reason:
      "No remove operation matches the saved-identity resource path /v2/money_management/inbound_transfers/{id}",
  },
  {
    operationId: "PostV2MoneyManagementInboundTransfers",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2MoneyManagementOutboundPayments",
    reason:
      "No update operation matches the saved-identity resource path /v2/money_management/outbound_payments/{id}",
  },
  {
    operationId: "PostV2MoneyManagementOutboundPayments",
    reason:
      "No remove operation matches the saved-identity resource path /v2/money_management/outbound_payments/{id}",
  },
  {
    operationId: "PostV2MoneyManagementOutboundPayments",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2MoneyManagementOutboundSetupIntents",
    reason:
      "No remove operation matches the saved-identity resource path /v2/money_management/outbound_setup_intents/{id}",
  },
  {
    operationId: "PostV2MoneyManagementOutboundSetupIntents",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2MoneyManagementPayoutIntents",
    reason:
      "No remove operation matches the saved-identity resource path /v2/money_management/payout_intents/{id}",
  },
  {
    operationId: "PostV2MoneyManagementPayoutIntents",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2MoneyManagementRecipientVerifications",
    reason:
      "No update operation matches the saved-identity resource path /v2/money_management/recipient_verifications/{id}",
  },
  {
    operationId: "PostV2MoneyManagementRecipientVerifications",
    reason:
      "No remove operation matches the saved-identity resource path /v2/money_management/recipient_verifications/{id}",
  },
  {
    operationId: "PostV2MoneyManagementRecipientVerifications",
    reason: "Replacement properties require a reviewed resource hint",
  },
  {
    operationId: "PostV2TestHelpersMoneyManagementRecipientVerifications",
    reason:
      "Creation is cataloged; a compatible saved-identity read binding is unresolved",
  },
  {
    operationId: "PostFiles",
    reason:
      "StripeClient does not support the declared request encoding: multipart/form-data",
  },
];
