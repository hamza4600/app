import React, { useCallback, useEffect, useState } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';

import { ENDPOINTS } from 'endpoints.js';

import { lookupActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// Abstract logic into hook for use in various components
export const useFetchLookup = ({ lookup }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { load, error, flush } = lookupActions;
  
  const key = get(lookup, 'key') || lookup;
  const deps = get(lookup, 'deps') || [];

  const fetchLookup = useCallback(
    () => {
      const args = {
        endpoint: ENDPOINTS.lookup[key],
        onFetch: () => setLoading(true),
        onSuccess: data => dispatch(load(key, data)),
        onError: () => dispatch(error(key)),
        onComplete: () => setLoading(false),
        loadingMessage: get(lookup, 'loadingMessage'),
        errorMessage: get(lookup, 'errorMessage')
      }

      apiFetch(args);

      return flush;
    },
    [lookup, flush, dispatch, load, key, error]
  );

  useEffect(
    () => {
      if (!lookup) return;
      
      fetchLookup();
      // return () => dispatch(flush(key));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps, lookup]
  );

  return {
    loadingLookup: loading,
    fetchLookup
  };
};

export const fetchLookup = Component => {
  const WrappedComponent = ({
    lookup,
    ...props
  }) => {
    const { fetchLookup: _fetchLookup, ...rest } = useFetchLookup({ lookup });

    return <Component {...props} {...rest} />;
  }

  return WrappedComponent;
};
