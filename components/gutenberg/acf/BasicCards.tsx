import { PostItemBasic } from 'components/shared';

import { Box } from '@chakra-ui/react';
import { Slider } from 'components/shared';
import { memo } from 'react';

const BasicCards = props => {
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
    <Slider gap={4}>
      {items.map(item => (
        <Slide key={item.id} {...item} />
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
      <PostItemBasic {...props} imageSize={'(min-width: 62em) 19vw, 65vw'} />
    </Box>
  );
};

export default memo(BasicCards);
