import React, { useEffect, useMemo } from 'react';

import clsx from 'clsx';

import { useSelector } from 'react-redux';

import { useFetchLookup } from 'helpers/fetchLookup';

import styles from "./dealership.module.scss";

export default function Dealership({
  className
}) {
  const { fetchLookup } = useFetchLookup({ lookup: 'organizations' });

  const { organizations } = useSelector(state => state.lookups);
  const { organization_id } = useSelector(state => state.user);

  const { organization_name } = useMemo(() => {
    return (organizations || []).find(o => o.organization_id === organization_id) || {}
  }, [organization_id, organizations]);

  useEffect(() => {
    if (!organizations || organizations.length) {
      fetchLookup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchLookup]);

  return (
    <div className={clsx(styles.container, className)}>
      <div className="d-flex align-items-center flex-wrap text-lg">
        <span className="mr-1 text-gray-light">Dealership:</span>
        <span className="text-truncate">
          {organization_name}
        </span>
      </div>
    </div>
  )
}
