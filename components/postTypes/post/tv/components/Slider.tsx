import { Box } from '@chakra-ui/react';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import dynamic from 'next/dynamic';
import { useCallback, useEffect } from 'react';
import { useKeyPressEvent } from 'react-use';
import { Overlay } from './Overlay';
import { useTVContext } from './TvContext';

const Player = dynamic(() => import('./Player'), {
  ssr: false
});

export const Slider = () => {
  const {
    slides,
    setSelectedIndex,
    selectedIndex,
    setPrevBtnEnabled,
    setNextBtnEnabled,
    setIsPlaying
  } = useTVContext();

  const wheelGestures = WheelGesturesPlugin();

  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: false,
      axis: 'y'
      // skipSnaps: true
    },
    [wheelGestures, ClassNames()]
  );

  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    embla && embla.scrollNext();
  }, [embla]);

  useKeyPressEvent('ArrowUp', scrollPrev);
  useKeyPressEvent('ArrowDown', scrollNext);

  const onSlideClick = useCallback(
    e => {
      if (embla && embla.clickAllowed()) {
        setIsPlaying(isPlaying => !isPlaying);
      }
    },
    [embla, setIsPlaying]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla) return;
    embla.reInit();
    onSelect();
  }, [embla, onSelect, slides.length]);

  return (
    <Box pos='relative' w='full'>
      <Box
        pos='relative'
        overflow={'hidden'}
        w='full'
        h='100vh'
        bgColor={'black'}
        ref={emblaRef}
        sx={{
          '&.is-draggable': {
            cursor: 'move',
            cursor: 'grab'
          },
          '&.is-dragging': {
            cursor: 'grabbing'
          }
        }}
      >
        <Box height={'100vh'} userSelect='none'>
          {slides.map((props, index) => (
            <Player
              key={props.id}
              {...props}
              isSelected={index === selectedIndex}
              scrollNext={scrollNext}
              onSlideClick={onSlideClick}
            />
          ))}
        </Box>
      </Box>
      <Overlay scrollPrev={scrollPrev} scrollNext={scrollNext} />
    </Box>
  );
};
