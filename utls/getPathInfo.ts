import isAbsoluteUrl from 'is-absolute-url';

type PathInfo = {
  type: 'INTERNAL' | 'EXTERNAL';
  url: string;
};

export const getPathInfo = (path: string = '/'): PathInfo => {
  const homeUrl = `${process.env.NEXT_PUBLIC_HOME_URL}`;
  if (!path || !homeUrl) {
    return {
      type: 'EXTERNAL',
      url: path
    };
  }

  if (!isAbsoluteUrl(path)) {
    return {
      type: 'INTERNAL',
      url: path
    };
  }

  if (path.includes(homeUrl)) {
    return {
      type: 'INTERNAL',
      url: `/${path?.replace(/^(?:\/\/|[^\/]+)*\//, '')}`
    };
  }

  return {
    type: 'EXTERNAL',
    url: path
  };
};
