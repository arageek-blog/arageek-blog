import { Center, Icon, Text, VStack } from '@chakra-ui/react';
import { Heading, Slider } from 'components/shared';
import { QuoteUp } from 'iconsax-react';
import React from 'react';

export const QuotesSlider: React.FC = ({ acf }) => {
  const { person_quotes, person_nickname_ar } = acf;

  if (!person_quotes) {
    return null;
  }

  const quotesArr = person_quotes.split('|');

  if (quotesArr.length === 0) {
    return null;
  }

  return (
    <>
      <VStack align={'stretch'} spacing={2}>
        <Heading id='quotes' title={`أشهر أقوال ${person_nickname_ar}`} />

        <Slider gap={4}>
          {quotesArr.map((quote, index) => (
            <Slide key={index} quote={quote} personName={person_nickname_ar} />
          ))}
        </Slider>
      </VStack>
    </>
  );
};

interface SlideProps {
  quote: string;
  personName: string;
}

const Slide: React.FC<SlideProps> = ({ quote, personName }) => {
  return (
    <Center flex='0 0 100%' p={4}>
      <VStack pos='relative' spacing={1} align={'flex-start'} as='figure'>
        <Icon
          pos={'absolute'}
          top={0}
          left={0}
          transform='auto'
          translateX={'50%'}
          boxSize={'4em'}
          color='light.500'
          zIndex={-1}
          as={QuoteUp}
          variant='Bold'
        />
        <Text
          as='blockquote'
          fontSize={'lg'}
          fontWeight='medium'
          fontStyle={'italic'}
        >
          {quote}
        </Text>
        <Text as='figcaption' fontSize={'sm'} color={'dark.600'}>
          &mdash; {personName}
        </Text>
      </VStack>
    </Center>
  );
};
