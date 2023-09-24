import React, { Fragment } from 'react';

import clsx from 'clsx';
import keys from 'lodash/keys';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { Nav, Collapse } from 'react-bootstrap';

import { getInterfaceRoutes } from 'directories.js';
import { doCallback } from 'functions.js';
import { fetchLookup } from 'helpers/fetchLookup';

import { useMenu } from 'interface/helpers/MenuProvider';

import Menu from './Menu';

import styles from './menuNav.module.scss';

const MenuNav = ({ loadingLookup }) => {
  const location = useLocation();
  
  const { menusOpen, toggleMenusOpen } = useMenu();

  const interfaceRoutes = getInterfaceRoutes();
  
  return (
    <Nav className={clsx(styles.nav, 'flex-column bg-white border-top border-bottom')} defaultActiveKey={undefined}>
      {keys(interfaceRoutes).map((key, i) => {

        const { onClick, path, endpoints = {}, subpaths, ...restMenuProps } = interfaceRoutes[key];

        const step = endpoints.list ? '' : endpoints.save ? '/edit' : endpoints.get ? '/view' : '';

        const menuSubpaths = keys(subpaths).reduce((arr, key) => {
          if (subpaths[key].inMenu) arr.push(subpaths[key]);
          return arr;
        }, []);
        const hasSubNav = !!menuSubpaths.length;

        const handleClick = e => {
          if (hasSubNav) toggleMenusOpen(path);
          
          doCallback(onClick, e);
        };

        const subPathNames = menuSubpaths.map(s => `/${path}/${s.path}`);

        return (
          <Fragment key={i}>
            <Menu.Item
              {...restMenuProps}
              onClick={(hasSubNav || onClick) && handleClick}
              path={`${path}${step}`}
              isActive={subPathNames.includes(location.pathname)}
              loadingLookup={loadingLookup}
            />
            {hasSubNav  ? (
              <Collapse in={menusOpen.includes(path)}>
                <div>
                  {menuSubpaths.map((p, j) => (
                    <Menu.Item
                      {...p}
                      key={j}
                      path={`${path}/${p.path}`}
                      navItemClassName={styles.subNavItem}
                      navLinkClassName={clsx(styles.subNavLink, 'pl-5')}
                      navTextClassName={styles.subNavText}
                      loadingLookup={loadingLookup}
                    />
                  ))}
                </div>
              </Collapse>
            ) : null}
          </Fragment>
        )
      })}
    </Nav>
  );
}

export default compose(fetchLookup)(MenuNav);
