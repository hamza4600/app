import React from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';

import Button from 'button/Button';
import Sprite from 'graphics/Sprite';

const Dropdown = ({
  children,
  id,
  className,
  menuClassName,
  toggle = 'caret-down',
  align = 'left',
  ...props
}) => (
  <BootstrapDropdown
    {...props}
    id={id}
    className={clsx(
      className,
      'header-dropdown h-100',
      `align-${align}`
    )}
  >
    <BootstrapDropdown.Toggle
      as={Button}
      className={clsx(
        toggle.className,
        'h-100 w-100'
      )}
      icon={toggle.icon}
      variant={toggle.variant || 'custom'}
      justify="start"
    >
      <div className="d-flex align-items-center">
        {toggle.label}
      </div>
    </BootstrapDropdown.Toggle>
    <BootstrapDropdown.Menu
      className={menuClassName}
    >
      {children}
    </BootstrapDropdown.Menu>
  </BootstrapDropdown>
)

Dropdown.Item = ({
  children,
  className,
  labelClassName,
  to,
  onClick,
  as: Child = to ? Link : 'div',
  icon: {
    use,
    fill,
    ...icon
  } = {}
}) => (
  <BootstrapDropdown.Item
    className={clsx(
      className,
      'pl-0 border-bottom'
    )}
    as="div"
  >
    <Child
      className={clsx(
        'd-flex align-items-center justify-content-between',
        to || onClick ? 'item-link' : ''
      )}
      to={to}
      onClick={onClick}
    >
      <span className={clsx('mr-3', labelClassName)}>{children}</span>
      {use !== false &&
        <Sprite
          use={use || 'chevron-right'}
          fill={fill || 'gray-light'}
          {...icon}
        />
      }
    </Child>
  </BootstrapDropdown.Item>
)

export default Dropdown
