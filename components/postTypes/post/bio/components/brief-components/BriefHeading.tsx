import { Heading } from '@chakra-ui/react';

const geners = {
  male: 'هو',
  female: 'هي',
};

export const BriefHeading: React.FC = ({ acf }) => {
  const {
    person_gender,
    person_nickname_ar,
    person_nickname_en,
    person_name_ar,
    person_name_en,
  } = acf;

  return (
    <Heading as='h1' fontSize={'h1'}>
      {`من ${geners?.[person_gender]} ${person_nickname_ar || person_name_ar} ${
        person_nickname_en || person_name_en
          ? ` - ${person_nickname_en || person_name_en}`
          : ''
      }  `}
    </Heading>
  );
};
