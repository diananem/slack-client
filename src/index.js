import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/AppRouter';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () =>
  (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )


ReactDOM.render(<App />, document.getElementById('root'));

