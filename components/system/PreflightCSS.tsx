import { css, Global } from '@emotion/react';

export const PreflightCSS: React.FC = () => {
  return (
    <Global
      styles={css`
        /* ibm-plex-sans-arabic-300 - latin-ext_latin_cyrillic-ext_arabic */
        @font-face {
          font-family: 'IBM Plex Sans Arabic';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: local(''),
            url('/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-300.woff2')
              format('woff2');
        }
        /* ibm-plex-sans-arabic-regular - latin-ext_latin_cyrillic-ext_arabic */
        @font-face {
          font-family: 'IBM Plex Sans Arabic';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local(''),
            url('/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-regular.woff2')
              format('woff2');
        }
        /* ibm-plex-sans-arabic-500 - latin-ext_latin_cyrillic-ext_arabic */
        @font-face {
          font-family: 'IBM Plex Sans Arabic';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local(''),
            url('/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-500.woff2')
              format('woff2');
        }
        /* ibm-plex-sans-arabic-600 - latin-ext_latin_cyrillic-ext_arabic */
        @font-face {
          font-family: 'IBM Plex Sans Arabic';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local(''),
            url('/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-600.woff2')
              format('woff2');
        }
        /* ibm-plex-sans-arabic-700 - latin-ext_latin_cyrillic-ext_arabic */
        @font-face {
          font-family: 'IBM Plex Sans Arabic';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local(''),
            url('/assets/fonts/ibm-plex-sans-arabic-v5-latin-ext_latin_cyrillic-ext_arabic-700.woff2')
              format('woff2');
        }
      `}
    />
  );
};
