import { Box, Button, Center, SimpleGrid, VStack } from '@chakra-ui/react';
import { PostItemBasic } from 'components/shared';
import { useWpInfiniteItems } from 'hooks';
import { getTaxParams } from 'ssr-data/extra-data/fns/taxonomy/post';
import { CatHero } from './components';

const PostTermTemplate: React.FC = ({ data }) => {
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
      <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
        {items?.map((item, index) => (
          <Box key={item.id} gridColumn={index < 2 && { md: 'span 2' }}>
            <PostItemBasic
              {...item}
              hasNoReadMore={index > 1}
              imageSize={`(min-width: 62em) ${
                index < 2 ? '49vw' : '24vw'
              }, 98vw`}
            />
          </Box>
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

export default PostTermTemplate;
