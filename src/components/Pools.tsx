import React from 'react';
import { GET_POOLS } from '../graphql';
import { useQuery } from '@apollo/client';

interface IPool {
  id: string;
  txCount: string;
}

const Pools = () => {
  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.pools.map(({ id, txCount }: IPool) => (
    <div key={id}>
      <p>
        {id}: {txCount}
      </p>
    </div>
  ));
};

export default Pools;