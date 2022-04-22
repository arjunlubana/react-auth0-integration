import { useState, forwardRef } from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

export default function Snackbar({ alert }) {
	const [open, setOpen] = useState(true);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	return (
		<MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity="success"
				sx={{ width: "100%" }}
			>
				{alert}
			</Alert>
		</MuiSnackbar>
	);
}
