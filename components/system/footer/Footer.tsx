import { Box, Container, Text, VStack } from '@chakra-ui/react';
import { Logo } from 'assets';
import { SocialLinks } from './components';

const currentYear = new Date().getFullYear();

interface Props {
  variant?: 'default' | 'basic';
}

export const Footer: React.FC<Props> = ({
  variant = 'default',
  SocialMenu
}) => {
  return (
    <Box as='footer' bgColor='black' color='white' py={12} textAlign={'center'}>
      <Container centerContent>
        <VStack spacing={4}>
          <Logo color='white' hasAlwaysFullLogo />
          {variant === 'default' && <SocialLinks SocialMenu={SocialMenu} />}
          <Text color='gray.100'>
            جميع الحقوق محفوظة &copy; {currentYear} أراجيك
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
