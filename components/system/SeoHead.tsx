import parse from 'html-react-parser';
import Head from 'next/head';

export const SeoHead: React.FC = ({ yoast_head }) => {
  if (!yoast_head) return null;

  return <Head>{parse(yoast_head)}</Head>;
};
