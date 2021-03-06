import React from "react";
import ReactDOM from "react-dom";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AppSyncConfig from "./aws-exports";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType as AUTH_TYPE,
    apiKey: AppSyncConfig.aws_appsync_apiKey
  }
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
