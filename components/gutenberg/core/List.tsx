import { htmlParser } from 'utls';
// import { paragraphShortcodes } from './Shortcodes/ParagraphShortcodes'
import { memo } from 'react';

const ListComponent = props => {
  const { innerHTML } = props;

  //TODO Parse Shortcodes
  // return htmlParser(paragraphShortcodes(saveContent, props))

  return htmlParser(innerHTML);
};

export default memo(ListComponent);
