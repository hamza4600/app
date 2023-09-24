import React, { Children, cloneElement } from 'react';

import clsx from 'clsx';

const FormBody = ({ children, className, ...props }) => (
  <div className={clsx('form-body my-n1 mx-auto', className)}>
    {Children.map(children, (child, i) => child ? cloneElement( child, {
      ...props,
      key: i
    }) : null)}
  </div>
)

export default FormBody
