import { useState, Fragment, forwardRef } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

export default function AlertNotification({ message }) {
	const [open, setOpen] = useState(false);

	const handleClick = async () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const action = (
		<Fragment>
			<Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</Fragment>
	);

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity="success"
				sx={{ width: "100%" }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}
