import React from 'react';
import { snakeCase } from 'lodash';

import { apiFetch } from 'functions.js';

import ConfirmDialog from './ConfirmDialog';

const DeleteDialog = ({
  additionalWarning = 'All information will be permanently deleted.',
  continueButton,
  record,
  path,
  title,
  endpoints,
  id,
  name,
  history,
  location,
  ...props
}) => {

  const handleClick = () => {
    const args = {
      method: 'DELETE',
      endpoint: endpoints.delete(record[id]),
      onSuccess: history.push(`/${path}/list?${snakeCase(title.single.toLowerCase())}_deleted=${record[id]}`),
      loadingMessage: `Deleting ${title.single.toLowerCase()}`,
      successMessage: `${title.single.toLowerCase()} Deleted.`,
      errorMessage: `Unable to delete ${title.single.toLowerCase()}.`
    }

    apiFetch(args);
  }

  return <ConfirmDialog
    body={<><p>Are you sure you want to delete {record[name]}?</p>{additionalWarning ? <p>{additionalWarning}</p> : ''}</>}
    continueButton={{
      variant: 'danger',
      label: `Delete ${title.single}`,
      icon: 'trash-alt',
      onClick: handleClick,
      ...continueButton
    }}
    {...props}
  />
}

export default DeleteDialog
