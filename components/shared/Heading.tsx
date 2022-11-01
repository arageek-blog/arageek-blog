import { Heading as ChakraHeading, HeadingProps, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  excludeToc: boolean;
}

export const Heading: React.FC<Props & HeadingProps> = ({
  children,
  as = 'h2',
  title,
  excludeToc = false,
  ...rest
}) => {
  return (
    <ChakraHeading
      as={as}
      fontSize={as}
      {...rest}
      display='flex'
      alignItems='flex-start'
      data-toc={excludeToc ? 'exclude' : undefined}
    >
      <Text as='span' dangerouslySetInnerHTML={{ __html: title }}>
        {children}
      </Text>
    </ChakraHeading>
  );
};
