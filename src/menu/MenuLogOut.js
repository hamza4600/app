import React from 'react';

import Menu from './Menu';

import { logOut } from 'functions.js';

const MenuLogOut = () => (
  <Menu.Item
    title={{ menu: "Sign Out" }}
    icon="door-open"
    onClick={logOut}
    navItemClassName="border-0"
  />
)

export default MenuLogOut
