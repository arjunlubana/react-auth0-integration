import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export default function ProfileButton() {
	return (
		<Button>
			<NavLink to="/profile">Profile</NavLink>
		</Button>
	);
}
