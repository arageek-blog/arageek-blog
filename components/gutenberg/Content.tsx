import { VStack } from '@chakra-ui/react';
import { useRouteData } from 'hooks';
// import { SourcesSkeleton } from 'components/shared';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { GutenbergRenderer } from './GutenbergRenderer';

const Sources = dynamic(() => import('components/shared/Sources'), {
  ssr: false
  // loading: SourcesSkeleton,
});

const HERO_blocks = ['acf/homepage-hero', 'acf/arageek-bio-hero'];

export const Content: React.FC = ({ data }) => {
  const contentRef = useRef(null);

  const { gutenberg_blocks, id, type, acf, related_items } = data;

  const blocks = gutenberg_blocks?.filter(
    ({ blockName }) => !HERO_blocks.includes(blockName)
  );

  return (
    <>
      <VStack
        ref={contentRef}
        sx={{ counterReset: 'css-counter 0' }}
        align={'stretch'}
        spacing={4}
      >
        <GutenbergRenderer
          {...{
            related_items,
            acf,
            type,
            id,
            blocks
          }}
          postId={id}
        />
      </VStack>
      <Sources contentRef={contentRef} />
    </>
  );
};

export const HeroContent: React.FC = () => {
  const { gutenberg_blocks, id } = useRouteData();
  const blocks = gutenberg_blocks?.filter(({ blockName }) =>
    HERO_blocks.includes(blockName)
  );

  if (!Array.isArray(blocks) || blocks?.length === 0) {
    return null;
  }

  return (
    <VStack align={'stretch'} spacing={4}>
      <GutenbergRenderer blocks={blocks} postId={id} />
    </VStack>
  );
};
