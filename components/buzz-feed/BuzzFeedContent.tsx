import { Box } from '@chakra-ui/react';
import 'react-buzzfeed-quiz/lib/styles.css';

import { PersonalBuzzFeed, TriviaBuzzFeed } from './';

export const BuzzFeedContent = ({ data }) => {
  const { acf, id } = data;

  return (
    <Box>
      {acf?.buzz_type === 'personal' ? (
        <PersonalBuzzFeed acf={acf} />
      ) : (
        <TriviaBuzzFeed acf={acf} />
      )}
    </Box>
  );
};
