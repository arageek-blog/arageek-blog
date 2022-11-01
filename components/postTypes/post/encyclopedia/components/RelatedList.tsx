import { Box, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { Heading } from 'components/shared';
import { NextChakraLink } from 'components/wrappers';

export const RelatedList = ({ items }) => {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <Box bgColor={'light.500'} p={4} rounded='md'>
      <VStack spacing={4} align='stretch' mt='2'>
        <Heading as='h2' title='ذو صلة' excludeToc />
        <Box>
          <UnorderedList spacing={4}>
            {items
              ?.filter((_, i) => i > 9)
              .map(({ id, title, link }) => (
                <ListItem key={id}>
                  <NextChakraLink href={link}>
                    <Text
                      noOfLines={1}
                      as='span'
                      dangerouslySetInnerHTML={{ __html: title.rendered }}
                    />
                  </NextChakraLink>
                </ListItem>
              ))}
          </UnorderedList>
        </Box>
      </VStack>
    </Box>
  );
};
