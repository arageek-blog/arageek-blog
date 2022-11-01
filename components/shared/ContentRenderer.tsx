import { VStack, VStackProps } from '@chakra-ui/react';
import { htmlParser } from 'utls';

interface Props {
  content?: string;
}

export const ContentRenderer: React.FC<Props & VStackProps> = ({
  content,
  spacing = 2,
  ...rest
}) => {
  if (!content) {
    return null;
  }

  return (
    <VStack
      spacing={spacing}
      align={'stretch'}
      w='full'
      whiteSpace={'pre-wrap'}
      lineHeight={'tall'}
      sx={{
        'h1,h2,h3,h4,h5,h6': {
          '&:not(:first-of-type)': {
            py: spacing,
          },
        },
      }}
      {...rest}
    >
      {htmlParser(content)}
    </VStack>
  );
};
