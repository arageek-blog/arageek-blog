import { Box, Button } from '@chakra-ui/react';
import { domToReact } from 'html-react-parser';
import { memo } from 'react';
import { htmlParser } from 'utls';

const FileComponent = props => {
  const {
    innerHTML,
    attrs: { align }
  } = props;

  const replace = props => {
    const { type, name, children, attribs, parent } = props;

    if (
      type === 'tag' &&
      name === 'a' &&
      attribs?.class?.includes('wp-block-file__button')
    ) {
      return <Box display='none' />;
    }

    if (type === 'tag' && name === 'a') {
      return (
        <Button
          as='a'
          colorScheme='light'
          href={attribs?.href}
          target={'_blank'}
          download
          rel='noreferrer noopener'
        >
          {domToReact(children, { replace })}
        </Button>
      );
    }
  };

  return htmlParser(innerHTML, false, replace);
};

export default memo(FileComponent);
