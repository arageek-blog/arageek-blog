import { memo } from 'react';
import { htmlParser } from 'utls';

const GlobalParser = props => {
  const { innerHTML } = props;

  return htmlParser(innerHTML);
};

export default memo(GlobalParser);
