import { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "@mui/material";
import { ProfileOverview, ProfileSettings } from "views";
import { TabsHeader, TabsPanel, ProfileInfo } from "components";
import { ProfileLoader } from "loaders";

export default function Profile() {
	const { user, isLoading } = useAuth0();

	if (isLoading) {
		return <ProfileLoader />;
	}

	return (
		<Container>
			<ProfileInfo name={user.name} image={user.picture} />
			<TabsHeader>
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
			</TabsHeader>
		</Container>
	);
}
