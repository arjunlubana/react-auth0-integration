import { useState, useContext } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { LogoutButton, ProfileButton, LoginButton } from "components";
import { UserContext } from "context/UserContext";

export default function UserMenu() {
  const { data } = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return data ? (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={data.name} src={data.picture} />
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
    </>
  ) : (
    <LoginButton />
  );
}
