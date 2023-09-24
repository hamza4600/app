import React, { forwardRef, useEffect } from 'react';

import { bugLog } from 'functions.js';

export const mountLog = Component => {
  const WrappedComponent = ({
    forwardedRef,
    ...props
  }) => {
    const { debug, name } = props;

    useEffect(
      () => {
        bugLog('mount', debug, name);
        return () => bugLog('unmount', debug, name);
      },
      [debug, name]
    )

    return <Component {...props} ref={forwardedRef} />;
  }

  return forwardRef((props, ref) => <WrappedComponent {...props} forwardedRef={ref} />);
}
