import React from 'react';

import clsx from 'clsx';

import { SITE_TITLE } from 'globals.js';

import LOGO from 'img/logo.png';
import LOGO_TEXT from 'img/logo-text.svg';

import styles from './logo.module.scss';

const Logo = ({ className, showText, size }) => {

  return (
    <div className={clsx('d-flex', className)}>
      <img src={LOGO} className={styles.logo} height={size} alt={SITE_TITLE} />
      {showText ? <img src={LOGO_TEXT} height={size} alt="" className={styles.text} /> : null}
    </div>
  );
}

export default Logo
