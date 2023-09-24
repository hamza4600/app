import React, { Fragment, useCallback, useState } from 'react';
import { Button, Collapse as BootstrapCollapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { mergeClassName } from 'functions.js';

const Collapse = ({
  children,
  Wrapper = Fragment,
  wrapperProps,
  id,
  className,
  label,
  onEntered,
  onExited
}) => {

  const [ open, setOpen ] = useState(false);

  const handleToggle = useCallback(
    (toggle = !open) => setOpen(toggle),
    [open, setOpen]
  )

  return children ? (
    <div id={id} className={mergeClassName('collapse-container', className)} data-show={open}>
      <Wrapper {...wrapperProps}>
        {label &&
          <Button
            variant="link"
            className={mergeClassName('btn d-flex align-items-center h-100 w-100 py-2 px-0 bg-transparent border-0 text-dark', open ? 'active' : undefined)}
            onClick={() => handleToggle()}
            aria-controls={`${id}-collapse`}
            aria-expanded={open}
          >
            <span className="d-flex flex-grow-1">{label}</span>
            <FontAwesomeIcon icon={`chevron-${open ? 'up' : 'down'}`} className="ml-2" />
          </Button>
        }
        <BootstrapCollapse
          in={open}
          onEntered={onEntered}
          onExited={onExited}
        >
          <div id={`${id}-collapse`} className="pb-2">
            {children}
          </div>
        </BootstrapCollapse>
      </Wrapper>
    </div>
  ) : null;
}
export default Collapse
