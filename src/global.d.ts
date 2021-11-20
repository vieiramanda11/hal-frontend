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
