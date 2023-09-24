import React, { Children, cloneElement } from 'react';

import { Col } from 'react-bootstrap';

const FormCol = ({ children, xs, sm, md, lg, xl, ...props }) => children ? (
  <Col
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
  >
    {Children.map(children, (child, i) => child ? cloneElement( child, {
      ...props,
      key: i
    }) : null)}
  </Col>
) : null;

export default FormCol
