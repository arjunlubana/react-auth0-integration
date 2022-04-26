import { lazy, Suspense } from "react";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  Skeleton,
  Avatar,
} from "@mui/material";
import { CustomLink } from "components";

const UserMenu = lazy(() => import("components/UserMenu"));

function Navbar() {
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
            <Suspense
              fallback={
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              }
            >
              <UserMenu />
            </Suspense>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
