import { PostTypeRenderer } from 'components/postTypes/PostTypeRenderer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBuildInfo, getRouteData } from 'utls';

export default function Page() {
  // typeof window === 'object' && console.log(pageData);

  return <PostTypeRenderer />;
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context?.params || {};

  const path = `/${slug?.join('/') ?? ''}`;

  const data = await getRouteData(path);

  // console.log({ env: process.env.NODE_ENV });

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: data,

    //revalidate: 60 * 60
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getBuildInfo();

  return { paths, fallback: 'blocking' };
};
