import { useState, useCallback, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ApiError } from "utils";

const useAuthApi = () => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const [output, setOutput] = useState({
		error: null,
		loading: true,
		data: null,
	});

	const fetchToken = useCallback(
		async (tokenOptions) => {
			try {
				const accessToken = await getAccessTokenSilently(tokenOptions);
				return accessToken;
			} catch (error) {
				setOutput((output) => ({
					...output,
					error,
					loading: false,
				}));
			}
		},
		[getAccessTokenSilently]
	);

	const request = useCallback(
		async (url, fetchOptions, accessToken) => {
			if (isAuthenticated) {
				fetchOptions.headers.Authorization = `Bearer ${accessToken}`;
				const res = await fetch(url, fetchOptions);
				return await res.json();
			}
		},
		[isAuthenticated]
	);

	const sendRequest = useCallback(
		async (url, options = {}) => {
			const accessToken = await fetchToken(options.tokenOptions);
			const data = await request(
				url,
				options.fetchOptions,
				accessToken
			);
			if (data.error) {
				await setOutput((output) => ({
					...output,
					error: new ApiError(data),
					loading: false,
				}));
			} else {
				await setOutput((output) => ({
					...output,
					data: data,
					error: null,
					loading: false,
				}));
			}
			return { ...output };
		},
		[fetchToken, request]
	);

	return {
		...output,
		sendRequest,
	};
};

export default useAuthApi;
