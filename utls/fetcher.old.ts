import axios from 'redaxios';
import { removeUndefinedFromObject } from 'utls';

export const getAPiClient = (userToken: string, namespace: string) => {
	const api = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}wp-json/${namespace}`,

		headers: {
			...(userToken && { Authorization: `Bearer ${userToken}` })
		}
	});

	return api;
};

export interface FetcherOptions {
	method: 'post' | 'get';
	url: string;
	namespace?: string;
	isProtected?: boolean;
	params: {
		[key: string]: FormDataEntryValue | string | number | boolean | undefined;
	};
}

const apiFetcher = async (options: FetcherOptions) => {
	const { method = 'get', url, params = {}, namespace = 'wp/v2', isProtected = true } = options;

	const userToken = null;

	const isQuery = method === 'get';
	const isMutation = method === 'post';

	const searchParams = new URLSearchParams();
	// const formData = new FormData();

	const cleanParams = removeUndefinedFromObject(params);

	Object.entries(cleanParams).forEach(([key, value]) => {
		if (isQuery) {
			searchParams.append(key, `${value}`);
		} else {
			// formData.append(key, value as string);
		}
	});

	try {
		const apiOptions = {
			...(isQuery && { params: params })
			// ...(isMutation && { data: formData }),
		};

		if (isMutation && isProtected && !userToken) {
			throw new Error('No Token is available');
		}

		const api = getAPiClient(userToken, namespace);

		const { data, status, statusText } = await api({
			method,
			url,
			...apiOptions
		});

		return data;
	} catch (error) {
		console.error({
			url,
			error,
			errorText: JSON.stringify(error)
		});
		return { error };
	}
};

export const apiQuery = async (options: Omit<FetcherOptions, 'method'>) => {
	return await apiFetcher({ method: 'get', ...options });
};
