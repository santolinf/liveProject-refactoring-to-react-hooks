import React from 'react';
import PropTypes from 'prop-types';
import { useDataFetch } from '../../hooks';
import Loading from './Loading';

export default function DataFetch ({ endpoint }) {

  const { loading, success, error, data } = useDataFetch(endpoint);

  return (
    <>
      { success &&
      <ul>
        { data.map(d => <li key={d.timestamp}>{d.timestamp + ' - ' + d.amount}</li>) }
      </ul>
      }
      { error &&
        <p>{error}</p>
      }
      { loading && <div><Loading /></div> }
    </>
  );
}

DataFetch.propTypes = {
  endpoint: PropTypes.string.isRequired
}
