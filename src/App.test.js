import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

process.env.REACT_APP_BASE_URL = 'http://test';

it('should render App component', async () => {
  jest.spyOn(window, 'fetch').mockImplementation((uri) => {
    let expected;
    if (uri && uri.endsWith('/totals/')) {
      expected = {
        salesTotal: 1943,
        subscriptionsTotal: 89
      };
    } else {
      expected = [
        {
          timestamp: "2020-06-17T06:44:02.676475",
          amount: 1902,
        },
        {
          timestamp: "2020-06-17T06:45:30.983656",
          amount: 893,
        }
      ];
    }

    const fetchResponse = {
      ok: true,
      json: () => Promise.resolve(expected)
    };
    return Promise.resolve(fetchResponse);
  });

  const { findByText, getByRole } = render(<App />);

  await findByText('CellFast sales');
  await findByText('$ 89');

  userEvent.selectOptions(getByRole('combobox'), `${process.env.REACT_APP_BASE_URL}/subscriptions/`);

  await expect(findByText('Subscriptions').selected);

  expect(getByRole('option', { name: 'Subscriptions' }).selected).toBe(true);
});
