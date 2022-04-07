import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-3ibqx6yh.us.auth0.com"
      clientId="0nPzfXA9vHRCuAMRsgrUzbfNjqpMUhnP"
      redirectUri={window.location.origin}
      audience="https://dev-3ibqx6yh.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById("root")
);
