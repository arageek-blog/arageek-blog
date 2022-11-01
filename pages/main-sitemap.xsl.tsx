const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`https://${BASE_URL}/main-sitemap.xsl`);

  const sitemapText = await response.text();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapText);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
