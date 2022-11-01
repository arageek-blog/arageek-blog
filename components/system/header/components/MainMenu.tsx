import { VStack } from '@chakra-ui/react';
import { useMenu } from 'hooks';
import { MenuItem } from './';

export const MainMenu: React.FC = () => {
  const headerMenu = useMenu('header');

  return (
    <VStack
      display={{ base: 'inline-flex', xl: 'flex' }}
      width={{ base: 'full', xl: 'auto' }}
      as='nav'
      align={'flex-start'}
      maxH={'full'}
    >
      {/* <UserMenuItem /> */}
      {headerMenu?.map(item => (
        <MenuItem key={item.id} {...item} />
      ))}
      {/* <WriteBtn />  */}
    </VStack>
  );
};
