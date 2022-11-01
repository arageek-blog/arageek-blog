import { Box } from '@chakra-ui/react';
import { memo } from 'react';

const SpacerComponent = props => {
  const {
    attrs: { height }
  } = props;

  return <Box aria-hidden='true' h={`${height}px`} />;
};

export default memo(SpacerComponent);
