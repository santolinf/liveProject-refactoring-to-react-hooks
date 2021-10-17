import { createContext } from 'react';

export const initialAppContext = {
  loading: true,
  error: undefined,
  salesTotal: 0,
  subscriptionsTotal: 0,
  data: []
};

export const AppContext = createContext(initialAppContext);
