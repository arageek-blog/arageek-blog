import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { NextChakraLinkOverlay } from 'components/wrappers';

export const SearchResultCard = ({ item, onClose }) => {
  const { title, url, thumb_url, excerpt } = item.document;

  return (
    <HStack
      as='article'
      pos={'relative'}
      role='group'
      align={'stretch'}
      w='full'
      onClick={onClose}
    >
      <VStack align={'stretch'} spacing={4} w={2 / 3}>
        <Heading as='span' fontSize={'md'} fontWeight='medium'>
          <NextChakraLinkOverlay href={url} onClick={onClose}>
            <Text
              as='span'
              noOfLines={2}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </NextChakraLinkOverlay>
        </Heading>
        <Text
          as='span'
          fontSize={'sm'}
          noOfLines={2}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </VStack>
      <Box w={1 / 3}>
        <NextChakraLinkOverlay href={url}>
          <AspectRatio ratio={16 / 9}>
            <Center>
              <Image
                rounded='md'
                boxShadow={'xl'}
                w='full'
                height='full'
                objectFit={'cover'}
                src={thumb_url}
                loading='lazy'
                alt={title}
              />
            </Center>
          </AspectRatio>
        </NextChakraLinkOverlay>
      </Box>
    </HStack>
  );
};
