import {
  As,
  Box,
  HStack,
  Icon,
  List,
  ListItem,
  Text,
  VStack
} from '@chakra-ui/react';
import { NextChakraIconButton, NextChakraLink } from 'components/wrappers';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { getFullDate } from 'utls';

export const BriefSummary: React.FC = ({ _embedded, acf }) => {
  const {
    person_name_ar,
    person_name_en,
    person_deathdate,
    person_dates_type,
    person_birthdate,
    person_university_degree,
    person_facebook_link,
    person_instagram_link,
    person_youtube_link,
    person_twitter_link,
    person_nickname_ar
  } = acf;

  const terms = _embedded?.['wp:term'];
  const jobs = terms?.[1];
  const nationalty = terms?.[2];
  const zodiac = terms?.[3];
  const birthCountry = terms?.[4] ?? [];
  const birthCity = terms?.[5] ?? [];
  const birthplace = [...birthCountry, ...birthCity];

  const birthdate = person_birthdate
    ? person_dates_type === 'text'
      ? person_birthdate
      : getFullDate(person_birthdate)
    : null;

  const deathdate = person_deathdate
    ? person_dates_type === 'text'
      ? person_deathdate
      : getFullDate(person_deathdate)
    : null;

  const socialLinks: SocialLink[] = [
    {
      title: 'فيسبوك',
      url: person_facebook_link as string,
      icon: FaFacebook
    },
    {
      title: 'انستغرام',
      url: person_instagram_link as string,
      icon: FaInstagram
    },
    {
      title: 'يوتيوب',
      url: person_youtube_link as string,
      icon: FaYoutube
    },
    {
      title: 'تويتر',
      url: person_twitter_link as string,
      icon: FaTwitter
    }
  ].filter(({ url }) => Boolean(url));

  return (
    <VStack align={'stretch'}>
      <Box pos={'relative'}>
        <Box
          pos={'absolute'}
          top={2}
          bottom={4}
          left='0.375em'
          transform={'auto'}
          translateX={'50%'}
          as='hr'
          height={'auto'}
          w='1'
          bgColor={'black'}
        />

        <List
          spacing={4}
          sx={{
            '& > li:last-child > .icon-wrapper': {
              backgroundColor: '#fff'
            }
          }}
        >
          <Item title='الاسم الكامل' content={person_name_ar} />
          <Item title='الاسم باللغة الانجليزية' content={person_name_en} />
          <Item title='الوظائف'>
            {jobs?.map(item => (
              <TermItem key={item.id} {...item} />
            ))}
          </Item>
          <Item title='تاريخ الميلاد' content={birthdate} />
          <Item title='تاريخ الوفاة' content={deathdate} />
          <Item title='الجنسية'>
            {nationalty?.map(item => (
              <TermItem key={item.id} {...item} />
            ))}
          </Item>
          <Item title='مكان الولادة'>
            {birthplace?.map(item => (
              <TermItem isText key={item.id} {...item} />
            ))}
          </Item>
          <Item title='درس في' content={person_university_degree} />
          <Item title='البرج'>
            {zodiac?.map(item => (
              <TermItem key={item.id} {...item} />
            ))}
          </Item>
          {socialLinks.length > 0 && (
            <Item title='الحسابات الاجتماعية' hasNoDivider>
              {socialLinks.map(item => (
                <SocialItem
                  key={item.url}
                  personName={person_nickname_ar}
                  {...item}
                />
              ))}
            </Item>
          )}
        </List>
      </Box>
    </VStack>
  );
};

interface ItemProps {
  title: string;
  content?: string;
  hasNoDivider: boolean;
}

const Item: React.FC<ItemProps> = ({
  title,
  content,
  children,
  hasNoDivider
}) => {
  const shouldRender = Boolean(content) || Boolean(children);

  if (!shouldRender) {
    return null;
  }

  return (
    <ListItem display='flex'>
      <Box className='icon-wrapper' mr={2} mt={'2'} zIndex={1}>
        <Icon
          viewBox='0 0 200 200'
          color='black'
          boxSize='0.75em'
          verticalAlign={'top'}
        >
          <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
        </Icon>
      </Box>
      <Box>
        <Text>{title}</Text>
        {content && (
          <Text fontWeight={'medium'} color='light.900' pb={1}>
            {content}
          </Text>
        )}
        <HStack
          fontWeight={'medium'}
          color='light.900'
          as='p'
          flexWrap={'wrap'}
          divider={
            hasNoDivider ? undefined : (
              <Text mr={1} as='span'>
                {' '}
                ,{' '}
              </Text>
            )
          }
        >
          {children}
        </HStack>
      </Box>
    </ListItem>
  );
};

interface TermItemProps {
  name: string;
  link: string;
  isText?: boolean;
}

const TermItem: React.FC<TermItemProps> = ({ name, link, isText }) => {
  if (isText) {
    return <Text as='span'>{name}</Text>;
  }

  return (
    <NextChakraLink href={link} title={name}>
      {name}
    </NextChakraLink>
  );
};

type SocialLink = {
  title: string;
  url: string;
  icon?: As<any>;
  personName: string;
};

const SocialItem: React.FC<SocialLink> = ({ personName, title, url, icon }) => {
  return (
    <NextChakraIconButton
      size={'sm'}
      icon={<Icon as={icon} />}
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${personName} - ${title}`}
    />
  );
};
