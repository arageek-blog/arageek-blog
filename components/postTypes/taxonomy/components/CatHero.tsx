import { Center, Heading, HStack } from '@chakra-ui/react';
import { HeadingDoodle, StarDoodle } from 'assets';
import Image from 'next/future/image';

export const CatHero: React.FC = ({ name }) => {
  return (
    <Center
      pos={'relative'}
      py={16}
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
        src={`/assets/bgs/sketches.png`}
        alt='خلفية'
        height={180}
        width={600}
        priority='true'
        // quality={100}
      />
      <HStack bgColor={'white'} zIndex={1}>
        <StarDoodle boxSize={'1.5rem'} alignSelf='flex-end' />
        <Heading as={'h1'} fontSize={'h1'} py={2}>
          {name}
        </Heading>
        <HeadingDoodle boxSize={'1.5rem'} alignSelf='flex-start' />
      </HStack>
    </Center>
  );
};
