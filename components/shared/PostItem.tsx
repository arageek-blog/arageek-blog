import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  LinkBox,
  Text,
  VStack
} from '@chakra-ui/react';
import { Microphone2 } from 'iconsax-react';
import { NextChakraLinkOverlay } from '../wrappers';
import { AuthorInfo, Image } from './';

export const PostItem: React.FC = ({ title, _embedded, link, type }) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  const author = _embedded?.['author']?.[0];
  const isPodcast = type === 'podcast';

  const url = `${link}${isPodcast ? '?vol=1' : ''}`;

  return (
    <LinkBox as='article' pos={'relative'} role='group'>
      <HStack align={'stretch'}>
        <VStack align={'stretch'} spacing={4} w={2 / 3}>
          <Heading as='span' fontSize={'h3'} fontWeight='medium'>
            <NextChakraLinkOverlay href={url}>
              <Text
                as='span'
                dangerouslySetInnerHTML={{ __html: title.rendered }}
              />
            </NextChakraLinkOverlay>
          </Heading>
          <AuthorInfo author={author} hasNoSocial />
        </VStack>
        <Box w={1 / 3}>
          <NextChakraLinkOverlay href={url}>
            <Box pos={'relative'}>
              <Image
                image={featured_media}
                ratio={16 / 9}
                rounded='md'
                boxShadow={'xl'}
                sizes={'(min-width: 62em) 15vw, 30vw'}
              />
              {isPodcast && (
                <Flex
                  alignItems={'flex-start'}
                  justifyContent='flex-end'
                  pos={'absolute'}
                  inset={0}
                  p={2}
                >
                  <Center
                    bgColor={'black'}
                    p={1}
                    // w='min-content'
                    rounded={'full'}
                  >
                    <Icon as={Microphone2} fontSize='3xl' color='white' />
                  </Center>
                </Flex>
              )}
            </Box>
          </NextChakraLinkOverlay>
        </Box>
      </HStack>
    </LinkBox>
  );
};
