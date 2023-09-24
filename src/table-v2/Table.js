import React, { useMemo } from 'react';

import NoResults from 'tools/NoResults';

import DesktopTable from './desktop/Table';
import MobileList from './mobile/List';

import { useRecords } from 'helpers/RecordsProvider';
import useBreakpoint from 'helpers/useBreakpoint';

import { ReactComponent as NoResultsGraphic } from 'img/clipboards.svg';

import styles from './table.module.scss';

export default function Table({
  columns,
  tools,
  ...rest
}) {
  const {
    loading,
    records
  } = useRecords();

  return (
    <>
      {records && records.length ? (
        <TableComponent
          {...rest}
          columns={columns}
          data={records}
          loading={loading}
        />
      ) : (
        <NoResults
          icon={{
            use: 'clock',
            className: 'text-primary'
          }}
          iconComponent={!loading && <NoResultsGraphic className={styles.noResults} />}
          className="flex-grow-1 d-flex flex-column justify-content-center"
        >
          {loading ? 'Loading...' : 'No Results Found'}
        </NoResults>
      )}
    </>
  );
}

function TableComponent(props) {
  const breakpoint = useBreakpoint();

  const isMobile = useMemo(() => {
    return ['xs', 'sm'].includes(breakpoint);
  }, [breakpoint]);

  return isMobile ? (
    <MobileList {...props} />
  ) : (
    <DesktopTable {...props} />
  );
}

