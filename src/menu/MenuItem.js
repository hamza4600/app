import React from 'react';
import clsx from 'clsx';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Sprite from 'graphics/Sprite';

import MenuBadge from './MenuBadge';

import styles from './menuItem.module.scss';

// TODO: Only use Sprite...
const MenuItem = ({
  exact,
  icon,
  isActive,
  loadingLookup,
  lookupPath,
  navItemClassName,
  navLinkClassName,
  navTextClassName,
  onClick,
  path = '',
  title,
  ...props
}) => {
  return title ? (
    <Nav.Item
      id={path ? `${path}-item` : undefined}
      className={clsx(styles.item, 'border-top border-bottom', navItemClassName)}
    >
      <Nav.Link
        className={clsx(styles.link, 'd-flex px-2 border-0 align-items-center justify-content-between', isActive && 'active', navLinkClassName)}
        as={!onClick ? NavLink : undefined}
        onClick={onClick}
        to={!onClick ? `/${path}` : undefined}
      >
        {icon && icon.use ? (
          <Sprite
            use={icon.use}
            variant="primary"
            className="mr-1"
          />
        ) : null}
        {icon && !icon.use ? (
          <FontAwesomeIcon icon={icon} fixedWidth size="lg" className="gradient-hover mr-1" />
        ) : null}
        <span className={clsx('d-flex align-items-center flex-grow-1 text-uppercase', navTextClassName)}>
          {title.menu || title.page || title.plural || title.single}
          {lookupPath ? (
            <MenuBadge
              lookupPath={lookupPath}
              loading={loadingLookup}
            />
          ) : null}
        </span>
        
      </Nav.Link>
    </Nav.Item>
  ) : null;
}

export default MenuItem
