import { SimpleGrid } from '@chakra-ui/react';
import { BioItem, BioItemProps } from 'components/shared';
import React, { memo } from 'react';

const BioGrid = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;
  const { items } = initialData;
  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
      {items.map(item => (
        <BioItem key={item.id} {...item} />
      ))}
    </SimpleGrid>
  );
};

const Slide: React.FC<BioItemProps> = props => {
  return (
    <Box
      pos='relative'
      flexGrow={0}
      flexShrink={0}
      flexBasis={{ base: '50%', md: '33.3%' }}
    >
      <BioItem {...props} />
    </Box>
  );
};

export default memo(BioGrid);
