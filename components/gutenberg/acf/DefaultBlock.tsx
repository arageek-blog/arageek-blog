import { Box, Heading } from '@chakra-ui/react';
import { memo } from 'react';

const DefaultBlock = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName
  } = props;

  return (
    <Box>
      <Heading>{blockName}</Heading>
    </Box>
  );
};

export default memo(DefaultBlock);
