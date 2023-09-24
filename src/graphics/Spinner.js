import React from 'react';
import clsx from 'clsx';

import Sprite from './Sprite';

const Spinner = ({
  className,
  size="sm"
}) => (
  <Sprite
    className={clsx(
      className,
      'spin'
    )}
    use="spinner"
    size={size}
  />
)

export default Spinner
