import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProtectedRoute({...routeProps}) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <FontAwesomeIcon icon={faSpinner}/>
  }

  return isAuthenticated ? <Route {...routeProps} /> : <Redirect to="/" />;
}

export default ProtectedRoute;
