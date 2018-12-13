import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes/AppRouter";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql/"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
