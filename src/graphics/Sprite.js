import React from 'react';
import clsx from 'clsx';
import uniqueId from 'lodash/uniqueId'

import styles from 'css/stylesheet.scss';
import sprite from 'img/sprite.svg';

const Sprite = ({
  use,
  id = uniqueId(`${use}-`),
  className,
  size = 'md',
  height = styles[`sprite-size${size ? `-${size}` : ''}`],
  width = styles[`sprite-size${size ? `-${size}` : ''}`],
  href = sprite,
  gradient,
  fill,
  stroke,
  useStroke,
  useFill = !gradient && !stroke && !useStroke,
}) => use ? (
  <svg
    id={id}
    className={clsx(
      'sprite',
      `size-${size}`,
      className
    )}
    height={height}
    width={width}
    viewBox={`0 0 ${width} ${height}`}
  >
    {(styles[fill] || useFill) &&
      <use className="fill" href={`${href}#${use}`} style={{ fill: styles[fill] }} />
    }
    {(styles[stroke] || useStroke) &&
      <use href={`${href}#${use}`} className="stroke" style={{ stroke: styles[stroke] }} />
    }
    {(styles[`${gradient}-stop-1`] && styles[`${gradient}-stop-2`]) &&
      <>
        <defs>
          <linearGradient id={`${id}-gradient`} x2="0" y2="100%" gradientUnits="userSpaceOnUse">
            <stop stopColor={styles[`${gradient}-stop-1`]}/>
            <stop offset="1" stopColor={styles[`${gradient}-stop-2`]}/>
          </linearGradient>
        </defs>
        <use className="gradient" href={`${href}#${use}`} style={{ fill: `url(#${id}-gradient)` }} />
      </>
    }
  </svg>
) : null;

export default Sprite
