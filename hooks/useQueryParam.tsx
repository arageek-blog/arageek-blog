import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useQueryParam = (key) => {
  const router = useRouter();

  const value = useMemo(() => {
    const res =
      router.asPath.match(new RegExp('[?&]' + key + '=([^&#]*)')) || [];

    return res[1];
    // return urlParams.get(key);
  }, [router.asPath]);

  return value ? decodeURIComponent(value) : undefined;
};
