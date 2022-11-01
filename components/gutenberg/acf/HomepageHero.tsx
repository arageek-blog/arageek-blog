import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react';
import { EyesSvg } from 'assets';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';
import { Play } from 'iconsax-react';
import { memo } from 'react';

const HomepageHero = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;
  const { section_title, with_icon } = data;
  const { items } = initialData;

  const item = items?.[0];

  if (!item) {
    return null;
  }

  const { _embedded, title, link, type } = item;
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];

  const isTv = type === 'tv';

  return (
    <Box
      as='article'
      pos={'relative'}
      mb={14}
      mt={0}
      w={{ base: '100%', lg: '96%' }}
    >
      <Box display={{ lg: 'none' }} pos='relative'>
        <Image
          image={featured_media}
          ratio={16 / 9}
          priority='true'
          sizes={'(min-width: 62em) 49vw, 98vw'}
        />
        {isTv && (
          <Center pos={'absolute'} inset={0} p={4}>
            <Center bgColor='light.500' rounded={'full'} w={12} h={12}>
              <Icon as={Play} boxSize={8} />
            </Center>
          </Center>
        )}
      </Box>
      <Box>
        <HStack>
          <Box w={2 / 3} display={{ base: 'none', lg: 'block' }} pos='relative'>
            <Image
              image={featured_media}
              ratio={16 / 9}
              priority='true'
              sizes={'(min-width: 62em) 49vw, 98vw'}
            />
            {isTv && (
              <Center pos={'absolute'} inset={0} p={4}>
                <Center bgColor='light.500' rounded={'full'} w={12} h={12}>
                  <Icon as={Play} boxSize={8} />
                </Center>
              </Center>
            )}
          </Box>
          <VStack
            w={{ base: 'full', lg: 1 / 3 }}
            align='stretch'
            p={4}
            spacing={2}
          >
            {section_title && (
              <Text fontSize={'lg'} color='light.900' fontWeight='bold'>
                {section_title}
              </Text>
            )}
            <EyesSvg w={1 / 4} />
            <Heading as='span' fontSize='h2'>
              <NextChakraLinkOverlay href={`${link}${isTv ? '?vol=1' : ''}`}>
                <Text
                  lineHeight={'1.5'}
                  as='span'
                  noOfLines={3}
                  dangerouslySetInnerHTML={{ __html: title.rendered }}
                />
              </NextChakraLinkOverlay>
            </Heading>
          </VStack>
        </HStack>
        <Box
          pos={'absolute'}
          bottom={0}
          insetX={0}
          bgColor={'light.500'}
          h={{ base: 5, lg: 10 }}
          transform={'auto'}
          translateY={'100%'}
          skewX={-45}
          transformOrigin='top'
          zIndex={0}
          aria-label='hidden'
        />
        <Box
          pos={'absolute'}
          top={0}
          insetY={0}
          bgColor={'dark.100'}
          w={{ base: 5, lg: 10 }}
          right={0}
          transform={'auto'}
          translateX={'-100%'}
          skewY={-45}
          transformOrigin='left'
          zIndex={1}
          aria-label='hidden'
        />
      </Box>
    </Box>
  );
};

export default memo(HomepageHero);
