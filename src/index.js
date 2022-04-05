import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3ibqx6yh.us.auth0.com"
      clientId="0nPzfXA9vHRCuAMRsgrUzbfNjqpMUhnP"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
