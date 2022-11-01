import { Center } from '@chakra-ui/react';
import { NextChakraButton } from 'components/wrappers';

export const SuggestsLinks = () => {
  return (
    <Center
      as='nav'
      boxShadow={'xl'}
      p={4}
      rounded='md'
      justifyContent={'space-around'}
      borderWidth={1}
      borderColor='light.500'
    >
      <NextChakraButton href='/suggest-biography'>
        اقتراح شخصية
      </NextChakraButton>
      <NextChakraButton href='/suggest-correction'>
        اقتراح تصحيح
      </NextChakraButton>
    </Center>
  );
};
