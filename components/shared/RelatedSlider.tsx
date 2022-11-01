import {
  Box,
  Center,
  Heading as ChakraHeading,
  HStack,
  LinkBox,
  Text
} from '@chakra-ui/react';
import { Heading, Image, PostItemBasic } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';

import { Slider } from 'components/shared';

export const RelatedSlider = ({ items, type }) => {
  const isWiki = type === 'encyclopedia';

  if (!Array.isArray(items) || items?.length === 0) {
    return null;
  }

  return (
    <Box mt='6'>
      <Heading title='ذو صلة' excludeToc />
      <Slider gap={4}>
        {items
          ?.filter((_, i) => {
            if (isWiki) {
              return i < 10;
            }
            return i < 6;
          })
          ?.map(item => (
            <Slide key={item.id} {...item} isWiki={isWiki} />
          ))}
      </Slider>
    </Box>
  );
};

const Slide: React.FC = props => {
  const { isWiki, ...rest } = props;
  return (
    <Box
      pos='relative'
      flexGrow={0}
      flexShrink={0}
      flexBasis={{ base: '75%', md: isWiki ? '60%' : '40%' }}
    >
      {isWiki ? (
        <WikiItem {...rest} />
      ) : (
        <PostItemBasic {...rest} imageSize={'(min-width: 62em) 19vw, 65vw'} />
      )}
    </Box>
  );
};

const WikiItem = ({ _embedded, link, title }) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  return (
    <LinkBox as='article' role={'group'} h='full'>
      <HStack spacing={4}>
        <Box
          position={'relative'}
          borderColor='light.500'
          borderWidth={1}
          w={1 / 4}
        >
          <Box
            aria-hidden='true'
            position={'absolute'}
            inset={0}
            bgColor='light.500'
            transform={'auto'}
            translateX='-0.5rem'
            translateY='-0.5rem'
          />
          <Image
            ratio={1}
            image={featured_media}
            sizes={'(min-width: 62em) 19vw, 75vw'}
          />
        </Box>
        <Center w={3 / 4}>
          <ChakraHeading as='span' fontSize={'h4'} color={'black'}>
            <NextChakraLinkOverlay href={link}>
              <Text
                as='span'
                noOfLines={2}
                dangerouslySetInnerHTML={{ __html: title.rendered }}
              />
            </NextChakraLinkOverlay>
          </ChakraHeading>
        </Center>
      </HStack>
    </LinkBox>
  );
};
