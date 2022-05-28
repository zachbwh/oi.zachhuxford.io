import React from "react";

import "./SalesPage.scss";
import { useAuth0 } from "@auth0/auth0-react";

function SalesPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="sales-page">
      <h3>
        <button
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Login
        </button>
      </h3>
    </div>
  );
}

export default SalesPage;
