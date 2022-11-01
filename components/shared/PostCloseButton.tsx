import { Box, CircularProgress, Flex, Icon } from '@chakra-ui/react';
import { NextChakraIconButton } from 'components/wrappers';
import { MdClose, MdDone } from 'react-icons/md';

const circleSize = {
  sm: '35px',
  md: '48px'
};

export const PostCloseButton = ({ value = 0 }) => {
  const isDone = value >= 90;
  const { sm, md } = circleSize;
  return (
    <Flex
      pos={'sticky'}
      top={{ base: 2, lg: 8 }}
      right={2}
      justifyContent='flex-end'
      zIndex={'110'}
      width={'fit-content'}
      ml={'auto'}
      mt={0}
      mb={-16}
      pb={'20px'}
      mr={{ xl: '-54px' }}
    >
      <Box pos={'relative'} transform='auto'>
        <NextChakraIconButton
          icon={<Icon as={isDone ? MdDone : MdClose} />}
          href='/'
          aria-label='عودة'
          size={'lg'}
          shadow='md'
          colorScheme={isDone ? 'green' : 'light'}
          h={{ base: sm, md: md }}
          minW={{ base: sm, md: md }}
        />
        {!isDone && (
          <CircularProgress
            position={'absolute'}
            inset={0}
            min={0}
            max={100}
            value={value}
            trackColor={'transparent'}
            thickness={'5px'}
            pointerEvents='none'
            color='light.900'
            zIndex={15}
            size={{ base: sm, md: md }}
            sx={{
              '.chakra-progress__indicator': {
                transitionDuration: '0s'
              }
            }}
          />
        )}
      </Box>
    </Flex>
  );
};
