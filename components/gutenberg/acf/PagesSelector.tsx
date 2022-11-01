import { Center, Heading, LinkBox, SimpleGrid, Text } from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';
import { memo } from 'react';

const PagesSelector = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { items } = initialData;

  if (items.length === 0) {
    return null;
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
      {items?.map(item => (
        <PageItem key={item?.id} {...item} />
      ))}
    </SimpleGrid>
  );
};

const PageItem = ({ title, link, _embedded }) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  return (
    <LinkBox
      as='article'
      role={'group'}
      overflow='hidden'
      rounded='md'
      boxShadow={'xl'}
    >
      <Image
        image={featured_media}
        ratio={16 / 9}
        rounded='md'
        sizes={'(min-width: 62em) 15w, 49vw'}
      />
      <Center
        bgColor={'blackAlpha.700'}
        pos={'absolute'}
        inset={0}
        p={4}
        transitionProperty={'background'}
        transitionDuration='slower'
        transitionTimingFunction='ease-in-out'
        _groupHover={{
          bg: 'blackAlpha.500'
        }}
      >
        <Heading as='span' textAlign={'center'} fontSize='h4' color='white'>
          <NextChakraLinkOverlay href={link}>
            <Text
              as='span'
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            />
          </NextChakraLinkOverlay>
        </Heading>
      </Center>
    </LinkBox>
  );
};

export default memo(PagesSelector);
