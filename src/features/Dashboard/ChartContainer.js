import React, { useContext } from "react";
import LineChart from "./LineChart";
import PropTypes from "prop-types";
import { AppContext } from '../../context/AppContext';

export default function ChartContainer ({ selectedLabel }) {

  const { data: dataset } = useContext(AppContext),
    chartLabels = dataset.map(dataPoint => dataPoint.timestamp),
    chartValues = dataset.map(dataPoint => dataPoint.amount);

  return (
    <div>
      <LineChart
        chartLabels={chartLabels}
        chartValues={chartValues}
        label={selectedLabel}
      />
    </div>
  );
};

ChartContainer.propTypes = {
  selectedLabel: PropTypes.string.isRequired
};
