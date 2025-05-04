import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback } from 'react';

axios.defaults.withCredentials = true; // Ensure credentials (session cookies) are sent
axios.defaults.baseURL = 'http://localhost:8000'; // if calling API directly

export function useSanctumFetch() {
	const fetch = useCallback(
		async <T = any>(
			url: string,
			method: 'get' | 'post' | 'put' | 'delete' = 'get',
			data: any = {},
			config: AxiosRequestConfig = {},
		): Promise<AxiosResponse<T>> => {
			// eslint-disable-next-line no-useless-catch
			try {
				// Get CSRF cookie before any request
				await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

				const options: AxiosRequestConfig = {
					method,
					url,
					...(method === 'get' ? { params: data } : { data }),
					...config,
					withCredentials: true,
				};

				return axios.request<T>(options);
			} catch (error: any) {
				throw error;
			}
		},
		[],
	);

	return { fetch };
}
