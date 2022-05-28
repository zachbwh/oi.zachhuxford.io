import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "redux/Store";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
    >
      <Provider store={store}>
        <Auth0Provider
          domain="dev-i0lklall.us.auth0.com"
          clientId="clZ619XfPIk8ELgUXk7ZzM1EblfrseZn"
          redirectUri="window.location.origin"
        >
          <App />
        </Auth0Provider>
      </Provider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
