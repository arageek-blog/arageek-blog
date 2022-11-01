import { Center, chakra, Flex, Heading, List, Text } from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLink } from 'components/wrappers';
import { isValidMotionProp, motion } from 'framer-motion';
import { memo, useState } from 'react';

const ListItem = chakra(motion.li, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children'
});

const CARD_OFFSET = 20;
const SCALE_FACTOR = 0.06;

const SwiperCards = props => {
  const { initialData } = props;
  const { items } = initialData;

  const [cards, setCards] = useState(items);

  const moveToEnd = () => {
    const [firstItem, ...rest] = cards;
    setCards([...rest, firstItem]);
  };

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <Center pos={'relative'}>
      <List pos={'relative'} paddingBottom={`${(100 * 3) / 4}%`} w='70%'>
        {cards.map((item, index) => {
          const canDrag = index === 0;

          return (
            <ListItem
              key={item?.id}
              position='absolute'
              top={0}
              w='full'
              transformOrigin='center'
              cursor={canDrag ? 'grab' : 'auto'}
              animate={{
                left: index * CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: items.length - index
              }}
              drag={canDrag ? 'x' : false}
              dragConstraints={{ left: 0 }}
              onDragEnd={moveToEnd}
              dragSnapToOrigin
            >
              <Item {...item} />
            </ListItem>
          );
        })}
      </List>
    </Center>
  );
};

const Item = ({ _embedded, link, title }) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  return (
    <Flex
      as='article'
      w='full'
      h='full'
      overflow={'hidden'}
      pos='relative'
      rounded='md'
      pointerEvents='none'
    >
      <Image
        image={featured_media}
        ratio={1}
        sizes={'(min-width: 62em) 34vw, 98vw'}
      />
      <Flex
        w='full'
        h='full'
        p={8}
        pos='absolute'
        inset={0}
        align='flex-end'
        bgGradient={`linear(to-t, blackAlpha.900, transparent  50%)`}
      >
        <Heading as='span' fontSize='h4' color={'white'}>
          <NextChakraLink
            href={`${link}`}
            pointerEvents='auto'
            // variant={'unstyled'}
            color={'white'}
          >
            <Text
              as='span'
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            />
          </NextChakraLink>
        </Heading>
      </Flex>
    </Flex>
  );
};

export default memo(SwiperCards);
