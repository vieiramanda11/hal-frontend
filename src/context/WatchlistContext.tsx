import React, { createContext, useState, useEffect } from 'react';

export type WatchlistContextState = {
  watchlist: IPool[];
  addPoolToWatchlist: (pool: IPool) => void;
  removePoolFromWatchlist: (id: string) => void;
};

const contextDefaultValues: WatchlistContextState = {
  watchlist: [],
  addPoolToWatchlist: () => {},
  removePoolFromWatchlist: () => {},
};

export const WatchlistContext =
  createContext<WatchlistContextState>(contextDefaultValues);

const WatchlistContextProvider = ({ children }: any) => {
  const getLocalStorage = (key: string, initialValue: IPool[]) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [watchlist, setWatchlist] = useState<IPool[]>(() =>
    getLocalStorage('watchlist', contextDefaultValues.watchlist)
  );

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addPoolToWatchlist = (pool: IPool) =>
    setWatchlist((watchlist) => [...watchlist, pool]);

  const removePoolFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((pool) => pool.id !== id));
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addPoolToWatchlist, removePoolFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistContextProvider;
