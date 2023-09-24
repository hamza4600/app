import React, { useCallback } from 'react';
import { generatePath } from 'react-router';

import RecordBody from './RecordBody';
import RecordFooter from './RecordFooter';
import Form from 'form/Form';

const RecordForm = ({
  children,
  path,
  title,
  endpoints,
  id,
  action,
  debugOnly,
  debug,
  record = {},
  history,
  formikBag,
  ...props
}) => {
  
  const { match: { params } } = props;

  const goBack = useCallback(
    () => history.push(`/${generatePath(path, params)}/list`),
    [history, path, params]
  )

  const initialValues = { ...record };
  delete initialValues[id];

  return (
    <Form
      method={record[id] ? 'PUT' : 'POST'}
      endpoint={endpoints.save(record[id])}
      onSuccess={goBack}
      loadingMessage={`${action.loading} ${title.single.toLowerCase()}`}
      successMessage={`${title.single} ${action.complete.toLowerCase()}.`}
      errorMessage={`Unable to ${action.default.toLowerCase()} ${title.single.toLowerCase()}.`}
      initialValues={initialValues}
      debugOnly={debugOnly}
      debug={debug}
    >
      <RecordBody {...props} record={record}>
        {children}
      </RecordBody>
      <RecordFooter title={title} action={action} onBack={goBack} />
    </Form>
  )
}

export default RecordForm
