import { VStack } from '@chakra-ui/react';
import { Content } from 'components/gutenberg';
import { ContentCollapser } from 'components/shared';
import { FooterMeta, MetaBox, RelatedList } from './components';

const Template = ({ data, shouldCollapseContent }) => {
  const {
    id,
    type,
    title,
    link,
    _embedded,
    reading_time,
    date,
    yoast_head_json,
    related_items
  } = data;

  return (
    <VStack align={'stretch'} spacing={4}>
      <MetaBox {...{ _embedded, title, reading_time, date, yoast_head_json }} />
      <ContentCollapser shouldCollapseContent={shouldCollapseContent}>
        <Content data={data} />
        <RelatedList items={related_items} />
        <FooterMeta {...{ title, link, id }} />
      </ContentCollapser>
    </VStack>
  );
};

export default Template;
