import { Grid, Stack } from '@chakra-ui/react';
import {
  GutenbergChildrenRenderer,
  GutenbergRenderer
} from 'components/gutenberg';
import { gutenbergAlignment } from 'configs/gutenburg';
import { memo } from 'react';

const ColumnsComponent: React.FC = props => {
  const {
    attrs: { align, verticalAlignment = 'center' },
    innerBlocks
  } = props;

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      className={align}
      alignItems={gutenbergAlignment[verticalAlignment]}
      width='100%'
      spacing={4}
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
    >
      <GutenbergChildrenRenderer blocks={innerBlocks} />
    </Stack>
  );
};

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

export default memo(ColumnsComponent);
