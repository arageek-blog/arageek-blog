import { NextApiRequest, NextApiResponse } from 'next';
import { getRouteData } from 'utls';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { path } = req.query;

  if (!path) {
    res.status(400).json({
      error: 'path is required'
    });
    return;
  }

  const data = await getRouteData(path);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=3600'
  );

  res.json(data);
};

export default handler;
