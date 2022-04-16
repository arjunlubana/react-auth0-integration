import { Avatar, Typography, Box } from "@mui/material";

export default function ProfileInfo({ name, image }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				mt: "1rem",
				textAlign: "center"
			}}
		>
			<Avatar
				src={image}
				alt="profile image"
				sx={{ width: "128px", height: "128px" }}
			/>
			<Typography variant="h3">{name}</Typography>
		</Box>
	);
}
