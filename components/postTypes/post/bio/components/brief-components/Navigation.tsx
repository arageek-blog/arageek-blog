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

const titles = {
  biography: 'السيرة الذاتية',
  beginnings: 'البدايات',
  personalLife: 'الحياة الشخصية',
  facts: 'حقائق',
  quotes: 'إقتباسات',
  death: 'الوفاة',
  achievements: 'الإنجازات',
  otherDetails: 'بيانات أخرى',
  interviews: 'فيديوهات ووثائقيات',
  infographic: 'انفوغرافيك',
  sources: 'المصادر',
};

const Navigation: React.FC = () => {
  const { asPath } = useRouter();
  const urlWithoutHash = asPath.split('#')[0];

  const [headings, setheadings] = useState<string[]>([]);

  const selectors = Object.keys(titles)
    .map((key) => `#${key}`)
    .join(',');

  useEffect(() => {
    const headings = document.querySelectorAll(selectors);

    setheadings([...headings].map(({ id }) => id));
  }, [urlWithoutHash]);

  return (
    <AspectRatio
      ratio={{ base: 1, md: 3 / 4 }}
      as='section'
      rounded={'md'}
      bgColor={'light.500'}
      overflow='hidden'
    >
      <Box>
        <Box
          w='full'
          h='full'
          p={4}
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
            <Heading as='h2' title='جدول المحتويات' />
            <Box as='nav'>
              <UnorderedList color={'light.900'} spacing={4}>
                {headings.map((id) => (
                  <ListItem key={id}>
                    <NextChakraLink href={`#${id}`} title={titles?.[id]}>
                      {titles?.[id] ?? id}
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

export default Navigation;
