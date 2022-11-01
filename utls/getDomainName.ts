import { parse } from 'tldts';

export const getDomainName = (url: string): string => {
  const parsed = parse(url);
  return parsed.domainWithoutSuffix || 'unknown';
};
