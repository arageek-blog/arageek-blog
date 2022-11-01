import { SimpleGrid } from '@chakra-ui/react';

import { AuthorCard } from 'components/shared';
import { memo } from 'react';

const SelectiveUsers = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { items } = initialData;

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
      {items.map(item => (
        <AuthorCard key={item.id} {...item} />
      ))}
    </SimpleGrid>
  );
};

export default memo(SelectiveUsers);
