import { memo } from 'react';
import { htmlParser } from 'utls';

const ShortcodeComponent = props => {
  const { innerHTML } = props;

  return htmlParser(innerHTML, false);
};

export default memo(ShortcodeComponent);
