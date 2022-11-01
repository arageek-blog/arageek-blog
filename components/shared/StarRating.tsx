import { Box, Flex, HStack, Icon } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export const StarRating = ({ max = 5, value }) => {
  return (
    <Box>
      <Flex display='inline-flex' pos={'relative'}>
        <HStack
          spacing={1}
          position='absolute'
          left={0}
          insetY={0}
          w={'calc(10% * var(--rate))'}
          overflow='hidden'
          style={{
            '--rate': value
          }}
        >
          {Array(max)
            .fill('')
            .map((_, i) => {
              return (
                <Icon
                  key={i}
                  as={FaStar}
                  boxSize={{ base: 3, sm: 5 }}
                  color='light.900'
                />
              );
            })}
        </HStack>
        <HStack spacing={1}>
          {Array(max)
            .fill('')
            .map((_, i) => {
              return (
                <Icon
                  key={i}
                  as={FaRegStar}
                  boxSize={{ base: 3, sm: 5 }}
                  color='light.900'
                />
              );
            })}
        </HStack>
      </Flex>
    </Box>
  );
};
