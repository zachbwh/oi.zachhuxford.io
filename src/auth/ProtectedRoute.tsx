import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({...routeProps}) {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Route {...routeProps} /> : <Redirect to="/" />;
}

export default ProtectedRoute;
