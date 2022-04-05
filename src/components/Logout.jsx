import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function LogoutButton({ closeUserMenu }) {
  const { logout } = useAuth0();

  return (
    <MenuItem
      key="logout"
      onClick={() => {
        closeUserMenu();
        logout({ returnTo: window.location.origin });
      }}
    >
      <Typography textAlign="center">Log Out</Typography>
    </MenuItem>
  );
}
