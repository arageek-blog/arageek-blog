import { Box, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { BasicLayout } from 'components/layouts';
import {
  SitemapBreadcurmb,
  SitemapHead,
  SitemapHero
} from 'components/sitemap';
import { GetStaticPaths, GetStaticProps } from 'next';

import { usePageData } from 'hooks';
import { getItemsData } from 'utls';

const Page = () => {
  const { items, year, month } = usePageData();

  return (
    <>
      <SitemapHead />
      <BasicLayout>
        <SitemapHero />
        <SitemapBreadcurmb {...{ year, month }} />

        <Box>
          <UnorderedList spacing={3}>
            {items?.data.map(item => (
              <ListItem key={item.id}>
                <Link href={item.link}>
                  <Text
                    as='span'
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </BasicLayout>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async context => {
  const { month, year } = context.params;

  try {
    const params = {
      namespace: 'arageek/v1',
      year,
      month
    };

    const { items } = await getItemsData('html-sitemap', params);

    return {
      props: {
        month,
        year,
        items
      },
      revalidate: 60 * 60
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
