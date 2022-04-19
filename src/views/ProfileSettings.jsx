import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "hooks";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import FormControl from "@mui/material/FormControl";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { DarkMode, LightMode } from "@mui/icons-material";
import { MessageSnackbar } from "components";

export default function ProfileSettings() {
	const [alignment, setAlignment] = useState("dark");
	const { user } = useAuth0();
	const options = {
		tokenOptions: {
			audience: process.env.REACT_APP_AUTH0_MANAGEMENT_API,
			scope: "update:current_user_metadata",
		},
		fetchOptions: {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};

	const { error, data, sendRequest } = useApi(
		`${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`,
		options
	);

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const handleSubmit = (e) => {
		options.fetchOptions.body = JSON.stringify({
			user_metadata: { theme: alignment },
		});
		sendRequest();
	};

	if (error) {
	}
	if (data) {
	}

	return (
		<Box sx={{ maxWidth: 200, mx: "auto", my: "1rem" }}>
			<FormControl
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="button" align="center">
					Theme
				</Typography>
				<ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
				>
					<ToggleButton value="dark">
						<DarkMode />
						Dark
					</ToggleButton>
					<ToggleButton value="light">
						<LightMode />
						Light
					</ToggleButton>
				</ToggleButtonGroup>
				<MessageSnackbar handler={handleSubmit}>Save</MessageSnackbar>
			</FormControl>
		</Box>
	);
}
