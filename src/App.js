import React, { useState } from "react";
import { AppContext } from './context/AppContext';
import { useDataFetch } from './hooks';
import DashboardShell from "./features/Dashboard/DashboardShell";

export default function App () {

  const [endpoint, setEndpoint] = useState(null),
    datasetResult = useDataFetch(endpoint);

  return (
    <AppContext.Provider value={datasetResult}>
      <DashboardShell setEndpoint={setEndpoint} />
    </AppContext.Provider>
  );
};
