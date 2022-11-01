import { Box, Wrap } from '@chakra-ui/react';
import { GutenbergChildrenRenderer } from 'components/gutenberg';
import { memo } from 'react';

const ButtonsComponent = props => {
  const { innerBlocks } = props;

  return (
    <Box>
      <Wrap>
        <GutenbergChildrenRenderer blocks={innerBlocks} />
      </Wrap>
    </Box>
  );
};

export default memo(ButtonsComponent);
