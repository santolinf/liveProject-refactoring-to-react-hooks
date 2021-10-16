import { useEffect, useReducer } from 'react';

function initialDataFetchState (loading) {
  return {
    loading,
    error: undefined,
    success: undefined,
    data: []
  };
}

function dataFetchReducer (state, action) {
  switch (action.type) {
    case 'LOADING':
      return initialDataFetchState(true);

    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload
      };

    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export function useDataFetch(url) {

  const [state, dispatch] = useReducer(dataFetchReducer, false, initialDataFetchState);

  useEffect(() => {
    dispatch({type: 'LOADING'});

    fetch(url)
      .then(data => data.json())
      .then(json => dispatch({type: 'SUCCESS', payload: json}))
      .catch(error => dispatch({type: 'ERROR', payload: error.message}))
  }, [url]);

  return state;
}
