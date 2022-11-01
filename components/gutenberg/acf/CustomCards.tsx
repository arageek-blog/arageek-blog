import { Heading, LinkBox, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';
import { memo } from 'react';

const CustomCards = props => {
  const {
    attrs: { data }
  } = props;
  const { cards } = data;

  const items = Array(cards)
    .fill('')
    .map((_, i) => ({
      title: data?.[`cards_${i}_title`],
      excerpt: data?.[`cards_${i}_excerpt`],
      thumbnail: data?.[`cards_${i}_thumbnail`],
      url: data?.[`cards_${i}_uri`],
      overlayText: data?.[`cards_${i}_overlay_text`]
    }));

  return (
    <SimpleGrid gap={4} columns={{ md: 2 }}>
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </SimpleGrid>
  );
};

export default memo(CustomCards);

const Item = ({ title, excerpt, thumbnail, url }) => {
  const image = {
    url: thumbnail,
    alt: title
  };

  return (
    <LinkBox as='article' role={'group'}>
      <VStack align={'stretch'}>
        <Image
          image={image}
          ratio={16 / 9}
          rounded='md'
          sizes={'(min-width: 62em) 49vw, 98vw'}
        />

        <Heading as='span' fontSize={'h3'} textAlign='center'>
          <NextChakraLinkOverlay href={`/${url}`}>
            {title}
          </NextChakraLinkOverlay>
        </Heading>
        <Text lineHeight={'taller'}>{excerpt}</Text>
      </VStack>
    </LinkBox>
  );
};
