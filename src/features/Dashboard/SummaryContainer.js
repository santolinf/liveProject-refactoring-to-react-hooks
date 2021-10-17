import React, { useContext } from "react";
import { AppContext } from '../../context/AppContext';

export default function SummaryContainer () {

  const { salesTotal, subscriptionsTotal } = useContext(AppContext);

  return (
    <div className="summary flex flex-row">
      <div className="card bg-indigo">
        <p>CellFast sales</p>
        <p>$ {salesTotal}</p>
      </div>
      <div className="card bg-blue">
        <p>CellNow subscriptions</p>
        <p>$ {subscriptionsTotal}</p>
      </div>
    </div>
  );
}
