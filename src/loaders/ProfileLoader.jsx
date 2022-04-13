import { Box, Container, Skeleton, Typography } from "@mui/material";

export default function ProfileLoader() {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				mt: "1rem"
			}}
		>
			<Skeleton
				variant="circular"
				sx={{ width: "128px", height: "128px" }}
			/>
			<Typography variant="h2" sx={{ width: "300px" }}>
				<Skeleton />
			</Typography>
			<Skeleton sx={{ width: "100%", height: "400px" }} />
		</Container>
	);
}
