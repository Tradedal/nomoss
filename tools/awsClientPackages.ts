export const awsSdkPackage = "@nomoss/aws";
export const awsSdkDirectory = "providers/aws/sdk";
export const awsClientCoreDirectory = `${awsSdkDirectory}/client-core`;
export const awsClientDirectory = `${awsSdkDirectory}/generated/clients`;

export const awsCredentialClients = [
  { service: "sso", serviceId: "com.amazonaws.sso#SWBPortalService" },
  { service: "sso-oidc", serviceId: "com.amazonaws.ssooidc#AWSSSOOIDCService" },
  {
    service: "sts",
    serviceId: "com.amazonaws.sts#AWSSecurityTokenServiceV20110615",
  },
];

export const awsServiceClients = [
  ...awsCredentialClients,
  {
    service: "iam",
    serviceId: "com.amazonaws.iam#AWSIdentityManagementV20100508",
  },
  { service: "sqs", serviceId: "com.amazonaws.sqs#AmazonSQS" },
  { service: "lambda", serviceId: "com.amazonaws.lambda#AWSGirApiService" },
  {
    service: "apigatewayv2",
    serviceId: "com.amazonaws.apigatewayv2#ApiGatewayV2",
  },
  {
    service: "cloudcontrol",
    serviceId: "com.amazonaws.cloudcontrol#CloudApiService",
  },
  { service: "sfn", serviceId: "com.amazonaws.sfn#AWSStepFunctions" },
];
