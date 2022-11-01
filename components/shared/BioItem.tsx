import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  LinkBox,
  Text
} from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';
import { getYear } from 'utls';

export interface BioItemProps {
  link: string;
}

export const BioItem: React.FC<BioItemProps> = ({ link, acf, _embedded }) => {
  const {
    person_nickname_ar,
    person_nickname_en,
    person_name_ar,
    person_name_en,
    person_deathdate,
    person_birthdate
  } = acf;
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];

  const isDead = Boolean(person_deathdate);

  return (
    <AspectRatio ratio={3 / 4}>
      <LinkBox
        role={'group'}
        as='article'
        w='full'
        bgColor={'dark.700'}
        rounded={'md'}
        boxShadow={'lg'}
        overflow='hidden'
      >
        <Box pos={'relative'} w='full' alignSelf={'flex-end'}>
          <Image
            ratio={1}
            image={featured_media}
            filter={isDead ? 'grayscale(1)' : undefined}
            sizes={'(min-width: 62em) 17vw, 50vw'}
          />
          {isDead && (
            <Flex
              pos={'absolute'}
              inset={0}
              p={4}
              color='white'
              justify={'center'}
              align='flex-end'
              fontSize='sm'
            >
              <Text>
                {getYear(person_birthdate)} - {getYear(person_deathdate)}
              </Text>
            </Flex>
          )}
        </Box>
        <Box
          pos={'absolute'}
          top={0}
          insetX={0}
          w='full'
          h='100%'
          flexGrow={1}
          bgGradient='linear(to-t, transparent 0%,transparent 50%, dark.700 75%)'
          zIndex={1}
        >
          <Center p={4}>
            <Heading
              as='span'
              transitionProperty={'all'}
              transitionDuration='slower'
              transitionTimingFunction='ease-in-out'
              size='sm'
              textAlign={'center'}
              fontWeight='medium'
              color={'dark.300'}
              _groupHover={{
                color: 'white'
              }}
            >
              <NextChakraLinkOverlay
                display={'flex'}
                flexDir='column'
                href={link}
              >
                {(person_nickname_ar || person_name_ar) && (
                  <Text as='span'>{person_nickname_ar || person_name_ar}</Text>
                )}
                {(person_nickname_en || person_name_en) && (
                  <Text as='span'>{person_nickname_en || person_name_en}</Text>
                )}
              </NextChakraLinkOverlay>
            </Heading>
          </Center>
        </Box>
      </LinkBox>
    </AspectRatio>
  );
};
