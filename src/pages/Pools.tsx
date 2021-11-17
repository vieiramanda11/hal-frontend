import { GET_POOLS } from '../graphql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

interface IPool {
  id: string;
  txCount: string;
}

export const Pools = () => {
  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.pools.map(({ id, txCount }: IPool) => (
    <div key={id}>
      <Link to={`${id}`}>Pool details</Link>
      <p>
        {id}: {txCount}
      </p>
    </div>
  ));
};
