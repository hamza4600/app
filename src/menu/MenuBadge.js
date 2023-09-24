import React from 'react';

import clsx from 'clsx';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

import Spinner from 'graphics/Spinner';

import styles from './menuBadge.module.scss';

export default ({
  loading,
  lookupPath
}) => {
  const lookups = useSelector(state => state.lookups);
  
  const value = get(lookups, lookupPath);

  if (!loading && isNil(value)) return null;

  return loading ? (
    <Spinner
      className="ml-auto mr-1 text-gray"
    />
  ) : (
    <Badge
      className={clsx(styles.badge, 'd-flex align-items-center justify-content-center ml-auto mr-1')} 
      pill
    >
      {value}
    </Badge>
  );
}
