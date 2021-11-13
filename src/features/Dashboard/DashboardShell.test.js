import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardShell from './DashboardShell';

process.env.REACT_APP_BASE_URL = 'http://test';

const setDataLocation = jest.fn();

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
    },
    setDataLocation: setDataLocation
  };
});

it('should set endpoint based on chart selection', async () => {
  const expectedEndpointUri = `${process.env.REACT_APP_BASE_URL}/subscriptions/`;

  const { getByRole } = render(<DashboardShell />);

  userEvent.selectOptions(getByRole('combobox'), `${process.env.REACT_APP_BASE_URL}/subscriptions/`);

  expect(getByRole('option', { name: 'Subscriptions' }).selected).toBe(true);
  expect(setDataLocation).toBeCalledWith(expectedEndpointUri);
});
