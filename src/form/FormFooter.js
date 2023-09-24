import React, { Children, cloneElement } from 'react';
import { Col, Row } from 'react-bootstrap';

const FormFooter = ({ children }) => children ? (
  <div className="form-footer mt-2 mt-md-3 mx-auto">
    <Row className={`justify-content-${children.length > 1 ? 'between' : 'around'}`}>
      {Children.map(children, (child, i) => (
        <Col key={i} xs={6}>
          {cloneElement(child, {
            iconAfter: i%2 === 1
          })}
        </Col>
      ))}
    </Row>
  </div>
) : null;

export default FormFooter
