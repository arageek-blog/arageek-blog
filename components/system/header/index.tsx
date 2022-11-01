import { Box, Spacer, Stack } from '@chakra-ui/react';
import { Logo } from 'assets';
import { MainMenu, MobileMenu } from './components';

interface Props {
  hasClosingButtonPlace: boolean;
}

export const Header: React.FC<Props> = ({
  hasClosingButtonPlace,
  headerMenu,
  footerMenu,
  SocialMenu
}) => {
  return (
    <Box
      as='header'
      position={'sticky'}
      top={{ base: 0, xl: 4 }}
      left={0}
      p={2}
      bgColor='white'
      zIndex={{ base: 100, xl: 10 }}
      w={{ base: 'full', xl: 'auto' }}
      h='full'
      mb={{ base: 4, xl: 0 }}
      borderBottom={{ base: 1, xl: 0 }}
      borderColor={'light.500'}
    >
      <Stack
        direction={{ base: 'row', xl: 'column' }}
        align={{ base: 'center', xl: 'flex-start' }}
        spacing={{ base: 6, lg: 2 }}
      >
        <Logo />
        <Spacer display={{ xl: 'none' }} />
        <MobileMenu
          {...{
            headerMenu,
            footerMenu,
            SocialMenu
          }}
          hasClosingButtonPlace={hasClosingButtonPlace}
        />
        <Box
          w='full'
          // bgColor={'red'}
          display={{ base: 'none', xl: 'block' }}
          sx={{
            '&::-webkit-scrollbar': {
              width: 4
            },
            '&::-webkit-scrollbar-track': {
              width: 3
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'var(--arageek-colors-dark-300)',
              borderRadius: 'md'
            }
          }}
        >
          <MainMenu headerMenu={headerMenu} />
        </Box>
      </Stack>
    </Box>
  );
};
