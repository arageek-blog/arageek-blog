import { Button, Center, SimpleGrid, VStack } from '@chakra-ui/react';

import { BioSmallItem } from 'components/shared';
import { useWpInfiniteItems } from 'hooks';
import { memo } from 'react';
import { getAcfBlockFetchData } from 'utls';

const BioZodiac = props => {
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
    <>
      <VStack w='full' align={'stretch'} spacing={4}>
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
          {Array.isArray(items) &&
            items.map(item => <BioSmallItem key={item?.id} {...item} />)}
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
    </>
  );
};

export default memo(BioZodiac);
