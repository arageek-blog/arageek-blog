import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  LinkBox,
  Text
} from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';
import { Play } from 'iconsax-react';

export const TvItem = ({ _embedded, link, title, isBasic }) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  return (
    <LinkBox
      as='article'
      role={'group'}
      rounded='md'
      boxShadow={!isBasic ? 'xl' : undefined}
    >
      <Box pos='relative' boxShadow={isBasic ? 'xl' : undefined}>
        <Image
          image={featured_media}
          ratio={isBasic ? 16 / 9 : 3 / 5}
          rounded='md'
          sizes={'(min-width: 62em) 18vw, 75vw'}
        />
        <Center pos={'absolute'} inset={0} p={4}>
          <Center bgColor='light.500' rounded={'full'} w={12} h={12}>
            <Icon as={Play} boxSize={8} />
          </Center>
        </Center>
      </Box>
      {!isBasic && (
        <Flex
          align={'flex-end'}
          justify='center'
          pos={'absolute'}
          inset={0}
          rounded='md'
          p={4}
          bgGradient={`linear(to-t, blackAlpha.900, transparent  50%)`}
        >
          <Title title={title} link={link} />
        </Flex>
      )}
      {isBasic && (
        <Box mt={2}>
          <Title title={title} link={link} isBasic={isBasic} />
        </Box>
      )}
    </LinkBox>
  );
};

const Title = ({ link, title, isBasic }) => {
  return (
    <Heading
      as='span'
      textAlign={isBasic ? 'left' : 'center'}
      fontSize={isBasic ? 'h4' : 'h3'}
      color={isBasic ? 'black' : 'white'}
      pb={isBasic ? '0rem' : '0.3rem'}
    >
      <NextChakraLinkOverlay href={`${link}?vol=1`}>
        {isBasic ? (
          <Text
            as='span'
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
        ) : (
          <Text
            backgroundColor='light.500'
            pt='0.1rem'
            boxShadow='10px 0 0 #f1efe2, 10px 0 0 #f1efe2, 10px 10px 0 #f1efe2, -10px 10px #f1efe2'
            boxDecorationBreak={'clone'}
            borderRadius={'md'}
            color='black'
            as='span'
          >
            <Text
              as='span'
              pos={'relative'}
              lineHeight={'1.9rem'}
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            />
          </Text>
        )}
      </NextChakraLinkOverlay>
    </Heading>
  );
};
