import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { Image, StarRating } from 'components/shared';
import { NextChakraButton } from 'components/wrappers';
import {
  ArrowDown2,
  Calendar,
  Profile,
  Profile2User,
  UserOctagon
} from 'iconsax-react';
import { chunk } from 'lodash';
import { memo } from 'react';

const MoviesList = props => {
  const {
    attrs: { data }
  } = props;
  const { movies } = data;

  const items = Array(movies)
    .fill('')
    .map((_, i) => ({
      cover: data?.[`movies_${i}_cover`],
      title: data?.[`movies_${i}_title`],
      excerpt: data?.[`movies_${i}_excerpt`],
      imdbRate: data?.[`movies_${i}_imdb_rate`],
      imdbLink: data?.[`movies_${i}_imdb_link`],
      productionYear: data?.[`movies_${i}_production_year`],
      producers: data?.[`movies_${i}_producers`],
      player_1: data?.[`movies_${i}_player_1`],
      player_2: data?.[`movies_${i}_player_2`]
    }));

  const chunkedItems = chunk(items, Math.ceil(items.length / 2));

  return (
    <SimpleGrid gap={4} columns={{ md: 2 }}>
      {chunkedItems.map((list, index) => (
        <VStack align={'stretch'} spacing={4} key={index}>
          {list.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </VStack>
      ))}
    </SimpleGrid>
  );
};

export default memo(MoviesList);

const Item = ({
  cover,
  title,
  excerpt,
  imdbRate,
  imdbLink,
  productionYear,
  producers,
  player_1,
  player_2
}) => {
  const { isOpen, onOpen } = useDisclosure();
  const image = {
    url: cover,
    alt: title
  };

  return (
    <Box
      as='article'
      rounded={'md'}
      borderWidth={1}
      borderColor='dark.300'
      boxShadow={'xl'}
      pb='2'
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        image={image}
        sizes={'(min-width: 62em) 23vw, 98vw'}
        boxSize='sm'
      />
      <Box pos={'relative'} pb={isOpen ? '2' : '10'}>
        <VStack align={'stretch'} spacing={4} p={3}>
          <Heading as='h1' fontSize={'h4'} textAlign='center' mt='2'>
            {title}
          </Heading>
          <Collapse in={isOpen} startingHeight={`120px`} animateOpacity>
            <Text lineHeight={'taller'} textAlign='center'>
              {excerpt}
            </Text>

            <VStack align={'stretch'} spacing={5}>
              <Center aria-label={`تقييم`} mt='2'>
                <StarRating value={imdbRate} />
              </Center>
              <List spacing={4} textAlign='center'>
                <InfoListItem icon={Calendar}>
                  عام الإنتاج: {productionYear}
                </InfoListItem>
                <InfoListItem icon={UserOctagon}>
                  المخرج: {producers}
                </InfoListItem>
                <InfoListItem icon={Profile}>ممثل أول: {player_1}</InfoListItem>
                <InfoListItem icon={Profile2User}>
                  ممثل ثاني: {player_2}
                </InfoListItem>
              </List>

              <Center w='full'>
                <NextChakraButton
                  href={imdbLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  color={'black'}
                  fontWeight='700'
                  fontSize={'h7'}
                  px='10'
                  py='6'
                >
                  التقييم على IMDB
                </NextChakraButton>
              </Center>
            </VStack>
          </Collapse>
          {!isOpen && (
            <Flex
              align={'flex-end'}
              // p={4}
              pos={'absolute'}
              inset={0}
              bgGradient={`linear(to-t, white, transparent  90%)`}
            >
              <Center w='full'>
                <Button
                  rightIcon={<ArrowDown2 />}
                  onClick={onOpen}
                  px='6'
                  bg='transparent'
                >
                  المزيد{' '}
                </Button>
              </Center>
            </Flex>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export const InfoListItem: React.FC = ({ icon, children }) => {
  return (
    <ListItem display='flex' alignItems={'center'} justifyContent='center'>
      <ListIcon as={icon} color='light.900' boxSize={'1.5em'} />
      {children}
    </ListItem>
  );
};
