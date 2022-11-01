import { SimpleGrid } from '@chakra-ui/react';
import { NextChakraLink } from 'components/wrappers';
import React from 'react';
import { getCurrentYear } from 'utls';
import { SitemapBreadcurmb } from './SitemapBreadcurmb';
import { SitemapSingleYear } from './SitemapSingleYear';

const rangeOfYears = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((year, index) => year + index);

const MAX_YEAR = getCurrentYear();

interface Props {
  key?: number;
  year?: number;
  emptyMonths?: object;
}

export const SitemapYearsList: React.FC<Props> = ({ emptyMonths }) => {
  const years = rangeOfYears(2011, MAX_YEAR);
  // console.log(emptyMonths);

  return (
    <>
      <SitemapBreadcurmb />
      <SimpleGrid gap={6} columns={{ md: 5 }} pb={16}>
        {years.map((year, index) => (
          <NextChakraLink
            key={index}
            href={`#${year}`}
            fontSize={'md'}
            minWidth={10}
            background={'light.500'}
            fontWeight={'semibold'}
            borderRadius='3xl'
            transitionProperty={'common'}
            transitionDuration='normal'
            p={2}
            textAlign={'center'}
            _before={{ content: 'initial' }}
            _hover={{ background: 'light.600' }}
          >
            {year}
          </NextChakraLink>
        ))}
      </SimpleGrid>
      {years.map((year, index) => (
        <SitemapSingleYear
          key={index}
          year={year}
          isCurrentYear={`${year}` === MAX_YEAR}
          emptyMonths={emptyMonths?.[year]}
        />
      ))}
    </>
  );
};
