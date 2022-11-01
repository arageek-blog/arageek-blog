import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { MovieBody, MovieHeader, MovieRating } from 'components/movie';
import { Image } from 'components/shared';
import { memo } from 'react';
import { getAcfBlockFetchData } from 'utls';

export const MovieCard = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { name, params } = getAcfBlockFetchData({
    blockName,
    ...data
  });

  const { items } = initialData;

  return (
    <>
      <Box py={16}>
        <Grid templateColumns={'repeat(1, 1fr)'} gap={16}>
          {items?.map(({ id, _embedded, acf, title }) => {
            const imagePath = _embedded?.['wp:featuredmedia']?.[0];
            return (
              <GridItem key={id} bg={'light.500'} rounded='md'>
                <Flex gap={4} flexDir={{ base: 'column', md: 'row' }}>
                  <Box mt={-8} pl='4' w={{ base: ' 100%', md: '35%' }}>
                    <Image
                      image={imagePath}
                      ratio={3 / 4}
                      alt={title}
                      rounded='md'
                      boxShadow={'xl'}
                      sizes={'(min-width: 62em) 24vw, 98vw'}
                    />
                  </Box>
                  <Box pos={'relative'} flex={'1'}>
                    <MovieRating {...acf} />
                    <MovieHeader {...acf} />
                    <MovieBody title={title} {...acf} />
                  </Box>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default memo(MovieCard);
