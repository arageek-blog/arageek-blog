import { Heading, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { NextChakraLink } from 'components/wrappers';

import { getCurrentMonth, getMonthName } from 'utls';

const CURRENT_MONTH = getCurrentMonth();

const yearMonths = Array(12)
  .fill('')
  .map((_, index) => 1 + index);

const emptyMonthsForThisYear = yearMonths.filter(item => item >= CURRENT_MONTH);

const getFilteredMonths = (
  emptyMonths: number[] = [],
  isCurrentYear: boolean
) => {
  const exludedMonths = isCurrentYear
    ? [...emptyMonths, ...emptyMonthsForThisYear]
    : emptyMonths;

  return yearMonths.filter(month => !exludedMonths.includes(month));
};

export const SitemapSingleYear = ({ emptyMonths, year, isCurrentYear }) => {
  const months = getFilteredMonths(emptyMonths, isCurrentYear);

  return (
    <VStack spacing={2} align='stretch'>
      <Heading as='h2' id={year}>
        {year}
      </Heading>
      <UnorderedList>
        {months?.map(month => (
          <ListItem key={month}>
            <NextChakraLink href={`/sitemap/${year}/${month}`}>
              {getMonthName(month)}
            </NextChakraLink>
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};
