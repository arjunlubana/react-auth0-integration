import { useState, useEffect, createContext } from "react";
import { Snackbar } from "components";

const AUTO_DISMISS = 5000;

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
	const [alerts, setAlerts] = useState([]);
	const activeAlertIds = alerts.join(",");

	useEffect(() => {
		if (activeAlertIds.length > 0) {
			const timer = setTimeout(
				() => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
				AUTO_DISMISS
			);
			return () => clearTimeout(timer);
		}
	}, [activeAlertIds]);

	const addAlert = (alert) => setAlerts((alerts) => [alert, ...alerts]);

	const value = { addAlert };

	return (
		<SnackbarContext.Provider value={value}>
			{children}
			{alerts.map((alert) => (
				<Snackbar key={alert} alert={alert} />
			))}
		</SnackbarContext.Provider>
	);
}
