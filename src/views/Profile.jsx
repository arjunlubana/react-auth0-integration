import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Typography, Box, Skeleton, TextField } from "@mui/material";
import useApi from "../hooks/useApi";

export default function Profile() {
	const {
		user,
		isAuthenticated,
		getAccessTokenSilently,
		getAccessTokenWithPopup,
		loginWithRedirect,
	} = useAuth0();

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
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					maxWidth: "sm",
					mx: "auto",
				}}
			>
				<Skeleton
					variant="circular"
					sx={{ width: "128px", height: "128px" }}
				/>
				<Typography variant="h2" sx={{ width: "100%" }}>
					<Skeleton />
				</Typography>
				<Typography variant="h5" sx={{ width: "100%" }}>
					<Skeleton />
				</Typography>
			</Box>
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
		data && (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<h3>User Metadata</h3>
				{data ? (
					<pre>{JSON.stringify(data, null, 2)}</pre>
				) : (
					"No user metadata defined"
				)}
			</div>
		)
	);
}
