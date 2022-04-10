import { Fragment, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";

export default function UserMenu() {
  const { user } = useAuth0();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Fragment>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={user.name} src={user.picture} />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <ProfileButton />
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <LogoutButton />
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
