import React from 'react';
import Badge from 'react-bootstrap/Badge';

import Format from './Format';

const ActiveFormat = ({ children: active }) => (
  <Badge className={`badge badge-${active ? 'success' : 'secondary'} d-block `}>{active ? 'Active' : 'Inactive'}</Badge>
)

export default ActiveFormat
