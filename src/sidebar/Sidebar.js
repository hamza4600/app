import React, { useCallback, useEffect, useRef, useState } from 'react';

import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import { BREAKPOINTS } from 'globals.js';
import { doCallback } from 'functions.js';

import Button from 'button/Button';

import styles from './sidebar.module.scss';

const Sidebar = ({
  children: Child,
  id,
  buttonProps,
  onOpen,
  onClose,
  max = 'xl',
  min = 'xs',
  menuRef,
  ...props
}) => {

  const sidebar = useRef(); // The sidebar div. Used by handleClick, below.

  const [show, toggle] = useState(false); // The toggle state of the sidebar.

  // Open sidebar and run onOpen callback.
  const handleOpen = useCallback(
    () => {
      toggle(true);
      doCallback(onOpen);
    },
    [onOpen, toggle]
  );

  // Close sidebar and run onClose callback.
  const handleClose = useCallback(
    () => {
      toggle(false);
      doCallback(onClose);
    },
    [onClose, toggle]
  );

  // Close sidebar on navigation.
  useEffect(
    handleClose,
    [props.location.pathname, handleClose]
  )

  // Close sidebar on unmount.
  useEffect(
    () => handleClose,
    [handleClose]
  )

  // Check if click is outside sidebar. If so, close sidebar.
  const handleClick = useCallback(
    e => sidebar.current && !sidebar.current.contains(e.target) ? handleClose() : null,
    [sidebar, handleClose]
  );

  // Check if window resize exceeds sidebar parameters. If so, close sidebar.
  const handleResize = useCallback(
    () => window.innerWidth > BREAKPOINTS[max] || window.innerWidth < BREAKPOINTS[min] ? handleClose() : null,
    [max, min, handleClose]
  )

  useEffect(
    () => {

      // Listen for click and resize when sidebar is open.
      if (show) {
        window.addEventListener('click', handleClick);
        window.addEventListener('resize', handleResize);
      } else {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
      }

      // Remove listeners when sidebar unmounts.
      return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
      }
    },
    [show, handleClick, handleResize]
  )

  // Use portal to render navigation in Header
  return (
    <>
      <Button {...buttonProps} onClick={handleOpen} />
      {ReactDOM.createPortal(
        <div
          id={id}
          className={styles.sidebar}
          ref={sidebar}
          data-show={show}
        >
          <Child toggleClose={handleClose} {...props} />
        </div>,
        menuRef.current
      )}
    </>
  )
}

export default withRouter(Sidebar)
