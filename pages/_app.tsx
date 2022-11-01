import { Providers } from 'context';
import 'focus-visible/dist/focus-visible';

function App({ Component, pageProps }) {
  return (
    <>
      <Providers {...{ pageProps }}>
        <Component />
      </Providers>
    </>
  );
}

export default App;
