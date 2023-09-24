import { useState, useMemo, useCallback, useLayoutEffect } from 'react';

import debounce from 'lodash/debounce';
import first from 'lodash/first';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';

import styles from 'css/stylesheet.scss';

const BREAKPOINTS = {
  xs: 0,
  sm: parseInt(styles['sm'], 10),
  md: parseInt(styles['md'], 10),
  lg: parseInt(styles['lg'], 10),
  xl: parseInt(styles['xl'], 10)
};

export default function useMobile(options) {
    let throttle = 100;

    if (isObject(options)) {
      throttle = !isNil(options.throttle) ? options.throttle : throttle;
    }
    
    const breakpoints = useMemo(() => {
      const mapped = values(BREAKPOINTS).map((width, i) => ({ 
        breakpoint: keys(BREAKPOINTS)[i],
        width
      }));
      return orderBy(mapped, 'width', 'desc');
    }, []);

    const checkBreakpoint = useCallback(() => {
      const match = breakpoints.find(b => window.innerWidth > b.width );
      setBreakpoint(get(match, 'breakpoint') || get(first(breakpoints), 'breakpoint'));
    }, [breakpoints]);

    const [breakpoint, setBreakpoint] = useState();

    useLayoutEffect(
      () => {
        if (breakpoint === undefined) checkBreakpoint();

        const handleWindowResize = !throttle ? checkBreakpoint : debounce(() => checkBreakpoint(), throttle)
        
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
      },
      [breakpoint, checkBreakpoint, options, throttle]
    )

    return breakpoint;
}
