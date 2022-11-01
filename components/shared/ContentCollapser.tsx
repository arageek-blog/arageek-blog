import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Icon,
  useDisclosure
} from '@chakra-ui/react';
import { ArrowDown2 } from 'iconsax-react';

export const ContentCollapser = ({ children, shouldCollapseContent }) => {
  const { isOpen, onOpen } = useDisclosure({
    defaultIsOpen: !shouldCollapseContent
  });

  return (
    <Box
      pos={'relative'}
      sx={{
        '& .chakra-collapse': {
          overflow: isOpen && 'visible !important'
        }
      }}
    >
      <Collapse in={isOpen} startingHeight={'40rem'} animateOpacity>
        {children}
      </Collapse>
      {!isOpen && (
        <Flex
          align={'flex-end'}
          p={2}
          pos={'absolute'}
          inset={0}
          bgGradient='linear(to-t, white, transparent  50%)'
        >
          <Center w='full'>
            <Button
              px='8'
              onClick={onOpen}
              colorScheme={'dark'}
              fontSize='sm'
              rightIcon={<Icon as={ArrowDown2} width='md' />}
            >
              {'عرض المزيد'}
            </Button>
          </Center>
        </Flex>
      )}
    </Box>
  );
};
