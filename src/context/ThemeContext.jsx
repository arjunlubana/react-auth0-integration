import { useContext } from "react";
import { UserContext } from "context/UserContext";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

var theme = createTheme({
	palette: {
		mode: "light",
	},
});
export function ThemeProvider({ children }) {
	const { data } = useContext(UserContext);
	if (data) {
		theme = createTheme({
			palette: {
				mode:
					data.user_metadata.theme === undefined
						? "light"
						: data.user_metadata.theme,
			},
		});
	}
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
