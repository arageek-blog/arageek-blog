import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { Logo } from 'assets';
import { SearchForm } from 'components/forms';
import { SocialLinks } from 'components/system/footer/components';
import { SidebarMenu } from 'components/system/sidebar/components';
import { HambergerMenu, SearchNormal1 } from 'iconsax-react';
import Router from 'next/router';
import { MainMenu } from './';

interface Props {
  hasClosingButtonPlace: boolean;
}

export const MobileMenu: React.FC<Props> = ({
  headerMenu,
  footerMenu,
  SocialMenu,
  hasClosingButtonPlace
}) => {
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onMobileMenuOpen,
    onClose: onMobileMenuClose
  } = useDisclosure({ defaultIsOpen: false });

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose
  } = useDisclosure();

  Router.events.on('routeChangeStart', () => {
    onMobileMenuClose();
    onSearchClose();
  });

  return (
    <>
      <HStack
        spacing={2}
        right={hasClosingButtonPlace ? 12 : 0}
        position={hasClosingButtonPlace ? 'relative' : undefined}
      >
        <IconButton
          icon={<Icon as={SearchNormal1} />}
          aria-label='البحث'
          onClick={onSearchOpen}
          display={{ xl: 'none' }}
          variant='ghost'
          color={'black'}
        />
        <IconButton
          icon={<Icon as={HambergerMenu} />}
          aria-label='القائمة'
          onClick={onMobileMenuOpen}
          display={{ xl: 'none' }}
          variant='ghost'
          color={'black'}
        />
      </HStack>
      <Drawer
        placement={'right'}
        onClose={onMobileMenuClose}
        isOpen={isMobileMenuOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            rounded={'full'}
            boxShadow='0 4px 10px #e1e1e1'
            borderColor={'gray.100'}
            colorScheme={'dark'}
            top={3}
            right={4}
          />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <MainMenu headerMenu={headerMenu} />
          </DrawerBody>
          <DrawerFooter>
            <VStack>
              <SocialLinks SocialMenu={SocialMenu} />
              <SidebarMenu footerMenu={footerMenu} />
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <SearchModal isOpen={isSearchOpen} onClose={onSearchClose} />
    </>
  );
};

const SearchModal: React.FC<Props> = props => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'sm', md: 'xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          rounded={'full'}
          boxShadow='0 4px 10px #e1e1e1'
          borderColor={'gray.100'}
          colorScheme={'dark'}
          top={3}
          right={4}
          size='sm'
        />
        <ModalBody p={8}>
          <SearchForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
