// use-api.js
import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useApi = (url, options = {}) => {
	const { user, getAccessTokenSilently } = useAuth0();
	const [state, setState] = useState({
		error: null,
		loading: true,
		data: null,
	});
	const [refreshIndex, setRefreshIndex] = useState(0);

	const request = useCallback(async () => {
		try {
			const { audience, scope, ...fetchOptions } = options;

			const accessToken = await getAccessTokenSilently({
				audience,
				scope,
			});

			const res = await fetch(url, {
				...fetchOptions,
				headers: {
					...fetchOptions.headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setState({
				...state,
				data: await res.json(),
				error: null,
				loading: false,
			});
		} catch (error) {
			setState({
				...state,
				error,
				loading: false,
			});
		}
	}, []);
	useEffect(() => {
		request();
	}, [refreshIndex]);

	return {
		...state,
		refresh: () => setRefreshIndex(refreshIndex + 1),
	};
};

export default useApi;
