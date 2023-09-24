import React from 'react';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import RecordToolbar from 'record/RecordToolbar';

const Table = ({ header, buttons, ...props }) => (
  <div className="table d-flex flex-column flex-grow-1 w-100 mb-0">
    <RecordToolbar {...props} />
    <TableHeader {...props} numButtons={buttons.length} />
    <TableBody {...props} buttons={buttons} />
    <TablePagination {...props} />
  </div>
);

export default Table;
