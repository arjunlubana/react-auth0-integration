import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "hooks";
import { ProfileLoader } from "loaders";
import { Container, Button, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { LoginButton } from "components";
import { Auth0Icon, TwitterIcon, GoogleIcon } from "assets";

export default function ProfileOverview() {
	const { user, getAccessTokenWithPopup } = useAuth0();
	const tokenOptions = {
		audience: process.env.REACT_APP_AUTH0_MANAGEMENT_API,
		scope: "read:current_user",
	};

	const fetchOptions = {
		headers: {},
	};
	const { error, loading, data, refresh } = useApi(
		`${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`,
		tokenOptions,
		fetchOptions
	);

	const getTokenAndTryAgain = async () => {
		await getAccessTokenWithPopup(tokenOptions);
		refresh();
	};

	if (loading) {
		return <ProfileLoader />;
	}
	if (error) {
		if (error.error === "login_required") {
			return <LoginButton />;
		}
		if (error.error === "consent_required") {
			return (
				<Button onClick={getTokenAndTryAgain}>
					Consent to reading user info
				</Button>
			);
		}
		return <div>Oops {error.name}</div>;
	}

	return (
		data && (
			<Container sx={{ textAlign: "center" }}>
				<p>
					Joined in
					{DateTime.fromISO(data.created_at).toLocaleString(
						DateTime.DATETIME_FULL
					)}
				</p>
				<p>Connected Account</p>
				{data.identities.map((identity) => {
					if (identity.provider === "google-oauth2") {
						return <img src={GoogleIcon} alt="google" />;
					} else if (identity.provider === "twitter") {
						return <img src={TwitterIcon} alt="twitter" />;
					} else if (identity.provider === "auth0") {
						return <img src={Auth0Icon} alt="auth0" />;
					}
				})}
			</Container>
		)
	);
}
