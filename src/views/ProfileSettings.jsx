import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function ProfileSettings() {
	const [alignment, setAlignment] = React.useState("web");

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<Box sx={{ maxWidth: 200, mx: "auto", my: "1rem" }}>
			<FormControl>
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
				<Button type="submit" variant="outlined" sx={{ m: "1rem" }}>
					Save
				</Button>
			</FormControl>
		</Box>
	);
}
