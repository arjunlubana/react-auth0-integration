import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@mui/material";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Link
      variant="button"
      underline="none"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Link>
  );
}
