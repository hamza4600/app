import React from 'react';
import { isEmpty } from 'lodash';

import { modalFunctions } from 'functions.js';

import Button from 'button/Button';
import Form from 'form/Form';

const RecordFooter = ({
  title,
  action,
  formikBag,
  onBack,
  ...props
}) => (
  <Form.Footer>
    <Button.Back
      onClick={() => isEmpty(formikBag.touched) ? onBack() : modalFunctions.add({
        type: 'cancel',
        action: 'Go Back',
        continueButton: {
          onClick: onBack
        }
      })}
    />
    <Button.Save
      label={action.default}
    />
  </Form.Footer>
)

export default RecordFooter
