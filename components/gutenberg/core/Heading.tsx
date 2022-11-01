import { memo } from 'react';
import { htmlParser } from 'utls';

const HeadingComponent = props => {
  const {
    attrs: { textAlign = 'left', level = 2, fontSize },
    innerHTML
  } = props;

  return htmlParser(innerHTML);
};

export default memo(HeadingComponent);
