import { useState, useContext } from "react";
import {
  Button,
  Box,
  ToggleButton,
  FormControl,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { UserContext } from "context/UserContext";
import { useAuthApi } from "hooks";

export default function ProfileSettings() {
  const theme = useTheme();
  const { dispatch } = useContext(UserContext);
  const [alignment, setAlignment] = useState(theme.palette.mode);

  const fetchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { sendRequest } = useAuthApi();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = () => {
    fetchOptions.body = JSON.stringify({
      user_metadata: { theme: alignment },
    });
    sendRequest(fetchOptions).then((data) => {
      dispatch({ type: "setUserData", payload: data });
    });
  };

  return (
    <Box sx={{ maxWidth: 200, mx: "auto", my: "1rem" }}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="button" align="center">
          Theme
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="dark">
            <DarkMode />
            Dark
          </ToggleButton>
          <ToggleButton value="light">
            <LightMode />
            Light
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="outlined" onClick={handleSubmit} sx={{ m: "1rem" }}>
          Save
        </Button>
      </FormControl>
    </Box>
  );
}
