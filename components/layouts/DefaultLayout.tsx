import { Box, Container, Stack, VStack } from '@chakra-ui/react';

import React from 'react';

import { AdsSlot } from 'components/ads';
import { HeroContent } from 'components/gutenberg';
import { Footer, Header, Sidebar } from 'components/system';
import { useRouteData } from 'hooks';

export const DefaultLayout: React.FC = ({
  children,
  hasClosingButtonPlace = false
}) => {
  const { acf, type } = useRouteData();


  const shouldDisplayAd =
    type !== 'page' || (type === 'page' && acf?.display_ad);

  return (
    <>
      <Container maxW='container.xl' centerContent pb={8}>
        <Stack
          align={'flex-start'}
          direction={{ base: 'column', lg: 'column', xl: 'row' }}
          spacing={{ base: 0, lg: 2, xl: 2 }}
          position='relative'
          w='full'
        >
          <Header hasClosingButtonPlace={hasClosingButtonPlace} />

          <VStack
            align={'stretch'}
            // spacing={8}
            spacing={{ base: 4, lg: 6, xl: 6 }}
            flexBasis='100%'
            maxW='full'
            width={'100%'}
          >
            {shouldDisplayAd && <AdsSlot place='header' />}
            <HeroContent />

            <Stack
              align={'flex-start'}
              direction={{ base: 'column', lg: 'row' }}
              spacing={{ base: 0, lg: 10, xl: 10 }}
              position='relative'
              w='full'
            >
              <Box
                as='main'
                maxWidth={{
                  base: 'full',
                  // lg: 'container.sm',
                  xl: 'container.sm'
                }}
                flexShrink={0}
                flexBasis='100%'
                pr={{ base: 0, xl: 4 }}
                w='full'
              >
                {children}
              </Box>

              <Sidebar />
            </Stack>
          </VStack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};
