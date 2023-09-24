import React from 'react';
import { Col, Row } from 'react-bootstrap';

import RecordButtons from 'record/RecordButtons';

const TableRow = ({
  record,
  columns,
  id,
  buttons,
  ...props
}) => (
  <Row>
    <Col className="idx-col">
      <span className="align-middle">{record[id]}</span>
    </Col>
    <Col>
      <Row>
        {columns.map(({ key, label, format: Format = 'span', ...columnProps }, i) => (
          <Col key={i} className="text-truncate" {...columnProps}>
            <Format label={label}>{record[key]}</Format>
          </Col>
        ))}
      </Row>
    </Col>
    <RecordButtons
      wrapper={props => <Col {...props} className={`btn-col-${buttons.length}`} />}
      className="justify-content-end"
      record={record}
      id={id}
      buttons={buttons}
      {...props}
    />
  </Row>
);

export default TableRow;
