import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics, PreflightCSS } from 'components/system';
import theme from 'configs/chakraTheme';
import { PageProvider } from 'context';
import NextNProgress from 'nextjs-progressbar';
import { defaultQueryFn } from 'utls';
import { CommentsProvider } from './CommentsProvider';
import { RTLProvider } from './RTLProvider';
import { SiteConfigProvider } from './SiteConfigProvider';

const { ToastContainer } = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn
    }
  }
});

export const Providers: React.FC = ({ pageProps, children }) => {
  return (
    <>
      <PreflightCSS />
      <NextNProgress
        color='#000'
        startPosition={0.3}
        stopDelayMs={200}
        height={1}
      />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
          <RTLProvider>
            <CommentsProvider>
              <PageProvider initialPageProps={pageProps}>
                <GoogleAnalytics />
                <SiteConfigProvider>{children}</SiteConfigProvider>
              </PageProvider>
            </CommentsProvider>
          </RTLProvider>
        </ChakraProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
};
