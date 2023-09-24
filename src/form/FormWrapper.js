import React, { Children, cloneElement } from 'react';
import { Form  } from 'formik';

const FormWrapper = ({
  children,
  className,
  id,
  name,
  inline,
  formikBag,
  labelClassName
}) => (
  <Form id={id} className={className} name={name} noValidate>
    {Children.map(children, (child, i) => child ? cloneElement( child, {
      key: i,
      formikBag,
      inline,
      labelClassName
    }) : null)}
  </Form>
)

export default FormWrapper
