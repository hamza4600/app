import React, { useEffect, useState } from 'react';

import ConfirmDialog from './ConfirmDialog';

const INTERVAL = 1000;

const SessionDialog = ({
  body,
  cancelButton,
  continueButton,
  ...props
}) => {

  const timeRemaining = new Date(body).getTime() - new Date().getTime();

  const [ countdown, setCountdown ] = useState(timeRemaining);

  const incrementCountdown = () => setCountdown(countdown - INTERVAL);

  useEffect(
    () => {
      const interval = setInterval(incrementCountdown, INTERVAL);

      return () => clearInterval(interval);
    }
  )

  const minutesRemaining = new Date(countdown).getMinutes();
  const secondsRemaining = new Date(countdown).getSeconds();

  return <ConfirmDialog
    {...props}
    title="Do you want to continue your session?"
    body={`For security reasons your session will time out in ${minutesRemaining ? `${minutesRemaining}m ` : ''}${secondsRemaining}s unless you continue.`}
    closeButton={false}
    cancelButton={{
      ...cancelButton,
      label: 'Sign Out',
      icon: 'door-open'
    }}
    continueButton={{
      ...continueButton
    }}
  />
}

export default SessionDialog
