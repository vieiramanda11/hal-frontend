import { gql } from '@apollo/client';

export const GET_POOLS = gql`
  {
    pools(first: 10) {
      id
      swaps {
        amountUSD
        id
        timestamp
      }
      txCount
      volumeUSD
      totalValueLockedUSD
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
    }
  }
`;
