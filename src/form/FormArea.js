import React from 'react';

const FormArea = ({ children, className }) => children ? (
  <div className={className}>
    {children}
  </div>
) : null;

export default FormArea
