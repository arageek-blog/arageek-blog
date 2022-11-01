import axios from 'redaxios';
import urlcat from 'urlcat';

export const Authorization = 'Authorization';

export const BACKENDURL = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json`;
export const HOMEURL = `https://${process.env.NEXT_PUBLIC_HOME_URL}`;
export const ISPRODUCTION = process.env.NODE_ENV === 'production';

const defaultParams = {
  _embed: '1',
  _headless: '1',
  namespace: 'wp/v2',
  name: 'posts'
};

export const getUrl = params => {
  const { namespace, ...opts } = { ...defaultParams, ...params };
  return urlcat(BACKENDURL, `/${namespace}/:name`, opts);
};

export const getSingleUrl = params => {
  const { namespace, ...opts } = { ...defaultParams, ...params };
  return urlcat(BACKENDURL, `/${namespace}/:name/:id`, opts);
};

export const defaultQueryFn = async ({ queryKey }) => {
  const [name, queryParams] = queryKey;

  const url = getUrl({
    name,
    ...queryParams
  });

  return await fetcher(url);
};

export const identifyPath = async (path: string): any => {
  const url = getUrl({
    name: 'identify-path',
    namespace: 'arageek/v1',
    path,
    _headless: '1'
  });
  // console.log(url);

  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.error({
      url,
      error,
      errorText: JSON.stringify(error)
    });
    return null;
  }
};

export const getBuildInfo = async (): any => {
  const shouldPrefetchUrls = process.env.SHOULD_PREFETCH_URLS;
  // console.log(shouldPrefetchUrls);

  if (shouldPrefetchUrls !== 'true') {
    return [];
  }

  const url = getUrl({
    name: 'get-build-info',
    namespace: 'arageek/v1',
    _headless: '1'
  });

  try {
    // const { data } = await axios.get(url);

    return [];
  } catch (error) {
    console.error({
      url,
      error,
      errorText: JSON.stringify(error)
    });
    return [];
  }
};

export const fetcher = async url => {
  // console.log(url);
  try {
    const { data, headers } = await axios.get(url);

    return { data, headers };
  } catch (error) {
    console.error({
      url,
      error,
      errorText: JSON.stringify(error)
    });
    return null;
  }
};

const getItemsDataDefaultParams = {
  offset: 0,
  page: 1,
  per_page: 9,
  _embed: '1',
  _headless: '1'
};

export const getItemsData = async (name, params) => {
  const extendedParams = {
    ...getItemsDataDefaultParams,
    ...params
  };

  const isSingleItem = name.includes('/');

  if (isSingleItem) {
    return await getSingleItemData(name, params);
  }

  const { offset: initialOffset, per_page, page, ...rest } = extendedParams;

  const offset =
    Number(initialOffset ?? 0) +
    (Number(page ?? 1) - 1) * Number(per_page ?? 10);

  try {
    const { data: items, headers } = await defaultQueryFn({
      queryKey: [
        name,
        {
          ...rest,
          per_page,
          offset
        }
      ]
    });

    const totalPages = headers?.get('X-WP-TotalPages') ?? 0;
    const totalItems = headers?.get('X-Wp-Total') ?? 0;

    const nextPage = 1 + page <= totalPages && 1 + page;

    return {
      items,
      totalPages,
      totalItems,
      nextPage
    };
  } catch (error) {
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      nextPage: 0
    };
  }
};

export const getSingleItemData = async (ref, params) => {
  const [name, id] = ref.split('/');

  const url = getSingleUrl({
    name,
    id,
    ...params,
    _embed: '1',
    _headless: '1'
  });

  const { data: item } = await axios.get(url);

  return item;
};

interface mutationFnParams {
  name: string;
  params: Record<string, any>;
  token?: string;
  namespace?: string;
}

export const mutationFn = async ({
  name,
  params = {},
  token,
  namespace = 'wp/v2'
}: mutationFnParams) => {
  const url = getUrl({
    ...defaultParams,
    namespace,
    name
  });

  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  try {
    const { data } = await axios.post(url, formData, {});

    if (data?.success === false && data?.statusCode === 403) {
      throw new Error(data?.message);
    }

    return { data, params };
  } catch (error) {
    console.error({
      url,
      error,
      errorText: JSON.stringify(error)
    });
    throw error;
  }
};
