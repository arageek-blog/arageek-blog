import { AspectRatio, Skeleton } from '@chakra-ui/react';

export const NavigationSkeleton: React.FC = () => {
  return (
    <AspectRatio ratio={{ base: 1, md: 3 / 4 }}>
      <Skeleton />
    </AspectRatio>
  );
};
