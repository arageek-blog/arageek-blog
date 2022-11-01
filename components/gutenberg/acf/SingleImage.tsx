import { Box, Text } from '@chakra-ui/react';
import { Image } from 'components/shared';
import { memo } from 'react';

const SingleImage = props => {
  const {
    attrs: {
      data: { image_url: url, caption, alt_text }
    }
  } = props;

  const image = {
    url,
    alt_text,
    width: 624,
    height: 351
  };

  return (
    <Box as='figure'>
      <Image image={image} sizes={'(min-width: 62em) 49vw, 98vw'} />
      {caption && (
        <Text as={name} fontSize='sm' color={'dark.600'}>
          caption
        </Text>
      )}
    </Box>
  );
};

export default memo(SingleImage);
