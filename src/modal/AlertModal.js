import React, { useCallback, useEffect, useRef } from 'react';

import { TIMES } from 'globals.js';

import { modalLightbox } from './helpers/modalLightbox';
import Alert from 'alert/Alert';

const AlertModal = ({
  duration = TIMES.modalDuration,
  onClose,
  ...props
}) => {

  let timeout = useRef();

  const setModalTimer = () => duration ? timeout.current = setTimeout(onClose, duration * 1000) : null;

  const clearModalTimer = () => duration ? clearTimeout(timeout.current) : null;

  const setCallback = useCallback(setModalTimer);

  const clearCallback = useCallback(clearModalTimer);

  useEffect(
    () => {
      setCallback()

      return clearCallback;
    },
    [setCallback, clearCallback]
  )

  return (
    <div className="modal-dialog modal-dialog-centered justify-content-center my-0">
      <Alert {...props} />
    </div>
  )
}

export default modalLightbox(AlertModal)
