import React, { useCallback, useEffect, useRef, useState } from 'react';

import { mergeClassName } from 'functions.js';
import { TIMES } from 'globals.js';

const Scrollbox = ({
  children,
  outerClassName,
  innerClassName,
  reset
}) => {

  const [ scroll, updateState ] = useState(0);

  const scrollRef = useRef(0)
  const scrollboxOuter = useRef(); // Outer window div.
  const scrollboxInner = useRef(); // Inner content div.

  // Get the range based on the relative sizes of the inner and outer elements.
  const getRange = useCallback(
    () => scrollboxOuter.current && scrollboxInner.current ? Math.min(scrollboxOuter.current.offsetHeight - scrollboxInner.current.offsetHeight, 0) : 0,
    []
  )

  // Calculate scroll
  const updateScroll = useCallback(
    (delta = 0) => {
      scrollRef.current = Math.min(0, Math.max(scrollRef.current - delta, getRange()));
      updateState(scrollRef.current);
    },
    [updateState, scrollRef, getRange]
  )

  // Scroll on mousewheel.
  const handleWheel = useCallback(
    e => {
      if (!e.deltaY) return; // If there is no y movement, return.
      e.preventDefault();
      updateScroll(e.deltaY)
    },
    [updateScroll]
  )

  useEffect(
    () => {
      if (!scrollboxInner.current) return;
      const scrollboxTarget = scrollboxInner.current;
      scrollboxTarget.addEventListener('wheel', handleWheel, {passive: false}); // Add mousewheel listiner, on mount.
      return () => scrollboxTarget.removeEventListener('wheel', handleWheel, {passive: false}); // Remove mousewheel listener, on unmount.
    },
    [handleWheel]
  )

  const handleResize = useCallback(
    () => updateScroll(),
    [updateScroll]
  )

  useEffect(
    () => {
      window.addEventListener('resize', handleResize); // Add listener to reset range on window resize.
      return () => window.removeEventListener('resize', handleResize); // Remove listener, on unmount.
    },
    [handleResize]
  )

  useEffect(
    () => {
      if (reset) setTimeout(updateScroll, TIMES.transitionDuration); // If reset, re-initialize scroll.
    },
    [reset, updateScroll]
  )

  return (
    <div
      className={mergeClassName('scrollbox-outer w-100', outerClassName)}
      ref={scrollboxOuter}
    >
      <div
        className={mergeClassName('scrollbox-inner', innerClassName)}
        ref={scrollboxInner}
        style={{
          top: isNaN(scroll) ? 0 : scroll
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Scrollbox;
