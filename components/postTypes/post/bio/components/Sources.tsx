import { GeneralSources } from 'components/shared';

export const Sources: React.FC = ({ acf }) => {
  const {
    person_source_link_1,
    person_source_link_2,
    person_source_link_3,
    person_source_link_4,
  } = acf;

  const sources: string[] = [
    person_source_link_1,
    person_source_link_2,
    person_source_link_3,
    person_source_link_4,
  ];

  if (!Array.isArray(sources)) {
    return null;
  }

  const cleanSources = sources.filter((source) => Boolean(source));

  const items = cleanSources.map((source, index) => ({
    title: `مصدر ${index + 1}`,
    href: source,
  }));

  return <GeneralSources items={items} />;
};
