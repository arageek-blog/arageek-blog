import { Icon } from '@chakra-ui/react';
import { NextChakraIconButton } from 'components/wrappers';
import { ArrowRight } from 'iconsax-react';
import { LinkProps } from 'next/dist/client/link';

export const FormBackButton: React.FC<LinkProps> = (props) => {
  return (
    <NextChakraIconButton
      position={'absolute'}
      icon={<Icon as={ArrowRight} />}
      top={0}
      left={0}
      transform='auto'
      translateX={'50%'}
      translateY={'-50%'}
      colorScheme='dark'
      boxShadow={'xl'}
      aria-label='عودة'
      {...props}
    />
  );
};
