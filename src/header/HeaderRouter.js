import React from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './Header';

const HeaderRouter = ({ menuRef, routes }) => (
  <Switch>
    {Object.keys(routes).map((key, i) => {

      const { path, exact, title } = routes[key];

      return path !== undefined && title ? (
        <Route
          key={i}
          path={`/${path}`}
          exact={exact}
          render={() => <Header menuRef={menuRef} title={title} />}
        />
      ) : null;
    })}
  </Switch>
)

export default HeaderRouter
