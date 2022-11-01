import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ResultBox, SingleQuestion } from './components';

export const PersonalBuzzFeed = ({ acf }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultName, setResultName] = useState('');
  const [status, setStatus] = useState<'PLAYING' | 'RESULT'>('PLAYING');
  const { buzz_type, personal_buzz } = acf;
  const { personal_questions, personalities } = personal_buzz;
  const { description, name } =
    personalities.find(({ name }) => name === resultName) ?? {};

  useEffect(() => {
    if (Object.values(selectedAnswers)?.length === personal_questions.length) {
      const resultCount = Object.entries(selectedAnswers)
        .map(([key, value]) => {
          return value?.personalitiesPoints;
        })
        .reduce((a, b) => {
          for (let k in b) {
            if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + Number(b[k]);
          }
          return a;
        }, {});

      const resultName = Object.keys(resultCount).reduce((a, b) =>
        resultCount[a] > resultCount[b] ? a : b
      );

      setResultName(resultName.split('_')[1]);
      setStatus('RESULT');
    }
  }, [selectedAnswers, personal_questions]);
  useEffect(() => {
    if (status === 'PLAYING') {
      setSelectedAnswers({});
      setResultName('');
    }
  }, [status]);

  return (
    <VStack align={'stretch'} spacing={12}>
      {personal_questions?.map((question, questionIndex) => {
        return (
          <SingleQuestion
            key={questionIndex}
            id={questionIndex}
            {...question}
            questionIndex={questionIndex}
            selectedAnswer={selectedAnswers?.[questionIndex]}
            setSelectedAnswers={setSelectedAnswers}
            status={status}
            buzzType={buzz_type}
            // backgroundGradientColor={randomColors[questionIndex]}
          />
        );
      })}

      <ResultBox
        status={status}
        setStatus={setStatus}
        buzzType={buzz_type}
        name={name}
        description={description}
      />
    </VStack>
  );
};
