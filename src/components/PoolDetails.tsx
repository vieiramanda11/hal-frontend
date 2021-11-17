import { GET_POOL_DETAILS } from '../graphql';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const PoolDetails = () => {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_POOL_DETAILS, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const { pool } = data;

  return (
    <div>
      <p>{pool.id}</p>
      <p>{pool.txCount}</p>
    </div>
  );
};

export default PoolDetails;
