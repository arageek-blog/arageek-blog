import { AspectRatio, Skeleton } from '@chakra-ui/react';

export const TableOfContentSkeleton: React.FC = () => {
  return (
    <AspectRatio ratio={{ base: 1, md: 16 / 9 }}>
      <Skeleton />
    </AspectRatio>
  );
};
