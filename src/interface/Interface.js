import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import MenuProvider from './helpers/MenuProvider';
import { sessionTimer } from './helpers/sessionTimer';
import { logOut } from '../functions';

import InterfaceRouter from './InterfaceRouter';
import HeaderRouter from 'header/HeaderRouter';
import ModalRouter from 'modal/ModalRouter';

import { getInterfaceRoutes, USER_MENU } from 'directories.js';

import styles from './interface.module.scss';

const Interface = () => {
  const [menuRef, setMenuRef] = useState();
  const menu = useRef();

  useEffect(() => {
    if (!menuRef) setMenuRef(menu);
  }, [menu, menuRef]);

  const interfaceRoutes = getInterfaceRoutes();

  if (!interfaceRoutes) {
    logOut();
    return null;
  }

  const routes = { ...interfaceRoutes, ...USER_MENU };

  return (
    <MenuProvider>
      <div id="interface" className="d-flex flex-column">
        <HeaderRouter menuRef={menuRef} routes={routes} />
        <div className="d-flex flex-grow-1">
          <div ref={menu} />
          <main
            className={clsx(styles.main, 'd-flex flex-column flex-grow-1 align-items-center px-2 py-3 px-lg-3')}
          >
            <InterfaceRouter routes={routes} />
          </main>
        </div>
        <ModalRouter />
      </div>
    </MenuProvider>
  );
}

export default sessionTimer(Interface)
