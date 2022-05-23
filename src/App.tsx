/*eslint-disable  @typescript-eslint/ban-ts-comment*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React, { useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import AppRouter from './Router/index';

import { API_URL } from './config';

interface FetchType {
  ok: boolean;
  accessToken: string;
}

const App: React.FC = () => {
  const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: 'include' });

  const refreshToken: () => void = async () => {
    const res: FetchType = (await (
      await fetch(`${API_URL}/refresh_token`, { method: 'POST', credentials: 'include' })
    ).json()) as FetchType;
    if (res.ok) {
      localStorage.setItem('token', res.accessToken);
      return res.accessToken;
    } else {
      localStorage.removeItem('token');
    }
  };

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        switch (error.extensions?.code) {
          case 'INTERNAL_SERVER_ERROR': {
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              ...oldHeaders,
              authorization: refreshToken(),
            });
            console.error('GRAPHQL_ERROR', error);
            return forward(operation);
          }
        }
      }
    }
    if (networkError) console.error('NETWORK_ERROR', networkError);
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      },
    };
  });

  const client = new ApolloClient({
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'ignore',
      },
      mutate: {
        errorPolicy: 'ignore',
      },
    },
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink]),
    credentials: 'same-origin',
  });

  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
};

export default App;
