import { useReducer, useEffect, createContext } from "react";
import { useAuthApi } from "hooks";

export const UserContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "setUserData":
			return { data: action.data, loading: false, error: null };
		case "updateUserData":
			return { data: action.data, loading: false, error: null };
		default:
			throw new Error();
	}
}

export function UserProvider({ children }) {
	const { sendRequest } = useAuthApi();
	const [state, dispatch] = useReducer(reducer, {
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		sendRequest().then((data) => {
			console.log(data);
		});
	}, [sendRequest]);
	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
}
