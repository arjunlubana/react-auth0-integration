import { Container, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import { Auth0Icon, TwitterIcon, GoogleIcon } from "assets";

export default function ProfileOverview({ userData }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => alert(JSON.stringify(data));
	const dt = DateTime.fromISO(userData.created_at);
	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					id="first_name"
					label="First Name"
					variant="outlined"
					defaultValue={userData.given_name}
					{...register("first_name")}
					sx={{ m: "1rem" }}
				/>
				<TextField
					id="last_name"
					label="Last Name"
					variant="outlined"
					defaultValue={userData.family_name}
					{...register("last_name")}
					sx={{ m: "1rem" }}
				/>
				<TextField
					id="email"
					label="E-mail"
					variant="outlined"
					defaultValue={userData.email}
					{...register("email")}
					sx={{ m: "1rem" }}
				/>
				<br />
				<Button type="submit" variant="outlined" sx={{ m: "1rem" }}>
					Save Changes
				</Button>
			</form>
			<p>Joined in {dt.toLocaleString(DateTime.DATETIME_FULL)}</p>
			<div>
				<p>Connected Account</p>
				{userData.identities.map((identity) => {
					if (identity.provider === "google-oauth2") {
						return <img src={GoogleIcon} alt="google" />;
					} else if (identity.provider === "twitter") {
						return <img src={TwitterIcon} alt="twitter" />;
					} else if (identity.provider === "auth0") {
						return <img src={Auth0Icon} alt="auth0" />;
					}
				})}
			</div>
		</Container>
	);
}
