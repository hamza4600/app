import React from 'react';

import Format from './Format';

const NumberFormat = ({ children, ...props }) => (
  <Format {...props}>{children.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Format>
)

export default NumberFormat
