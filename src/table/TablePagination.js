import React from 'react';

import TablePageItem from './TablePageItem';

import { ROWS_ON_PAGE } from 'tables.js';

import { decodeSearch } from 'functions.js';

const TablePagination = ({
  total,
  ...props
}) => {

  const {
    match: {
      params: {
        pageNumber = 1
      }
    },
    location: {
      search = ''
    }
  } = props;

  const { rowsOnPage = ROWS_ON_PAGE.default } = decodeSearch(search);

  if (!total || total <= rowsOnPage) return null;

  const pageInt = parseInt(pageNumber, 10);

  const firstPage = 1;
  const lastPage = Math.ceil(total/rowsOnPage);

  const contiguousPages = [];

  if (pageInt - 3 > firstPage && pageInt === lastPage) contiguousPages.push(pageInt - 3);
  if (pageInt - 2 > firstPage && pageInt > lastPage - 2) contiguousPages.push(pageInt - 2);
  if (pageInt - 1 > firstPage) contiguousPages.push(pageInt - 1);
  if (pageInt !== firstPage && pageInt !== lastPage) contiguousPages.push(pageInt);
  if (pageInt + 1 < lastPage) contiguousPages.push(pageInt + 1);
  if (pageInt + 2 < lastPage && pageInt < firstPage + 2) contiguousPages.push(pageInt + 2);
  if (pageInt + 3 < lastPage && pageInt === firstPage) contiguousPages.push(pageInt + 3);

  return (
    <nav className="mt-1 mt-md-3">
      <ul className="pagination justify-content-center">
        {pageInt > 1 &&
          <TablePageItem {...props} pageNumber={pageInt - 1} type="back" />
        }
        <TablePageItem {...props} pageNumber={firstPage} type={pageInt === firstPage ? 'active' : null} />
        {contiguousPages[0] > firstPage + 1 &&
          <TablePageItem {...props} type="disabled" />
        }
        {contiguousPages.map((thisPage, i) =>
          <TablePageItem {...props} key={i} pageNumber={thisPage} type={thisPage === pageInt ? 'active' : null} />
        )}
        {contiguousPages[contiguousPages.length - 1] < lastPage - 1 &&
          <TablePageItem {...props} type="disabled" />
        }
        <TablePageItem {...props} pageNumber={lastPage} type={pageInt === lastPage ? 'active' : null} />
        {pageInt < lastPage &&
          <TablePageItem {...props} pageNumber={pageInt + 1} type="next" />
        }
      </ul>
    </nav>
  )
}

export default TablePagination
