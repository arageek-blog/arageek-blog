import {
  Button,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NextChakraButton } from 'components/wrappers';
import { Edit2 } from 'iconsax-react';

export const WriteBtn: React.FC = () => {
  const hasIconBtn = useBreakpointValue({ base: false, md: true, xl: false });

  return (
    <Popover isLazy direction='rtl'>
      <PopoverTrigger>
        {hasIconBtn ? (
          <IconButton
            colorScheme={'dark'}
            size={'lg'}
            icon={<Icon as={Edit2} />}
            aria-label='أكتب'
            isRound
          />
        ) : (
          <Button colorScheme={'dark'} w='full' leftIcon={<Icon as={Edit2} />}>
            اكتب
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent rounded='full' w='auto'>
        <PopoverArrow />
        <PopoverBody p={0}>
          <NextChakraButton href={'/ask'} variant='ghost'>
            سؤال
          </NextChakraButton>
          <NextChakraButton href={'/blogs/publish'} variant='ghost'>
            مقال
          </NextChakraButton>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
