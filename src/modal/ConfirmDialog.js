import React from 'react';

import DialogModal from './DialogModal';
import Button from 'button/Button';

const ConfirmDialog = ({
  cancelButton,
  continueButton,
  ...props
}) => (
  <DialogModal
    {...props}
    buttons={[
      cancelButton !== false ? <Button.Cancel {...cancelButton} /> : null,
      <Button.Continue {...continueButton} />
    ]}
  />
)

export default ConfirmDialog
