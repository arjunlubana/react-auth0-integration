import { useContext } from "react";
import { ProfileLoader } from "loaders";
import { Container } from "@mui/material";
import { DateTime } from "luxon";

import { UserContext } from "context/UserContext";
import { LoginButton } from "components";
import { Auth0Icon, TwitterIcon, GoogleIcon } from "assets";

export default function ProfileOverview() {
	const { error, loading, data } = useContext(UserContext);

	if (loading) {
		return <ProfileLoader />;
	}
	if (error) {
		if (error.error === "login_required") {
			return <LoginButton />;
		}
		return <div>Oops {error.name}</div>;
	}

	return (
		data && (
			<Container sx={{ textAlign: "center" }}>
				<p>
					Joined on{" "}
					{DateTime.fromISO(data.created_at).toLocaleString(
						DateTime.DATETIME_FULL
					)}
				</p>
				<p>Connected Account</p>
				{data.identities.map((identity) => (
					<img
						src={
							identity.provider === "google-oauth2"
								? GoogleIcon
								: identity.provider === "twitter"
								? TwitterIcon
								: identity.provider === "auth0"
								? Auth0Icon
								: ""
						}
						alt={identity.provider}
						key={identity.user_id}
					/>
				))}
			</Container>
		)
	);
}
