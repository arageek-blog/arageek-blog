import { AspectRatio, Flex, Heading, VStack } from '@chakra-ui/react';
import { BasicLayout } from 'components/layouts';
import Image from 'next/future/image';

const Page = () => {
  return (
    <BasicLayout>
      <Flex direction={'column'} p={16}>
        <VStack spacing={4} align={'stretch'}>
          <Heading as='h1' fontSize={'3xl'} mb={5} textAlign='center'>
            أوووبس الصفحة غير موجودة 😖
          </Heading>
          <AspectRatio ratio={3 / 4}>
            <Image
              src='/assets/404/404.gif'
              alt='Not Found'
              width={640}
              height={640}
              // quality={100}
            />
          </AspectRatio>
        </VStack>
      </Flex>
    </BasicLayout>
  );
};

export default Page;
