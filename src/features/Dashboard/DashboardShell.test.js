import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardShell from './DashboardShell';

process.env.REACT_APP_BASE_URL = 'http://test';

it('should set endpoint based on chart selection', async () => {
  const setEndpoint = jest.fn(),
    expectedEndpointUri = `${process.env.REACT_APP_BASE_URL}/subscriptions/`;

  const { getByRole } = render(<DashboardShell setEndpoint={setEndpoint} />);

  userEvent.selectOptions(getByRole('combobox'), `${process.env.REACT_APP_BASE_URL}/subscriptions/`);

  expect(getByRole('option', { name: 'Subscriptions' }).selected).toBe(true);
  expect(setEndpoint).toBeCalledWith(expectedEndpointUri);
});
