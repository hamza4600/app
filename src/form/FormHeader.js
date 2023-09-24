import React from 'react';

import { mergeClassName } from 'functions.js';

const FormHeader = ({
  children,
  className = 'mb-2 mb-md-3 mx-auto'
}) => children ? (
  <div className={mergeClassName('form-header', className)}>
    {children}
  </div>
) : null;

export default FormHeader
