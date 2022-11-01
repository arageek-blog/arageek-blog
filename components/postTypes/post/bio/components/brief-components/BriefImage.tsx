import { Box, BoxProps } from '@chakra-ui/react';
import { HeadingDoodle, TitleSignature } from 'assets';
import { Image } from 'components/shared';

export const BriefImage: React.FC<BoxProps> = ({ _embedded, acf, ...rest }) => {
  const { person_deathdate } = acf;
  const image = _embedded?.['wp:featuredmedia']?.[0];

  return (
    <Box position={'relative'} rounded={'md'} boxShadow={'lg'} {...rest}>
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
        right={{ base: 14, lg: 4 }}
        top={0}
        transform='auto-gpu'
        translateX={'-50%'}
        rotate='-25deg'
        zIndex={1}
      />
      <Image
        image={image}
        filter={person_deathdate ? 'grayscale(1)' : undefined}
        rounded={'md'}
        sizes={'(min-width: 62em) 18vw, 98vw'}
      />
    </Box>
  );
};
