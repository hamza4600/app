import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { modalFunctions } from 'functions.js';

import Modal from './Modal';

const ModalRouter = props => {

  useEffect(
    () => {
      window.addEventListener('beforeunload', modalFunctions.clear)

      return () => {
        modalFunctions.clear();
        window.removeEventListener('beforeunload', modalFunctions.clear)
      }
    },
    []
  ) // When the component unmounts or the window closes, clear the modal queue

  return props.type || props.variant ? (
    <Modal
      {...props}
      onExited={modalFunctions.increment} // When the modal closes, increment the modal queue
    />
  ) : null;
}

export default connect(
  ({ modals: [ modal = {} ] }) => ({ ...modal }) // Return the props of the first modal in the queue
)(ModalRouter)
