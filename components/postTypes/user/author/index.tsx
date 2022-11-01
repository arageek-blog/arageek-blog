import { Box, Button, Center, SimpleGrid, VStack } from '@chakra-ui/react';
import { PostItemBasic } from 'components/shared';
import { useWpInfiniteItems } from 'hooks';
import { getAuthorParams } from 'ssr-data/extra-data/fns/user/author';
import { UserHero } from './components';

const UserTemplate: React.FC = ({ data }) => {
  const { authorInitialData, name: userName, description } = data;

  const { totalItems } = authorInitialData;

  const { name, params } = getAuthorParams(data);
  const { items, isLoading, loadMore, hasMore } = useWpInfiniteItems(
    name,
    params,
    authorInitialData
  );

  return (
    <VStack align={'stretch'} spacing={8}>
      <UserHero {...{ data }} totalItems={totalItems} />
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

export default UserTemplate;
