import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Pools from './components/Pools';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>HAL FRONTEND ASSINGMENT!</h1>
      <Pools />
    </ApolloProvider>
  );
}

export default App;
