export const getFullUrl = (url) => {
  if (typeof window === 'undefined') {
    return url;
  }
  return window.location.protocol + '//' + window.location.host + url;
};
