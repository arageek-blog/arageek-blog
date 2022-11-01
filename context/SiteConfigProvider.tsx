import React, { createContext, useContext } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { useSiteConfig } from 'hooks';
import { dfp } from 'utls';

export const SiteConfigContext = createContext({});

export const SiteConfigProvider: React.FC = ({ children }) => {
  const { adsSlots } = useSiteConfig();

  console.log({ adsSlots });

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Create ad slots
  useEffect(() => {
    setIsLoading(true);

    dfp.createSlots(adsSlots, true);

    setIsLoading(false);

    const handleRouteChangeStart = url => {
      if (window.location.pathname !== url) {
        setIsLoading(true);
        dfp.removeSlots();
        dfp.createSlots(adsSlots, true);
      }
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [adsSlots]);

  return (
    <>
      <SiteConfigContext.Provider value={{ isLoading, adsSlots }}>
        {children}
      </SiteConfigContext.Provider>
      <Script
        src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        // strategy='afterInteractive'
        async
      />
    </>
  );
};

export const useAdPlace = (adPlace: string) => {
  const { adsSlots, isLoading } = useContext(SiteConfigContext);

  const ad = adsSlots?.find(({ place }) => place === adPlace);

  return {
    ...ad,
    isLoading
  };
};
