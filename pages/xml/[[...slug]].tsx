const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ req, params, res }) => {
  const currentDomain = req.headers.host;
  const { slug } = params || {};
  const route = slug?.join('/');
  // console.log(slug);

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    if (!route?.endsWith('.xml')) {
      throw new Error('Invalid route');
    }

    const response = await fetch(`https://${BASE_URL}/${route}`);

    const sitemapText = await response.text();

    const sitemapWithRelativeUrls = sitemapText
      .replace(
        'www.arageek.com/main-sitemap.xsl',
        `${currentDomain}/main-sitemap.xsl`
      )
      .replaceAll('www.arageek.com/', `${currentDomain}/`);

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
