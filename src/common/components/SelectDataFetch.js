import React, { useState } from 'react';
import Select from './Select';
import DataFetch from './DataFetch';

if (process.env.NODE_ENV === 'development') {
  const { Server } = require('miragejs');
  const { sales, subscriptions } = require('../../mocks');

  new Server({
    routes() {
      this.namespace = process.env.REACT_APP_BASE_URL;

      this.get('/sales/', () => sales);

      this.get('/subscriptions/', () => subscriptions);
    }
  });
}

const selectOptions = [
  { label: 'Sales', value: process.env.REACT_APP_BASE_URL + '/sales/' },
  { label: 'Subscriptions', value: process.env.REACT_APP_BASE_URL + '/subscriptions/' }
];

export default function SelectDataFetch () {
  const [endpoint, setEndpoint] = useState(undefined);

  return (
    <>
      <Select id="select-chart"
              label="Please, select a chart"
              options={selectOptions}
              onChange={evt => setEndpoint(evt.target.value)}
      />
      { endpoint ? <DataFetch endpoint={endpoint} /> : null }
    </>
  );
}
