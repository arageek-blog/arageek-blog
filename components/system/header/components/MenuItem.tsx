import {
  ButtonProps,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { NextChakraButton } from 'components/wrappers';
import { Menu, menuIcons } from 'configs/menus';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

export const MenuItem: React.FC<
  Menu & { fontSize: ButtonProps['fontSize'] }
> = ({ url, title, child_items, icon, fontSize = 'lg' }) => {
  const { isOpen, onToggle } = useDisclosure();
  const hasChildItems = Boolean(child_items);
  const href = url ?? '/';
  return (
    <>
      <HStack>
        <NextChakraButton
          href={href}
          leftIcon={icon && <Icon as={menuIcons?.[icon]} />}
          display={'inline-flex'}
          textAlign={{ base: 'center', xl: 'start' }}
          justifyContent={{ base: 'center', xl: 'flex-start' }}
          width={'fit-content'}
          borderRadius={'3xl'}
          variant='unstyled'
          fontWeight={'normal'}
          flexShrink={0}
          color={'dark.600'}
          bgColor={'transparent'}
          fontSize={fontSize}
          pr={4}
          pl={4}
          _hover={{
            bgColor: 'light.500'
          }}
          sx={{
            '&.active': {
              color: 'black',
              bgColor: 'light.500'
            }
          }}
        >
          <Text as='span' noOfLines={1}>
            {title}
          </Text>
        </NextChakraButton>
        <Spacer />
        {hasChildItems && (
          <IconButton
            ml='auto'
            icon={<Icon as={isOpen ? ArrowUp2 : ArrowDown2} />}
            onClick={onToggle}
            variant='ghost'
            colorScheme={'light'}
            size='sm'
            aria-label={isOpen ? 'إغلاق' : 'فتح'}
          />
        )}
      </HStack>
      {hasChildItems && isOpen && (
        <VStack
          align={'stretch'}
          ml={2}
          // bgColor='light.500'
          // borderBottomRadius={'3xl'}
          borderInlineStartWidth={2}
          borderInlineStartColor='light.500'
        >
          {child_items.map(item => (
            <MenuItem key={item.id} {...item} fontSize='md' />
          ))}
        </VStack>
      )}
    </>
  );
};
