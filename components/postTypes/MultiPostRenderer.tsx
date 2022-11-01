import { Box, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AdsSlot } from 'components/ads';
import { PostCloseButton } from 'components/shared';
import { SeoHead } from 'components/system';
import { useDimensions } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { getPathInfo, pageview } from 'utls';
import postTypesDirectory from './postTypesDirectory';

const postTypes = {
  art: 'art',
  bio: 'bio',
  edu: 'edu',
  l: 'l',
  ibda3world: 'ibda3world',
  listat: 'listat',
  news: 'news',
  post: 'posts',
  tech: 'tech'
};

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

export const MultiPostRenderer = ({ firstItem }) => {
  const { id, type, next_posts, yoast_head } = firstItem;

  const extraPosts = Array.isArray(next_posts)
    ? next_posts?.filter(({ post_id }) => post_id !== id)
    : [];

  const uniqueExtraPosts = getUniqueListBy(extraPosts, 'post_id');

  const first = { post_id: id, post_type: type };
  const items = useMemo(
    () => [first, ...uniqueExtraPosts],
    [first, uniqueExtraPosts]
  );
  const [currentSeo, setCurrentSeo] = useState(yoast_head);

  return (
    <>
      <SeoHead {...{ yoast_head: currentSeo }} />
      <VStack align={'stretch'} spacing={20}>
        {items.map((item, index) => (
          <Item
            key={item.post_id}
            {...item}
            setCurrentSeo={setCurrentSeo}
            isFirstItem={index === 0}
            initialData={index === 0 ? { data: firstItem } : undefined}
          />
        ))}
      </VStack>
    </>
  );
};

const Item = ({
  post_id,
  post_type,
  initialData,
  setCurrentSeo,
  isFirstItem
}) => {
  const { push } = useRouter();
  const [ref, { height, top }] = useDimensions();

  const itemPostType = postTypes?.[post_type];

  const [shouldLoad, setShouldLoad] = useState(false);

  const inView = top < 0 && top > height * -1;

  const percentage = top > 0 ? 0 : (-100 * top) / height;

  useEffect(() => {
    if (top < 1200 && !shouldLoad && itemPostType) {
      setShouldLoad(true);
    }
  }, [top, shouldLoad]);

  const defaultParams = {
    namespace: `wp/v2/${itemPostType}`,
    _embed: 1,
    _headless: '1'
  };

  const { data: itemData, isLoading } = useQuery([post_id, defaultParams], {
    initialData,
    enabled: initialData ? true : shouldLoad
  });

  const data = itemData?.data;

  const { object_type, type, link } = data ?? {};
  const { url } = getPathInfo(link);
  const Component = postTypesDirectory?.[object_type]?.[type];

  useEffect(() => {
    if (inView && data && !isLoading) {
      setCurrentSeo(data.yoast_head);
      push(url, undefined, { shallow: true });
      pageview('nextPage', url, data);
    }
  }, [data, inView, isLoading, setCurrentSeo]);

  return (
    <>
      <Box ref={ref} position='relative'>
        {!isFirstItem && <AdsSlot place={`${post_id}_before_post`} />}
        {Boolean(Component) && (
          <>
            {shouldLoad && <PostCloseButton value={percentage} />}
            {data && (
              <Component data={data} shouldCollapseContent={!isFirstItem} />
            )}
          </>
        )}
      </Box>
    </>
  );
};
