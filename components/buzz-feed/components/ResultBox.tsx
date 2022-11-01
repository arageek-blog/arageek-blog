import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spacer
} from '@chakra-ui/react';
import { ShareMenu } from 'components/shared';
import { BsCheckLg } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { htmlParser } from 'utls';
interface Props {
  status: string;
  setStatus?: (string) => void;
  buzzType: string;
  resultCount: number;
  point_description: string;
  name: string;
  description: string;
  questions: [];
  listResultQuestion: [];
}

export const ResultBox = ({
  status,
  buzzType,
  resultCount,
  questions,
  point_description,
  setStatus,
  name,
  description,
  listResultQuestion
}: Props) => {
  return (
    <Box>
      {status === 'RESULT' && (
        <Box bg='red.400' p='4' borderRadius={'md'}>
          <Box
            color='black'
            bg='white'
            borderRadius={'md'}
            p='6'
            textAlign='center'
          >
            {buzzType === 'trivia' ? (
              <>
                <Heading as='h3'>
                  لقد حققت {resultCount} من {questions.length}
                </Heading>
                <Heading mt='2'>
                  {' '}
                  بنسبة {(resultCount * 100) / questions.length}%
                </Heading>
                {point_description && htmlParser(point_description)}
              </>
            ) : (
              <>
                <Heading as='h3' mb='6'>
                  {name}
                </Heading>
                {description && htmlParser(description)}
              </>
            )}
          </Box>
          {buzzType === 'trivia' && (
            <Box p='6'>
              {listResultQuestion?.map((result, index) => {
                const { questionTest, isTrue } = result;
                return (
                  <Flex
                    key={index}
                    color='white'
                    fontSize={'xl'}
                    // justifyContent='space-between'
                  >
                    <Box>{htmlParser(questionTest)}</Box>
                    <Spacer />
                    <Box>
                      {isTrue ? (
                        <IconButton
                          cursor={'auto'}
                          size='sm'
                          ml='4'
                          mt='3'
                          aria-label=''
                          icon={<Icon as={BsCheckLg} />}
                        />
                      ) : (
                        <IconButton
                          cursor={'auto'}
                          size='sm'
                          ml='4'
                          mt='3'
                          aria-label=''
                          color='red'
                          icon={<Icon as={IoClose} fontSize='xl' />}
                        />
                      )}
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          )}
          <HStack
            bg='white'
            p='2'
            borderRadius={'md'}
            mt='4'
            justifyContent={'space-between'}
          >
            <Button
              fontSize={{ base: 'sm' }}
              onClick={() => {
                window.location.reload();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setStatus('PLAYING');
              }}
              bg='white'
            >
              حاول مرة أخرى{' '}
            </Button>

            <ShareMenu link='/' title='quiz' />
          </HStack>
        </Box>
      )}
    </Box>
  );
};
