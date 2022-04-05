import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./Login";
import Avatar from "./Avatar";
import Logo from "./Logo";

export default function Navbar() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="nav-bar">
      <Logo />
      {
        isAuthenticated ? <Avatar />: <LoginButton />
      }
    </nav>
  );
}
