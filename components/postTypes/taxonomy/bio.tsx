import { Button, Center, SimpleGrid, VStack } from '@chakra-ui/react';
import { BioItem } from 'components/shared';
import { useWpInfiniteItems } from 'hooks';
import { getTaxParams } from 'ssr-data/extra-data/fns/taxonomy/post';
import { CatHero } from './components';

const BioTermTemplate: React.FC = ({ data }) => {
  const { catInitialData, name: catName } = data;

  const { name, params } = getTaxParams(data);

  const { items, isLoading, loadMore, hasMore } = useWpInfiniteItems(
    name,
    params,
    catInitialData
  );

  return (
    <VStack align={'stretch'} spacing={8}>
      <CatHero name={catName} />
      <SimpleGrid gap={4} columns={{ base: 2, md: 3 }}>
        {items?.map(item => (
          <BioItem key={item.id} {...item} />
        ))}
      </SimpleGrid>
      {hasMore && (
        <Center>
          <Button
            onClick={loadMore}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            المزيد
          </Button>
        </Center>
      )}
    </VStack>
  );
};

export default BioTermTemplate;
