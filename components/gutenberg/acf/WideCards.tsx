import { Button, Center, VStack } from '@chakra-ui/react';

import { PostItem } from 'components/shared';
import { useWpInfiniteItems } from 'hooks';
import { memo } from 'react';
import { getAcfBlockFetchData } from 'utls';

const WideCards = props => {
  const { attrs, blockIndex, blockName, initialData } = props;

  if (!attrs) {
    return null;
  }

  const { data } = attrs;

  const { name, params } = getAcfBlockFetchData({
    blockName,
    ...data
  });

  const { items, hasMore, isLoading, loadMore } = useWpInfiniteItems(
    name,
    params,
    initialData
  );

  const { enable_pagination } = data;

  const hasLoadMore = hasMore && enable_pagination === '1';

  return (
    <>
      <VStack w='full' align={'stretch'} spacing={4}>
        {Array.isArray(items) &&
          items.map(item => <PostItem key={item?.id} {...item} />)}
        {hasLoadMore && (
          <Center>
            <Button
              onClick={loadMore}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              المزيد
            </Button>
          </Center>
        )}
      </VStack>
    </>
  );
};

export default memo(WideCards);
