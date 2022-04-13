import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useApi from "../hooks/useApi";
import BasicTabs from "../components/Tabs";
import TabsPanel from "../components/TabsPanel";
import ProfileOverview from "./ProfileOverview";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
	const { user, getAccessTokenWithPopup, loginWithRedirect } = useAuth0();

	const domain = process.env.REACT_APP_AUTH0_DOMAIN;
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
		return (
			<div>Loading ...</div>
			// <Box
			// 	sx={{
			// 		display: "flex",
			// 		flexDirection: "column",
			// 		justifyContent: "center",
			// 		alignItems: "center",
			// 		maxWidth: "sm",
			// 		mx: "auto",
			// 	}}
			// >
			// 	<Skeleton
			// 		variant="circular"
			// 		sx={{ width: "128px", height: "128px" }}
			// 	/>
			// 	<Typography variant="h2" sx={{ width: "100%" }}>
			// 		<Skeleton />
			// 	</Typography>
			// 	<Typography variant="h5" sx={{ width: "100%" }}>
			// 		<Skeleton />
			// 	</Typography>
			// </Box>
		);
	}
	if (error) {
		if (error.error === "login_required") {
			return (
				<button onClick={() => loginWithRedirect(options)}>
					Login
				</button>
			);
		}
		if (error.error === "consent_required") {
			return (
				<button onClick={getTokenAndTryAgain}>
					Consent to reading users
				</button>
			);
		}
		return <div>Oops {error.message}</div>;
	}
	return (
		<div>
			<h1>{user.name}</h1>
			<BasicTabs>
				{(value) => (
					<Fragment>
						<TabsPanel value={value} index={0}>
							<ProfileOverview />
						</TabsPanel>
						<TabsPanel value={value} index={1}>
							<ProfileSettings />
						</TabsPanel>
					</Fragment>
				)}
			</BasicTabs>
		</div>
	);
}
