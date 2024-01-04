import React from 'react';
import ReactDOM from 'react-dom';

// import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import 'scss/bootstrap/bootstrap.scss';
import 'scss/cogo-toast/cogo-toast.scss';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import 'react-datetime/css/react-datetime.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
