import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ApiError } from "utils";

const useAuthApi = () => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const [output, setOutput] = useState({
		error: null,
		loading: true,
		data: null,
	});

	const fetchToken = useCallback(async () => {
		try {
			const accessToken = await getAccessTokenSilently();
			return accessToken;
		} catch (error) {
			setOutput((output) => ({
				...output,
				error,
				loading: false,
			}));
		}
	}, [getAccessTokenSilently]);

	const request = useCallback(async (url, fetchOptions, accessToken) => {
		const res = await fetch(url, {
			...fetchOptions,
			headers: {
				...fetchOptions.headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return await res.json();
	}, []);

	const sendRequest = useCallback(
		async (url, fetchOptions = {}) => {
			if (isAuthenticated) {
				const accessToken = await fetchToken();
				const response = await request(url, fetchOptions, accessToken);
				if (response.error) {
					setOutput((output) => ({
						...output,
						error: new ApiError(response),
						loading: false,
					}));
				} else {
					setOutput((output) => ({
						...output,
						data: response,
						error: null,
						loading: false,
					}));
				}
			}
		},

		[isAuthenticated, fetchToken, request]
	);

	return {
		...output,
		sendRequest,
	};
};

export default useAuthApi;
