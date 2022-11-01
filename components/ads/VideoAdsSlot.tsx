import { Box } from '@chakra-ui/react';
import { usePageContext } from 'context';
import Script from 'next/script';
import { Fragment } from 'react';

export const VideoAdsSlot: React.FC = () => {
  const { aniview } = usePageContext(v => v.siteConfig);
  const { aniview_settings: aniviewSettings } = aniview;

  const { id, url } = aniviewSettings ?? {};

  if (!id || !url) {
    return null;
  }

  return (
    <Fragment>
      <Box id='avRef' />
      <Script async strategy='lazyOnload' id={id} src={url} />
    </Fragment>
  );
};
