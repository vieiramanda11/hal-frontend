import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatNumber, formatDate } from '../utils';

interface ITable {
  data: [];
  headerTitles: string[];
  isTransaction?: boolean;
  txType?: string;
}

interface IToken {
  symbol: string;
}
interface IPool {
  id: string;
  txCount: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  token0: IToken;
  token1: IToken;
}

interface ITransactions {
  id: string;
  txType: string;
  amountUSD: string;
  timestamp: number;
}

interface ITr {
  borderBottom?: boolean;
}

interface ITd {
  textAlignLeft?: boolean;
}

const StyledTable = styled.table`
  width: 100%;
  background-color: rgb(25, 27, 31);
`;

const THead = styled.thead`
  height: 40px;
  text-align: left;
  padding: 5px 0;
`;

const TR = styled.tr<ITr>`
  display: flex;
  justify-content: space-between;
  align-items: 'center';
  align-content: 'center';
  border-bottom: ${({ borderBottom }) =>
    borderBottom && '1px solid rgb(31, 33, 40)'};
  &:first-child {
    margin-top: 20px;
  }
`;

const Td = styled.td<ITd>`
  height: 40px;
  width: 160px;
  padding: 5px 0;
  text-align: ${({ textAlignLeft }) => (textAlignLeft ? 'left' : 'center')};
  @media (max-width: 480px) {
    &:nth-child(n + 2) {
      display: none;
    }
  }
`;

const RowLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: rgb(195, 197, 203);
  }
`;

export const Table = ({
  data,
  headerTitles,
  isTransaction,
  txType,
}: ITable) => {
  return (
    <StyledTable>
      <THead>
        <TR borderBottom>
          {headerTitles[0] && <Td textAlignLeft>{headerTitles[0]}</Td>}
          <div>
            {headerTitles.map((title, index) => {
              return index !== 0 && <Td key={index}>{title}</Td>;
            })}
          </div>
        </TR>
      </THead>
      <tbody>
        {isTransaction
          ? data.map(({ id, amountUSD, timestamp }: ITransactions) => (
              <TR key={id}>
                <Td textAlignLeft>
                  <a
                    rel='noreferrer'
                    href={`https://etherscan.io/tx/${id}`}
                    target='_blank'
                  >{`etherscan.io/tx/${id}`}</a>
                </Td>
                <div>
                  <Td>{txType}</Td>
                  <Td>{`$${formatNumber(amountUSD)}m`}</Td>
                  <Td>{formatDate(timestamp)}</Td>
                </div>
              </TR>
            ))
          : data.map(
              ({
                id,
                txCount,
                volumeUSD,
                totalValueLockedUSD,
                token0,
                token1,
              }: IPool) => (
                <RowLink to={`${id}`}>
                  <TR key={id}>
                    <Td textAlignLeft>{`${token0.symbol}/${token1.symbol}`}</Td>
                    <div>
                      <Td>{txCount}</Td>
                      <Td>{`$${formatNumber(totalValueLockedUSD)}m`}</Td>
                      <Td>{`$${formatNumber(volumeUSD)}m`}</Td>
                    </div>
                  </TR>
                </RowLink>
              )
            )}
      </tbody>
    </StyledTable>
  );
};
