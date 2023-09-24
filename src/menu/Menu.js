import React from 'react';

import clsx from 'clsx';

import DealershipToggle from './DealershipToggle';
import MenuContainer from './MenuContainer';
import MenuHeader from './MenuHeader';
import MenuItem from './MenuItem';
import MenuLogOut from './MenuLogOut';
import MenuNav from './MenuNav';
import Sidebar from 'sidebar/Sidebar';

import styles from './menu.module.scss';

const Menu = ({
  onOpen,
  onClose,
  ...props
}) => (
  <Sidebar
    {...props}
    id="menu-sidebar"
    buttonProps={{
      variant: 'link',
      className: clsx(styles.button, 'd-lg-none p-0 border-0 text-white'),
      icon: 'bars'
    }}
    onOpen={onOpen}
    onClose={onClose}
  >
    {props => <MenuContainer {...props} />}
  </Sidebar>
)

Menu.Nav = MenuNav;
Menu.Header = MenuHeader;
Menu.Item = MenuItem;
Menu.Dealerships = DealershipToggle;
Menu.LogOut = MenuLogOut;

export default Menu
