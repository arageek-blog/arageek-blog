import { VStack } from '@chakra-ui/react';
import { Content } from 'components/gutenberg';
import {
  Breadcrumb,
  ContentCollapser,
  Heading,
  Image,
  PostMetaFooter,
  TableOfContentSkeleton
} from 'components/shared';
import dynamic from 'next/dynamic';
import { MetaBox, RelatedList } from './components';

const TableOfContent = dynamic(
  () => import('components/shared/TableOfContent'),
  {
    ssr: false,
    loading: TableOfContentSkeleton
  }
);

const PostTemplate: React.FC = ({ data, shouldCollapseContent = false }) => {
  const {
    title,
    id,
    type,
    acf,
    link,
    date,
    reading_time,
    _embedded,
    breadcrumb,
    related_items
  } = data;
  const image = _embedded?.['wp:featuredmedia']?.[0];

  const hasTableOfContent = acf?.display_toc;

  return (
    <VStack align={'stretch'} spacing={8}>
      <Heading
        as='h1'
        fontSize={'h1'}
        title={title?.rendered}
        width={{ base: '86%', md: '90%', lg: '96%', xl: '100%' }}
      />
      <VStack align={'stretch'}>
        <Breadcrumb {...{ breadcrumb }} />
        <VStack align={'stretch'} spacing={4}>
          <Image
            image={image}
            sizes={'(min-width: 62em) 49vw, 98vw'}
            priority='true'
          />
          <MetaBox {...{ date, reading_time, _embedded }} />
        </VStack>
        {hasTableOfContent && <TableOfContent />}
      </VStack>
      <ContentCollapser shouldCollapseContent={shouldCollapseContent}>
        <Content data={data} />
        <PostMetaFooter {...{ title, link, id }} />
        <RelatedList items={related_items} />
      </ContentCollapser>
    </VStack>
  );
};

export default PostTemplate;
