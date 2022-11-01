import { Box, Center, Flex, VStack } from '@chakra-ui/react';
import { HeadingDoodle, TitleSignature } from 'assets';
import { NextChakraLink } from 'components/wrappers';
import { Heading, Image } from './';

export const BioCard = ({ title, link, image, children }) => {
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      align='center'
      as='article'
      position={'relative'}
    >
      <Box
        position={'absolute'}
        bgColor='light.500'
        top={{ base: '12.5%', md: 0 }}
        bottom={0}
        left={0}
        right={{ base: 0, md: '12.5%' }}
      />
      <VStack
        align={'stretch'}
        flex={1}
        spacing={4}
        px={4}
        py={8}
        zIndex={1}
        order={{ base: 1, md: 0 }}
      >
        <Heading
          title={title}
          background={'url(/assets/svg/title-signature.svg)'}
          backgroundRepeat={'no-repeat'}
          backgroundPosition={'bottom left'}
          pb={4}
        />
        <Box>{children}</Box>
        <Box>
          <NextChakraLink href={link}>المزيد عن {title}</NextChakraLink>
        </Box>
      </VStack>
      <Center
        w={{ base: 1 / 3, md: 1 / 4 }}
        position={'relative'}
        rounded={'md'}
        boxShadow={'lg'}
        order={{ base: 0, md: 1 }}
      >
        <HeadingDoodle
          pos={'absolute'}
          boxSize='1.25em'
          left={0}
          bottom={-2}
          transform='auto-gpu'
          translateX={'50%'}
          translateY={'50%'}
          rotate='200deg'
          zIndex={1}
        />
        <TitleSignature
          pos={'absolute'}
          right={4}
          top={0}
          transform='auto-gpu'
          translateX={'-50%'}
          rotate='-25deg'
          zIndex={1}
        />
        <Image
          image={image}
          ratio={1}
          rounded='md'
          sizes={'(min-width: 62em) 12vw, 33vw'}
        />
      </Center>
    </Flex>
  );
};
