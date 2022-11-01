import parse from 'html-react-parser';
import Head from 'next/head';
import { useTVContext } from './TvContext';

export const Seo = () => {
  const { currentItem } = useTVContext();
  const { yoast_head } = currentItem;

  return <Head>{parse(yoast_head)}</Head>;
};
