import { AspectRatio, AspectRatioProps, ImageProps } from '@chakra-ui/react';
import NextImage from 'next/future/image';

const aspectRatioProps: AspectRatioProps = {
  as: 'figure',
  overflow: 'hidden',
  w: '24px',
  maxW: '24px',
  ratio: 1,
  bgColor: 'whiteAlpha.50',
  rounded: 'full'
};

const imageProps: ImageProps = {
  objectFit: 'cover',
  objectPosition: 'center',
  w: 'full',
  h: 'full'
};

export const Avatar = ({ src, name }) => {
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
        src={src}
        alt={name}
        width={24}
        height={24}
      />
    </AspectRatio>
  );
};
