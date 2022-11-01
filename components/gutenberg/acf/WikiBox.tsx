import {
  Box,
  Center,
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  VStack
} from '@chakra-ui/react';
import { NextChakraLink } from 'components/wrappers';
import { chunk } from 'lodash';
import { memo } from 'react';

const WikiBox = props => {
  const { initialData } = props;

  const lists = chunk(initialData, Math.ceil(initialData.length / 2));

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {lists.map((list, index) => (
          <Box key={index}>
            <VStack spacing={4} align='stretch'>
              {list.map((item, index) => (
                <Item key={index} {...item} />
              ))}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

const Item = ({ title, icon, categories }) => {
  const { items } = categories;
  return (
    <HStack
      align={'flex-start'}
      bgColor={'light.500'}
      h='full'
      p={4}
      itemScope
      itemType='https://schema.org/Encyclopedia'
    >
      <Box>
        <Center
          dangerouslySetInnerHTML={{ __html: icon }}
          bgColor='white'
          rounded={'full'}
          p={2}
          sx={{
            '&>svg': {
              boxSize: '1.5rem',
              color: 'black'
            }
          }}
        />
      </Box>
      <VStack align={'stretch'} spacing={4} pt={3}>
        <Heading itemProp='categoryName' fontSize={'md'}>
          {title}
        </Heading>
        <Box as='nav'>
          <List spacing={2} itemProp='categoryItems'>
            {items.map(({ link, id, name }, index) => (
              <ListItem key={id}>
                <NextChakraLink href={link}>{name}</NextChakraLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </HStack>
  );
};

export default memo(WikiBox);
