import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { NextChakraLinkOverlay } from '../wrappers';
import { AuthorInfo, Image } from './';

export const BioSmallItem: React.FC = ({ acf, _embedded, link }) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  const author = _embedded?.['author']?.[0];

  const {
    person_nickname_ar,
    person_nickname_en,
    person_name_ar,
    person_name_en
  } = acf;

  return (
    <HStack as='article' pos={'relative'} role='group' align={'stretch'}>
      <VStack align={'stretch'} spacing={4} w={'50%'}>
        <Heading as='span' fontSize={'md'} fontWeight='medium'>
          <NextChakraLinkOverlay
            href={link}
            display='flex'
            flexDirection={'column'}
          >
            {(person_nickname_ar || person_name_ar) && (
              <Text as='span' noOfLines={2}>
                {person_nickname_ar || person_name_ar}
              </Text>
            )}
            {(person_nickname_en || person_name_en) && (
              <Text as='span' noOfLines={2}>
                {person_nickname_en || person_name_en}
              </Text>
            )}
          </NextChakraLinkOverlay>
        </Heading>
        <AuthorInfo author={author} hasNoSocial />
      </VStack>
      <Box w={'50%'}>
        <Image
          image={featured_media}
          rounded='md'
          boxShadow={'xl'}
          sizes={'(min-width: 62em) 8vw, 21vw'}
        />
      </Box>
    </HStack>
  );
};
