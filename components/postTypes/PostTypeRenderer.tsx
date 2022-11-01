import { DefaultLayout } from 'components/layouts';
import { SeoHead } from 'components/system';
import { useRouteData } from 'hooks';
import { memo } from 'react';
import { MultiPostRenderer } from './MultiPostRenderer';
import postTypesDirectory from './postTypesDirectory';

const PostTypeRendererC = () => {
  const data = useRouteData();
  console.log(data);
  const {
    object_type,
    type,
    next_posts,
    yoast_head,
    gutenberg_blocks,
    id,
    acf,
    menus
  } = data;
  console.log(data);

  const Component = postTypesDirectory?.[object_type]?.[type];

  const hasNextPosts = Array.isArray(next_posts) && next_posts?.length > 0;

  if (['podcast', 'tv'].includes(type)) {
    return <Component data={data} />;
  }

  if (type === 'page') {
    return (
      <DefaultLayout>
        {type === 'page' && Boolean(Component) ? (
          <>
            <Component data={data} />
            <SeoHead {...{ yoast_head }} />
          </>
        ) : null}
      </DefaultLayout>
    );
  }

  if (object_type === 'post' && hasNextPosts) {
    return (
      <DefaultLayout hasClosingButtonPlace={true}>
        {Boolean(Component) && <MultiPostRenderer firstItem={data} />}
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <Component data={data} />
      <SeoHead {...{ yoast_head }} />
    </DefaultLayout>
  );
};

export const PostTypeRenderer = memo(PostTypeRendererC);
