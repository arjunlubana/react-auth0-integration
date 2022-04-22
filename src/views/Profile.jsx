import { useContext } from "react";
import { Container } from "@mui/material";

import { UserContext } from "context/UserContext";
import { ProfileOverview, ProfileSettings } from "views";
import { TabsHeader, TabsPanel, ProfileInfo } from "components";
import { ProfileLoader } from "loaders";

export default function Profile() {
	const { loading, data } = useContext(UserContext);

	if (loading) {
		return <ProfileLoader />;
	}

	return (
		<Container>
			<ProfileInfo name={data.name} image={data.picture} />
			<TabsHeader>
				{(value) => (
					<>
						<TabsPanel value={value} index={0}>
							<ProfileOverview />
						</TabsPanel>
						<TabsPanel value={value} index={1}>
							<ProfileSettings />
						</TabsPanel>
					</>
				)}
			</TabsHeader>
		</Container>
	);
}
