import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function DataFetch ({ endpoint }) {

  const [dataset, setDataset] = useState([]),
    [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    fetch(endpoint)
      .then(data => data.json())
      .then(json => {
        setErrorMessage(undefined);
        setDataset(json);
      })
      .catch(error => {
        setDataset([]);
        setErrorMessage(error.message);
      });
  }, [endpoint]);

  return (
    <>
      { dataset.length > 0 &&
      <ul>
        { dataset.map(d => <li key={d.timestamp}>{d.timestamp + ' - ' + d.amount}</li>) }
      </ul>
      }
      { errorMessage &&
        <p>{errorMessage}</p>
      }
    </>
  );
}

DataFetch.propTypes = {
  endpoint: PropTypes.string.isRequired
}
