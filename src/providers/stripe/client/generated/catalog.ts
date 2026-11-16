export const stripeOperationCatalog = [
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccounts",
    method: "GET",
    path: "/v1/accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccounts",
    method: "POST",
    path: "/v1/accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccount",
    method: "GET",
    path: "/v1/accounts/{account}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccount",
    method: "POST",
    path: "/v1/accounts/{account}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteAccountsAccount",
    method: "DELETE",
    path: "/v1/accounts/{account}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountBankAccounts",
    method: "POST",
    path: "/v1/accounts/{account}/bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountBankAccountsId",
    method: "GET",
    path: "/v1/accounts/{account}/bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountBankAccountsId",
    method: "POST",
    path: "/v1/accounts/{account}/bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteAccountsAccountBankAccountsId",
    method: "DELETE",
    path: "/v1/accounts/{account}/bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountCapabilities",
    method: "GET",
    path: "/v1/accounts/{account}/capabilities",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountCapabilitiesCapability",
    method: "GET",
    path: "/v1/accounts/{account}/capabilities/{capability}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "capability",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountCapabilitiesCapability",
    method: "POST",
    path: "/v1/accounts/{account}/capabilities/{capability}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "capability",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountExternalAccounts",
    method: "GET",
    path: "/v1/accounts/{account}/external_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "object",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountExternalAccounts",
    method: "POST",
    path: "/v1/accounts/{account}/external_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountExternalAccountsId",
    method: "GET",
    path: "/v1/accounts/{account}/external_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountExternalAccountsId",
    method: "POST",
    path: "/v1/accounts/{account}/external_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteAccountsAccountExternalAccountsId",
    method: "DELETE",
    path: "/v1/accounts/{account}/external_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountLoginLinks",
    method: "POST",
    path: "/v1/accounts/{account}/login_links",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountPeople",
    method: "GET",
    path: "/v1/accounts/{account}/people",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "relationship",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountPeople",
    method: "POST",
    path: "/v1/accounts/{account}/people",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountPeoplePerson",
    method: "GET",
    path: "/v1/accounts/{account}/people/{person}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "person",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountPeoplePerson",
    method: "POST",
    path: "/v1/accounts/{account}/people/{person}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "person",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteAccountsAccountPeoplePerson",
    method: "DELETE",
    path: "/v1/accounts/{account}/people/{person}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "person",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountPersons",
    method: "GET",
    path: "/v1/accounts/{account}/persons",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "relationship",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountPersons",
    method: "POST",
    path: "/v1/accounts/{account}/persons",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAccountsAccountPersonsPerson",
    method: "GET",
    path: "/v1/accounts/{account}/persons/{person}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "person",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountPersonsPerson",
    method: "POST",
    path: "/v1/accounts/{account}/persons/{person}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "person",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteAccountsAccountPersonsPerson",
    method: "DELETE",
    path: "/v1/accounts/{account}/persons/{person}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
      {
        name: "person",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountReject",
    method: "POST",
    path: "/v1/accounts/{account}/reject",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAccountsAccountUnreject",
    method: "POST",
    path: "/v1/accounts/{account}/unreject",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetApplePayDomains",
    method: "GET",
    path: "/v1/apple_pay/domains",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "domain_name",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostApplePayDomains",
    method: "POST",
    path: "/v1/apple_pay/domains",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetApplePayDomainsDomain",
    method: "GET",
    path: "/v1/apple_pay/domains/{domain}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "domain",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteApplePayDomainsDomain",
    method: "DELETE",
    path: "/v1/apple_pay/domains/{domain}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "domain",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAppsInstalls",
    method: "GET",
    path: "/v1/apps/installs",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account",
        location: "query",
        required: false,
      },
      {
        name: "app",
        location: "query",
        required: false,
      },
      {
        name: "approval_required",
        location: "query",
        required: false,
      },
      {
        name: "channel",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "created_by",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAppsInstalls",
    method: "POST",
    path: "/v1/apps/installs",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetAppsInstallsId",
    method: "GET",
    path: "/v1/apps/installs/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAppsInstallsId",
    method: "POST",
    path: "/v1/apps/installs/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostAppsInstallsIdUninstall",
    method: "POST",
    path: "/v1/apps/installs/{id}/uninstall",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingAlerts",
    method: "GET",
    path: "/v1/billing/alerts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "alert_type",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "meter",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingAlerts",
    method: "POST",
    path: "/v1/billing/alerts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingAlertsId",
    method: "GET",
    path: "/v1/billing/alerts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingAlertsIdActivate",
    method: "POST",
    path: "/v1/billing/alerts/{id}/activate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingAlertsIdArchive",
    method: "POST",
    path: "/v1/billing/alerts/{id}/archive",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingAlertsIdDeactivate",
    method: "POST",
    path: "/v1/billing/alerts/{id}/deactivate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingCreditGrants",
    method: "GET",
    path: "/v1/billing/credit_grants",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingCreditGrants",
    method: "POST",
    path: "/v1/billing/credit_grants",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingCreditGrantsId",
    method: "GET",
    path: "/v1/billing/credit_grants/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingCreditGrantsId",
    method: "POST",
    path: "/v1/billing/credit_grants/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingCreditGrantsIdExpire",
    method: "POST",
    path: "/v1/billing/credit_grants/{id}/expire",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingCreditGrantsIdVoid",
    method: "POST",
    path: "/v1/billing/credit_grants/{id}/void",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingFeedbackOptions",
    method: "GET",
    path: "/v1/billing/feedback_options",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingFeedbackOptions",
    method: "POST",
    path: "/v1/billing/feedback_options",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingFeedbackOptionsId",
    method: "GET",
    path: "/v1/billing/feedback_options/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingFeedbackOptionsId",
    method: "POST",
    path: "/v1/billing/feedback_options/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingFeedbackOptionsIdDeactivate",
    method: "POST",
    path: "/v1/billing/feedback_options/{id}/deactivate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingMeters",
    method: "GET",
    path: "/v1/billing/meters",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingMeters",
    method: "POST",
    path: "/v1/billing/meters",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingMetersId",
    method: "GET",
    path: "/v1/billing/meters/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingMetersId",
    method: "POST",
    path: "/v1/billing/meters/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingMetersIdDeactivate",
    method: "POST",
    path: "/v1/billing/meters/{id}/deactivate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingMetersIdEventSummaries",
    method: "GET",
    path: "/v1/billing/meters/{id}/event_summaries",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "query",
        required: true,
      },
      {
        name: "end_time",
        location: "query",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "start_time",
        location: "query",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "value_grouping_window",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingMetersIdReactivate",
    method: "POST",
    path: "/v1/billing/meters/{id}/reactivate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingPortalConfigurations",
    method: "GET",
    path: "/v1/billing_portal/configurations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "is_default",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingPortalConfigurations",
    method: "POST",
    path: "/v1/billing_portal/configurations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetBillingPortalConfigurationsConfiguration",
    method: "GET",
    path: "/v1/billing_portal/configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostBillingPortalConfigurationsConfiguration",
    method: "POST",
    path: "/v1/billing_portal/configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCharges",
    method: "GET",
    path: "/v1/charges",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "payment_intent",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "transfer_group",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCharges",
    method: "POST",
    path: "/v1/charges",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetChargesSearch",
    method: "GET",
    path: "/v1/charges/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetChargesCharge",
    method: "GET",
    path: "/v1/charges/{charge}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesCharge",
    method: "POST",
    path: "/v1/charges/{charge}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesChargeCapture",
    method: "POST",
    path: "/v1/charges/{charge}/capture",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetChargesChargeDispute",
    method: "GET",
    path: "/v1/charges/{charge}/dispute",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesChargeDispute",
    method: "POST",
    path: "/v1/charges/{charge}/dispute",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesChargeDisputeClose",
    method: "POST",
    path: "/v1/charges/{charge}/dispute/close",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesChargeRefund",
    method: "POST",
    path: "/v1/charges/{charge}/refund",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetChargesChargeRefunds",
    method: "GET",
    path: "/v1/charges/{charge}/refunds",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesChargeRefunds",
    method: "POST",
    path: "/v1/charges/{charge}/refunds",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetChargesChargeRefundsRefund",
    method: "GET",
    path: "/v1/charges/{charge}/refunds/{refund}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "refund",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostChargesChargeRefundsRefund",
    method: "POST",
    path: "/v1/charges/{charge}/refunds/{refund}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "path",
        required: true,
      },
      {
        name: "refund",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCheckoutSessions",
    method: "GET",
    path: "/v1/checkout/sessions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "customer_details",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "payment_intent",
        location: "query",
        required: false,
      },
      {
        name: "payment_link",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "subscription",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCheckoutSessions",
    method: "POST",
    path: "/v1/checkout/sessions",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCheckoutSessionsSession",
    method: "GET",
    path: "/v1/checkout/sessions/{session}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCheckoutSessionsSession",
    method: "POST",
    path: "/v1/checkout/sessions/{session}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCheckoutSessionsSessionExpire",
    method: "POST",
    path: "/v1/checkout/sessions/{session}/expire",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCheckoutSessionsSessionLineItems",
    method: "GET",
    path: "/v1/checkout/sessions/{session}/line_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "session",
        location: "path",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetClimateOrders",
    method: "GET",
    path: "/v1/climate/orders",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostClimateOrders",
    method: "POST",
    path: "/v1/climate/orders",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetClimateOrdersOrder",
    method: "GET",
    path: "/v1/climate/orders/{order}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "order",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostClimateOrdersOrder",
    method: "POST",
    path: "/v1/climate/orders/{order}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "order",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostClimateOrdersOrderCancel",
    method: "POST",
    path: "/v1/climate/orders/{order}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "order",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCoupons",
    method: "GET",
    path: "/v1/coupons",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCoupons",
    method: "POST",
    path: "/v1/coupons",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCouponsCoupon",
    method: "GET",
    path: "/v1/coupons/{coupon}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "coupon",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCouponsCoupon",
    method: "POST",
    path: "/v1/coupons/{coupon}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "coupon",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCouponsCoupon",
    method: "DELETE",
    path: "/v1/coupons/{coupon}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "coupon",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCreditNotes",
    method: "GET",
    path: "/v1/credit_notes",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCreditNotes",
    method: "POST",
    path: "/v1/credit_notes",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCreditNotesPreview",
    method: "GET",
    path: "/v1/credit_notes/preview",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "amount",
        location: "query",
        required: false,
      },
      {
        name: "credit_amount",
        location: "query",
        required: false,
      },
      {
        name: "effective_at",
        location: "query",
        required: false,
      },
      {
        name: "email_type",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "query",
        required: true,
      },
      {
        name: "lines",
        location: "query",
        required: false,
      },
      {
        name: "memo",
        location: "query",
        required: false,
      },
      {
        name: "metadata",
        location: "query",
        required: false,
      },
      {
        name: "out_of_band_amount",
        location: "query",
        required: false,
      },
      {
        name: "reason",
        location: "query",
        required: false,
      },
      {
        name: "refund_amount",
        location: "query",
        required: false,
      },
      {
        name: "refunds",
        location: "query",
        required: false,
      },
      {
        name: "shipping_cost",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCreditNotesPreviewLines",
    method: "GET",
    path: "/v1/credit_notes/preview/lines",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "amount",
        location: "query",
        required: false,
      },
      {
        name: "credit_amount",
        location: "query",
        required: false,
      },
      {
        name: "effective_at",
        location: "query",
        required: false,
      },
      {
        name: "email_type",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "query",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "lines",
        location: "query",
        required: false,
      },
      {
        name: "memo",
        location: "query",
        required: false,
      },
      {
        name: "metadata",
        location: "query",
        required: false,
      },
      {
        name: "out_of_band_amount",
        location: "query",
        required: false,
      },
      {
        name: "reason",
        location: "query",
        required: false,
      },
      {
        name: "refund_amount",
        location: "query",
        required: false,
      },
      {
        name: "refunds",
        location: "query",
        required: false,
      },
      {
        name: "shipping_cost",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCreditNotesCreditNoteLines",
    method: "GET",
    path: "/v1/credit_notes/{credit_note}/lines",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "credit_note",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCreditNotesId",
    method: "GET",
    path: "/v1/credit_notes/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCreditNotesId",
    method: "POST",
    path: "/v1/credit_notes/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCreditNotesIdVoid",
    method: "POST",
    path: "/v1/credit_notes/{id}/void",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomers",
    method: "GET",
    path: "/v1/customers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "email",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "test_clock",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomers",
    method: "POST",
    path: "/v1/customers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersSearch",
    method: "GET",
    path: "/v1/customers/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomer",
    method: "GET",
    path: "/v1/customers/{customer}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomer",
    method: "POST",
    path: "/v1/customers/{customer}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomer",
    method: "DELETE",
    path: "/v1/customers/{customer}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerBalanceTransactions",
    method: "GET",
    path: "/v1/customers/{customer}/balance_transactions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerBalanceTransactions",
    method: "POST",
    path: "/v1/customers/{customer}/balance_transactions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerBalanceTransactionsTransaction",
    method: "GET",
    path: "/v1/customers/{customer}/balance_transactions/{transaction}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "transaction",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerBalanceTransactionsTransaction",
    method: "POST",
    path: "/v1/customers/{customer}/balance_transactions/{transaction}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "transaction",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerBankAccounts",
    method: "GET",
    path: "/v1/customers/{customer}/bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerBankAccounts",
    method: "POST",
    path: "/v1/customers/{customer}/bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerBankAccountsId",
    method: "GET",
    path: "/v1/customers/{customer}/bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerBankAccountsId",
    method: "POST",
    path: "/v1/customers/{customer}/bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomerBankAccountsId",
    method: "DELETE",
    path: "/v1/customers/{customer}/bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerBankAccountsIdVerify",
    method: "POST",
    path: "/v1/customers/{customer}/bank_accounts/{id}/verify",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerCards",
    method: "GET",
    path: "/v1/customers/{customer}/cards",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerCards",
    method: "POST",
    path: "/v1/customers/{customer}/cards",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerCardsId",
    method: "GET",
    path: "/v1/customers/{customer}/cards/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerCardsId",
    method: "POST",
    path: "/v1/customers/{customer}/cards/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomerCardsId",
    method: "DELETE",
    path: "/v1/customers/{customer}/cards/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerCashBalance",
    method: "GET",
    path: "/v1/customers/{customer}/cash_balance",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerCashBalance",
    method: "POST",
    path: "/v1/customers/{customer}/cash_balance",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerCashBalanceTransactions",
    method: "GET",
    path: "/v1/customers/{customer}/cash_balance_transactions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerCashBalanceTransactionsTransaction",
    method: "GET",
    path: "/v1/customers/{customer}/cash_balance_transactions/{transaction}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "transaction",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerDiscount",
    method: "GET",
    path: "/v1/customers/{customer}/discount",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomerDiscount",
    method: "DELETE",
    path: "/v1/customers/{customer}/discount",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerFundingInstructions",
    method: "POST",
    path: "/v1/customers/{customer}/funding_instructions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerPaymentMethods",
    method: "GET",
    path: "/v1/customers/{customer}/payment_methods",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "allow_redisplay",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "type",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerPaymentMethodsPaymentMethod",
    method: "GET",
    path: "/v1/customers/{customer}/payment_methods/{payment_method}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "payment_method",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerSources",
    method: "GET",
    path: "/v1/customers/{customer}/sources",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "object",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerSources",
    method: "POST",
    path: "/v1/customers/{customer}/sources",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerSourcesId",
    method: "GET",
    path: "/v1/customers/{customer}/sources/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerSourcesId",
    method: "POST",
    path: "/v1/customers/{customer}/sources/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomerSourcesId",
    method: "DELETE",
    path: "/v1/customers/{customer}/sources/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerSourcesIdVerify",
    method: "POST",
    path: "/v1/customers/{customer}/sources/{id}/verify",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerSubscriptions",
    method: "GET",
    path: "/v1/customers/{customer}/subscriptions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerSubscriptions",
    method: "POST",
    path: "/v1/customers/{customer}/subscriptions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerSubscriptionsSubscriptionExposedId",
    method: "GET",
    path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerSubscriptionsSubscriptionExposedId",
    method: "POST",
    path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomerSubscriptionsSubscriptionExposedId",
    method: "DELETE",
    path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId:
      "GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount",
    method: "GET",
    path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId:
      "DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount",
    method: "DELETE",
    path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerTaxIds",
    method: "GET",
    path: "/v1/customers/{customer}/tax_ids",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostCustomersCustomerTaxIds",
    method: "POST",
    path: "/v1/customers/{customer}/tax_ids",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetCustomersCustomerTaxIdsId",
    method: "GET",
    path: "/v1/customers/{customer}/tax_ids/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteCustomersCustomerTaxIdsId",
    method: "DELETE",
    path: "/v1/customers/{customer}/tax_ids/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetEntitlementsFeatures",
    method: "GET",
    path: "/v1/entitlements/features",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "archived",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "lookup_key",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostEntitlementsFeatures",
    method: "POST",
    path: "/v1/entitlements/features",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetEntitlementsFeaturesId",
    method: "GET",
    path: "/v1/entitlements/features/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostEntitlementsFeaturesId",
    method: "POST",
    path: "/v1/entitlements/features/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetFileLinks",
    method: "GET",
    path: "/v1/file_links",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "expired",
        location: "query",
        required: false,
      },
      {
        name: "file",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostFileLinks",
    method: "POST",
    path: "/v1/file_links",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetFileLinksLink",
    method: "GET",
    path: "/v1/file_links/{link}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "link",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostFileLinksLink",
    method: "POST",
    path: "/v1/file_links/{link}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "link",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostFinancialConnectionsSessions",
    method: "POST",
    path: "/v1/financial_connections/sessions",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetFinancialConnectionsSessionsSession",
    method: "GET",
    path: "/v1/financial_connections/sessions/{session}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetForwardingRequests",
    method: "GET",
    path: "/v1/forwarding/requests",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostForwardingRequests",
    method: "POST",
    path: "/v1/forwarding/requests",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetForwardingRequestsId",
    method: "GET",
    path: "/v1/forwarding/requests/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIdentityVerificationSessions",
    method: "GET",
    path: "/v1/identity/verification_sessions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "client_reference_id",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "related_customer",
        location: "query",
        required: false,
      },
      {
        name: "related_customer_account",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIdentityVerificationSessions",
    method: "POST",
    path: "/v1/identity/verification_sessions",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIdentityVerificationSessionsSession",
    method: "GET",
    path: "/v1/identity/verification_sessions/{session}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIdentityVerificationSessionsSession",
    method: "POST",
    path: "/v1/identity/verification_sessions/{session}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIdentityVerificationSessionsSessionCancel",
    method: "POST",
    path: "/v1/identity/verification_sessions/{session}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIdentityVerificationSessionsSessionRedact",
    method: "POST",
    path: "/v1/identity/verification_sessions/{session}/redact",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "session",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetInvoiceitems",
    method: "GET",
    path: "/v1/invoiceitems",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "pending",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoiceitems",
    method: "POST",
    path: "/v1/invoiceitems",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetInvoiceitemsInvoiceitem",
    method: "GET",
    path: "/v1/invoiceitems/{invoiceitem}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoiceitem",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoiceitemsInvoiceitem",
    method: "POST",
    path: "/v1/invoiceitems/{invoiceitem}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoiceitem",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteInvoiceitemsInvoiceitem",
    method: "DELETE",
    path: "/v1/invoiceitems/{invoiceitem}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoiceitem",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetInvoices",
    method: "GET",
    path: "/v1/invoices",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "collection_method",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "due_date",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "subscription",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoices",
    method: "POST",
    path: "/v1/invoices",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesCreatePreview",
    method: "POST",
    path: "/v1/invoices/create_preview",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetInvoicesSearch",
    method: "GET",
    path: "/v1/invoices/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetInvoicesInvoice",
    method: "GET",
    path: "/v1/invoices/{invoice}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoice",
    method: "POST",
    path: "/v1/invoices/{invoice}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteInvoicesInvoice",
    method: "DELETE",
    path: "/v1/invoices/{invoice}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceAddLines",
    method: "POST",
    path: "/v1/invoices/{invoice}/add_lines",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceAttachPayment",
    method: "POST",
    path: "/v1/invoices/{invoice}/attach_payment",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceFinalize",
    method: "POST",
    path: "/v1/invoices/{invoice}/finalize",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetInvoicesInvoiceLines",
    method: "GET",
    path: "/v1/invoices/{invoice}/lines",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "invoice",
        location: "path",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceLinesLineItemId",
    method: "POST",
    path: "/v1/invoices/{invoice}/lines/{line_item_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
      {
        name: "line_item_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceMarkUncollectible",
    method: "POST",
    path: "/v1/invoices/{invoice}/mark_uncollectible",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoicePay",
    method: "POST",
    path: "/v1/invoices/{invoice}/pay",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceRemoveLines",
    method: "POST",
    path: "/v1/invoices/{invoice}/remove_lines",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceSend",
    method: "POST",
    path: "/v1/invoices/{invoice}/send",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceUpdateLines",
    method: "POST",
    path: "/v1/invoices/{invoice}/update_lines",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostInvoicesInvoiceVoid",
    method: "POST",
    path: "/v1/invoices/{invoice}/void",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "invoice",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingCardholders",
    method: "GET",
    path: "/v1/issuing/cardholders",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "email",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "phone_number",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "type",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingCardholders",
    method: "POST",
    path: "/v1/issuing/cardholders",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingCardholdersCardholder",
    method: "GET",
    path: "/v1/issuing/cardholders/{cardholder}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "cardholder",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingCardholdersCardholder",
    method: "POST",
    path: "/v1/issuing/cardholders/{cardholder}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "cardholder",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingCards",
    method: "GET",
    path: "/v1/issuing/cards",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "cardholder",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "exp_month",
        location: "query",
        required: false,
      },
      {
        name: "exp_year",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "last4",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "personalization_design",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "type",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingCards",
    method: "POST",
    path: "/v1/issuing/cards",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingCardsCard",
    method: "GET",
    path: "/v1/issuing/cards/{card}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "card",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingCardsCard",
    method: "POST",
    path: "/v1/issuing/cards/{card}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "card",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingDisputes",
    method: "GET",
    path: "/v1/issuing/disputes",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "transaction",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingDisputes",
    method: "POST",
    path: "/v1/issuing/disputes",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingDisputesDispute",
    method: "GET",
    path: "/v1/issuing/disputes/{dispute}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "dispute",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingDisputesDispute",
    method: "POST",
    path: "/v1/issuing/disputes/{dispute}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "dispute",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingDisputesDisputeSubmit",
    method: "POST",
    path: "/v1/issuing/disputes/{dispute}/submit",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "dispute",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingPersonalizationDesigns",
    method: "GET",
    path: "/v1/issuing/personalization_designs",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "lookup_keys",
        location: "query",
        required: false,
      },
      {
        name: "preferences",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingPersonalizationDesigns",
    method: "POST",
    path: "/v1/issuing/personalization_designs",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetIssuingPersonalizationDesignsPersonalizationDesign",
    method: "GET",
    path: "/v1/issuing/personalization_designs/{personalization_design}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "personalization_design",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostIssuingPersonalizationDesignsPersonalizationDesign",
    method: "POST",
    path: "/v1/issuing/personalization_designs/{personalization_design}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "personalization_design",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentIntents",
    method: "GET",
    path: "/v1/payment_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntents",
    method: "POST",
    path: "/v1/payment_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentIntentsSearch",
    method: "GET",
    path: "/v1/payment_intents/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentIntentsIntent",
    method: "GET",
    path: "/v1/payment_intents/{intent}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "client_secret",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntent",
    method: "POST",
    path: "/v1/payment_intents/{intent}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentIntentsIntentAmountDetailsLineItems",
    method: "GET",
    path: "/v1/payment_intents/{intent}/amount_details_line_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "intent",
        location: "path",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntentApplyCustomerBalance",
    method: "POST",
    path: "/v1/payment_intents/{intent}/apply_customer_balance",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntentCancel",
    method: "POST",
    path: "/v1/payment_intents/{intent}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntentCapture",
    method: "POST",
    path: "/v1/payment_intents/{intent}/capture",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntentConfirm",
    method: "POST",
    path: "/v1/payment_intents/{intent}/confirm",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntentIncrementAuthorization",
    method: "POST",
    path: "/v1/payment_intents/{intent}/increment_authorization",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentIntentsIntentVerifyMicrodeposits",
    method: "POST",
    path: "/v1/payment_intents/{intent}/verify_microdeposits",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentLinks",
    method: "GET",
    path: "/v1/payment_links",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentLinks",
    method: "POST",
    path: "/v1/payment_links",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentLinksPaymentLink",
    method: "GET",
    path: "/v1/payment_links/{payment_link}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "payment_link",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentLinksPaymentLink",
    method: "POST",
    path: "/v1/payment_links/{payment_link}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payment_link",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentLinksPaymentLinkLineItems",
    method: "GET",
    path: "/v1/payment_links/{payment_link}/line_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "payment_link",
        location: "path",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentMethodConfigurations",
    method: "GET",
    path: "/v1/payment_method_configurations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "application",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodConfigurations",
    method: "POST",
    path: "/v1/payment_method_configurations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentMethodConfigurationsConfiguration",
    method: "GET",
    path: "/v1/payment_method_configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodConfigurationsConfiguration",
    method: "POST",
    path: "/v1/payment_method_configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentMethodDomains",
    method: "GET",
    path: "/v1/payment_method_domains",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "domain_name",
        location: "query",
        required: false,
      },
      {
        name: "enabled",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodDomains",
    method: "POST",
    path: "/v1/payment_method_domains",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentMethodDomainsPaymentMethodDomain",
    method: "GET",
    path: "/v1/payment_method_domains/{payment_method_domain}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "payment_method_domain",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodDomainsPaymentMethodDomain",
    method: "POST",
    path: "/v1/payment_method_domains/{payment_method_domain}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payment_method_domain",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodDomainsPaymentMethodDomainValidate",
    method: "POST",
    path: "/v1/payment_method_domains/{payment_method_domain}/validate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payment_method_domain",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentMethods",
    method: "GET",
    path: "/v1/payment_methods",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "allow_redisplay",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "type",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethods",
    method: "POST",
    path: "/v1/payment_methods",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPaymentMethodsPaymentMethod",
    method: "GET",
    path: "/v1/payment_methods/{payment_method}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "payment_method",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodsPaymentMethod",
    method: "POST",
    path: "/v1/payment_methods/{payment_method}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payment_method",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodsPaymentMethodAttach",
    method: "POST",
    path: "/v1/payment_methods/{payment_method}/attach",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payment_method",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPaymentMethodsPaymentMethodDetach",
    method: "POST",
    path: "/v1/payment_methods/{payment_method}/detach",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payment_method",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPayouts",
    method: "GET",
    path: "/v1/payouts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "arrival_date",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "destination",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPayouts",
    method: "POST",
    path: "/v1/payouts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPayoutsPayout",
    method: "GET",
    path: "/v1/payouts/{payout}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "payout",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPayoutsPayout",
    method: "POST",
    path: "/v1/payouts/{payout}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payout",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPayoutsPayoutCancel",
    method: "POST",
    path: "/v1/payouts/{payout}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payout",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPayoutsPayoutReverse",
    method: "POST",
    path: "/v1/payouts/{payout}/reverse",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "payout",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPlans",
    method: "GET",
    path: "/v1/plans",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "product",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPlans",
    method: "POST",
    path: "/v1/plans",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPlansPlan",
    method: "GET",
    path: "/v1/plans/{plan}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "plan",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPlansPlan",
    method: "POST",
    path: "/v1/plans/{plan}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "plan",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeletePlansPlan",
    method: "DELETE",
    path: "/v1/plans/{plan}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "plan",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPrices",
    method: "GET",
    path: "/v1/prices",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "currency",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "lookup_keys",
        location: "query",
        required: false,
      },
      {
        name: "product",
        location: "query",
        required: false,
      },
      {
        name: "recurring",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "type",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPrices",
    method: "POST",
    path: "/v1/prices",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPricesSearch",
    method: "GET",
    path: "/v1/prices/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPricesPrice",
    method: "GET",
    path: "/v1/prices/{price}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "price",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPricesPrice",
    method: "POST",
    path: "/v1/prices/{price}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "price",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProductCatalogTrialOffers",
    method: "GET",
    path: "/v1/product_catalog/trial_offers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "prices",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostProductCatalogTrialOffers",
    method: "POST",
    path: "/v1/product_catalog/trial_offers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProductCatalogTrialOffersId",
    method: "GET",
    path: "/v1/product_catalog/trial_offers/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostProductCatalogTrialOffersId",
    method: "POST",
    path: "/v1/product_catalog/trial_offers/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProducts",
    method: "GET",
    path: "/v1/products",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "ids",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "shippable",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "url",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostProducts",
    method: "POST",
    path: "/v1/products",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProductsSearch",
    method: "GET",
    path: "/v1/products/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProductsId",
    method: "GET",
    path: "/v1/products/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostProductsId",
    method: "POST",
    path: "/v1/products/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteProductsId",
    method: "DELETE",
    path: "/v1/products/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProductsProductFeatures",
    method: "GET",
    path: "/v1/products/{product}/features",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "product",
        location: "path",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostProductsProductFeatures",
    method: "POST",
    path: "/v1/products/{product}/features",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "product",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetProductsProductFeaturesId",
    method: "GET",
    path: "/v1/products/{product}/features/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "product",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteProductsProductFeaturesId",
    method: "DELETE",
    path: "/v1/products/{product}/features/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "product",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPromotionCodes",
    method: "GET",
    path: "/v1/promotion_codes",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "code",
        location: "query",
        required: false,
      },
      {
        name: "coupon",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPromotionCodes",
    method: "POST",
    path: "/v1/promotion_codes",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetPromotionCodesPromotionCode",
    method: "GET",
    path: "/v1/promotion_codes/{promotion_code}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "promotion_code",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostPromotionCodesPromotionCode",
    method: "POST",
    path: "/v1/promotion_codes/{promotion_code}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "promotion_code",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetQuotes",
    method: "GET",
    path: "/v1/quotes",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "test_clock",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostQuotes",
    method: "POST",
    path: "/v1/quotes",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetQuotesQuote",
    method: "GET",
    path: "/v1/quotes/{quote}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "quote",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostQuotesQuote",
    method: "POST",
    path: "/v1/quotes/{quote}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "quote",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostQuotesQuoteAccept",
    method: "POST",
    path: "/v1/quotes/{quote}/accept",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "quote",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostQuotesQuoteCancel",
    method: "POST",
    path: "/v1/quotes/{quote}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "quote",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetQuotesQuoteComputedUpfrontLineItems",
    method: "GET",
    path: "/v1/quotes/{quote}/computed_upfront_line_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "quote",
        location: "path",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostQuotesQuoteFinalize",
    method: "POST",
    path: "/v1/quotes/{quote}/finalize",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "quote",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetQuotesQuoteLineItems",
    method: "GET",
    path: "/v1/quotes/{quote}/line_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "quote",
        location: "path",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetRadarValueListItems",
    method: "GET",
    path: "/v1/radar/value_list_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "value",
        location: "query",
        required: false,
      },
      {
        name: "value_list",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostRadarValueListItems",
    method: "POST",
    path: "/v1/radar/value_list_items",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetRadarValueListItemsItem",
    method: "GET",
    path: "/v1/radar/value_list_items/{item}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "item",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteRadarValueListItemsItem",
    method: "DELETE",
    path: "/v1/radar/value_list_items/{item}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "item",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetRadarValueLists",
    method: "GET",
    path: "/v1/radar/value_lists",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "alias",
        location: "query",
        required: false,
      },
      {
        name: "contains",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostRadarValueLists",
    method: "POST",
    path: "/v1/radar/value_lists",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetRadarValueListsValueList",
    method: "GET",
    path: "/v1/radar/value_lists/{value_list}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "value_list",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostRadarValueListsValueList",
    method: "POST",
    path: "/v1/radar/value_lists/{value_list}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "value_list",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteRadarValueListsValueList",
    method: "DELETE",
    path: "/v1/radar/value_lists/{value_list}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "value_list",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetRefunds",
    method: "GET",
    path: "/v1/refunds",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "charge",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "payment_intent",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostRefunds",
    method: "POST",
    path: "/v1/refunds",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetRefundsRefund",
    method: "GET",
    path: "/v1/refunds/{refund}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "refund",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostRefundsRefund",
    method: "POST",
    path: "/v1/refunds/{refund}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "refund",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostRefundsRefundCancel",
    method: "POST",
    path: "/v1/refunds/{refund}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "refund",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetReportingReportRuns",
    method: "GET",
    path: "/v1/reporting/report_runs",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostReportingReportRuns",
    method: "POST",
    path: "/v1/reporting/report_runs",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetReportingReportRunsReportRun",
    method: "GET",
    path: "/v1/reporting/report_runs/{report_run}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "report_run",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSetupIntents",
    method: "GET",
    path: "/v1/setup_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "attach_to_self",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "payment_method",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSetupIntents",
    method: "POST",
    path: "/v1/setup_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSetupIntentsIntent",
    method: "GET",
    path: "/v1/setup_intents/{intent}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "client_secret",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSetupIntentsIntent",
    method: "POST",
    path: "/v1/setup_intents/{intent}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSetupIntentsIntentCancel",
    method: "POST",
    path: "/v1/setup_intents/{intent}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSetupIntentsIntentConfirm",
    method: "POST",
    path: "/v1/setup_intents/{intent}/confirm",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSetupIntentsIntentVerifyMicrodeposits",
    method: "POST",
    path: "/v1/setup_intents/{intent}/verify_microdeposits",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "intent",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetShippingRates",
    method: "GET",
    path: "/v1/shipping_rates",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "currency",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostShippingRates",
    method: "POST",
    path: "/v1/shipping_rates",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetShippingRatesShippingRateToken",
    method: "GET",
    path: "/v1/shipping_rates/{shipping_rate_token}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "shipping_rate_token",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostShippingRatesShippingRateToken",
    method: "POST",
    path: "/v1/shipping_rates/{shipping_rate_token}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "shipping_rate_token",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSources",
    method: "POST",
    path: "/v1/sources",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSourcesSource",
    method: "GET",
    path: "/v1/sources/{source}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "client_secret",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "source",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSourcesSource",
    method: "POST",
    path: "/v1/sources/{source}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "source",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSourcesSourceMandateNotificationsMandateNotification",
    method: "GET",
    path: "/v1/sources/{source}/mandate_notifications/{mandate_notification}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "mandate_notification",
        location: "path",
        required: true,
      },
      {
        name: "source",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSourcesSourceSourceTransactions",
    method: "GET",
    path: "/v1/sources/{source}/source_transactions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "source",
        location: "path",
        required: true,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSourcesSourceSourceTransactionsSourceTransaction",
    method: "GET",
    path: "/v1/sources/{source}/source_transactions/{source_transaction}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "source",
        location: "path",
        required: true,
      },
      {
        name: "source_transaction",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSourcesSourceVerify",
    method: "POST",
    path: "/v1/sources/{source}/verify",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "source",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptionItems",
    method: "GET",
    path: "/v1/subscription_items",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "subscription",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionItems",
    method: "POST",
    path: "/v1/subscription_items",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptionItemsItem",
    method: "GET",
    path: "/v1/subscription_items/{item}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "item",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionItemsItem",
    method: "POST",
    path: "/v1/subscription_items/{item}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "item",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteSubscriptionItemsItem",
    method: "DELETE",
    path: "/v1/subscription_items/{item}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "item",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptionSchedules",
    method: "GET",
    path: "/v1/subscription_schedules",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "canceled_at",
        location: "query",
        required: false,
      },
      {
        name: "completed_at",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "released_at",
        location: "query",
        required: false,
      },
      {
        name: "scheduled",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionSchedules",
    method: "POST",
    path: "/v1/subscription_schedules",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptionSchedulesSchedule",
    method: "GET",
    path: "/v1/subscription_schedules/{schedule}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "schedule",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionSchedulesSchedule",
    method: "POST",
    path: "/v1/subscription_schedules/{schedule}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "schedule",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionSchedulesScheduleCancel",
    method: "POST",
    path: "/v1/subscription_schedules/{schedule}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "schedule",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionSchedulesScheduleRelease",
    method: "POST",
    path: "/v1/subscription_schedules/{schedule}/release",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "schedule",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptions",
    method: "GET",
    path: "/v1/subscriptions",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "automatic_tax",
        location: "query",
        required: false,
      },
      {
        name: "collection_method",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "current_period_end",
        location: "query",
        required: false,
      },
      {
        name: "current_period_start",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "customer_account",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "price",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
      {
        name: "test_clock",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptions",
    method: "POST",
    path: "/v1/subscriptions",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptionsSearch",
    method: "GET",
    path: "/v1/subscriptions/search",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "query",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetSubscriptionsSubscriptionExposedId",
    method: "GET",
    path: "/v1/subscriptions/{subscription_exposed_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionsSubscriptionExposedId",
    method: "POST",
    path: "/v1/subscriptions/{subscription_exposed_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteSubscriptionsSubscriptionExposedId",
    method: "DELETE",
    path: "/v1/subscriptions/{subscription_exposed_id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteSubscriptionsSubscriptionExposedIdDiscount",
    method: "DELETE",
    path: "/v1/subscriptions/{subscription_exposed_id}/discount",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "subscription_exposed_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionsSubscriptionMigrate",
    method: "POST",
    path: "/v1/subscriptions/{subscription}/migrate",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "subscription",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionsSubscriptionPause",
    method: "POST",
    path: "/v1/subscriptions/{subscription}/pause",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "subscription",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostSubscriptionsSubscriptionResume",
    method: "POST",
    path: "/v1/subscriptions/{subscription}/resume",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "subscription",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxLocations",
    method: "GET",
    path: "/v1/tax/locations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "type",
        location: "query",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTaxLocations",
    method: "POST",
    path: "/v1/tax/locations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxLocationsLocation",
    method: "GET",
    path: "/v1/tax/locations/{location}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "location",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxRegistrations",
    method: "GET",
    path: "/v1/tax/registrations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTaxRegistrations",
    method: "POST",
    path: "/v1/tax/registrations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxRegistrationsId",
    method: "GET",
    path: "/v1/tax/registrations/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTaxRegistrationsId",
    method: "POST",
    path: "/v1/tax/registrations/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxIds",
    method: "GET",
    path: "/v1/tax_ids",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "owner",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTaxIds",
    method: "POST",
    path: "/v1/tax_ids",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxIdsId",
    method: "GET",
    path: "/v1/tax_ids/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteTaxIdsId",
    method: "DELETE",
    path: "/v1/tax_ids/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxRates",
    method: "GET",
    path: "/v1/tax_rates",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "active",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "inclusive",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTaxRates",
    method: "POST",
    path: "/v1/tax_rates",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTaxRatesTaxRate",
    method: "GET",
    path: "/v1/tax_rates/{tax_rate}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "tax_rate",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTaxRatesTaxRate",
    method: "POST",
    path: "/v1/tax_rates/{tax_rate}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "tax_rate",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTerminalConfigurations",
    method: "GET",
    path: "/v1/terminal/configurations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "is_account_default",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalConfigurations",
    method: "POST",
    path: "/v1/terminal/configurations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTerminalConfigurationsConfiguration",
    method: "GET",
    path: "/v1/terminal/configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalConfigurationsConfiguration",
    method: "POST",
    path: "/v1/terminal/configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteTerminalConfigurationsConfiguration",
    method: "DELETE",
    path: "/v1/terminal/configurations/{configuration}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "configuration",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTerminalLocations",
    method: "GET",
    path: "/v1/terminal/locations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalLocations",
    method: "POST",
    path: "/v1/terminal/locations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTerminalLocationsLocation",
    method: "GET",
    path: "/v1/terminal/locations/{location}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "location",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalLocationsLocation",
    method: "POST",
    path: "/v1/terminal/locations/{location}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "location",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteTerminalLocationsLocation",
    method: "DELETE",
    path: "/v1/terminal/locations/{location}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "location",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTerminalReaders",
    method: "GET",
    path: "/v1/terminal/readers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "device_type",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "location",
        location: "query",
        required: false,
      },
      {
        name: "serial_number",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReaders",
    method: "POST",
    path: "/v1/terminal/readers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTerminalReadersReader",
    method: "GET",
    path: "/v1/terminal/readers/{reader}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReader",
    method: "POST",
    path: "/v1/terminal/readers/{reader}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteTerminalReadersReader",
    method: "DELETE",
    path: "/v1/terminal/readers/{reader}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderCancelAction",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/cancel_action",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderCollectInputs",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/collect_inputs",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderCollectPaymentMethod",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/collect_payment_method",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderConfirmPaymentIntent",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/confirm_payment_intent",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderProcessPaymentIntent",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/process_payment_intent",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderProcessSetupIntent",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/process_setup_intent",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderRefundPayment",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/refund_payment",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTerminalReadersReaderSetReaderDisplay",
    method: "POST",
    path: "/v1/terminal/readers/{reader}/set_reader_display",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "reader",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTestHelpersTestClocks",
    method: "GET",
    path: "/v1/test_helpers/test_clocks",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTestHelpersTestClocks",
    method: "POST",
    path: "/v1/test_helpers/test_clocks",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTestHelpersTestClocksTestClock",
    method: "GET",
    path: "/v1/test_helpers/test_clocks/{test_clock}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "test_clock",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteTestHelpersTestClocksTestClock",
    method: "DELETE",
    path: "/v1/test_helpers/test_clocks/{test_clock}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "test_clock",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTestHelpersTestClocksTestClockAdvance",
    method: "POST",
    path: "/v1/test_helpers/test_clocks/{test_clock}/advance",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "test_clock",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetThreeDSecureAuthentications",
    method: "GET",
    path: "/v1/three_d_secure/authentications",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostThreeDSecureAuthentications",
    method: "POST",
    path: "/v1/three_d_secure/authentications",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetThreeDSecureAuthenticationsAuthentication",
    method: "GET",
    path: "/v1/three_d_secure/authentications/{authentication}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "authentication",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostThreeDSecureAuthenticationsAuthenticationCancel",
    method: "POST",
    path: "/v1/three_d_secure/authentications/{authentication}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "authentication",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostThreeDSecureAuthenticationsAuthenticationSubmit",
    method: "POST",
    path: "/v1/three_d_secure/authentications/{authentication}/submit",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "authentication",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTokens",
    method: "POST",
    path: "/v1/tokens",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTokensToken",
    method: "GET",
    path: "/v1/tokens/{token}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "token",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTopups",
    method: "GET",
    path: "/v1/topups",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "amount",
        location: "query",
        required: false,
      },
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTopups",
    method: "POST",
    path: "/v1/topups",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTopupsTopup",
    method: "GET",
    path: "/v1/topups/{topup}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "topup",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTopupsTopup",
    method: "POST",
    path: "/v1/topups/{topup}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "topup",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTopupsTopupCancel",
    method: "POST",
    path: "/v1/topups/{topup}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "topup",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTransfers",
    method: "GET",
    path: "/v1/transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "destination",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "transfer_group",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTransfers",
    method: "POST",
    path: "/v1/transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTransfersIdReversals",
    method: "GET",
    path: "/v1/transfers/{id}/reversals",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTransfersIdReversals",
    method: "POST",
    path: "/v1/transfers/{id}/reversals",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTransfersTransfer",
    method: "GET",
    path: "/v1/transfers/{transfer}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTransfersTransfer",
    method: "POST",
    path: "/v1/transfers/{transfer}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTransfersTransferReversalsId",
    method: "GET",
    path: "/v1/transfers/{transfer}/reversals/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTransfersTransferReversalsId",
    method: "POST",
    path: "/v1/transfers/{transfer}/reversals/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryCreditReversals",
    method: "GET",
    path: "/v1/treasury/credit_reversals",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "query",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "received_credit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryCreditReversals",
    method: "POST",
    path: "/v1/treasury/credit_reversals",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryCreditReversalsCreditReversal",
    method: "GET",
    path: "/v1/treasury/credit_reversals/{credit_reversal}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "credit_reversal",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryDebitReversals",
    method: "GET",
    path: "/v1/treasury/debit_reversals",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "query",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "received_debit",
        location: "query",
        required: false,
      },
      {
        name: "resolution",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryDebitReversals",
    method: "POST",
    path: "/v1/treasury/debit_reversals",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryDebitReversalsDebitReversal",
    method: "GET",
    path: "/v1/treasury/debit_reversals/{debit_reversal}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "debit_reversal",
        location: "path",
        required: true,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryFinancialAccounts",
    method: "GET",
    path: "/v1/treasury/financial_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryFinancialAccounts",
    method: "POST",
    path: "/v1/treasury/financial_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryFinancialAccountsFinancialAccount",
    method: "GET",
    path: "/v1/treasury/financial_accounts/{financial_account}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryFinancialAccountsFinancialAccount",
    method: "POST",
    path: "/v1/treasury/financial_accounts/{financial_account}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "financial_account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryFinancialAccountsFinancialAccountClose",
    method: "POST",
    path: "/v1/treasury/financial_accounts/{financial_account}/close",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "financial_account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryFinancialAccountsFinancialAccountFeatures",
    method: "GET",
    path: "/v1/treasury/financial_accounts/{financial_account}/features",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryFinancialAccountsFinancialAccountFeatures",
    method: "POST",
    path: "/v1/treasury/financial_accounts/{financial_account}/features",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "financial_account",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryInboundTransfers",
    method: "GET",
    path: "/v1/treasury/inbound_transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "query",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryInboundTransfers",
    method: "POST",
    path: "/v1/treasury/inbound_transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryInboundTransfersId",
    method: "GET",
    path: "/v1/treasury/inbound_transfers/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryInboundTransfersInboundTransferCancel",
    method: "POST",
    path: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "inbound_transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryOutboundPayments",
    method: "GET",
    path: "/v1/treasury/outbound_payments",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "customer",
        location: "query",
        required: false,
      },
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "query",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryOutboundPayments",
    method: "POST",
    path: "/v1/treasury/outbound_payments",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryOutboundPaymentsId",
    method: "GET",
    path: "/v1/treasury/outbound_payments/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryOutboundPaymentsIdCancel",
    method: "POST",
    path: "/v1/treasury/outbound_payments/{id}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryOutboundTransfers",
    method: "GET",
    path: "/v1/treasury/outbound_transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "financial_account",
        location: "query",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryOutboundTransfers",
    method: "POST",
    path: "/v1/treasury/outbound_transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetTreasuryOutboundTransfersOutboundTransfer",
    method: "GET",
    path: "/v1/treasury/outbound_transfers/{outbound_transfer}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "outbound_transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostTreasuryOutboundTransfersOutboundTransferCancel",
    method: "POST",
    path: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "outbound_transfer",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetWebhookEndpoints",
    method: "GET",
    path: "/v1/webhook_endpoints",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "ending_before",
        location: "query",
        required: false,
      },
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "starting_after",
        location: "query",
        required: false,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostWebhookEndpoints",
    method: "POST",
    path: "/v1/webhook_endpoints",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetWebhookEndpointsWebhookEndpoint",
    method: "GET",
    path: "/v1/webhook_endpoints/{webhook_endpoint}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "expand",
        location: "query",
        required: false,
      },
      {
        name: "webhook_endpoint",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostWebhookEndpointsWebhookEndpoint",
    method: "POST",
    path: "/v1/webhook_endpoints/{webhook_endpoint}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "webhook_endpoint",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteWebhookEndpointsWebhookEndpoint",
    method: "DELETE",
    path: "/v1/webhook_endpoints/{webhook_endpoint}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "webhook_endpoint",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/x-www-form-urlencoded"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CommerceProductCatalogImports",
    method: "GET",
    path: "/v2/commerce/product_catalog/imports",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "created_gt",
        location: "query",
        required: false,
      },
      {
        name: "created_gte",
        location: "query",
        required: false,
      },
      {
        name: "created_lt",
        location: "query",
        required: false,
      },
      {
        name: "created_lte",
        location: "query",
        required: false,
      },
      {
        name: "feed_type",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CommerceProductCatalogImports",
    method: "POST",
    path: "/v2/commerce/product_catalog/imports",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CommerceProductCatalogImportsId",
    method: "GET",
    path: "/v2/commerce/product_catalog/imports/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccountTokens",
    method: "POST",
    path: "/v2/core/account_tokens",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreAccountTokensId",
    method: "GET",
    path: "/v2/core/account_tokens/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreAccounts",
    method: "GET",
    path: "/v2/core/accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "applied_configurations",
        location: "query",
        required: false,
      },
      {
        name: "closed",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccounts",
    method: "POST",
    path: "/v2/core/accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccountsAccountIdPersonTokens",
    method: "POST",
    path: "/v2/core/accounts/{account_id}/person_tokens",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreAccountsAccountIdPersonTokensId",
    method: "GET",
    path: "/v2/core/accounts/{account_id}/person_tokens/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreAccountsAccountIdPersons",
    method: "GET",
    path: "/v2/core/accounts/{account_id}/persons",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccountsAccountIdPersons",
    method: "POST",
    path: "/v2/core/accounts/{account_id}/persons",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreAccountsAccountIdPersonsId",
    method: "GET",
    path: "/v2/core/accounts/{account_id}/persons/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccountsAccountIdPersonsId",
    method: "POST",
    path: "/v2/core/accounts/{account_id}/persons/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteV2CoreAccountsAccountIdPersonsId",
    method: "DELETE",
    path: "/v2/core/accounts/{account_id}/persons/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "account_id",
        location: "path",
        required: true,
      },
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreAccountsId",
    method: "GET",
    path: "/v2/core/accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "include",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccountsId",
    method: "POST",
    path: "/v2/core/accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreAccountsIdClose",
    method: "POST",
    path: "/v2/core/accounts/{id}/close",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreEventDestinations",
    method: "GET",
    path: "/v2/core/event_destinations",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "include",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreEventDestinations",
    method: "POST",
    path: "/v2/core/event_destinations",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreEventDestinationsId",
    method: "GET",
    path: "/v2/core/event_destinations/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
      {
        name: "include",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreEventDestinationsId",
    method: "POST",
    path: "/v2/core/event_destinations/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "DeleteV2CoreEventDestinationsId",
    method: "DELETE",
    path: "/v2/core/event_destinations/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreEventDestinationsIdDisable",
    method: "POST",
    path: "/v2/core/event_destinations/{id}/disable",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreEventDestinationsIdEnable",
    method: "POST",
    path: "/v2/core/event_destinations/{id}/enable",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreEventDestinationsIdPing",
    method: "POST",
    path: "/v2/core/event_destinations/{id}/ping",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreVaultGbBankAccounts",
    method: "GET",
    path: "/v2/core/vault/gb_bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultGbBankAccounts",
    method: "POST",
    path: "/v2/core/vault/gb_bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreVaultGbBankAccountsId",
    method: "GET",
    path: "/v2/core/vault/gb_bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultGbBankAccountsIdArchive",
    method: "POST",
    path: "/v2/core/vault/gb_bank_accounts/{id}/archive",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultGbBankAccountsIdUnarchive",
    method: "POST",
    path: "/v2/core/vault/gb_bank_accounts/{id}/unarchive",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreVaultUsBankAccounts",
    method: "GET",
    path: "/v2/core/vault/us_bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "verification_status",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultUsBankAccounts",
    method: "POST",
    path: "/v2/core/vault/us_bank_accounts",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2CoreVaultUsBankAccountsId",
    method: "GET",
    path: "/v2/core/vault/us_bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultUsBankAccountsId",
    method: "POST",
    path: "/v2/core/vault/us_bank_accounts/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultUsBankAccountsIdArchive",
    method: "POST",
    path: "/v2/core/vault/us_bank_accounts/{id}/archive",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultUsBankAccountsIdConfirmMicrodeposits",
    method: "POST",
    path: "/v2/core/vault/us_bank_accounts/{id}/confirm_microdeposits",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultUsBankAccountsIdSendMicrodeposits",
    method: "POST",
    path: "/v2/core/vault/us_bank_accounts/{id}/send_microdeposits",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2CoreVaultUsBankAccountsIdUnarchive",
    method: "POST",
    path: "/v2/core/vault/us_bank_accounts/{id}/unarchive",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementFinancialAddresses",
    method: "GET",
    path: "/v2/money_management/financial_addresses",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "financial_account",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementFinancialAddresses",
    method: "POST",
    path: "/v2/money_management/financial_addresses",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementFinancialAddressesId",
    method: "GET",
    path: "/v2/money_management/financial_addresses/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementInboundTransfers",
    method: "GET",
    path: "/v2/money_management/inbound_transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementInboundTransfers",
    method: "POST",
    path: "/v2/money_management/inbound_transfers",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementInboundTransfersId",
    method: "GET",
    path: "/v2/money_management/inbound_transfers/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementOutboundPayments",
    method: "GET",
    path: "/v2/money_management/outbound_payments",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "created",
        location: "query",
        required: false,
      },
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
      {
        name: "recipient",
        location: "query",
        required: false,
      },
      {
        name: "status",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementOutboundPayments",
    method: "POST",
    path: "/v2/money_management/outbound_payments",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementOutboundPaymentsId",
    method: "GET",
    path: "/v2/money_management/outbound_payments/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementOutboundPaymentsIdCancel",
    method: "POST",
    path: "/v2/money_management/outbound_payments/{id}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementOutboundSetupIntents",
    method: "GET",
    path: "/v2/money_management/outbound_setup_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementOutboundSetupIntents",
    method: "POST",
    path: "/v2/money_management/outbound_setup_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementOutboundSetupIntentsId",
    method: "GET",
    path: "/v2/money_management/outbound_setup_intents/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementOutboundSetupIntentsId",
    method: "POST",
    path: "/v2/money_management/outbound_setup_intents/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementOutboundSetupIntentsIdCancel",
    method: "POST",
    path: "/v2/money_management/outbound_setup_intents/{id}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementPayoutIntents",
    method: "GET",
    path: "/v2/money_management/payout_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "limit",
        location: "query",
        required: false,
      },
      {
        name: "page",
        location: "query",
        required: false,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementPayoutIntents",
    method: "POST",
    path: "/v2/money_management/payout_intents",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementPayoutIntentsId",
    method: "GET",
    path: "/v2/money_management/payout_intents/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementPayoutIntentsId",
    method: "POST",
    path: "/v2/money_management/payout_intents/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementPayoutIntentsIdCancel",
    method: "POST",
    path: "/v2/money_management/payout_intents/{id}/cancel",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementPayoutIntentsIdConfirm",
    method: "POST",
    path: "/v2/money_management/payout_intents/{id}/confirm",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementPayoutIntentsIdRefreshFxQuote",
    method: "POST",
    path: "/v2/money_management/payout_intents/{id}/refresh_fx_quote",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId:
      "PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerification",
    method: "POST",
    path: "/v2/money_management/payout_intents/{id}/refresh_recipient_verification",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementRecipientVerifications",
    method: "POST",
    path: "/v2/money_management/recipient_verifications",
    servers: ["https://api.stripe.com/"],
    parameters: [],
    requestBody: {
      required: false,
      mediaTypes: ["application/json"],
    },
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "GetV2MoneyManagementRecipientVerificationsId",
    method: "GET",
    path: "/v2/money_management/recipient_verifications/{id}",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
  {
    source: {
      provider: "Stripe",
      service: "Stripe",
      name: "latest/openapi.spec3.json",
      format: "OpenApi",
    },
    version: "2026-10-28.endive",
    operationId: "PostV2MoneyManagementRecipientVerificationsIdAcknowledge",
    method: "POST",
    path: "/v2/money_management/recipient_verifications/{id}/acknowledge",
    servers: ["https://api.stripe.com/"],
    parameters: [
      {
        name: "id",
        location: "path",
        required: true,
      },
    ],
    responses: {
      "200": ["application/json"],
      default: ["application/json"],
    },
    providerMetadata: {
      document: {},
      operation: {},
    },
  },
];
