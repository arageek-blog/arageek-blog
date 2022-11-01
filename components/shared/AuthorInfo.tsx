import { HStack, Icon, IconButton } from '@chakra-ui/react';
import { Avatar } from 'components/shared';
import { NextChakraLink } from 'components/wrappers';
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
}

export const AuthorInfo: React.FC<Props> = ({ author, hasNoSocial }) => {
  if (!author) {
    return null;
  }

  const { avatar_urls, name, link, user_social_links } = author;
  const { facebook, instagram, tiktok, twitter, youtube } = user_social_links;
  const imageSrc = avatar_urls?.[48] ?? avatar_urls?.[24];

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
      url: twitter,
      icon: FaTwitter
    }
  ];

  return (
    <HStack align={'center'}>
      <Avatar name={name} src={imageSrc} />
      <NextChakraLink href={link}>{name}</NextChakraLink>
      {!hasNoSocial &&
        items
          .filter(({ url }) => Boolean(url))
          .map(({ icon, url, title }, index) => (
            <IconButton
              as='a'
              icon={<Icon as={icon} />}
              size='xs'
              key={index}
              href={url}
              isRound
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`رابط ${title}`}
            />
          ))}
    </HStack>
  );
};
