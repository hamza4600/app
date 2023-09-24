import React, { useEffect } from 'react';

import { SITE_TITLE } from 'globals.js';

const Title = ({
  as: Component = 'h1',
  children,
  title,
  className = ''
}) => {

  const pageTitle = typeof title === 'string' ? title : title.page || title.plural || title.single;

  useEffect(
    () => {
      document.title = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
      return () => document.title = SITE_TITLE
    },
    [pageTitle]
  )

  return children || pageTitle ? <Component className={className}>{children || pageTitle}</Component> : null;
}

export default Title
