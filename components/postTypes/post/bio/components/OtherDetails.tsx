import { Box, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { ContentRenderer, Heading } from 'components/shared';
import React from 'react';

type List = {
  value: string;
  title: string;
};

export const OtherDetails: React.FC = ({ acf }) => {
  const {
    person_other_details,
    person_parents,
    person_children,
    person_brothers,
    person_life_partner,
    person_worth,
  } = acf;

  const info = [
    {
      value: person_children,
      title: 'الأولاد',
    },
    {
      value: person_brothers,
      title: 'الإخوة',
    },
    {
      value: person_life_partner,
      title: 'الشريك / الزوج',
    },
    {
      value: person_parents,
      title: 'الأب والأم',
    },
    {
      value: person_worth,
      title: 'الثروة',
    },
  ].filter(({ value }) => Boolean(value));

  if (!person_other_details && info.length === 0) {
    return null;
  }

  return (
    <VStack align={'stretch'} spacing={2}>
      <Heading id='otherDetails' title={'بيانات أخرى'} />
      {person_other_details && (
        <ContentRenderer content={`<p>${person_other_details}</p>`} />
      )}
      {info.length > 0 && (
        <Box>
          <UnorderedList>
            {info.map(({ title, value }, index) => (
              <ListItem key={index}>
                <Text as='span' fontWeight={'semibold'} color={'light.900'}>
                  {title}:{' '}
                </Text>
                {value}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    </VStack>
  );
};
