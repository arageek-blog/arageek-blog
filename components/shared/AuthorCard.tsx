import {
  AspectRatio,
  AspectRatioProps,
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  ImageProps,
  VStack
} from '@chakra-ui/react';
import { NextChakraLinkOverlay } from 'components/wrappers';
import NextImage from 'next/future/image';
import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

type SocialLink = {
  title: string;
  url: string;
  icon: any;
};

interface Props {
  author: any;
  hasNoSocial?: boolean;
  hasNoTitle?: boolean;
}

export const AuthorCard: React.FC<Props> = ({
  avatar_urls,
  user_social_links,
  name,
  link,
  hasNoTitle
}) => {
  const { facebook, instagram, tiktok, twitter, youtube } = user_social_links;
  const imageSrc =
    avatar_urls?.[400] ??
    avatar_urls?.[250] ??
    avatar_urls?.[150] ??
    avatar_urls?.[96];

  const items: SocialLink[] = [
    {
      title: 'فيسبوك',
      url: facebook,
      icon: FaFacebookF
    },
    {
      title: 'انستغرام',
      url: instagram,
      icon: FaInstagram
    },
    {
      title: 'تيك توك',
      url: tiktok,
      icon: FaTiktok
    },
    {
      title: 'يوتيوب',
      url: youtube,
      icon: FaYoutube
    },
    {
      title: 'تويتر',
      url: twitter && `https://twitter.com/${twitter}`,
      icon: FaTwitter
    }
  ];

  return (
    <VStack role='group' as={hasNoTitle ? 'div' : 'article'}>
      <VStack pos={'relative'}>
        <Box pos={'relative'} overflow={'hidden'} rounded='full' p={4}>
          <Icon
            pos={'absolute'}
            inset={0}
            w='full'
            h='full'
            viewBox='0 0 160 160'
            sx={{
              circle: {
                transitionProperty: 'all',
                transitionDuration: 'slower',
                transitionTimingFunction: 'ease-in-out',
                fill: 'transparent',
                stroke: 'black',
                strokeDasharray: '0, 4, 28, 60, 28, 0',
                strokeDashoffset: 0
              }
            }}
            _groupHover={{
              circle: {
                strokeDasharray: '30, 30'
              }
            }}
          >
            <circle cx='80' cy='80' r='77' strokeWidth='1'></circle>
          </Icon>
          <AuthorCardImage src={imageSrc} name={name} />
        </Box>
        {!hasNoTitle && (
          <Heading as='h1' fontSize='h4' textAlign={'center'}>
            <NextChakraLinkOverlay href={link}>{name}</NextChakraLinkOverlay>
          </Heading>
        )}
      </VStack>
      <HStack align={'center'}>
        {items
          .filter(({ url }) => Boolean(url))
          .map(({ icon, url, title }, index) => (
            <IconButton
              as='a'
              icon={<Icon as={icon} />}
              size='xs'
              key={index}
              href={url}
              isRound
              variant={'ghost'}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`رابط ${title}`}
            />
          ))}
      </HStack>
    </VStack>
  );
};

const aspectRatioProps: AspectRatioProps = {
  as: 'figure',
  overflow: 'hidden',
  w: '128px',
  maxW: '128px',
  ratio: 1,
  bgColor: 'whiteAlpha.50',
  rounded: 'full'
};

const imageProps: ImageProps = {
  objectFit: 'cover',
  objectPosition: 'center',
  w: 'full',
  h: 'full',
  transitionProperty: 'all',
  transitionDuration: 'slower',
  transitionTimingFunction: 'ease-in-out',
  _groupHover: {
    transform: 'scale(1.05)'
  }
};

const AuthorCardImage = ({ src, name }) => {
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
        width={128}
        height={128}
        priority='true'
        // quality={100}
      />
    </AspectRatio>
  );
};
