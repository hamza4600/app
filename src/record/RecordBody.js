import React, { Children, cloneElement } from 'react';

import Form from 'form/Form';

const RecordForm = ({
  children,
  record,
  parentRecord
}) => (
  <Form.Body>
    {Children.map(children, (child, i) => cloneElement(child, { key: i, record, parentRecord }))}
  </Form.Body>
)

export default RecordForm
