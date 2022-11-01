import {
  Box,
  Grid,
  Heading,
  Text as ChakraText,
  VStack
} from '@chakra-ui/react';
import { Image } from 'components/shared';
import { useQuestionColors } from 'hooks';
import { domToReact } from 'html-react-parser';
import { useRouter } from 'next/router';
import { htmlParser } from 'utls';
import { SingleAnswer } from '.';

const replace = props => {
  const { type, name, children, attribs, parent } = props;

  if (type === 'tag' && name === 'p') {
    return (
      <ChakraText fontSize={'lg'}>
        {domToReact(children, { replace })}
      </ChakraText>
    );
  }
  if (type === 'tag' && name === 'figure') {
    return <Box as='figure'>{domToReact(children, { replace })}</Box>;
  }
  if (type === 'tag' && name === 'img') {
    const { class: className, src: url, alt, width, height } = attribs;

    const image = {
      url,
      alt,
      width,
      height
    };

    return <Image as='div' image={image} objectFit='cover' />;
  }

  if (type === 'tag' && name === 'figcaption') {
    return <Box display='none' />;
  }
};

export const SingleQuestion = ({
  answers,
  setSelectedAnswers,
  selectedAnswer,
  questionIndex,
  status,
  question,
  question_description,
  buzzType,
  id,
  ...rest
}) => {
  const router = useRouter();
  const questionText = rest?.['question-text'] ?? '';
  // const bgColor = useQuestionColors(question);

  return (
    <VStack id={id} spacing={4} align='stretch'>
      <VStack
        spacing={4}
        align='stretch'
        // bgGradient={bgColor}
        bgGradient={'linear(to-r, rgb(122 62 190), #c4377e)'}
        color={'white'}
        borderRadius='md'
        textAlign={'center'}
        pt={8}
        pb={question_description ? 0 : 8}
      >
        <Heading
          mx={'auto'}
          fontSize={'3xl'}
          fontWeight={'800'}
          textAlign={'center'}
        >
          {question ? htmlParser(question) : htmlParser(questionText)}
        </Heading>
        {question_description && (
          <VStack spacing={2} align='stretch'>
            {htmlParser(question_description, false, replace)}{' '}
          </VStack>
        )}
      </VStack>

      <Grid
        gridTemplateColumns={{
          base: 'repeat(2,1fr)',
          lg: 'repeat(auto-fit, minmax(100px, 1fr))'
        }}
        gap={4}
        width={'100%'}
      >
        {answers.map((answer, answerIndex) => {
          return (
            <Box key={answerIndex} width={'100%'}>
              <SingleAnswer
                buzzType={buzzType}
                // backgroundGradientColor={bgColor}
                backgroundGradientColor={'linear(to-r, #f1efe2, #f1efe2)'}
                {...answer}
                title={
                  answer?.['answer_text']
                    ? answer?.['answer_text']
                    : answer?.['answer-text']
                }
                isSelected={
                  buzzType === 'personal'
                    ? selectedAnswer?.answerIndex === answerIndex
                    : selectedAnswer === answerIndex
                }
                isDisabled={status === 'RESULT'}
                onClick={() => {
                  setSelectedAnswers(obj => ({
                    ...obj,
                    [questionIndex]:
                      buzzType === 'personal'
                        ? {
                            answerIndex: answerIndex,
                            personalitiesPoints: answer?.personalities_points
                          }
                        : answerIndex
                  }));
                  router.push(`#${id + 1}`);
                }}
              />
            </Box>
          );
        })}
      </Grid>
    </VStack>
  );
};
