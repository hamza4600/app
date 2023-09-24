import React from 'react';

import clsx from 'clsx';

import { USER_DATA } from 'globals.js';

import Button from 'button/Button';
import Guard from 'tools/Guard';
import Logo from 'logo/Logo';
import MenuToggle from 'menu/MenuToggle';
import Title from 'title/Title';

import Dealership from './Dealership';
import UserMenuDropdown from './UserMenuDropdown';

import styles from './header.module.scss';

const Header = ({ menuRef, title }) => {
  return (
    <header
      className={clsx(styles.header, 'd-flex align-items-center pr-2 pr-lg-3 w-100 bg-primary text-white')}
    >
      <div className={clsx(styles.logo, 'd-flex align-items-center justify-content-between h-100 pl-2')}>
        <Logo size="50" />
      </div>
      <Guard role={USER_DATA.roles.admin}>
        <Title className={clsx(styles.title, 'ml-2 ml-lg-3 mb-0')} title={title} />
      </Guard>
      <Guard role={USER_DATA.roles.user}>
        <Dealership className="ml-2" />
      </Guard>
      <div className="d-flex align-items-center ml-auto">
        <Guard role={USER_DATA.roles.user}>
          <div className={clsx(styles.tools, 'd-none d-lg-flex ml-auto mr-1 pr-3')}>
            <Button variant="link" icon="search" className="px-0 text-white" />
          </div>
        </Guard>
        <UserMenuDropdown />
        {menuRef ? <MenuToggle menuRef={menuRef} /> : null}
      </div>
    </header>
  );
}

export default Header
