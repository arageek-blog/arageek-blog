import { VStack } from '@chakra-ui/react';
import { Heading, Image } from 'components/shared';
import React from 'react';

export const Infographic: React.FC = ({ acf }) => {
  const { person_infographic } = acf;

  if (!person_infographic) {
    return null;
  }

  return (
    <VStack align={'stretch'} spacing={2}>
      <Heading id='infographic' title={'انفوغرافيك'} />
      <Image
        image={person_infographic}
        sizes={'(min-width: 62em) 49vw, 98vw'}
      />
    </VStack>
  );
};
