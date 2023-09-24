import React from 'react';

import clsx from 'clsx';

// import { LOOKUPS } from 'lookups.js';
import { USER_DATA } from 'globals.js';

import { getRole } from 'functions.js';

import Menu from './Menu';

import styles from './menuContainer.module.scss';

const MenuContainer = ({ directory, onResize, toggleClose, ...props }) => {
  const role = getRole();
  const { roles: { user } } = USER_DATA;

  return (
    <div id="menu" className={clsx(styles.menu, 'd-flex flex-column')}>
      <Menu.Header toggleClose={toggleClose} />
      {/*
        <Menu.Dealerships
          lookup={LOOKUPS.dealerships}
          onResize={onResize}
          toggleClose={toggleClose}
        />
      */}
      <Menu.Nav
        directory={directory}
        lookup={role === user && 'awaitingApproval'}
      />
      {/* <Menu.LogOut /> */}
    </div>
  )
}

export default MenuContainer
