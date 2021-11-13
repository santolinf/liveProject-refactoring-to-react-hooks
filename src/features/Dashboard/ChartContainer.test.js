import * as React from 'react';
import { render } from '@testing-library/react'
import ChartContainer from './ChartContainer';

jest.spyOn(React, 'useContext').mockImplementation((_) => {
  return {
    dataValue: {
      data: [
        {
          timestamp: "2020-06-17T06:44:02.676475",
          amount: 1902,
        },
        {
          timestamp: "2020-06-17T06:45:30.983656",
          amount: 893,
        }
      ]
    }
  }
});

const mockLineChart = jest.fn();
jest.mock('./LineChart', () => (props) => {
  mockLineChart(props);
  return <mock-LineChart/>;
});

it('should render chart container and display a line chart', () => {
  render(<ChartContainer selectedLabel="Sales" />);

  expect(mockLineChart).toHaveBeenCalledWith(
    expect.objectContaining({
      "chartLabels": [
        "2020-06-17T06:44:02.676475",
        "2020-06-17T06:45:30.983656"
      ],
      "chartValues": [ 1902, 893 ],
      "label": "Sales"
    })
  );
});
