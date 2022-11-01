import {
  AspectRatio,
  Box,
  Center,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { Heading, Slider } from 'components/shared';
import getYouTubeID from 'get-youtube-id';
import { Play } from 'iconsax-react';
import React, { useState } from 'react';

export const InterviewsSlider: React.FC = ({ acf }) => {
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const isSelected = selectedItem !== -1;

  const { person_video_link_1, person_video_link_2, person_video_link_3 } = acf;

  const items: string[] = [
    person_video_link_1,
    person_video_link_2,
    person_video_link_3
  ];

  if (!Array.isArray(items)) {
    return null;
  }

  const cleanedItems = items.filter(Boolean);

  if (cleanedItems.length === 0) {
    return null;
  }

  const onClose = () => {
    setSelectedItem(-1);
  };

  return (
    <>
      <VStack align={'stretch'} spacing={2}>
        <Heading id='interviews' title={'فيديوهات ووثائقيات'} />
        <Slider gap={4}>
          {cleanedItems.map((item, index) => (
            <Slide
              key={index}
              index={index}
              url={item}
              onClick={() => setSelectedItem(index)}
              isFullWidth={cleanedItems.length === 1}
            />
          ))}
        </Slider>
      </VStack>
      <Modal
        blockScrollOnMount
        isCentered
        motionPreset={'slideInBottom'}
        size='4xl'
        isOpen={isSelected}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {isSelected && (
            <AspectRatio maxW='100%' ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeID(
                  cleanedItems?.[selectedItem]
                )}?autoplay=1`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </AspectRatio>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

interface SlideProps {
  url: string;
  index: number;
  isFullWidth: boolean;
  onClick: () => void;
}

const Slide: React.FC<SlideProps> = ({ url, index, onClick, isFullWidth }) => {
  const videoId = getYouTubeID(url);
  const thumb = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <Box
      pos='relative'
      flex={`0 0 ${isFullWidth ? '100%' : '70%'}`}
      rounded={'md'}
      boxShadow={'lg'}
    >
      <AspectRatio ratio={16 / 9}>
        <Center>
          <Image
            rounded={'md'}
            pos={'absolute'}
            inset={0}
            w='full'
            h='full'
            objectFit={'cover'}
            src={thumb}
            loading='lazy'
            alt={`مقابلة ${index + 1}`}
          />
          <IconButton
            size={'lg'}
            icon={<Icon as={Play} />}
            onClick={onClick}
            aria-label='تشغيل الفيديو'
          />
        </Center>
      </AspectRatio>
    </Box>
  );
};
