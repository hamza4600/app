import React from 'react';
import { Link } from 'react-router-dom';

const TablePageItem = ({
  path,
  step,
  pageNumber,
  type,
  location: {
    search = ''
  }
}) => {

  const to = pageNumber > 1 ? `/${path}/${step}/page/${pageNumber}${search}` : `/${path}/${step}${search}`;

  switch(type) {
    case 'back':
      return (
        <li className="page-item mr-1">
          <Link className="page-link d-none d-sm-block" to={to}>
            Back
          </Link>
        </li>
      )
    case 'next':
      return (
        <li className="page-item">
          <Link className="page-link d-none d-sm-block" to={to}>
            Next
          </Link>
        </li>
      )
    case 'active':
      return (
        <li className="page-item mr-1 active">
          <span className="page-link">{pageNumber}</span>
        </li>
      )
    case 'disabled':
      return (
        <li className="page-item mr-1 disabled">
          <span className="page-link px-0">&hellip;</span>
        </li>
      )
    default:
      return (
        <li className="page-item mr-1">
          <Link className="page-link" to={to}>
            {pageNumber.toString()}
          </Link>
        </li>
      )
  }
}


export default TablePageItem
