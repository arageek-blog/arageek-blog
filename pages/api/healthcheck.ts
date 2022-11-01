import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  res.send('OK');
};

export default handler;
