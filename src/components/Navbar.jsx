import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Container, Box, Toolbar, Typography } from "@mui/material";
import { CustomLink, LoginButton, UserMenu } from "components";

function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex" } }}
          >
            <CustomLink to="/" color="white" underline="none">
              REACT AUTH0
            </CustomLink>
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? <UserMenu /> : <LoginButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
