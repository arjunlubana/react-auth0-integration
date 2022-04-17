import { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "hooks";
import { ProfileLoader } from "loaders";
import { Container, Button } from "@mui/material";
import { DateTime } from "luxon";
import { LoginButton } from "components";
import { Auth0Icon, TwitterIcon, GoogleIcon } from "assets";

export default function ProfileOverview() {
	const { user, getAccessTokenWithPopup } = useAuth0();
	const options = useMemo(
		() => ({
			tokenOptions: {
				audience: process.env.REACT_APP_AUTH0_MANAGEMENT_API,
				scope: "read:current_user",
			},
			fetchOptions: {
				headers: {},
			}

		}),
		[]
	);

	const { error, loading, data, refresh } = useApi(
		`${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`,
		options
	);

	const getTokenAndTryAgain = async () => {
		await getAccessTokenWithPopup(options.tokenOptions);
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
