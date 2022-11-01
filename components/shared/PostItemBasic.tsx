import { Heading, LinkBox, Text, VStack } from '@chakra-ui/react';
import { Image } from 'components/shared';
import { NextChakraLinkOverlay } from 'components/wrappers';

interface Props {
  fontSize?: string;
  hasNoReadMore?: boolean;
  imageSize: string;
}

export const PostItemBasic: React.FC<Props> = ({
  _embedded,
  link,
  title,
  fontSize = 'h4',
  hasNoReadMore,
  imageSize = '(min-width: 62em) 49vw, 98vw'
}) => {
  const featured_media = _embedded?.['wp:featuredmedia']?.[0];

  return (
    <LinkBox as='article' role={'group'} rounded='md' h='full'>
      <VStack align={'stretch'} spacing={4} h='full'>
        <Image
          image={featured_media}
          ratio={16 / 9}
          rounded='md'
          boxShadow={'xl'}
          sizes={imageSize}
          // resizeWidth={244}
        />
        <Heading as='span' fontSize={fontSize} color={'black'}>
          {link && (
            <NextChakraLinkOverlay href={link}>
              <Text
                as='span'
                noOfLines={2}
                dangerouslySetInnerHTML={{ __html: title?.rendered }}
              />
            </NextChakraLinkOverlay>
          )}
        </Heading>
        {/* {!hasNoReadMore && (
          <Box>
            <NextChakraButton
              variant={'ghost'}
              href={link}
              rightIcon={<Icon as={ArrowLeft} boxSize={'sm'} />}
            >
              اقرأ المزيد
            </NextChakraButton>
          </Box>
        )} */}
      </VStack>
    </LinkBox>
  );
};
