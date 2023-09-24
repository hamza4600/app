import React from 'react';

import clsx from 'clsx';
import { Button } from 'react-bootstrap';

import Logo from 'logo/Logo';
import Sprite from 'graphics/Sprite';

import styles from './menuHeader.module.scss';

const MenuClose = ({ toggleClose }) => (
  <div className={clsx(styles.container, 'd-flex d-lg-none')}>
    <div className={clsx(styles.header, 'align-items-center justify-content-between w-100 px-2 bg-primary')}>
      <Logo size="50" />
      <Button id="menu-close" className="p-0" variant="link" onClick={toggleClose}>
        <Sprite use="close" className="text-white" />
      </Button>
    </div>
  </div>
)

export default MenuClose
