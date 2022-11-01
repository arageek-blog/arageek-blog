import { AspectRatio, Box, Center } from '@chakra-ui/react';
import { useAdPlace } from 'context';
import { useEffect } from 'react';
import { dfp } from 'utls';

interface Props {
  place: string;
}

export const AdsSlot: React.FC<Props> = ({ place }) => {
  const { divId, isLoading, sizeMappings } = useAdPlace(place);

  useEffect(() => {
    if (!isLoading && !!divId) {
      dfp.showSlot(divId);
    }
  }, [isLoading, divId]);

  if (!divId) {
    return null;
  }
  console.log({ place, divId, isLoading, sizeMappings });

  const aspectRatioSize = sizeMappings?.map(
    ([width, height]) => width / height
  );
  const aspectRatioWidth = sizeMappings?.map(([width]) => width);
  const aspectRatioHeight = sizeMappings?.map(([_, height]) => height);

  if (place !== 'sidebar' && place !== 'header') {
    return (
      <Center mb='6'>
        <AspectRatio
          ratio={aspectRatioSize}
          w={aspectRatioWidth}
          bgColor={
            process.env.NODE_ENV === 'development' ? 'light.500' : 'transparent'
          }

        >
          <Box as='ins' id={divId} w={aspectRatioWidth} h={aspectRatioHeight} />
        </AspectRatio>
      </Center>
    );
  } else {
    return (
      <AspectRatio
        mx={{ base: 'auto', lg: 0 }}
        ratio={aspectRatioSize}
        w={aspectRatioWidth}
        bgColor={
          process.env.NODE_ENV === 'development' ? 'light.500' : 'transparent'
        }

      >
        <Box as='ins' id={divId} w={aspectRatioWidth} h={aspectRatioHeight} />
      </AspectRatio>
    );
  }
};
