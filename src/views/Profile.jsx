import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Box, Avatar, Skeleton } from "@mui/material";
import useApi from "../hooks/useApi";

export default function Profile() {
  const opts = {
    audience: "https://dev-3ibqx6yh.us.auth0.com/api/v2/",
    scope: "read:current_user",
  };
  const { user, loginWithRedirect, getAccessTokenWithPopup } = useAuth0();

  const {
    loading,
    error,
    refresh,
    data: userMetadata,
  } = useApi(
    `https://dev-3ibqx6yh.us.auth0.com/api/v2/users/${user?.sub}`,
    opts
  );
  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "sm",
          mx: "auto",
        }}
      >
        <Skeleton variant="circular" sx={{ width: "128px", height: "128px" }} />
        <Typography variant="h2" sx={{ width: "100%" }}>
          <Skeleton />
        </Typography>
        <Typography variant="h5" sx={{ width: "100%" }}>
          <Skeleton />
        </Typography>
      </Box>
    );
  }
  if (error) {
    if (error.error === "login_required") {
      return (
        <button
          onClick={() =>
            loginWithRedirect(opts)
          }
        >
          Login
        </button>
      );
    }
    if (error.error === "consent_required") {
      return (
        <button onClick={getTokenAndTryAgain}>Consent to reading users</button>
      );
    }
    return <div>Oops {error.message}</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "sm",
        mx: "auto",
      }}
    >
      {JSON.stringify(userMetadata, null, 2)}
    </Box>
  );
}
