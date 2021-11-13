import React from "react";
import { DataContextProvider } from './context/DataContextProvider';
import DashboardShell from "./features/Dashboard/DashboardShell";

export default function App () {

  return (
    <DataContextProvider>
      <DashboardShell />
    </DataContextProvider>
  );
};
