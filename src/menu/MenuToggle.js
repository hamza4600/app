import React, { useCallback } from 'react';

import Menu from './Menu';

const MenuToggle = props => {

  const handleOpen = useCallback(
    () => document.body.classList.add('menu-open'),
    []
  )

  const handleClose = useCallback(
    () => document.body.classList.remove('menu-open'),
    []
  )

  return (
    <div id="menu-toggle" className="ml-2 ml-lg-0">
      <Menu
        {...props}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </div>
  )
}

export default MenuToggle
