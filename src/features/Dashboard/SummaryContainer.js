import React from "react";
import { useDataFetch } from '../../hooks';

export default function SummaryContainer () {

  const { data } = useDataFetch(`${process.env.REACT_APP_BASE_URL}/totals/`),
    { salesTotal, subscriptionsTotal } = data;

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
