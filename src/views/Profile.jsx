import { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useApi from "../hooks/useApi";
import TabsHeader from "../components/TabsHeader";
import TabsPanel from "../components/TabsPanel";
import ProfileOverview from "./ProfileOverview";
import ProfileSettings from "./ProfileSettings";
import LoginButton from "../components/LoginButton";
import ProfileLoader from "../loaders/ProfileLoader";
import { Button, Container } from "@mui/material";

export default function Profile() {
	const { user, getAccessTokenWithPopup, loginWithRedirect } = useAuth0();
	const options = {
		audience: process.env.REACT_APP_AUTH0_MANAGEMENT_API,
		scope: "read:current_user",
	};
	const url = `${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`;
	const { error, loading, data, refresh } = useApi(url, options);

	const getTokenAndTryAgain = async () => {
		await getAccessTokenWithPopup(options);
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
		return <div>Oops {error.message}</div>;
	}
	return (
		<Container>
			<h1>{user.name}</h1>
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
	);
}
