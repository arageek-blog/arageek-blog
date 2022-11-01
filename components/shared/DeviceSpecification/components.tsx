import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { Slider, StarRating } from 'components/shared';
import { MdCheckCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { keyToTitle } from './config';

export const TableContent = ({ title, data, deviceKey }) => {
  return (
    <>
      <Thead>
        <Tr>
          <Th></Th>
          <Th
            fontWeight={'bold'}
            fontSize='lg'
            letterSpacing={0}
            color='light.900'
          >
            {title}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(({ key, value }, j) => {
          return (
            <Tr key={j}>
              <Td textAlign={'right'} width='48' bgColor={'light.500'}>
                {keyToTitle(key, deviceKey)}
              </Td>
              <Td>{value}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </>
  );
};

export const Features = ({ title, items, isCheck }) => {
  const list = items.flatMap((item, index) => Object.values(item));

  return (
    <VStack align={'stretch'} spacing={4}>
      <Heading as='h2' fontSize={'h4'} data-toc='exclude'>
        {title}
      </Heading>
      <List spacing={3}>
        {list.map((item, index) => (
          <ListItem key={index} display='flex'>
            <ListIcon
              as={isCheck ? MdCheckCircleOutline : MdRemoveCircleOutline}
              color={isCheck ? 'green.500' : 'red.500'}
              boxSize='1.5em'
            />
            <Text as='span'>{item}</Text>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export const Reviews = ({ items }) => {
  return (
    <Box>
      <Slider gap={4}>
        {items?.map((item, i) => (
          <ReviewItem key={i} {...item} />
        ))}
      </Slider>
    </Box>
  );
};

const ReviewItem = ({ content, site_name, rating }) => {
  return (
    <Box flex='0 0 100%'>
      <VStack align={'stretch'} spacing={4} px={4}>
        {content && <Text>{content}</Text>}
        <VStack align={'stretch'} spacing={2}>
          <Text fontWeight={'bold'}>تقييم موقع {site_name}</Text>
          <StarRating max={5} value={Number(rating)} />
        </VStack>
      </VStack>
    </Box>
  );
};
