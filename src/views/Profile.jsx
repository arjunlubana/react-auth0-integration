import { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "@mui/material";
import { useApi } from "hooks";
import { ProfileOverview, ProfileSettings } from "views";
import { ProfileLoader } from "loaders";
import { TabsHeader, TabsPanel, ProfileInfo, LoginButton } from "components";

export default function Profile() {
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
		user && (
			<Container>
				<ProfileInfo name={user.name} image={user.picture} />
				<TabsHeader>
					{(value) => (
						<Fragment>
							<TabsPanel value={value} index={0}>
								<ProfileOverview userData={data} />
							</TabsPanel>
							<TabsPanel value={value} index={1}>
								<ProfileSettings userData={data} />
							</TabsPanel>
						</Fragment>
					)}
				</TabsHeader>
			</Container>
		)
	);
}
