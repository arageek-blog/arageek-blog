import {
  AspectRatio,
  AspectRatioProps,
  Image as ChakraImage,
  ImageProps
} from '@chakra-ui/react';
import NextImage from 'next/future/image';

interface Props {
  image: any;
  hasNoHover?: boolean;
  priority: boolean;
  loading: 'eager' | 'lazy';
  sizes?: string;
}

export const Image: React.FC<Props & AspectRatioProps> = ({
  as = 'figure',
  image,
  ratio,
  objectFit = 'cover',
  hasNoHover = false,
  priority,
  sizes = '(min-width: 62em) 33vw,(min-width: 30em) 50vw,100vw',
  ...rest
}) => {
  const imageWidth = image?.media_details?.width ?? image?.width;
  const imageHeight = image?.media_details?.height ?? image?.height;

  const defaultRatio = Number(imageWidth) / Number(imageHeight);
  const imageSrc = image?.source_url ?? image?.url;
  const altText = image?.alt_text ?? image?.alt ?? 'صورة';

  const imageRatio = ratio || defaultRatio || 16 / 9;

  if (!imageSrc) {
    return null;
  }

  const aspectRatioProps: AspectRatioProps = {
    as,
    overflow: 'hidden',
    w: 'full',
    maxW: 'full',
    ratio: imageRatio,
    bgColor: 'whiteAlpha.50',
    ...rest
  };

  const imageProps: ImageProps = {
    transitionProperty: 'all',
    transitionDuration: 'slower',
    transitionTimingFunction: 'ease-in-out',
    objectFit,
    objectPosition: 'center',
    w: 'full',
    h: 'full',
    ...(!hasNoHover && {
      _groupHover: {
        transform: 'auto',
        scale: 1.05
      }
    })
  };

  if (!imageWidth) {
    return (
      <AspectRatio {...aspectRatioProps}>
        <ChakraImage
          src={imageSrc}
          alt={altText}
          decoding='async'
          loading={priority ? 'eager' : 'lazy'}
          htmlHeight={imageHeight}
          htmlWidth={imageWidth}
          {...imageProps}
        />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio
      {...aspectRatioProps}
      sx={{
        '.arageek-image': {
          ...imageProps
        }
      }}
    >
      <NextImage
        className='arageek-image'
        src={imageSrc}
        alt={altText}
        width={imageWidth}
        height={imageHeight}
        priority={priority}
        sizes={sizes}
        // quality={100}
      />
    </AspectRatio>
  );
};
