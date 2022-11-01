import { Avatar } from '@chakra-ui/react';
import { LoginCurve } from 'iconsax-react';
import { MenuItem } from './';

export const UserMenuItem: React.FC = () => {
  const currentUser = null;

  if (currentUser) {
    const { avatar_url, profileLink, fullname } = currentUser;

    return (
      <MenuItem title={fullname} href={profileLink}>
        <Avatar
          boxSize={6}
          mr={2}
          src={avatar_url}
          name={fullname}
          decoding='async'
          loading='lazy'
        />
      </MenuItem>
    );
  }

  return <MenuItem title='تسجيل الدخول' href='/login' icon={LoginCurve} />;
};
