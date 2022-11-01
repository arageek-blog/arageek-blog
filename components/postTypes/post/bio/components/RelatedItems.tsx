import { Box, VStack } from '@chakra-ui/react';
import { BioItem, BioItemProps, Heading, Slider } from 'components/shared';
import React from 'react';

export const RelatedItems: React.FC = ({ items }) => {
  if (!Array.isArray(items) || items?.length === 0) {
    return null;
  }

  return (
    <VStack align={'stretch'} spacing={2}>
      <Heading id='related-people' title={'اقرأ أيضا عن'} />
      {items.length > 0 && (
        <Slider gap={4}>
          {items.map(item => (
            <Slide key={item.id} {...item} />
          ))}
        </Slider>
      )}
    </VStack>
  );
};

const Slide: React.FC<BioItemProps> = props => {
  return (
    <Box
      pos='relative'
      flexGrow={0}
      flexShrink={0}
      flexBasis={{ base: '50%', md: '33.3%' }}
    >
      <BioItem {...props} />
    </Box>
  );
};
