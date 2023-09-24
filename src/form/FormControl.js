import React from 'react';
import { Form } from 'react-bootstrap';

const FormControl = ({
  className,
  type = 'text',
  as,
  name,
  value = '',
  label,
  placeholder = label ? `Enter ${label.toLowerCase()} here` : undefined,
  options, // Cleave
  onBlur,
  onChange,
  onKeyUp,
  required,
  readOnly,
  disabled,
  plaintext,
  size,
  rows,
  autoComplete,
  maxLength,
  min,
  max
}) => (
  <Form.Control
    className={className}
    type={type}
    as={as}
    name={name}
    value={value}
    placeholder={placeholder}
    options={options} // Cleave
    onBlur={onBlur}
    onChange={onChange}
    onKeyUp={onKeyUp}
    required={required}
    readOnly={readOnly}
    disabled={disabled}
    plaintext={plaintext}
    size={size}
    rows={rows}
    autoComplete={autoComplete || 'new-password'}
    maxLength={maxLength}
    min={min}
    max={max}
  />
)

export default FormControl
