import React, { createContext, useState } from 'react';
import { useDataFetch } from '../hooks';

const DataContext = createContext(null);

export function DataContextProvider ({ children }) {

  const [dataLocation, setDataLocation] = useState(null),
    dataValue = useDataFetch(dataLocation);

  return (
    <DataContext.Provider value={ {dataValue, setDataLocation} }>
      { children }
    </DataContext.Provider>
  );
}

export default DataContext;
