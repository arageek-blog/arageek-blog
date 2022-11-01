import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  useDisclosure
} from '@chakra-ui/react';

import { ContentRenderer } from 'components/shared';
import { memo } from 'react';

const SeeMoreContent = props => {
  const { isOpen, onOpen } = useDisclosure();

  const {
    attrs: {
      data: {
        text = '',
        initial_height,
        gradient_color_top,
        gradient_color_bottom,
        more_text = 'المزيد'
      } = {}
    }
  } = props;

  return (
    <Box pos={'relative'}>
      <Collapse
        in={isOpen}
        startingHeight={`${initial_height}px`}
        animateOpacity
      >
        <ContentRenderer content={text} px={1} />
      </Collapse>
      {!isOpen && (
        <Flex
          align={'flex-end'}
          p={4}
          pos={'absolute'}
          inset={0}
          bgGradient={`linear(to-t, ${gradient_color_bottom}, transparent  90%)`}
        >
          <Center w='full'>
            <Button onClick={onOpen}>{more_text}</Button>
          </Center>
        </Flex>
      )}
    </Box>
  );
};

export default memo(SeeMoreContent);
