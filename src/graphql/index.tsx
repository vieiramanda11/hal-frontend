import { gql } from '@apollo/client';

export const GET_POOLS = gql`
  {
    pools {
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

export const GET_POOL_DETAILS = gql`
  query pool($id: String!) {
    pool(id: $id) {
      id
      swaps {
        amountUSD
        id
        timestamp
      }
      mints {
        amountUSD
        id
        timestamp
      }
      burns {
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
