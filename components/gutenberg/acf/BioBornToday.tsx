import { SimpleGrid, VStack } from '@chakra-ui/react';
import { Heading } from 'components/shared';

import { BioSmallItem } from 'components/shared';
import { memo } from 'react';

const BioBornToday = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData,
    title
  } = props;

  if (!Array.isArray(initialData)) {
    return null;
  }

  return (
    <>
      <Heading as={'h2'} fontSize={'h2'} title={title} pt='4' />
      <VStack w='full' align={'stretch'} spacing={4} pb='4'>
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
          {Array.isArray(initialData) &&
            initialData.map(item => <BioSmallItem key={item?.id} {...item} />)}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default memo(BioBornToday);
