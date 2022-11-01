import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image as ChakraImage,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react';
import { Image } from 'components/shared';
import { Play } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { getDuration } from 'utls';

import { useTVContext } from './TvContext';

const Player = ({ isSelected, scrollNext, onSlideClick, acf, _embedded }) => {
  const ref = useRef();
  const { isMuted, isPlaying, nextBtnEnabled, isMobile } = useTVContext();
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const { podcast_audio } = acf;
  const { url } = podcast_audio;

  const featured_media = _embedded?.['wp:featuredmedia']?.[0];
  const { source_url, media_details } = featured_media;

  useEffect(() => {
    if (played !== 0) {
      setPlayed(0);
      if (ref?.current) {
        ref?.current?.seekTo(0);
      }
    }
  }, [isSelected]);

  const handleDuration = duration => {
    setDuration(duration);
  };

  const handleSeekChange = value => {
    ref.current.seekTo(parseFloat(value) / 100);
  };

  // const handleSeekMouseDown = (e) => {
  //   e.stopPropagation();
  //   setSeeking(true);
  // };

  // const handleSeekMouseUp = (e) => {
  //   e.stopPropagation();
  //   setSeeking(false);
  //   ref.current.seekTo(parseFloat(e.target.value));
  // };

  const handleSeekClick = e => {
    e.stopPropagation();
  };

  const handleProgress = playedObject => {
    if (!seeking) {
      setPlayed(playedObject.played);
    }
  };

  const handleEnd = () => {
    if (nextBtnEnabled) {
      scrollNext();
    }
  };

  return (
    <Center pos='relative' w='full' h='full'>
      {source_url && (
        <ChakraImage
          src={source_url}
          alt='صورة الخلفية'
          pos='absolute'
          w={'10%'}
          h={'10%'}
          right='50%'
          top='50%'
          opacity={0.3}
          filter='blur(2px)'
          transform='auto'
          scale={11}
        />
      )}
      <Box
        display={{ base: 'block', lg: 'block' }}
        alignItems={'center'}
        pos='relative'
        minH={'100vh'}
        w='full'
      >
        <ReactPlayer
          ref={ref}
          url={url}
          playing={isPlaying && isSelected ? true : false}
          muted={isMuted}
          playsinline
          height={'100%'}
          width={'100%'}
          onEnded={handleEnd}
          onDuration={handleDuration}
          onProgress={handleProgress}
          controls={false}
        />
        <Center
          role='group'
          pos={'absolute'}
          flexDirection='column'
          inset={0}
          justifyContent='space-between'
          py={6}
          px={{ base: 6, lg: 24 }}
          cursor='pointer'
          onClick={onSlideClick}
        >
          <Box></Box>

          <Box w={'full'} position='relative'>
            <Image image={featured_media} hasNoHover />
            <Center pos='absolute' inset={0}>
              {!isPlaying && (
                <IconButton
                  colorScheme='whiteAlpha'
                  aria-label='تشفيل الفيديو'
                  icon={<Icon as={Play} />}
                  height={24}
                  minW={24}
                  rounded='full'
                  fontSize={'3xl'}
                />
              )}
            </Center>
          </Box>

          <Box w='full'>
            <HStack
              display={{ base: 'none', lg: 'flex' }}
              w='full'
              opacity={0}
              visibility='hidden'
              transitionProperty={'common'}
              transitionDuration='slower'
              transitionTimingFunction='ease-in-out'
              _groupHover={{
                opacity: 1,
                visibility: 'visible'
              }}
            >
              <Box w='full'>
                <Slider
                  pointerEvents={'all'}
                  flex='1'
                  focusThumbOnChange={false}
                  direction='rtl'
                  isReversed
                  aria-label='slider-ex-1'
                  min={0}
                  max={99.99}
                  value={played * 100}
                  onChange={handleSeekChange}
                  colorScheme='light'
                  onClick={handleSeekClick}
                  _hover={{
                    '.chakra-slider__thumb': {
                      opacity: 1,
                      visibility: 'visible'
                    }
                  }}
                >
                  <SliderTrack bg={'whiteAlpha.200'}>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    opacity={0}
                    visibility='hidden'
                    transitionProperty={'common'}
                    transitionDuration='slower'
                    transitionTimingFunction='ease-in-out'
                  />
                </Slider>
              </Box>
              <Durations duration={duration} played={played} />
            </HStack>
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export const Durations = ({ duration, played }) => {
  return (
    <Box color='white'>
      <Text>
        <Text as='time' dateTime={`P${Math.round(duration)}S`}>
          {getDuration(duration)}
        </Text>
        /
        <Text as='time' dateTime={`P${Math.round(duration * played)}S`}>
          {getDuration(duration * played)}
        </Text>
      </Text>
    </Box>
  );
};

export default Player;
