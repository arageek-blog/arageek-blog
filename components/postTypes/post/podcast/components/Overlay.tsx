import {
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { Heading } from 'components/shared';
import { htmlParser } from 'utls';

import { LogoCircle } from 'assets';
import { NextChakraIconButton } from 'components/wrappers';
import { useComments } from 'context';
import {
  ArrowDown2,
  ArrowUp2,
  Back,
  Messages1,
  Send2,
  VolumeHigh,
  VolumeSlash
} from 'iconsax-react';
import { useCallback } from 'react';
import useShare from 'use-share';
import { getFullUrl } from 'utls';
import { useTVContext } from './TvContext';

const onTouchStartCapture = () => {};

export const Overlay = ({ scrollPrev, scrollNext }) => {
  const size = useBreakpointValue({ base: 'md', lg: 'lg' });
  const { isMuted, setIsMuted, nextBtnEnabled, prevBtnEnabled, currentItem } =
    useTVContext();
  const {
    id,
    title,
    uri,
    yoast_head_json: { og_title, og_description }
  } = currentItem;
  const onCommentsOpen = useComments(id);
  const { share } = useShare({
    title: og_title,
    text: og_description,
    url: getFullUrl(uri)
  });

  const handleMuted = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted, setIsMuted]);

  // const handleComments = useCallback(() => {
  //   showCommentsHandler();

  // }, [showCommentsHandler]);

  const buttonsProps: IconButtonProps = {
    colorScheme: 'whiteAlpha',
    pointerEvents: 'all',
    'aria-label': 'default',
    size
  };

  return (
    <HStack
      w='full'
      pos={{ base: 'fixed', lg: 'absolute' }}
      inset={0}
      px={4}
      pt={8}
      zIndex={1}
      pointerEvents='none'
      sx={{
        touchAction: 'none'
      }}
      onTouchStartCapture={onTouchStartCapture}
    >
      <VStack align={'stretch'} h='full' w='full' justify={'space-between'}>
        <Box>
          <LogoCircle color='white' w={{ base: 10, lg: 12 }} />
        </Box>
        <Flex>
          <VStack display={{ base: 'none', lg: 'flex' }}>
            <IconButton
              {...buttonsProps}
              icon={<Icon as={ArrowUp2} />}
              onClick={scrollPrev}
              isDisabled={!prevBtnEnabled}
              aria-label='السابق'
            />
            <IconButton
              {...buttonsProps}
              icon={<Icon as={ArrowDown2} />}
              onClick={scrollNext}
              isDisabled={!nextBtnEnabled}
              aria-label='التالي'
            />
          </VStack>
        </Flex>
        <Box pb={4}>
          <Box display={{ base: 'none', lg: 'block' }}>
            <IconButton
              {...buttonsProps}
              icon={<Icon as={isMuted ? VolumeSlash : VolumeHigh} />}
              aria-label='التحكم بالصوت'
              onClick={handleMuted}
            />
          </Box>
          <Content />
        </Box>
      </VStack>
      <VStack h='full' justify={'space-between'}>
        <Box>
          <NextChakraIconButton
            {...buttonsProps}
            href='/audio'
            icon={<Icon as={Back} />}
            aria-label='عودة'
          />
        </Box>
        <Box pb={4}>
          <VStack display={{ base: 'flex', lg: 'none' }}>
            <IconButton
              {...buttonsProps}
              icon={<Icon as={isMuted ? VolumeSlash : VolumeHigh} />}
              aria-label='التحكم بالصوت'
              onClick={handleMuted}
            />
            <IconButton
              {...buttonsProps}
              icon={<Icon as={Messages1} />}
              onClick={onCommentsOpen}
              aria-label='التعليقات'
            />
            <IconButton
              {...buttonsProps}
              icon={<Icon as={Send2} />}
              aria-label='مشاركة'
              onClick={share}
            />
          </VStack>
        </Box>
      </VStack>
    </HStack>
  );
};

const Content = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { currentItem } = useTVContext();
  const { title, content, id } = currentItem;

  return (
    <Box display={{ lg: 'none' }} color='white' pointerEvents={'all'}>
      <Collapse startingHeight={60} in={isOpen} onClick={onToggle}>
        <VStack align={'stretch'}>
          <Heading as='h1' fontSize={'lg'} title={title?.rendered} />
          <Box
            sx={{
              p: {
                lineHeight: 'tall'
              }
            }}
          >
            {content?.rendered && htmlParser(content.rendered)}
          </Box>
        </VStack>
      </Collapse>
    </Box>
  );
};
