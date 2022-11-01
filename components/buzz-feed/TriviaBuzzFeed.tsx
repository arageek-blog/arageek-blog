import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ResultBox, SingleQuestion } from './components';

export const TriviaBuzzFeed = ({ acf }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [status, setStatus] = useState<'PLAYING' | 'RESULT'>('PLAYING');

  const { trivia_buzz, buzz_type } = acf;
  const { questions, appreciation_results } = trivia_buzz;

  useEffect(() => {
    const isComplete =
      Object.values(selectedAnswers).length === questions.length;
    if (isComplete) {
      setStatus('RESULT');
    }
  }, [selectedAnswers]);

  useEffect(() => {
    if (status === 'PLAYING') {
      setSelectedAnswers({});
    }
  }, [status]);

  const resultCount = Object.entries(selectedAnswers)
    .map(([questionIndex, answerIndex]) => {
      return questions?.[questionIndex]?.answers?.[answerIndex]?.true_answer;
    })
    .filter(answer => answer === true).length;

  const { point_description } =
    appreciation_results.find(({ points }) => Number(points) === resultCount) ??
    {};

  const listResultQuestion = Object.entries(selectedAnswers).map(
    ([questionIndex, answerIndex]) => {
      return (
        questions?.[questionIndex]?.answers?.[answerIndex] && {
          questionTest: questions?.[questionIndex]['question-text'],
          isTrue:
            questions?.[questionIndex]?.answers?.[answerIndex]?.true_answer
        }
      );
    }
  );

  return (
    <VStack align={'stretch'} spacing={12}>
      {questions?.map((question, questionIndex) => (
        <SingleQuestion
          key={questionIndex}
          {...question}
          id={questionIndex}
          questionIndex={questionIndex}
          selectedAnswer={selectedAnswers?.[questionIndex]}
          setSelectedAnswers={setSelectedAnswers}
          status={status}
          // backgroundGradientColor={'black'}
          // backgroundGradientColor={randomColors[questionIndex]}
        />
      ))}

      <ResultBox
        status={status}
        setStatus={setStatus}
        buzzType={buzz_type}
        resultCount={resultCount}
        questions={questions}
        point_description={point_description}
        listResultQuestion={listResultQuestion}
      />
    </VStack>
  );
};
