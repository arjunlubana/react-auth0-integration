import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { SnackbarProvider } from "context/SnackbarContext";
import App from "App";

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_MANAGEMENT_API}
      scope="read:current_user update:current_user_metadata"
    >
      <BrowserRouter>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById("root")
);
