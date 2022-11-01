import { Grid } from '@chakra-ui/react';
import { GutenbergRenderer } from 'components/gutenberg';
import { gutenbergAlignment } from 'configs/gutenburg';
import { memo } from 'react';

const ColumnComponent: React.FC = props => {
  const {
    attrs: { verticalAlignment, width },
    innerBlocks
  } = props;

  return (
    <Grid
      gridGap={4}
      // mx={{ base: 0, md: 4 }}
      // my={{ base: 4, md: 0 }}
      alignSelf={verticalAlignment ? gutenbergAlignment[verticalAlignment] : ''}
      flexGrow={1}
      flexBasis={{ base: '100%', md: width ? `${width}%` : 0 }}
      minWidth={0}
    >
      <GutenbergRenderer blocks={innerBlocks} />
    </Grid>
  );
};

export default memo(ColumnComponent);
