import { WrapItem } from '@chakra-ui/react';
import { NextChakraButton } from 'components/wrappers';
import { domToReact } from 'html-react-parser';
import { memo } from 'react';
import { htmlParser } from 'utls';

const ButtonComponent: React.FC = props => {
  const {
    attrs: { className, textColor = 'light' },
    innerHTML
  } = props;

  const isOutline = className === 'is-style-outline';

  const replace = props => {
    const { type, name, children, attribs, parent } = props;
    if (type === 'tag' && name === 'div') {
      return <WrapItem>{domToReact(children, { replace })}</WrapItem>;
    }
    if (type === 'tag' && name === 'a') {
      const { rel, href, target } = attribs;
      return (
        <NextChakraButton
          rel={rel}
          href={href}
          target={target}
          variant={isOutline ? 'outline' : 'solid'}
          colorScheme={textColor || 'dark'}
        >
          {domToReact(children, { replace })}
        </NextChakraButton>
      );
    }
  };

  return htmlParser(innerHTML, false, replace);
};

export default memo(ButtonComponent);
