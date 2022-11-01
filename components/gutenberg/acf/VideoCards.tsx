import { TvItem } from 'components/shared';

import { Box, SimpleGrid } from '@chakra-ui/react';
import { Slider } from 'components/shared';
import { memo } from 'react';

const VideoCards = props => {
  const { attrs, blockIndex, blockName, initialData } = props;

  // const { items } = initialData;

  if (!Array.isArray(initialData?.items) || initialData?.items?.length === 0) {
    return null;
  }

  const { display = 'slider_tall' } = attrs?.data;

  if (['grid_basic', 'grid_tall'].includes(display)) {
    return (
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
        {initialData?.items.map(item => (
          <TvItem isBasic={display === 'grid_basic'} key={item.id} {...item} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Slider gap={4}>
      {initialData?.items.map(item => (
        <Slide isBasic={display === 'slider_basic'} key={item.id} {...item} />
      ))}
    </Slider>
  );
};

const Slide: React.FC = props => {
  return (
    <Box
      pos='relative'
      flexGrow={0}
      flexShrink={0}
      flexBasis={{ base: '75%', md: '40%' }}
    >
      <TvItem {...props} />
    </Box>
  );
};

export default memo(VideoCards);
