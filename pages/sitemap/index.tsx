import { SitemapHead, SitemapHero, SitemapYearsList } from 'components/sitemap';

import { BasicLayout } from 'components/layouts';
import { usePageData } from 'hooks';
import { defaultQueryFn } from 'utls';

const Page = () => {
  const { emptyMonths } = usePageData();
  // console.log(emptyMonths);

  return (
    <>
      <SitemapHead />
      <BasicLayout>
        <SitemapHero />
        <SitemapYearsList emptyMonths={emptyMonths} />
      </BasicLayout>
    </>
  );
};

export default Page;

export async function getStaticProps() {
  try {
    const { data } = await defaultQueryFn({
      queryKey: [
        'html-sitemap-empty-months',
        {
          namespace: 'arageek/v1'
        }
      ]
    });

    const emptyMonths = data?.data ?? {};

    return {
      props: {
        emptyMonths
      },
      revalidate: 60 * 60
    };
  } catch (error) {
    console.log(error);
  }
}
