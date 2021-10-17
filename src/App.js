import React from "react";
import { initialAppContext as initialValue, AppContext } from './context/AppContext';
import DashboardShell from "./features/Dashboard/DashboardShell";

const App = () => {
  return (
    <AppContext.Provider value={initialValue}>
      <DashboardShell />
    </AppContext.Provider>
  );
};

export default App;
