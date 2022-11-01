import { Heading } from 'components/shared';
import { memo } from 'react';
import { getTodayZodiacArabicName } from 'utls';

const todayZodiac = getTodayZodiacArabicName();

const SectionTitle = props => {
  const {
    attrs: {
      data: { title, size, show_zodiac }
    }
  } = props;

  const hasZodiac = show_zodiac === '1';

  const headingTitle = hasZodiac ? `${title} (${todayZodiac})` : title;

  return <Heading as={size} fontSize={size} title={headingTitle} />;
};

export default memo(SectionTitle);
