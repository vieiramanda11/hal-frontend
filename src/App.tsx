import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pools, PoolDetails } from './pages';
import WatchlistContextProvider from './context/WatchlistContext';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <WatchlistContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/pools' element={<Pools />} />
            <Route path='/pools/:id' element={<PoolDetails />} />
          </Routes>
        </BrowserRouter>
      </WatchlistContextProvider>
    </ApolloProvider>
  );
}

export default App;
