import { Box, Wrap, WrapItem } from '@chakra-ui/react';
import { NextChakraLink } from 'components/wrappers';
import { useMenu } from 'hooks';

export const SidebarMenu: React.FC = () => {
  const footerMenu = useMenu('footer');

  return (
    <Box as='nav'>
      <Wrap>
        {footerMenu?.map(({ title, url }, index) => (
          <WrapItem key={index}>
            <NextChakraLink href={url}>{title}</NextChakraLink>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
