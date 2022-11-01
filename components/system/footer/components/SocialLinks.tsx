import { Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { menuIcons } from 'configs/menus';
import { useMenu } from 'hooks';

export const SocialLinks: React.FC = () => {
  const SocialMenu = useMenu('social');
  return (
    <SimpleGrid as='nav' gap={2} columns={4}>
      {SocialMenu?.map(({ id, url, title, icon }) => (
        <IconButton
          as='a'
          icon={<Icon as={menuIcons?.[icon]} />}
          colorScheme={{ sm: 'blackAlpha', lg: 'whiteAlpha' }}
          size='lg'
          key={id}
          href={url}
          variant='ghost'
          isRound
          target='_blank'
          rel='noopener noreferrer'
          aria-label={title}
        />
      ))}
    </SimpleGrid>
  );
};
