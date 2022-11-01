import { HStack, Icon, Text } from '@chakra-ui/react';
import { ShareMenu } from 'components/shared';
import { Calendar } from 'iconsax-react';
import { getFullDate } from 'utls';

export const MetaFooter = ({ title, link, modified }) => {
  return (
    <HStack
      as='section'
      justify={'space-between'}
      bgColor='light.500'
      p={8}
      rounded='md'
    >
      <Text display={'flex'} alignItems='center'>
        <Icon as={Calendar} color='dark.600' mr={2} />
        آخر تحديث:{' '}
        <Text as='time' dateTime={modified} lineHeight='none'>
          {getFullDate(modified)}
        </Text>
      </Text>

      <ShareMenu {...{ title, link }} />
    </HStack>
  );
};
