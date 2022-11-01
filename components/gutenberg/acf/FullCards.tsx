import { VStack } from '@chakra-ui/react';

import { PostItemBasic } from 'components/shared';
import { memo } from 'react';

const FullCards = props => {
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
    <VStack align={'stretch'}>
      {items.map(item => (
        <PostItemBasic fontSize='h2' key={item.id} {...item} />
      ))}
    </VStack>
  );
};

export default memo(FullCards);
