import { Box, Center, Icon, Text } from '@chakra-ui/react';
import { Star1 } from 'iconsax-react';
import React from 'react';

export const MovieRating = ({ movie_rating }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={'2'}
      right={0}
      top={-14}
      display={{ base: 'flex', md: 'none' }}
    >
      <Center>
        <Icon as={Star1} boxSize={24} color={'#f5c518'} fill={'#f5c518'} />
        <Box position={'absolute'}>
          <Text as='span' fontWeight={'bold'} fontSize={'2xl'}>
            {movie_rating}
          </Text>
          <Text as='span' fontSize={'lg'}>
            /10
          </Text>
        </Box>
      </Center>
    </Box>
  );
};
