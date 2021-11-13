import React, { useContext } from "react";
import LineChart from "./LineChart";
import PropTypes from "prop-types";
import DataContext from '../../context/DataContextProvider';

export default function ChartContainer ({ selectedLabel }) {

  const { dataValue: { data: dataset } } = useContext(DataContext),
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
