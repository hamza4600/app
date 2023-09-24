import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import { STEPS_ADMIN, STEPS_USER } from 'directories.js';

import { isAdmin } from 'functions.js';

const StepRouter = ({
  form: Form,
  routes,
  ...props
}) => {
  const STEPS = isAdmin() ? STEPS_ADMIN : STEPS_USER;

  const { path, endpoints } = props;

  const [steps, setSteps] = useState();

  const assignSteps = useCallback(
    () => {

      const steps = [];
      if (endpoints.list) steps.push('list');
      if (endpoints.save) steps.push('add');
      if (endpoints.save) steps.push('edit');
      if (endpoints.sort) steps.push('sort');
      else if (endpoints.get) steps.push('view');

      setSteps(steps);
    },
    [endpoints, setSteps]
  )

  useEffect(
    assignSteps,
    [assignSteps]
  )

  return steps !== undefined ? (
    <Switch>
      {steps.map((step, i) => {

        const { component: Component, params, paramOptions, ...stepProps } = STEPS[step];

        return (
          <Route
            key={i}
            path={paramOptions ? [`/${path}/${step}`, `/${path}/${step}/${paramOptions}`] : params ? `/${path}/${step}/${params}` : `/${path}/${step}`}
            exact
            render={routeProps => (
              <Component
                {...props}
                {...stepProps}
                {...routeProps}
                step={step}
              >
                {Form &&
                  <Form />
                }
              </Component>
            )}
          />
        )
      })}
      <Redirect to={steps.length ? `/${path}/${steps[0]}` : `/${routes.dashboard.path}`} />
    </Switch>
  ) : null;
}

export default StepRouter
