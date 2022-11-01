import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AddCommentForm } from 'components/forms';
import { useWpInfiniteItems } from 'hooks';
import { User } from 'iconsax-react';
import React, { createContext, useContext, useState } from 'react';
import { getFullDate } from 'utls';

export const CommentsContext = createContext({});

export const CommentsProvider: React.FC = ({ children }) => {
  const [id, setId] = useState('');

  const onClose = () => setId('');

  return (
    <CommentsContext.Provider
      value={{
        setId,
      }}
    >
      {children}
      <Drawer isOpen={Boolean(id)} size='sm' placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>التعليقات</DrawerHeader>

          <DrawerBody>
            <VStack align={'stretch'} spacing={8}>
              {id && <CommentsList id={id} />}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </CommentsContext.Provider>
  );
};

const CommentsList = ({ id }) => {
  const { items, isLoading, loadMore, hasMore, perPage, refetch } =
    useWpInfiniteItems('comments', { post: id });

  return (
    <>
      <VStack
        align={'stretch'}
        spacing={4}
        divider={<StackDivider borderColor='light.100' />}
      >
        {Array.isArray(items) &&
          items?.map((item) => <CommentItem key={item.id} {...item} />)}
        {isLoading &&
          Array(perPage)
            .fill(0)
            .map((_, i) => <CommentItemSkeleton key={i} />)}
        {!isLoading && items?.length === 0 && (
          <Text textAlign={'center'}>لا يوجد تعليقات, كن أول واحد...</Text>
        )}
        {hasMore && (
          <Center>
            <Button onClick={loadMore}>المزيد</Button>
          </Center>
        )}
      </VStack>
      <Box
        as='section'
        p={4}
        borderWidth={1}
        borderColor='light.500'
        rounded={'md'}
      >
        <Heading as='h2' fontSize={'h3'}>
          إضافة تعليق
        </Heading>
        <AddCommentForm id={id} callback={refetch} />
      </Box>
    </>
  );
};

const CommentItem = ({ author_name, date, content }) => {
  return (
    <VStack align={'stretch'}>
      <HStack>
        <Center bgColor='light.500' p={1} rounded='full'>
          <Icon as={User} />
        </Center>
        <Text>{author_name}</Text>
        <Spacer />
        <Text as='time' dateTime={date}>
          {getFullDate(date)}
        </Text>
      </HStack>
      <Box
        fontSize={'sm'}
        dangerouslySetInnerHTML={{ __html: content?.rendered }}
      />
    </VStack>
  );
};

const CommentItemSkeleton = () => {
  return (
    <VStack align={'stretch'}>
      <HStack>
        <SkeletonCircle size='6' />
        <Skeleton w={'60px'} height='24px' />
        <Spacer />
        <Skeleton w={'88px'} height='24px' />
      </HStack>
      <SkeletonText noOfLines={4} spacing='2' />
    </VStack>
  );
};

export const useComments = (id: string): any => {
  const { setId } = useContext(CommentsContext);

  const onOpen = () => {
    setId(id);
  };

  return onOpen;
};
