import { Typography, Container, Link, Grid, Box } from "@mui/material";
import Auth0Icon from "../assets/auth0.svg";
import MUIIcon from "../assets/mui.svg";
import ReactIcon from "../assets/react.svg";
import ReactRouterIcon from "../assets/reactrouter.svg";

const imageData = [
	{ title: "Auth0", img: Auth0Icon },
	{ title: "Material UI", img: MUIIcon },
	{ title: "ReactJS", img: ReactIcon },
	{ title: "ReactRouter", img: ReactRouterIcon },
];

export default function Content() {
	return (
		<Container maxWidth="md">
			<Typography
				variant="h1"
				sx={{
					textAlign: "center",
					fontSize: { xs: "4rem", md: "6rem" },
				}}
			>
				A demo using
				<br />
				<Link href="https://auth0.com"> Auth0 </Link>
				<br />
				for User Authentication.
			</Typography>
			<Box sx={{ my: "1rem" }}>
				<Typography
					variant="h5"
					sx={{
						textAlign: "center",
						fontFamily: "monospace",
						textDecoration: "underline",
						textDecorationThickness: "3px",
					}}
				>
					Technologies I have used
				</Typography>
				<Grid container spacing={2} sx={{ mt: "1rem" }}>
					{imageData.map((item) => (
						<Grid
							item
							key={item.title}
							xs={8}
							md
							sx={{ mx: "auto" }}
						>
							<img
								src={item.img}
								alt={item.title}
								style={{
									width: "100%",
									height: "50px",
									mx: "auto",
								}}
							/>
							<Typography
								sx={{
									textAlign: "center",
									fontFamily: "monospace",
								}}
							>
								{item.title}
							</Typography>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}
