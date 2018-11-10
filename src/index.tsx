import React from "react";
import ReactDOM from "react-dom";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import Amplify, { Auth } from "aws-amplify";

import AppSyncConfig from "./aws-exports";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

Amplify.configure({
  Auth: {
    identityPoolId: AppSyncConfig.aws_cognito_identity_pool_id,
    region: AppSyncConfig.aws_cognito_region,
    mandatorySignIn: false
  }
});

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType as AUTH_TYPE,
    // apiKey: AppSyncConfig.aws_user_pools_web_client_id
    credentials: async () => await Auth.currentCredentials()
    // jwtToken: async () =>
    //   (await Auth.currentSession()).getIdToken().getJwtToken()
  }
  // Amazon Cognito Federated Identities using AWS Amplify
  //credentials: () => Auth.currentCredentials(),

  // Amazon Cognito user pools using AWS Amplify
  // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
