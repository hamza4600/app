import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActiveFormat = ({ children: active }) => (
  <span className={`text-${active ? 'success' : 'secondary'}`}>
    <FontAwesomeIcon icon={active ? 'circle' : ['far', 'circle']} className="mr-text" />
    {active ? 'Active' : 'Inactive'}
  </span>
)

export default ActiveFormat
