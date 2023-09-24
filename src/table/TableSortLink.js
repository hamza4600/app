import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { decodeSearch, updateSearch } from 'functions.js';

const TableSortLink = ({
  children,
  sortValue,
  location,
  match
}) => {

  const { sortKey, sortOrder } = decodeSearch(location.search);

  const active = sortKey === sortValue;
  const orderValue = active && sortOrder === 'A' ? 'D' : 'A';

  const search = updateSearch(
    location.search,
    {
      key: 'sortKey',
      value: sortValue
    },
    {
      key: 'sortOrder',
      value: orderValue
    }
  );

  return (
    <Link
      to={`${location.pathname}${search}`}
      className="table-sort-link"
      data-sort-key={sortValue}
      data-sort-order={orderValue}
      data-active={active}
    >
      {children}
      <span className="fa-layers fa-fw ml-text">
        <FontAwesomeIcon icon={'sort-up'} />
        <FontAwesomeIcon icon={'sort-down'} />
      </span>
    </Link>
  )
}
export default TableSortLink
