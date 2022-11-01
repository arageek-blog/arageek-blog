import { Center, HStack, Text } from '@chakra-ui/react';
import { StarRating } from 'components/shared';
import { NextChakraLink } from 'components/wrappers';
import React from 'react';

interface Props {
  movie_rating: number;
  movie_teasing_url: string;
  movie_imdb_url: string;
}

export const MovieHeader: React.FC<Props> = ({
  movie_rating,
  movie_teasing_url,
  movie_imdb_url
}) => {
  return (
    <HStack
      align={'stretch'}
      spacing={{ base: 1 }}
      mt={{ base: 4, md: -8 }}
      fontSize={'md'}
      pos={'relative'}
      justify={{ base: 'flex-start', md: 'flex-end' }}
      px={{ base: 8, md: 0 }}
    >
      <NextChakraLink
        href={movie_teasing_url}
        target='_blank'
        rel='noopener noreferrer'
        color='light.900'
      >
        إعلان الفيلم
      </NextChakraLink>
      <Center>
        <Text>•</Text>
      </Center>
      <NextChakraLink
        href={movie_imdb_url}
        target='_blank'
        rel='noopener noreferrer'
        color='light.900'
      >
        صفحة IMDb
      </NextChakraLink>
      <Center display={{ base: 'none', md: 'flex' }}>
        <Text>•</Text>
      </Center>
      <HStack display={{ base: 'none', md: 'flex' }}>
        <Text> تقييم أراجيك</Text>
        <StarRating value={movie_rating} />
      </HStack>
    </HStack>
  );
};
