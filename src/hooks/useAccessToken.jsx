import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useAccessToken({ audience, scope }) {
	const { getAccessTokenSilently } = useAuth0();
	const [state, setState] = useState({
		error: null,
		token: null,
	});

	useEffect(() => {
		console.log(1);
		(async () => {
			try {
				const token = await getAccessTokenSilently({
					audience,
					scope,
				});
				setState(state => ({
					...state,
					error: null,
					token,
				}));
			} catch (error) {
				setState(state => ({
					...state,
					error: error.error,
					token: null,
				}));
			}
		})();
	}, [audience, scope, getAccessTokenSilently]);

	return state;
}
