import { Button, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ShareMenu } from 'components/shared';
import { useComments } from 'context';
import { Message } from 'iconsax-react';

export const PostMetaFooter = ({ title, link, id }) => {
  const onCommentsOpen = useComments(id);
  return (
    <>
      <VStack
        as='section'
        align={'stretch'}
        spacing={4}
        bgColor='light.500'
        p={8}
        rounded='md'
        mt='6'
      >
        <Heading
          as='h2'
          fontSize={'h2'}
          data-toc='exclude'
          display={'flex'}
          alignItems='center'
        >
          <Icon as={Message} color='dark.600' mr={1} />
          <Text as='span'>عبَّر عن رأيك</Text>
        </Heading>
        <Text color='dark.600'>
          إحرص أن يكون تعليقك موضوعيّاً ومفيداً، حافظ على سُمعتكَ الرقميَّة
          واحترم الكاتب والأعضاء والقُرّاء.
        </Text>
        <HStack justify={'space-between'}>
          <Button onClick={onCommentsOpen} colorScheme={'dark'}>
            التعليقات
          </Button>

          <ShareMenu {...{ title, link }} />
        </HStack>
      </VStack>
    </>
  );
};
