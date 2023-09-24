import React from 'react';

import Format from './Format';

import { mergeClassName } from 'functions.js';

const AgeFormat = ({
  children,
  className = '',
  ...props
}) => {

  const minutes = parseFloat(children);

  if (isNaN(minutes)) return '';

  let age, variant;

  if (minutes < 1)
    age = 'Now';
  else if (minutes < 60)
    age = `${minutes}min`;
  else if (minutes < 24 * 60)
    age = `${Math.trunc(minutes/60)}hrs ${minutes%60}min`;
  else
    age = `${Math.trunc(minutes/(24 * 60))}d ${Math.trunc((minutes%(24 * 60))/60)}hrs`;

  if (minutes < 30)
    variant = 'success';
  else if (minutes < 60)
    variant = 'warning';
  else
    variant = 'danger';

  return <Format className={mergeClassName(className, `text-${variant}`)} {...props}>{age}</Format>;
}

export default AgeFormat
