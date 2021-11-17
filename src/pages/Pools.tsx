import { GET_POOLS } from '../graphql';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Typography, Table } from '../components/';

const Container = styled.div`
  padding: 20px 50px;
`;

const PoolsContainer = styled.div`
  background-color: rgb(25, 27, 31);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 30px;
`;

export const Pools = () => {
  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Container>
      <Typography text='Pool watchlist' />
      <PoolsContainer>
        <Typography text='Saved pools will appear here' />
      </PoolsContainer>
      <Typography text='All pools' />

      <PoolsContainer>
        <Table
          data={data.pools}
          headerTitles={['Pools', 'TXCOUNT', 'TVL', 'VOLUME']}
        />
      </PoolsContainer>
    </Container>
  );
};
