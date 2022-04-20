import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthApi, useSnackbar } from "hooks";
import {
	Button,
	Box,
	ToggleButton,
	FormControl,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function ProfileSettings() {
	const [alignment, setAlignment] = useState("dark");
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

	const { addAlert } = useSnackbar();
	const { user } = useAuth0();
	const { sendRequest } = useAuthApi();

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const handleSubmit = async (e) => {
		options.fetchOptions.body = JSON.stringify({
			user_metadata: { theme: alignment },
		});
		const { error, data } = await sendRequest(
			`${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`,
			options
		);

		if (data) {
			addAlert("Theme Saved");
		}
		if (error) {
			addAlert("Error occured");
		}
	};

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
				<Button
					variant="outlined"
					onClick={handleSubmit}
					sx={{ m: "1rem" }}
				>
					Save
				</Button>
			</FormControl>
		</Box>
	);
}
