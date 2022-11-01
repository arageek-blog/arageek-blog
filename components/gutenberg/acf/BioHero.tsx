import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image as ChakraImage,
  LinkBox,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';
import { motion } from 'framer-motion';
import { chunk } from 'lodash';
import { memo } from 'react';

const BioHero = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { items } = initialData;

  if (!Array.isArray(items)) {
    return null;
  }

  const chunkedItems = chunk(items, Math.ceil(items.length / 3));

  return (
    <Box pos={'relative'} mb={10}>
      <AspectRatio ratio={{ base: 3 / 4, md: 9 / 3 }} bgColor='black'>
        <Stack direction={{ base: 'column', md: 'row' }} pos={'relative'}>
          <VStack
            w={{ base: 'full', md: 3 / 5 }}
            align='stretch'
            p={4}
            color='white'
            order={{ base: 1, md: 0 }}
          >
            <Heading as='h1' fontSize='h2'>
              تضعكم أراجيك وجهاً لوجه مع أصحاب الرؤى غير العاديين والرواد الذين
              ساهموا في تشكيل عالمنا.
            </Heading>
            <Text>اقرأ السيرة الذاتية لأكثر من ٣٧٠٠ شخصية عربية وعالمية.</Text>
          </VStack>

          <HStack
            spacing={2}
            w={{ base: 'full', md: 2 / 5 }}
            h='full'
            zIndex={1}
            overflow='hidden'
            order={{ base: 0, md: 1 }}
          >
            {chunkedItems.map((list, index) => (
              <MotionBox key={index} list={list} isInverted={index % 2} />
            ))}
          </HStack>
          <ChakraImage
            pos='absolute'
            insetY={0}
            right={0}
            left={'20%'}
            w='80%'
            h='full'
            objectFit={'cover'}
            src={`/assets/bgs/bio.png`}
            alt='خلفية'
          />
        </Stack>
      </AspectRatio>
      <Box
        pos={'absolute'}
        bottom={0}
        insetX={0}
        bgColor={'dark.700'}
        h={{ base: 5, md: 10 }}
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
        bgColor={'dark.600'}
        w={{ base: 5, md: 10 }}
        right={0}
        transform={'auto'}
        translateX={'-100%'}
        skewY={-45}
        transformOrigin='left'
        zIndex={1}
        aria-label='hidden'
      />
    </Box>
  );
};

const MotionBox = ({ list, isInverted }) => {
  return (
    <Box w='full' h='full' position={'relative'}>
      <motion.div
        animate={{ y: isInverted ? '70%' : '-70%' }}
        transition={{
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0,
          duration: 60
        }}
        style={{
          position: 'absolute',
          top: isInverted ? 'auto' : 0,
          bottom: isInverted ? 0 : 'auto',
          width: '100%'
        }}
      >
        <VStack align={'stretch'} spacing={2}>
          {list.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </VStack>
      </motion.div>
    </Box>
  );
};

const Item = ({ link, acf, _embedded }) => {
  const { person_deathdate } = acf;
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];

  const isDead = Boolean(person_deathdate);

  return (
    <LinkBox as='article' w='full'>
      <NextChakraLinkOverlay href={link}>
        <Image
          ratio={1}
          image={featured_media}
          filter={isDead ? 'grayscale(1)' : undefined}
          priority='true'
          sizes={'(min-width: 62em) 10vw, 30vw'}
        />
      </NextChakraLinkOverlay>
    </LinkBox>
  );
};

export default memo(BioHero);
