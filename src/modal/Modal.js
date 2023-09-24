import React from 'react';

import AlertModal from './AlertModal';
import DialogModal from './DialogModal';

import CancelDialog from './CancelDialog';
import ConfirmDialog from './ConfirmDialog';
import DeleteDialog from './DeleteDialog';
import SessionDialog from './SessionDialog';

const MODALS = {
  alert:   AlertModal,
  error:   props => <AlertModal {...props} type="error" />,
  loading: props => <AlertModal {...props} type="loading" dismissible={'false'} duration={false} />,
  dialog:  DialogModal,
  cancel: CancelDialog,
  confirm: ConfirmDialog,
  delete: DeleteDialog,
  session: SessionDialog
};

const Modal = ({
  type,
  ...props
}) => {

  const Component = MODALS[type] || MODALS.alert;

  return Component ? <Component {...props} /> : null;
}

export default Modal;
