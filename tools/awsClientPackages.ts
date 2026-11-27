export const awsClientCore = "@tradedal/aws-client-core";
export const awsClientCoreDirectory = "providers/aws/client-core";
export const awsClientDirectory = "providers/aws/generated/clients";
export const awsCredentials = "@tradedal/aws-credentials";
export const awsCredentialsDirectory = "providers/aws/credentials";

export const awsCredentialClientPackages = [
  {
    directory: `${awsClientDirectory}/sso`,
    name: "@tradedal/aws-client-sso",
    serviceId: "com.amazonaws.sso#SWBPortalService",
  },
  {
    directory: `${awsClientDirectory}/sso-oidc`,
    name: "@tradedal/aws-client-sso-oidc",
    serviceId: "com.amazonaws.ssooidc#AWSSSOOIDCService",
  },
  {
    directory: `${awsClientDirectory}/sts`,
    name: "@tradedal/aws-client-sts",
    serviceId: "com.amazonaws.sts#AWSSecurityTokenServiceV20110615",
  },
];

export const awsClientCoreExports = {
  ".": "awsClient",
  "./config": "awsClientConfig",
  "./model": "awsClientModel",
  "./signer": "awsRequestSigner",
  "./decoder": "awsResponseDecoder",
  "./retry": "awsRetryPolicy",
  "./http-operation": "awsHttpOperation",
};

export const awsClientPackages = [
  ...awsCredentialClientPackages,
  {
    directory: `${awsClientDirectory}/iam`,
    name: "@tradedal/aws-client-iam",
    serviceId: "com.amazonaws.iam#AWSIdentityManagementV20100508",
  },
  {
    directory: `${awsClientDirectory}/sqs`,
    name: "@tradedal/aws-client-sqs",
    serviceId: "com.amazonaws.sqs#AmazonSQS",
  },
  {
    directory: `${awsClientDirectory}/lambda`,
    name: "@tradedal/aws-client-lambda",
    serviceId: "com.amazonaws.lambda#AWSGirApiService",
  },
  {
    directory: `${awsClientDirectory}/apigatewayv2`,
    name: "@tradedal/aws-client-apigatewayv2",
    serviceId: "com.amazonaws.apigatewayv2#ApiGatewayV2",
  },
  {
    directory: `${awsClientDirectory}/cloudcontrol`,
    name: "@tradedal/aws-client-cloudcontrol",
    serviceId: "com.amazonaws.cloudcontrol#CloudApiService",
  },
  {
    directory: `${awsClientDirectory}/sfn`,
    name: "@tradedal/aws-client-sfn",
    serviceId: "com.amazonaws.sfn#AWSStepFunctions",
  },
];
