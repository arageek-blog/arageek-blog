import { List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import { Calendar, Video } from 'iconsax-react';
import React from 'react';
import { htmlParser } from 'utls';

interface Props {
  title?: string;
  movie_production_year?: string;
  movie_director_name?: string;
  movie_actors?: any[];
  movie_short_desc?: string;
  icon?: any;
}

export const MovieBody: React.FC<Props> = ({
  title,
  movie_production_year,
  movie_director_name,
  movie_actors,
  movie_short_desc
}) => {
  return (
    <VStack align={'stretch'} spacing={4} p={8}>
      <Text
        as='h2'
        fontSize={'h3'}
        fontWeight='bold'
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      />
      <Text lineHeight={'taller'}>{htmlParser(movie_short_desc)}</Text>
      <List>
        <InfoListItem
          icon={Calendar}
          children={`إنتاج ${movie_production_year} `}
        />
      </List>
      <List>
        <InfoListItem icon={Video} children={`إخراج ${movie_director_name} `} />
      </List>
      <List>
        <MovieActors movie_actors={movie_actors} />
      </List>
    </VStack>
  );
};

export const InfoListItem: React.FC<Props> = ({ icon, children }) => {
  return (
    <ListItem display='flex' alignItems={'center'}>
      <ListIcon as={icon} color='light.900' boxSize={'1.5em'} />
      {children}
    </ListItem>
  );
};

export const MovieActors: React.FC<Props> = ({ movie_actors }) => {
  if (!Array.isArray(movie_actors) || movie_actors.length === 0) {
    return null;
  }

  return (
    <ListItem display='flex' alignItems={'center'}>
      <ListIcon as={Video} color='light.900' boxSize={'1.5em'} />
      {movie_actors?.map(({ actor_name }, index) => (
        <Text as={'span'} key={index}>
          {actor_name} {index != movie_actors.length - 1 ? ',' : ''}
        </Text>
      ))}
    </ListItem>
  );
};
