import React from 'react';
import { render } from '@testing-library/react';
import SummaryContainer from './SummaryContainer';

it('should see sales and subscriptions totals', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    const fetchResponse = {
      ok: true,
      json: () => Promise.resolve({
        salesTotal: 1943,
        subscriptionsTotal: 89
      })
    };
    return Promise.resolve(fetchResponse);
  });

  const { findByText, getByText } = render(<SummaryContainer />);

  await findByText("CellFast sales");
  await findByText("$ 89");

  expect(getByText('CellFast sales')).toBeInTheDocument();
  expect(getByText('$ 89')).toBeInTheDocument();
  expect(getByText('CellNow subscriptions')).toBeInTheDocument();
  expect(getByText('$ 1943')).toBeInTheDocument();

  window.fetch.mockRestore();
});
