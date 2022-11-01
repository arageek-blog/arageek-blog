import { VStack } from '@chakra-ui/react';
import { Heading, PostItem } from 'components/shared';

export const RelatedList = ({ items }) => {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <VStack spacing={8} align='stretch' mt='6'>
      <Heading as='h2' title='ذو صلة' excludeToc />
      <VStack w='full' align={'stretch'} spacing={4}>
        {items
          ?.filter((_, i) => i > 5)
          .map(item => (
            <PostItem key={item?.id} {...item} />
          ))}
      </VStack>
    </VStack>
  );
};
