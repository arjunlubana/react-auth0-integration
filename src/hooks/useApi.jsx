import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ApiError } from "utils";

const useApi = (url, options = {}) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [output, setOutput] = useState({
		error: null,
		loading: true,
		data: null,
	});
	const [refreshIndex, setRefreshIndex] = useState(0);

	const fetchToken = useCallback(async () => {
		try {
			const accessToken = await getAccessTokenSilently(
				options.tokenOptions
			);
			return accessToken;
		} catch (error) {
			setOutput((output) => ({
				...output,
				error,
				loading: false,
			}));
		}
	}, [options.tokenOptions, getAccessTokenSilently]);

	const request = useCallback(
		async (accessToken) => {
			try {
				if (isAuthenticated) {
					options.fetchOptions.headers.Authorization = `Bearer ${accessToken}`;
					const res = await fetch(url, options.fetchOptions);

					const data = await res.json();
					if (data.error) {
						throw new ApiError(data);
					} else {
						setOutput((output) => ({
							...output,
							data,
							error: null,
							loading: false,
						}));
					}
				}
			} catch (error) {
				setOutput((output) => ({
					...output,
					error,
					loading: false,
				}));
			}
		},
		[url, options.fetchOptions, isAuthenticated]
	);

	useEffect(() => {
		(async () => {
			const accessToken = await fetchToken();
			request(accessToken);
		})();
	}, [fetchToken, request, refreshIndex]);

	return {
		...output,
		refresh: () => setRefreshIndex(refreshIndex + 1),
	};
};

export default useApi;
