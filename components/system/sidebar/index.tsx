import { Box, VStack } from '@chakra-ui/react';

import { AdsSlot } from 'components/ads';
import { SidebarMenu, SidebarSearch } from './components';

export const Sidebar: React.FC = ({ footerMenu }) => {
  return (
    <>
      <Box
        as='aside'
        flexGrow={1}
        position={'sticky'}
        top={4}
        flexBasis='0%'
        w='full'
        display={{ base: 'none', xl: 'block' }}
      >
        <VStack
          align={'stretch'}
          minH={{ md: 'calc(100vh - 48px)' }}
          justify={'space-between'}
        >
          {/* {/* <Search /> */}
          <SidebarSearch />
          <AdsSlot place='sidebar' />
          <Box></Box>
          <VStack align={'stretch'}></VStack>
          <SidebarMenu footerMenu={footerMenu} />
        </VStack>
      </Box>
    </>
  );
};
