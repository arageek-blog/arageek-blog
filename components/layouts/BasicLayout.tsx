import { Box, Container, Stack, VStack } from '@chakra-ui/react';
import { Footer, Header } from 'components/system';

export const BasicLayout = ({ children }) => {
  return (
    <>
      <Container maxW='container.xl' centerContent pb={8}>
        <Stack
          align={'flex-start'}
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 0, md: 4, xl: 12 }}
          position='relative'
          w='full'
        >
          <Header variant='basic' />
          <VStack
            align={'stretch'}
            spacing={8}
            flexBasis='100%'
            maxW={`calc(100% - 5px)`}
            minH={`calc(100vh - 199px - 2rem)`}
          >
            <Stack
              align={'flex-start'}
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: 0, md: 4, xl: 12 }}
              position='relative'
              w='full'
            >
              <Box
                as='main'
                maxWidth={'container.sm'}
                w='full'
                flexShrink={0}
                flexBasis='100%'
              >
                <VStack spacing={4} align='stretch'>
                  {children}
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Stack>
      </Container>
      <Footer variant='basic' />
    </>
  );
};
