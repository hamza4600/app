import React from 'react';

import { useSelector } from 'react-redux';
import keys from 'lodash/keys';

import { USER_MENU } from 'directories.js';

import { guardRoutes } from 'functions.js';

import Sprite from 'graphics/Sprite';
import Dropdown from 'tools/Dropdown';
import Menu from 'menu/Menu';

import styles from './userMenuDropdown.module.scss';

export default function UserMenuDropdown() {
  const { first_name, last_name } = useSelector(state => state.user);

  const guardedRoutes = guardRoutes(USER_MENU);

  return (
    <Dropdown
      id="user-dropdown"
      toggle={{
        label: (
          <>
            <Sprite use="person-outline" className={styles.userIcon} />
            <span className="d-none d-lg-inline">{first_name} {last_name}</span>
            <Sprite use="arrow-drop-down" className="ml-0 ml-lg-1" />
          </>
        ),
        className: 'pr-0 text-white'
      }}
      className={styles.dropdown}
      menuClassName={styles.menu}
    >
      {keys(guardedRoutes).map(key => (
        <Menu.Item
          {...guardedRoutes[key]}
          key={key}
          navItemClassName={styles.item}
          navLinkClassName="py-1"
        />
      ))}
    </Dropdown>
  )
}
