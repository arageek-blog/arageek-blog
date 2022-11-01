import { Button, Center, SimpleGrid, VStack } from '@chakra-ui/react';

import { AuthorCard } from 'components/shared';
import { useWpInfiniteItems } from 'hooks';
import { memo } from 'react';
import { getAcfBlockFetchData } from 'utls';

const AuthorsArchive = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { name, params } = getAcfBlockFetchData({
    blockName,
    ...data
  });

  const { items, hasMore, isLoading, loadMore } = useWpInfiniteItems(
    name,
    params,
    initialData
  );

  return (
    <VStack align={'stretch'}>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
        {items.map(item => (
          <AuthorCard key={item.id} {...item} />
        ))}
      </SimpleGrid>
      {hasMore && (
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
  );
};

export default memo(AuthorsArchive);
