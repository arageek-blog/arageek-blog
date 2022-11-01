import { Stack, VStack } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import {
  BriefHeading,
  BriefImage,
  BriefSummary,
  NavigationSkeleton
} from './brief-components';

const Navigation = dynamic(() => import('./brief-components/Navigation'), {
  ssr: false,
  loading: NavigationSkeleton
});

export const Brief: React.FC = ({ acf, _embedded }) => {
  return (
    <Stack
      spacing={4}
      direction={{ base: 'column', md: 'row' }}
      py={{ base: 3, md: 8 }}
      borderBottomColor='gray.200'
      borderBottomWidth={1}
    >
      <VStack spacing={4} w={{ base: 'full', md: 3 / 5 }} align={'stretch'}>
        <BriefHeading {...{ acf }} />
        <BriefImage
          {...{ _embedded, acf }}
          display={{ base: 'block', md: 'none' }}
        />
        <BriefSummary {...{ _embedded, acf }} />
      </VStack>
      <VStack
        spacing={{ base: 4, md: 8 }}
        w={{ base: 'full', md: 2 / 5 }}
        align={'stretch'}
      >
        <BriefImage
          {...{ _embedded, acf }}
          display={{ base: 'none', md: 'block' }}
        />
        <Navigation />
      </VStack>
    </Stack>
  );
};
