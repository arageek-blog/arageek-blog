import { Box, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { AuthorInfo, Breadcrumb, Heading, Image } from 'components/shared';
import { NextChakraLink } from 'components/wrappers';
import { Calendar, Clock, TickSquare } from 'iconsax-react';
import { getFullDate } from 'utls';

export const MetaBox: React.FC = ({
  _embedded,
  title,
  reading_time,
  date,
  breadcrumb
}) => {
  const image = _embedded?.['wp:featuredmedia']?.[0];
  const author = _embedded?.['author'][0];

  return (
    <VStack align={'stretch'} spacing={4}>
      <SimpleGrid
        columns={{ md: 2 }}
        gap={8}
        flexDirection={{ base: 'column-reverse' }}
        display={{ base: 'flex', md: 'grid' }}
      >
        <Box position={'relative'} borderColor='light.500' borderWidth={1}>
          <Box
            aria-hidden='true'
            position={'absolute'}
            inset={0}
            bgColor='light.500'
            transform={'auto'}
            translateX='-1rem'
            translateY='-1rem'
          />
          <Image
            ratio={1}
            image={image}
            sizes={'(min-width: 62em) 23vw, 98vw'}
          />
        </Box>
        <VStack align={'stretch'} spacing={4}>
          <Heading as='h1' fontSize={'h1'} title={title?.rendered} />
          <VStack align={'stretch'} spacing={4}>
            <AuthorInfo author={author} />
            <InfoItem icon={TickSquare}>
              تم التدقيق بواسطة:{' '}
              <NextChakraLink href='/wiki-editors'>فريق أراجيك</NextChakraLink>
            </InfoItem>

            <InfoItem icon={Calendar} as='time' dateTime={date}>
              {getFullDate(date)}
            </InfoItem>
            <InfoItem icon={Clock}>{reading_time} د</InfoItem>
          </VStack>
        </VStack>
      </SimpleGrid>
      <Breadcrumb {...{ breadcrumb }} />
    </VStack>
  );
};

const InfoItem: React.FC = ({ icon, children, ...rest }) => {
  return (
    <HStack>
      <Icon as={icon} boxSize='6' />
      <Text lineHeight='none' {...rest}>
        {children}
      </Text>
    </HStack>
  );
};
