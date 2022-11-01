import { memo } from 'react';
import { Soundcloud, Twitter, YouTube } from '../core-embed';

const embedTypes = {
  youtube: YouTube,
  twitter: Twitter,
  soundcloud: Soundcloud
};

const EmbedComponent = props => {
  const {
    attrs: { providerNameSlug, url },
    innerHTML
  } = props;

  const Component = embedTypes?.[providerNameSlug];

  if (Boolean(Component)) {
    return <Component url={url} />;
  }

  return null;
};

export default memo(EmbedComponent);
