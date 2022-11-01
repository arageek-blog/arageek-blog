import { HStack, Icon, StackDivider, Text, VStack } from '@chakra-ui/react';
import { AuthorInfo } from 'components/shared';
import { Clock } from 'iconsax-react';
import { getFullDate } from 'utls';

export const MetaBox: React.FC = ({ date, reading_time, _embedded }) => {
  const author = _embedded?.['author'][0];

  return (
    <VStack
      align={'stretch'}
      pl={2}
      borderLeftWidth={4}
      borderLeftColor={'light.500'}
    >
      <AuthorInfo author={author} />
      <HStack align={'center'} divider={<StackDivider />}>
        <Text as='time' color='dark.600' dateTime={date} lineHeight='none'>
          {getFullDate(date)}
        </Text>
        <HStack align={'center'} spacing={1}>
          <Icon as={Clock} />
          <Text color='dark.600' lineHeight='none'>
            {reading_time} د
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};
