import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { getFullDate } from 'utls';

interface DateTextProps {
  date?: string;
}

export const DateText: React.FC<DateTextProps & TextProps> = ({ date }) => {
  if (!date) {
    return null;
  }
  const getlocalizedDate = getFullDate(date);

  return (
    <Text as='time' fontSize={'sm'} color='dark.600' dateTime={date}>
      {getlocalizedDate === 'Invalid Date' ? date : getlocalizedDate}
    </Text>
  );
};
