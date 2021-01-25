import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      () => (props.loggedIn ? <Component {...props} /> : <Redirect to="/" />)
    }
  </Route>
);

export default ProtectedRoute;


{/* <Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/> */}