import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      () => (props.loggedIn ? <Component {...props} /> : props.onRedirect())
    }
  </Route>
);

export default ProtectedRoute;
