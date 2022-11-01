import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import { htmlParser } from 'utls';

const shortcodes = [
  'arageek_shortcode_biocard',
  'arageek_shortcode_toc',
  'arageek_shortcode_star_rating',
  'arageek_shortcode_accordion',
  'arageek_shortcode_box',
  'arageek_shortcode_video'
];

const ParagraphComponent = props => {
  const {
    attrs: {
      fontSize = 'md',
      style,
      align = 'left',
      dropCap,
      backgroundColor,
      textColor
    },
    innerHTML
  } = props;

  const customFontSize = style?.typography?.fontSize;

  const shouldAddParagraphs = !shortcodes.some(txt =>
    `${innerHTML}`.includes(txt)
  );

  return (
    <Box
      sx={{
        '& p': {
          ...(backgroundColor && {
            backgroundColor: `${backgroundColor}.500`,
            p: 4,
            color: 'white'
          }),
          color: textColor ? `${textColor}.500` : undefined,
          // textAlign: align,
          lineHeight: 'taller',
          fontSize: customFontSize ? `${customFontSize}px` : fontSize
        },
        ...(dropCap && {
          '&::first-letter': {
            float: 'left',
            fontSize: '8em',
            fontWeight: '900',
            lineHeight: 1,
            margin: '0 0.1em 0 0'
          },
          '&:after ': {
            content: '""',
            display: 'table',
            clear: 'both'
          }
        })
      }}
    >
      {htmlParser(innerHTML, shouldAddParagraphs)}
    </Box>
  );
};

export default memo(ParagraphComponent);
