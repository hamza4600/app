import React from 'react';

import ConfirmDialog from './ConfirmDialog';

const CancelDialog = ({
  action = 'Cancel',
  additional = 'Any updates will be lost.',
  cancelButton,
  continueButton,
  ...props
}) => (
  <ConfirmDialog
    body={<><p>Are you sure you want to {action.toLowerCase()}?</p>{additional ? <p>{additional}</p> : ''}</>}
    cancelButton={{
      label: 'Never Mind',
      ...cancelButton
    }}
    continueButton={{
      variant: 'danger',
      label: action,
      ...continueButton
    }}
    {...props}
  />
)

export default CancelDialog
