import { Box, VStack } from '@chakra-ui/react';
import { Logo } from 'assets';
import { Heading, PostMetaFooter } from 'components/shared';
import { htmlParser } from 'utls';
import { useTVContext } from './TvContext';

export const Content = () => {
  const { currentItem } = useTVContext();
  const { title, content, link, id } = currentItem;

  return (
    <VStack
      display={{ base: 'none', lg: 'flex' }}
      align={'stretch'}
      px={16}
      py={8}
      spacing={8}
    >
      <Logo />
      <VStack align={'stretch'}>
        <Heading as='h1' fontSize={'h1'} title={title?.rendered} />
        <Box
          sx={{
            p: {
              lineHeight: 'tall',
            },
          }}
        >
          {content?.rendered && htmlParser(content.rendered)}
        </Box>
      </VStack>
      <PostMetaFooter {...{ title, link, id }} />
    </VStack>
  );
};
