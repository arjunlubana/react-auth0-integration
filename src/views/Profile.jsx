import { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useApi from "../hooks/useApi";
import TabsHeader from "../components/TabsHeader";
import TabsPanel from "../components/TabsPanel";
import ProfileOverview from "./ProfileOverview";
import ProfileSettings from "./ProfileSettings";
import ProfileInfo from "../components/ProfileInfo"
import LoginButton from "../components/LoginButton";
import ProfileLoader from "../loaders/ProfileLoader";
import { Button, Container } from "@mui/material";

export default function Profile() {
	const { user, getAccessTokenWithPopup } = useAuth0();
	const options = {
		url: `${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`,
		audience: process.env.REACT_APP_AUTH0_MANAGEMENT_API,
		scope: "read:current_user",
	};
	const { error, loading, data, refresh } = useApi(options);

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
		return <div>Oops {error.name}</div>;
	}
	return (
		user && <Container>
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
	);
}
