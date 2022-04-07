import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Box, Avatar, Skeleton } from "@mui/material";

export default function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-3ibqx6yh.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user_metadata = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
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

  return (
    isAuthenticated && (
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
        <Avatar
          src={user.picture}
          alt={user.name}
          sx={{ width: "128px", height: "128px" }}
        />
        <Typography variant="h3">{user.name}</Typography>
        <Typography variant="h5">{user.email}</Typography>
        <Typography variant="h3">User Metadata</Typography>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </Box>
    )
  );
}
