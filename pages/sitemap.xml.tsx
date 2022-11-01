const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ req, res }) => {
  const currentDomain = req.headers.host;
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const response = await fetch(`https://${BASE_URL}/sitemap_index.xml`);

    const sitemapText = await response.text();

    const sitemapWithRelativeUrls = sitemapText
      .replace(
        'www.arageek.com/main-sitemap.xsl',
        `${currentDomain}/main-sitemap.xsl`
      )
      .replaceAll('www.arageek.com/', `${currentDomain}/xml/`);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapWithRelativeUrls);
    res.end();
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.write('');
    res.end();
  }

  return {
    props: {}
  };
};

export default Sitemap;
