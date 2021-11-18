import React, { useState } from 'react';
import { GET_POOLS } from '../graphql';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Typography, Table, Pagination } from '../components/';

let PageSize = 10;

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
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, data, error } = useQuery(GET_POOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  const currentTableData = () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (data.pools.length !== 0) {
      return data.pools.slice(firstPageIndex, lastPageIndex);
    }
  };

  return (
    <Container>
      <Typography text='Pool watchlist' />
      <PoolsContainer>
        <Typography text='Saved pools will appear here' />
      </PoolsContainer>
      <Typography text='All pools' />

      <PoolsContainer>
        <Table
          data={currentTableData()}
          headerTitles={['Pools', 'TXCOUNT', 'TVL', 'VOLUME']}
        />
        <Pagination
          currentPage={currentPage}
          totalCount={data.pools.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </PoolsContainer>
    </Container>
  );
};
