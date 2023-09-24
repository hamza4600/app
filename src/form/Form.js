import { compose } from 'redux';

import FormArea from './FormArea';
import FormBody from './FormBody';
import FormControl from './FormControl';
import FormCol from './FormCol';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';
import FormText from './FormText';
import FormWrapper from './FormWrapper';
import Checklist from './checklist/Checklist';
import YesNo from './checklist/YesNo';
import OnOffSwitch from './checklist/OnOffSwitch';
import Hidden from './hidden/Hidden';
import Select from './select/Select';

import { formFetch } from './helpers/formFetch';
import { formGroup } from './helpers/formGroup';
import { initializeValue } from './helpers/initializeValue';
//import { initializeValues } from './helpers/initializeValues';
import { inputGroup } from './helpers/inputGroup';
import { lookupOptions } from './helpers/lookupOptions';
import { validationSchema } from './helpers/validationSchema';
import { withClearButton } from './helpers/withClearButton';
import { withCleave } from './helpers/withCleave';
import { withConfirmation } from './helpers/withConfirmation';
import { withError } from './helpers/withError';
import { withFeedback } from './helpers/withFeedback';
import { withField } from './helpers/withField';
import { withFieldArray } from './helpers/withFieldArray';
import { withFormik } from './helpers/withFormik';
import { withInfoIcon } from './helpers/withInfoIcon';
import { mountLog } from 'helpers/mountLog';

const Form = compose(
//  initializeValues,
  formFetch,
  withFormik,
  withError
)(FormWrapper)

Form.Header = FormHeader;
Form.Body   = FormBody;
Form.Footer = FormFooter;
Form.Text   = FormText;
Form.Area = FormArea;
Form.Col = FormCol;

Form.Control = compose(
  withConfirmation,
  mountLog,
  validationSchema,
  withInfoIcon,
  formGroup,
  withField,
  withCleave,
  initializeValue,
  withFeedback,
  withClearButton,
  inputGroup,
)(FormControl)

Form.Checklist = compose(
  mountLog,
  lookupOptions,
  validationSchema,
  formGroup,
  withField,
  initializeValue,
  withFieldArray,
  withFeedback,
  inputGroup
)(Checklist)

Form.YesNo = YesNo;

Form.Hidden = compose(
  mountLog,
  withField,
  initializeValue
)(Hidden)

Form.Select = compose(
  mountLog,
  lookupOptions,
  validationSchema,
  formGroup,
  withField,
  initializeValue,
  withFeedback
)(Select)

Form.OnOffSwitch = compose(
  mountLog,
  validationSchema,
  formGroup,
  withField,
  initializeValue,
  withFeedback,
  inputGroup
)(OnOffSwitch)

export default Form;
