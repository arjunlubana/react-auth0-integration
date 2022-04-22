import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
	Button,
	Box,
	ToggleButton,
	FormControl,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import { UserContext } from "context/UserContext";
import { useAuthApi, useSnackbar } from "hooks";

export default function ProfileSettings() {
	const { error, data } = useContext(UserContext);
	const [alignment, setAlignment] = useState(
		data.user_metadata.theme === undefined
			? "light"
			: data.user_metadata.theme
	);

	const fetchOptions = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const { addAlert } = useSnackbar();
	const { user } = useAuth0();
	const { sendRequest } = useAuthApi();

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const handleSubmit = async (e) => {
		fetchOptions.body = JSON.stringify({
			user_metadata: { theme: alignment },
		});
		await sendRequest(
			`${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`,
			fetchOptions
		).then(() => {
			console.log(data)
		})

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
