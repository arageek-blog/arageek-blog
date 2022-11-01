import type { IconButtonProps } from '@chakra-ui/react';
import {
  Button,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { ReportForm } from 'components/forms';
import { Flag2, More } from 'iconsax-react';

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  reportType: 'question' | 'answer' | 'comment' | 'user';
  reportId?: string;
}

export const ReportMenu: React.FC<Props> = ({
  reportType,
  reportId,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Popover isLazy direction='rtl'>
        <PopoverTrigger>
          <IconButton
            icon={<Icon as={More} />}
            aria-label='قائمة'
            variant={'ghost'}
            size='md'
            {...rest}
          />
        </PopoverTrigger>
        <PopoverContent rounded='full' w='auto'>
          <PopoverArrow />
          <PopoverBody p={0}>
            <Button
              leftIcon={<Icon as={Flag2} />}
              colorScheme='red'
              variant={'ghost'}
              size='sm'
              onClick={onOpen}
            >
              تبليغ
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>تبليغ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReportForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
