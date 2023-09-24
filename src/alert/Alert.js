import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { values } from 'lodash';

import { mergeClassName } from 'functions.js';

const AlertBody = ({ message }) => {
  switch(typeof message) {
    case 'string':
      return <>{message}</>;
    case 'object':
      return (
        <ul>
          {values(message).map((messageItem, i) => (
            <li key={i}>{messageItem}</li>
          ))}
        </ul>
      )
    default:
      return null;
  }
}

const AlertComponent = ({
  variant = 'secondary',
  message,
  className,
  onClose,
}) => message ? (
  <BootstrapAlert
    variant={variant}
    className={mergeClassName(className, 'd-flex align-items-center justify-content-center')}
    onClose={onClose}
  >{message}</BootstrapAlert>
) : null;

export const MESSAGES = {
  error:   (message = 'ERROR') => <><FontAwesomeIcon icon="exclamation-triangle" className="mr-text" />{message}</>,
  loading: (message = 'Loading') => <><FontAwesomeIcon icon="spinner" spin className="mr-text text-primary" />{message}</>
}

export const ALERTS = {
  message: AlertComponent,
  error:   ({ message, ...props }) => <AlertComponent {...props} variant="danger" message={MESSAGES.error(message)} />,
  loading: ({ message, ...props }) => <AlertComponent {...props} className="loading" message={MESSAGES.loading(message)} />
}

const Alert = ({
  type = 'message',
  message,
  ...props
}) => {

  const Component = ALERTS[type] || ALERTS.message;

  const body = <AlertBody message={message} />;

  return <Component {...props} message={body} />;
}

export default Alert
