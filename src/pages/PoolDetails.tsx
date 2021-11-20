import React, { useState, useContext } from 'react';
import { GET_POOL_DETAILS } from '../graphql';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Typography,
  Table,
  Pagination,
  Filter,
  Button,
  ActivityIndicator,
} from '../components/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { WatchlistContext } from '../context/WatchlistContext';

const Container = styled.div`
  padding: 20px 50px;
`;

const TransactionContainer = styled.div`
  background-color: rgb(25, 27, 31);
  border-radius: 16px;
  padding: 1rem;
  margin-top: 30px;
`;

const TokensCard = styled.div`
  background-color: rgb(25, 27, 31);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  width: 20%;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LeftIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: rgb(195, 197, 203);
`;

export const PoolDetails = () => {
  const [filterDataType, setFilterDataType] = useState('swaps');
  const [currentPage, setCurrentPage] = useState(1);
  const { addPoolToWatchlist, watchlist, removePoolFromWatchlist } =
    useContext(WatchlistContext);

  const params = useParams();

  const { loading, error, data } = useQuery(GET_POOL_DETAILS, {
    variables: { id: params.id },
  });

  let PageSize = 10;

  if (loading) return <ActivityIndicator />;
  if (error) return <p>Error :</p>;
  const { pool } = data;

  const filteredData =
    (filterDataType === 'swaps' && pool.swaps) ||
    (filterDataType === 'mints' && pool.mints) ||
    (filterDataType === 'burns' && pool.burns);

  const currentTableData = () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (filteredData.length !== 0) {
      return filteredData.slice(firstPageIndex, lastPageIndex);
    }
  };

  const handleSelect = (event: { target: { value: string } }) => {
    setFilterDataType(event.target.value);
  };

  const addPool = () => {
    const newPool = {
      id: pool.id,
      txCount: pool.txCount,
      volumeUSD: pool.volumeUSD,
      totalValueLockedUSD: pool.totalValueLockedUSD,
      token0: {
        symbol: pool.token0.symbol,
      },
      token1: {
        symbol: pool.token1.symbol,
      },
    };

    addPoolToWatchlist(newPool);
  };

  const deletePool = (id: string) => {
    removePoolFromWatchlist(id);
  };

  const isOnWatchlist = (id: string) => {
    return watchlist.find((pool) => {
      if (pool.id === id) return true;
    });
  };

  return (
    <Container>
      <BackLink to='/pools'>
        <LeftIcon icon={faArrowLeft} />
        <Typography text='Back to pools' />
      </BackLink>
      <Typography
        text={`${pool.token0.symbol}/${pool.token1.symbol}`}
        bold
        color='white'
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TokensCard>
          <div>
            <Typography text='Tokens value (USD)' bold color='white' />
            <Typography text={pool.token0.symbol} />
            <Typography text={pool.token1.symbol} />
          </div>
          <div>
            <Typography text='TX Count' bold color='white' />
            <Typography text={pool.txCount} />
          </div>
        </TokensCard>
        {isOnWatchlist(pool.id) ? (
          <Button
            onClick={() => deletePool(pool.id)}
            text='Remove pool from watchlist'
          />
        ) : (
          <Button onClick={addPool} text='Add poll to watchlist' />
        )}
      </div>

      <Filter handleSelect={handleSelect} />
      {filteredData.length === 0 ? (
        <Typography text='No data available' />
      ) : (
        <TransactionContainer>
          <Table
            isTransaction
            data={currentTableData()}
            txType={filterDataType}
            headerTitles={[
              'Link to Ethereum',
              'TX Type',
              'Token Amount (USD)',
              'Timestamp',
            ]}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={PageSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </TransactionContainer>
      )}
    </Container>
  );
};
