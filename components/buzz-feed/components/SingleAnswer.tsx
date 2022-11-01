import { Box, Button, Flex, Heading, Image, VStack } from '@chakra-ui/react';

export const SingleAnswer = ({
  title,
  isSelected,
  onClick,
  isDisabled,
  answer_image,
  backgroundGradientColor
}) => {
  return (
    <Button
      p='0'
      bgGradient={
        isSelected ? 'linear(to-r, #3a3a3a, #3a3a3a)' : backgroundGradientColor
      }
      minH={'15rem'}
      height='100%'
      width='100%'
      borderRadius='md'
      fontSize='2xl'
      transform='auto'
      scale={1}
      transitionDuration={'slow'}
      transitionTimingFunction={'ease-in-out'}
      _hover={{
        scale: 1.05
      }}
      cursor={'pointer'}
      onClick={onClick}
      isDisabled={isDisabled ? true : false}
      color={isSelected ? 'white' : 'black'}
    >
      <Flex h={'full'}>
        {answer_image ? (
          <VStack gap={0}>
            <Box>
              <Image
                src={answer_image}
                alt='Dan Abramov'
                objectFit={'cover'}
                backgroundImage={'cover'}
                borderEndRadius={2}
              />
            </Box>

            <Heading
              as='h2'
              p='2'
              mb={4}
              fontSize={'2xl'}
              mb={4}
              whiteSpace={'break-spaces'}
            >
              {title}
            </Heading>
          </VStack>
        ) : (
          <Heading whiteSpace={'break-spaces'} m={'auto'}>
            {title}
          </Heading>
        )}
      </Flex>
    </Button>
  );
};
