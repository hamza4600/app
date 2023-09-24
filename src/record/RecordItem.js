import React from 'react';
import { Card } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';

import RecordButtons from 'record/RecordButtons';

const TableRow = ({
  record,
  columns,
  id,
  ...props
}) => (
  <Card className="mb-1">
    <h4 className="p-1 mb-0 border-bottom">{record[id]}</h4>
    <dl className="p-1 mb-n1">
      {columns.map(({ format: Format = 'span', key, label, className }, i) => (
        <Row key={i} className="mb-1">
          <Col xs={4}>
            <dt className="mb-0 text-muted text-truncate font-weight-normal">{label}</dt>
          </Col>
          <Col xs={8}>
            <dd className="mb-0 text-truncate"><Format>{record[key]}</Format></dd>
          </Col>
        </Row>
      ))}
    </dl>
    <RecordButtons
      className="p-1 justify-content-around border-top"
      record={record}
      id={id}
      {...props}
    />
  </Card>
)

export default TableRow
