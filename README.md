# AppSync

# Comandos

amplify configure

# Comandos de inicio de aplicacion

amplify init

amplify add api

amplify push

amplify status
amplify push
amplify publish

# Authentication

amplify api remove
amplify add api
N
Y
3 opcion (objects with fine-grained access control)

# Links

- [https://github.com/awslabs/aws-mobile-appsync-sdk-js]()
- [https://material-ui.com/getting-started/installation/]()
- [https://github.com/DefinitelyTyped/DefinitelyTyped/pull/30036]()
- [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout]()
- [https://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-react.html]()
-

```graphql
type Task
  @model
  @auth(
    rules: [
      {
        allow: groups
        groups: ["Managers"]
        queries: null
        mutations: [create, update, delete]
      }
      {
        allow: groups
        groups: ["Employees"]
        queries: [get, list]
        mutations: null
      }
    ]
  ) {
  id: ID!
  title: String!
  description: String
  status: String
}
type PrivateNote @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  content: String!
}
```
