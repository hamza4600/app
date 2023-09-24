import React, { useMemo } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import keys from 'lodash/keys';

import { guardRoutes } from '../functions';

import StepRouter from './StepRouter';

const InterfaceRouter = ({ routes }) => {
  const guardedRoutes = guardRoutes(routes);

  // Flattens subpaths one level deep
  // TODO: Consider recursive approach to allow for several levels deep?
  const flattenedInterface = useMemo(() => 
    keys(guardedRoutes).reduce((arr, key) => {
      const { subpaths, ...interfaceProps } = guardedRoutes[key];
      if (subpaths) {
        const { path, id, name } = interfaceProps;
        keys(subpaths).forEach(k => arr.push({
          ...subpaths[k],
          path: `${path}/${subpaths[k].path}`,
          parentId: id,
          parentName: name
        }))
      }
      arr.push(interfaceProps);
      return arr;
    }, [])
  , [guardedRoutes]);

  return (
    <Switch>
      {/* <Route path={'/'} exact /> */}
      {flattenedInterface.map((interfaceConfig, i) => {
        const { component: Component = StepRouter, ...interfaceProps } = interfaceConfig;
        const { path } = interfaceProps;

        if (!path) return null;

        return (
          <Route
            key={i}
            path={`/${path}`}
            render={routeProps => (
              <Component
                routes={guardedRoutes}
                {...interfaceProps}
                {...routeProps}
              />
            )}
          />
        )
      })}
      <Redirect to={`/${guardedRoutes.dashboard.path}`} />
    </Switch>
  )
}

export default InterfaceRouter
