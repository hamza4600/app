import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { alertFunctions } from 'functions.js';

import Alert from 'alert/Alert';

const AlertRouter = ({
  alerts,
  limit,
  location
}) => {

  useEffect(
    () => { // When component mounts,
      window.addEventListener('beforeunload', alertFunctions.clear) // listen for window reload and clear the alert router

      return () => { // When the comopnent unmounts,
        alertFunctions.clear(); // clear the alert router
        window.removeEventListener('beforeunload', alertFunctions.clear) // Clear event listener
      }
    },
    []
  )

  useEffect(
    () => { // When navigating,
      alertFunctions.clear(location.state ? location.state.alerts : undefined); // clear the alert router and/or update it from location state
    },
    [location.state]
  )

  if (limit && alerts.length > limit) alerts.splice(limit, alerts.length); // Limit the number of alerts that can be displayed

  return alerts.length > 0 ? (
    <div className="mb-3">
      {alerts.map((alert, i) => (
        <Alert
          { ...alert}
          key={i}
          className="mb-2"
        />
      ))}
    </div>
  ) : null;
}

export default compose(
  withRouter,
  connect(
    ({ alerts }) => ({ alerts })
  )
)(AlertRouter)
