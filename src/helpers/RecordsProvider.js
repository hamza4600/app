import React, { useContext, useCallback, useEffect, useState } from 'react';

import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import omit from 'lodash/omit';

import { apiFetch } from 'functions.js';
import usePrevious from 'helpers/usePrevious';

const RecordsContext = React.createContext(null);

export default function RecordsProvider({
    children,
    endpoint: defaultEndpoint,
    defaultFilters = {}
}) {
  const [params, setParams] = useState({
    ...defaultFilters,
    rowsOnPage: 50,
    startRow: 1
  });

  const [abortController] = useState(new AbortController());
  const [data, setData] = useState({});
  const [endpoint, setEndpoint] = useState(defaultEndpoint);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ records: [], startRow: 1 });
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchRecords = useCallback(({ params: customParams = {}, ...overrides } = {}) => {
    const { signal } = abortController;
    const fetchParams = { ...params, ...customParams };
    
    const args = {
      endpoint,
      params: fetchParams,
      onFetch: () => setLoading(true),
      onSuccess: response => {
        let result = [];

        if (!isArray(response)) {
          result = get(response, 'result') || [];
        } else {
          result = response.reduce((arr, r) => {
            if (isArray(r.result)) arr.push(...r.result);
            return arr;
          }, []);
        }

        const list = fetchParams.startRow === 1 ? result : [...results.records, ...result];

        setResults({
          records: list,
          startRow: get(response, 'startRow') || null
        });

        // Get other data returned
        setData(omit(response, 'result'));
      },
      onComplete: () => setLoading(false),
      loadingMessage: 'Loading Records',
      errorMessage: 'Unable to load records.',
      signal,
      ...overrides
    };

    apiFetch(args);
  }, [abortController, endpoint, params, results]);

  const updateFilters = useCallback((e) => {
    const fetchParams = {};
    if (get(e, 'target')) fetchParams[e.target.name] = e.target.value;
    else Object.assign(fetchParams, e);

    setParams(p => ({ ...p, ...fetchParams }));
  }, []);

  const prevEndpoint = usePrevious(endpoint);
  const prevParams = usePrevious(params);

  // TODO: Optimize this logic...
  useEffect(() => {
    if (prevEndpoint !== endpoint || !isEqual(prevParams, params)) {
      fetchRecords(params);
    }
  }, [fetchRecords, endpoint, prevEndpoint, params, prevParams]);
  
  return (
    <RecordsContext.Provider
      value={{
        data,
        fetchRecords,
        filters: params,
        loading,
        records: results.records,
        setEndpoint,
        setTotalRecords,
        startRow: results.startRow,
        totalRecords: !isNil(totalRecords) ? totalRecords : results.records.length,
        updateFilters
      }}
    >
      {React.Children.only(children)}
    </RecordsContext.Provider>
  );
}

export const useRecords = () => useContext(RecordsContext);
