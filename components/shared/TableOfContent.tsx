import {
  AspectRatio,
  Box,
  ListItem,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { Heading } from 'components/shared';
import { NextChakraLink } from 'components/wrappers';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

type navItem = {
  title: string;
  id: string;
};

const TableOfContent: React.FC = () => {
  const { asPath } = useRouter();
  const urlWithoutHash = asPath.split('#')[0];

  const [headings, setheadings] = useState<navItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll('h2:not([data-toc="exclude"])');

    setheadings(
      [...headings].map(({ id, innerText: title }) => ({
        id,
        title,
      })),
    );
  }, [urlWithoutHash]);

  return (
    <AspectRatio
      ratio={{ base: 1, md: 16 / 9 }}
      as='section'
      rounded={'md'}
      bgColor={'light.500'}
      overflow='hidden'
    >
      <Box>
        <Box
          w='full'
          h='full'
          p={8}
          overflowY={'scroll'}
          sx={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'white white',
            scrollbarGutter: 'stable',
            '&::-webkit-scrollbar': {
              width: '3',
            },
            '&::-webkit-scrollbar-thumb': {
              bgColor: 'white',
              borderRadius: 'full',
              borderColor: 'light.500',
              borderWidth: '3',
              borderStyle: 'solid',
            },
          }}
        >
          <VStack align={'stretch'} spacing={4} w='full'>
            <Heading as='h2' title='جدول المحتويات' excludeToc />
            <Box as='nav'>
              <UnorderedList color={'light.900'} spacing={4}>
                {headings.map(({ id, title }) => (
                  <ListItem key={id}>
                    <NextChakraLink href={`#${id}`} title={title}>
                      {title}
                    </NextChakraLink>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </VStack>
        </Box>
      </Box>
    </AspectRatio>
  );
};

export default TableOfContent;
