import React from 'react';
import { Card } from 'react-bootstrap';

import RecordForm from './RecordForm';

const RecordCard = ({
  ...props
}) => (
  <Card id="record-card" className="p-1 py-md-3 px-md-2 w-100 bg-light">
    <RecordForm {...props} />
  </Card>
)

export default RecordCard
