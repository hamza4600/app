import React from 'react';
import { Form } from 'react-bootstrap';

const FormText = ({ children, ...props }) => (
  <Form.Text as="span" className="py-1 text-muted">{children}</Form.Text>
)

export default FormText
