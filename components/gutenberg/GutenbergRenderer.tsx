import { AdsSlot, VideoAdsSlot } from 'components/ads';
import { RelatedSlider } from 'components/shared';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { BlocksDirectory } from './blocks';

const DeviceSpecification = dynamic(
  () => import('components/shared/DeviceSpecification'),
  {
    ssr: false
    // loading: SourcesSkeleton,
  }
);

export const GutenbergRenderer = ({
  blocks,
  postId,
  type,
  acf,
  related_items
}) => {
  const FallbackComponent = BlocksDirectory?.['fallback'];

  return (
    <>
      {blocks
        ?.filter(({ blockName }) => Boolean(blockName))
        ?.map((props, i) => {
          const { blockName } = props;
          const Block = BlocksDirectory?.[blockName];

          if (Boolean(Block)) {
            return (
              <Fragment key={`${postId}_${i}`}>
                <AdsSlot place={`${postId}_post_content_${i}`} />

                {type === 'tech' && i === 1 && (
                  <DeviceSpecification acf={acf} />
                )}

                {type !== 'page' && i === 3 && <VideoAdsSlot />}

                {i === 6 && (
                  <RelatedSlider
                    key={`carousel${i}`}
                    items={related_items}
                    type={type}
                  />
                )}
                <Block {...props} postId={postId} blockIndex={i} />
              </Fragment>
            );
          }
          if (Boolean(FallbackComponent)) {
            return <FallbackComponent key={i} {...props} />;
          }
          return null;
        })}
    </>
  );
};

export const GutenbergChildrenRenderer: React.FC = ({ blocks }) => {
  const FallbackComponent = BlocksDirectory?.['fallback'];
  return (
    <>
      {blocks
        ?.filter(({ blockName }) => blockName !== null)
        ?.map((props, i) => {
          const { blockName } = props;
          const Block = BlocksDirectory?.[blockName];

          if (Boolean(Block)) {
            return <Block key={i} {...props} />;
          }
          if (Boolean(FallbackComponent)) {
            return <FallbackComponent key={i} {...props} />;
          }
          return null;
        })}
    </>
  );
};
