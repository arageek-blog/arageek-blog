import { BuzzFeedContent } from 'components/buzz-feed';
import { memo } from 'react';

const BuzzFeed = props => {
  const { initialData } = props;

  return <BuzzFeedContent data={initialData} />;
};

export default memo(BuzzFeed);
