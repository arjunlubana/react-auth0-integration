import { Button, TextField } from "@mui/material";

export default function ProfileOverview({ userData }) {
	return (
		<div>
			<form>
				<TextField
					id="first_name"
					label="First Name"
					variant="outlined"
					defaultValue={userData.given_name}
				/>
				<TextField
					id="last_name"
					label="Last Name"
					variant="outlined"
					defaultValue={userData.family_name}
				/>
				<TextField
					id="email"
					label="E-mail"
					variant="outlined"
					defaultValue={userData.email}
				/>

				<Button type="submit" variant="primary">Save Changes</Button>
			</form>
			<p>Joined in {userData.created_at}</p>
			<div>
				<p>Connected Account</p>
				{userData.identities.map((identity) => (
					<p>{identity.provider}</p>
				))}
			</div>
		</div>
	);
}
