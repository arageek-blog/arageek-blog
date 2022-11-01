import {
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { WikiDislikeForm } from 'components/forms';
import { ShareMenu } from 'components/shared';
import { Dislike, Like1 } from 'iconsax-react';

export const FooterMeta = ({ link, title, id }) => {
  const {
    isOpen: isLikeModalOpen,
    onOpen: onLikeModalOpen,
    onClose: onLikeModalClose
  } = useDisclosure();
  const {
    isOpen: isDislikModalOpen,
    onOpen: onDislikModalOpen,
    onClose: onDislikModalClose
  } = useDisclosure();

  return (
    <>
      <VStack
        as='section'
        boxShadow={'xl'}
        spacing={8}
        px={4}
        py={8}
        rounded='md'
        justifyContent={'space-around'}
        borderWidth={1}
        borderColor='light.500'
        align={'stretch'}
        mt='8'
      >
        <Heading as='h2' fontSize={'h3'} textAlign='center' data-toc='exclude'>
          هل أعجبك المقال؟
        </Heading>
        <Center>
          <HStack>
            <IconButton
              onClick={onLikeModalOpen}
              icon={<Icon as={Like1} />}
              aria-label='أعجبني'
            />
            <IconButton
              onClick={onDislikModalOpen}
              icon={<Icon as={Dislike} />}
              aria-label='لم يعجبني'
            />
          </HStack>
        </Center>
      </VStack>
      <MetaModal isOpen={isLikeModalOpen} onClose={onLikeModalClose}>
        <Heading as='h2' fontSize={'h2'} fontWeight='bold' textAlign={'center'}>
          يا سلام ... 😀 حرفياً أنت تقرأ المحتوى العربي الأفضل على الإنترنت
        </Heading>
        <VStack>
          <Text>شارك المحتوى 💪</Text>
          <ShareMenu {...{ link, title }} />
        </VStack>
      </MetaModal>
      <MetaModal isOpen={isDislikModalOpen} onClose={onDislikModalClose}>
        <Heading as='h2' fontSize={'h2'} fontWeight='bold' textAlign={'center'}>
          نأسف جداَ لسماع هذا! 🙁
        </Heading>
        <WikiDislikeForm id={id} callback={onDislikModalClose} />
      </MetaModal>
    </>
  );
};

const MetaModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} p={8} align='stretch'>
            {children}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
