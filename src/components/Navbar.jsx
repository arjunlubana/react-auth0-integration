import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import LoginButton from "./Login";
import UserMenu from "./UserMenu";

function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            REACT AUTH0
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            REACT AUTH0
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? <UserMenu /> : <LoginButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
