import { AspectRatio, Box } from '@chakra-ui/react';
import { Image, Slider } from 'components/shared';
import { domToReact } from 'html-react-parser';
import { memo } from 'react';
import { htmlParser } from 'utls';

const GalleryComponent = props => {
  const { innerHTML } = props;

  // console.log(innerHTML);

  if (!innerHTML.includes('<img')) {
    return null;
  }

  return (
    <Box>
      <Slider gap={4}>{htmlParser(innerHTML, true, replace)}</Slider>
    </Box>
  );
};

const replace = props => {
  const { type, name, children, attribs, parent } = props;

  if (type === 'tag' && name === 'li') {
    return (
      <Box flex='0 0 100%'>
        <AspectRatio ratio={16 / 9}>
          <Box>{domToReact(children, { replace: replace })}</Box>
        </AspectRatio>
      </Box>
    );
  }

  if (type === 'tag' && ['ul', 'figure', 'br'].includes(name)) {
    return (
      <ChildrenRenderer>
        {domToReact(children, { replace: replace })}
      </ChildrenRenderer>
    );
  }

  if (type === 'tag' && name === 'img') {
    const { class: className, src: url, alt } = attribs;
    // console.log(attribs);

    const image = {
      url,
      alt,
      width: 624,
      height: 351
    };

    return (
      <Image
        as='div'
        image={image}
        objectFit='cover'
        ratio={16 / 9}
        sizes={'(min-width: 62em) 18vw, 75vw'}
      />
    );
  }

  return null;
};

const ChildrenRenderer = ({ children }) => {
  return children;
};

export default memo(GalleryComponent);
