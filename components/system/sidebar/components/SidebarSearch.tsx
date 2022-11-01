import {
  Button,
  Icon,
  keyframes,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { SearchForm } from 'components/forms';
import { SearchNormal1 } from 'iconsax-react';

const searchFlickerAnimation = keyframes`
  0% { opacity: 1; }
  50% {opacity: 0; }
  100% { opacity: 1; }
`;

const animation = `${searchFlickerAnimation} 0.5s ease-in-out infinite`;

export const SidebarSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant={'unstyled'}
        textAlign='left'
        fontWeight={'medium'}
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        color='dark.600'
        mt={24}
        pb={2}
        borderRadius={0}
        w='full'
        onClick={onOpen}
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Icon as={SearchNormal1} mr={4} />
        ابحث هنا...
        <Text
          as={'span'}
          borderTop={'1px solid '}
          borderBottom={'1px solid '}
          borderColor={'dark.600'}
          lineHeight={'0.75'}
          animation={animation}
          mt={'-2'}
          ml={'1'}
        >
          |
        </Text>
      </Button>
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
    </>
  );
};
