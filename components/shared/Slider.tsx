import { Box, BoxProps, Center, Icon, IconButton } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  gap: BoxProps['gap'];
}

export const Slider: React.FC<Props> = ({ children, gap }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: 'rtl',
    dragFree: false,
    containScroll: 'trimSnaps',
    draggable: Array.isArray(children) && children.length > 1
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();

    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Box pos={'relative'}>
      <Box ref={emblaRef} overflowX='hidden' px={2} py={4}>
        <Box display={'flex'} gap={gap}>
          {children}
        </Box>
      </Box>

      <SliderButton
        type='prev'
        onClick={scrollPrev}
        isEnabled={prevBtnEnabled}
      />
      <SliderButton
        type='next'
        onClick={scrollNext}
        isEnabled={nextBtnEnabled}
      />
    </Box>
  );
};

interface SliderButtonProps {
  type: 'next' | 'prev';
  onClick: () => void;
  isEnabled: boolean;
}

const ariaLabels = {
  next: 'التالي',
  prev: 'السابق'
};
const arrows = {
  next: ArrowLeft2,
  prev: ArrowRight2
};

const dir = {
  prev: 'to-r',
  next: 'to-l'
};

const SliderButton: React.FC<SliderButtonProps> = ({
  type,
  onClick,
  isEnabled
}) => {
  const isNext = type === 'next';
  return (
    <Box>
      <Center
        zIndex={10}
        position={'absolute'}
        insetY={0}
        right={isNext ? 0 : 'auto'}
        left={isNext ? 'auto' : 0}
        transform='auto'
        translateX={isNext ? '-50%' : '50%'}
        opacity={isEnabled ? 1 : 0}
        visibility={isEnabled ? 'visible' : 'hidden'}
        transitionDuration='ultra-slow'
        transitionProperty={'all'}
        transitionTimingFunction='ease-in-out'
        pointerEvents='none'
        bgGradient={`linear(${dir?.[type]}, whiteAlpha.900, transparent)`}
      >
        <IconButton
          colorScheme={'dark'}
          pointerEvents='auto'
          icon={<Icon as={arrows?.[type]} />}
          aria-label={ariaLabels?.[type]}
          onClick={onClick}
        />
      </Center>
    </Box>
  );
};
