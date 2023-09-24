import React from 'react';
import { Col, Row } from 'react-bootstrap';

import TableSortLink from './TableSortLink';

const TableHeader = ({
  buttons,
  columns,
  numButtons,
  ...props
}) => (
  <div className="position-sticky p-1 border-bottom">
    <Row>
      <Col className="idx-col">
        <span className="text-muted">#</span>
      </Col>
      <Col>
      <Row>
          {columns && columns.map(({ key, label, sort, format, ...columnProps }, i) =>
            <Col key={i} className="text-truncate" {...columnProps}>
              {sort ? (
                <TableSortLink sortValue={sort} {...props}>{label}</TableSortLink>
              ) : (
                <span className="text-muted">{label}</span>
              )}
            </Col>
          )}
        </Row>
      </Col>
      {numButtons ? <Col className={`btn-col-${numButtons}`}></Col> : null}
    </Row>
  </div>
);

export default TableHeader;
