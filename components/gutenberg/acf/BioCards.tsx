import { Box } from '@chakra-ui/react';
import { BioItem, BioItemProps, Slider } from 'components/shared';
import React, { memo } from 'react';

const BioCards = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { items } = initialData;

  if (!Array.isArray(items) || items?.length === 0) {
    return null;
  }

  return (
    <Box>
      <Slider gap={4}>
        {items.map(item => (
          <Slide key={item.id} {...item} />
        ))}
      </Slider>
    </Box>
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

export default memo(BioCards);
