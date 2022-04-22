import { useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthApi } from "hooks";

export const UserContext = createContext();

export function UserProvider({ children }) {
	const { user } = useAuth0();
	const { error, loading, data, sendRequest } = useAuthApi();

	useEffect(() => {
		sendRequest(
			`${process.env.REACT_APP_AUTH0_MANAGEMENT_API}users/${user?.sub}`
		);
		// eslint-disable-next-line
	}, [user]);
	return (
		<UserContext.Provider value={{ error, loading, data }}>
			{children}
		</UserContext.Provider>
	);
}
