import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout"

export default function Avatar() {
    const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <LogoutButton />
      </div>
    )
  );
}
