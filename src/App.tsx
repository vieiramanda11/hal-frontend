import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pools, PoolDetails } from './pages';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/pools' element={<Pools />} />
          <Route path='/pools/:id' element={<PoolDetails />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
