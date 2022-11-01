import 'focus-visible/dist/focus-visible';
import { useRouteData } from 'hooks';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { pageview } from 'utls';

type GoogleAnalyticsProps = {
  gaMeasurementId?: string;
};

type WithPageView = GoogleAnalyticsProps & {
  trackPageViews?: boolean;
};

type WithIgnoreHashChange = GoogleAnalyticsProps & {
  trackPageViews?: {
    ignoreHashChange: boolean;
  };
};

export const GoogleAnalytics = ({
  gaMeasurementId
}: WithPageView | WithIgnoreHashChange): JSX.Element | null => {
  const router = useRouter();
  const routeData = useRouteData();
  const _gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? gaMeasurementId;

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (routeData?.id && !shallow) {
        pageview('pageView', url, routeData);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, routeData]);

  useEffect(() => {
    if (routeData?.id) {
      pageview('pageView', router.asPath, routeData);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (routeData?.id && !shallow) {
        pageview('pageView', url, routeData);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, routeData]);

  useEffect(() => {
    if (routeData?.id) {
      pageview('pageView', router.asPath, routeData);
    }
  }, []);

  if (!_gaMeasurementId) {
    return null;
  }

  return (
    <Script
      id='nextjs-google-analytics'
      strategy='lazyOnload'
      dangerouslySetInnerHTML={{
        __html: `
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${_gaMeasurementId}');
					`
      }}
    />
  );
};
