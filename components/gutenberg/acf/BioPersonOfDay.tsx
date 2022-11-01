import { BioCard } from 'components/shared';
import { memo } from 'react';
import { htmlParser } from 'utls';

const BioPersonOfDay = props => {
  const {
    attrs: { data },
    blockIndex,
    blockName,
    initialData
  } = props;

  const { items } = initialData;

  const item = items?.[0];

  if (!item) {
    return null;
  }

  const { title, link, _embedded, excerpt } = item;

  const content = excerpt?.rendered;

  const personName = title?.rendered;

  const featured_media = _embedded?.['wp:featuredmedia']?.[0];

  return (
    <BioCard title={personName} link={link} image={featured_media}>
      {htmlParser(content)}
    </BioCard>
  );
};

export default memo(BioPersonOfDay);
