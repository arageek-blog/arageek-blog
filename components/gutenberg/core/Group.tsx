import { Box, VStack } from '@chakra-ui/react';
import { GutenbergRenderer } from 'components/gutenberg';
import { memo } from 'react';

const GroupComponent = props => {
  const {
    attrs: { align, gradient, backgroundColor },
    innerBlocks,
    postId
  } = props;

  return (
    <Box className={align}>
      <VStack
        align={'stretch'}
        backgroundColor={backgroundColor ? `${backgroundColor}.500` : undefined}
        p={backgroundColor ? { base: 4, sm: 8 } : 0}
      >
        <GutenbergRenderer blocks={innerBlocks} postId={postId} />
      </VStack>
    </Box>
  );
};

export default memo(GroupComponent);
