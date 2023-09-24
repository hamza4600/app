import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { DATE_RANGES } from 'globals.js';

import RecordsProvider, { useRecords } from 'helpers/RecordsProvider';
import { apiFetch } from 'functions.js';

import Table from 'table-v2/Table';

import InterfaceMain from './parts/InterfaceMain';
import DateRangeTabs from './tools/DateRangeTabs';
import Title from './tools/Title';

function InterfaceList({
  color,
  columns,
  endpoints,
  params,
  title,
  ...props
}) {
  const [dateRangeKey, setDateRangeKey] = useState(DATE_RANGES[0].key);
  const [summary, setSummary] = useState([]);

  const listEndpoint = endpoints.list(dateRangeKey);

  const { setEndpoint, setTotalRecords, totalRecords } = useRecords();

  const fetchSummary = useCallback(() => {
    const args = {
      endpoint: `${listEndpoint}/summary`,
      onSuccess: s => {
        setSummary(s?.date_accrual_summary || []);
        setTotalRecords(s?._metadata?.total_records || null)
      },
      onError: () => setTotalRecords(null)
    };

    apiFetch(args);
  }, [listEndpoint, setTotalRecords]);

  useEffect(() => {
    fetchSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDateRange = useCallback(key => {
    return summary.find(s => s.date_range_key === key) || {}
  }, [summary]);

  const count = useMemo(() => {
    return listEndpoint.includes(dateRangeKey) ? getDateRange(dateRangeKey).total : totalRecords;
  }, [dateRangeKey, getDateRange, listEndpoint, totalRecords]);

  const enhancedDateRanges = useMemo(() => {
    return DATE_RANGES.map(d => ({ ...d, count: getDateRange(d.key).total }))
  }, [getDateRange]);

  useEffect(() => {
    setEndpoint(listEndpoint);
  }, [dateRangeKey, endpoints, listEndpoint, setEndpoint]);

  return (
    <InterfaceMain
      {...props}
      title={<Title title={title.page || title.plural} count={count} color={color} />}
    >
      {listEndpoint.includes(dateRangeKey) && summary.length ? (
        <DateRangeTabs
          range={dateRangeKey}
          ranges={enhancedDateRanges}
          onChange={setDateRangeKey}
        />
      ) : null}
      <Table columns={columns} path={props.path} disableSortBy />
    </InterfaceMain>
  );
}

export default props => (
  <RecordsProvider
    endpoint={props.endpoints.list(DATE_RANGES[0].key)}
    defaultFilters={props.params}
  >
    <InterfaceList {...props} />
  </RecordsProvider>
)
