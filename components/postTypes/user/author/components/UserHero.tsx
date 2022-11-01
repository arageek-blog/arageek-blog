import { Center, Heading, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import { AuthorCard } from 'components/shared';
import Image from 'next/future/image';

interface Props {
  totalItems: number;
}

export const UserHero: React.FC<Props> = ({ totalItems, data }) => {
  const { name, description } = data;
  return (
    <Stack
      flexDirection={{ base: 'column', md: 'row' }}
      p={{ md: 4 }}
      pos='relative'
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
        src={`/assets/bgs/sketches.png`}
        alt='خلفية'
        // quality={100}
      />
      <VStack align={'stretch'} order={{ base: 1, md: 0 }}>
        <Heading as='h1' fontSize={'h2'}>
          {name}
        </Heading>
        {totalItems && (
          <Text fontWeight={'bold'}>عدد المقالات المنشورة: {totalItems}</Text>
        )}

        <Text>{description}</Text>
      </VStack>
      <Spacer />
      <Center pl={{ md: 2 }}>
        <AuthorCard {...data} hasNoTitle />
      </Center>
    </Stack>
  );
};
