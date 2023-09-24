import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import TableRow from './TableRow';

const TableBody = ({
  records,
  ...props
}) => !records || records.length < 1 ? (
  <div className="d-flex flex-grow-1 align-items-center justify-content-center">
    <span className="text-muted font-italic">No {props.title.plural.toLowerCase()} found.</span>
  </div>
) : (
  <ListGroup variant="flush">
    {records && records.map((record, i) =>
      <ListGroup.Item key={i} className="p-1 mb-0 border-top-0 border-bottom">
        <TableRow {...props} record={record} />
      </ListGroup.Item>
    )}
  </ListGroup>
)

export default TableBody
