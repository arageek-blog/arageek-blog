import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html dir={'rtl'} lang={'ar'}>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/assets/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/assets/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/assets/favicons/favicon-16x16.png'
        />
        <link rel='manifest' href='/assets/favicons/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/assets/favicons/safari-pinned-tab.svg'
          color='#000000'
        />
        <link rel='shortcut icon' href='/assets/favicons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta
          name='msapplication-config'
          content='/assets/favicons/browserconfig.xml'
        />
        <meta name='theme-color' content='#000000' />
        <link
          rel='preload'
          href='/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-regular.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='true'
        />
        <link
          rel='preload'
          href='/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-700.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='true'
        />

        <link
          rel='preconnect'
          href={`https://${process.env.NEXT_PUBLIC_BACKEND_URL}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
