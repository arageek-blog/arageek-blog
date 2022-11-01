import { Center, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { HeadingDoodle, StarDoodle } from 'assets';
import Image from 'next/future/image';
import { memo } from 'react';

const PatternedTitle = props => {
  const { attrs } = props;

  if (!attrs?.data) {
    return null;
  }

  const { data } = attrs;
  const {
    title,
    heading_level,
    padding_level,
    content,
    align,
    background = 'sketches'
  } = data;

  const level = `h${heading_level}`;

  return (
    <Center
      pos={'relative'}
      justifyContent={align}
      p={padding_level ?? 8}
      minHeight={'8rem'}
      sx={{
        '& .bg': {
          pos: 'absolute',
          inset: 0,
          w: 'full',
          h: 'full',
          objectFit: 'cover'
        }
      }}
    >
      <Image
        className='bg'
        height={180}
        width={600}
        src={`/assets/bgs/${background}.png`}
        alt='خلفية'
        priority='true'
        // quality={100}
      />
      <VStack zIndex={1} position='relative'>
        <HStack bgColor={'white'}>
          <StarDoodle boxSize={'1.5rem'} alignSelf='flex-end' />
          <Heading as={level} fontSize={level} py={2}>
            {title}
          </Heading>
          <HeadingDoodle boxSize={'1.5rem'} alignSelf='flex-start' />
        </HStack>
        {content && <Text>{content}</Text>}
      </VStack>
    </Center>
  );
};

export default memo(PatternedTitle);
