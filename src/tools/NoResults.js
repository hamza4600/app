import React, { cloneElement } from 'react';

import clsx from 'clsx';
import isNil from 'lodash/isNil';

import Sprite from 'graphics/Sprite';

import styles from './noResults.module.scss';

export default function NoResults({ icon, children, className, iconComponent }) {

  return (
    <div className={clsx('text-center text-muted', className)}>
      {!iconComponent && icon ? (
        <Sprite use={icon.use || icon} className={clsx(styles.icon, 'mx-auto mb-2', icon.className)} />
      ) : (
        null
      )}
      {iconComponent ? cloneElement(iconComponent, {
        className: clsx(styles.icon, 'mx-auto mb-2', iconComponent.props.className)
      }) : null}
      {!isNil(children) ? children : <div>No Records</div>}
    </div>
  )
}
