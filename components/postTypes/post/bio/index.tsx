import { VStack } from '@chakra-ui/react';
import { AdsSlot } from 'components/ads';
import { Breadcrumb, ContentRenderer } from 'components/shared';
import {
  Brief,
  ContentSection,
  Infographic,
  InterviewsSlider,
  MetaFooter,
  OtherDetails,
  QuotesSlider,
  RelatedItems,
  Sources,
  SuggestsLinks
} from './components';

const BioTemplate: React.FC = ({ data }) => {
  const {
    excerpt,
    content,
    acf,
    title,
    link,
    modified,
    _embedded,
    id,
    type,
    breadcrumb,
    related_items
  } = data;
  const {
    person_nickname_ar,
    person_beginnings,
    person_personal_life,
    person_facts,
    person_death,
    person_achievements
  } = acf;

  return (
    <VStack align={'stretch'} spacing={8}>
      <Brief {...{ acf, _embedded }} />
      <Breadcrumb {...{ breadcrumb }} />
      <ContentRenderer content={excerpt.rendered} />
      <AdsSlot place={`${id}_post_content_1`} />
      <ContentSection
        id={'biography'}
        title={`السيرة الذاتية لـ ${person_nickname_ar}`}
        content={content.rendered}
      />
      <RelatedItems items={related_items} />
      <ContentSection
        id={'beginnings'}
        title={`البدايات`}
        content={person_beginnings}
      />
      <ContentSection
        id={'personalLife'}
        title={`الحياة الشخصية`}
        content={person_personal_life}
      />
      <AdsSlot place={`${id}_post_content_1`} />
      <ContentSection
        id={'facts'}
        title={`حقائق عن ${person_nickname_ar}`}
        content={person_facts}
      />
      <QuotesSlider {...{ acf }} />
      <ContentSection
        id={'death'}
        title={`وفاة ${person_nickname_ar}`}
        content={person_death}
      />
      <ContentSection
        id={'achievements'}
        title={`الإنجازات`}
        content={person_achievements}
      />
      <OtherDetails {...{ acf }} />
      <Infographic {...{ acf }} />
      <InterviewsSlider {...{ acf }} />
      <Sources {...{ acf }} />
      <MetaFooter {...{ title, link, modified }} />
      <SuggestsLinks />
    </VStack>
  );
};

export default BioTemplate;
