import React, { forwardRef } from 'react';

import clsx from 'clsx';
import { Link } from "react-router-dom";
import { Button as BootstrapButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './button.module.scss';

const Button = forwardRef(({
  children,
  id,
  className,
  variant = 'primary',
  type = 'button',
  label,
  icon,
  iconAfter = false,
  onClick,
  to,
  block = true,
  size,
  disabled,
  ...props
}, ref) => children || label || icon ? (
  <BootstrapButton
    id={id}
    className={clsx(styles.button, `d-flex align-items-center justify-content-${icon && label ? 'between' : 'center'}`, className)}
    variant={variant}
    type={type}
    as={to ? Link : undefined}
    onClick={onClick}
    to={to}
    block={block}
    size={size}
    disabled={disabled}
    ref={ref}
  >
    {!iconAfter && <ButtonIcon icon={icon} className={label ? 'mr-1' : undefined} />}
    <span className="text-nowrap">{label || children}</span>
    {iconAfter && <ButtonIcon icon={icon} className={label ? 'ml-1' : undefined} />}
  </BootstrapButton>
) : null)

const ButtonIcon = ({ icon, className }) => {
  if (!icon) return null;
  return typeof icon === 'string'
    ? <FontAwesomeIcon icon={icon} className={className} />
    : icon;
}

/*
const Button = forwardRef((props, ref) => {
  return <BootstrapButton {...props} forwardedRef={ref} />;
});
*/
Button.Apply    = props => <Button variant="primary" label="Apply" icon="check" {...props} />;
Button.Continue = props => <Button variant="primary" label="Continue" icon="check" {...props} />;
Button.Save     = props => <Button variant="primary" label="Save" icon="save" type="submit" {...props} />;
Button.Done     = props => <Button variant="primary" label="Done" icon="check" {...props} />;
Button.Cancel   = props => <Button variant="dark" label="Cancel" icon="times" {...props} />;
Button.Close    = props => <Button variant="dark" label="Close" icon="times" {...props} />;
Button.Back     = props => <Button variant="dark" label="Back" icon="arrow-left" {...props} />;
Button.Next     = props => <Button variant="primary" label="Next" icon="arrow-right" {...props} />;

export default Button
