import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { mergeClassName } from 'functions.js';

import Format from './Format';

const CheckFormat = ({ children: checked, className, label, ...props }) => (
  <Format className={mergeClassName(className, `text-${checked ? 'success' : 'secondary'}`)}>
    <FontAwesomeIcon icon={checked ? 'check' : 'minus'} className={label ? 'mr-text' : undefined} />
    {checked && label ? label : ''}
  </Format>
)

export default CheckFormat
