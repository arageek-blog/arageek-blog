import { useInfiniteQuery } from '@tanstack/react-query';
import { getItemsData } from 'utls';

const infinitFetcher = async props => {
  const { queryKey, pageParam = 1 } = props;
  const [name, queryParams] = queryKey;

  return await getItemsData(name, {
    ...queryParams,
    page: pageParam
  });
};

export const useWpInfiniteItems = (
  name,
  params = {},
  initialData = undefined
) => {
  const defaultParams = {
    per_page: 9,
    ...params
  };
  const results = useInfiniteQuery([name, defaultParams], infinitFetcher, {
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
    ...(initialData && {
      initialData: { pages: [initialData], pageParams: [1] }
    })
  });

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isRQLoading,
    fetchNextPage,
    refetch
  } = results;

  const items = data?.pages?.flatMap(({ items }) => [...items]) ?? [];
  // const items = [];

  const isLoading = isRQLoading || isFetchingNextPage;

  const totalItems = data?.pages?.[0]?.totalItems;

  return {
    items,
    hasMore: hasNextPage,
    isLoading,
    loadMore: () => fetchNextPage(),
    totalItems,
    perPage: defaultParams?.per_page,
    refetch
  };
};
