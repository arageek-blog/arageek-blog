import { getBlocksData } from 'ssr-data/extra-data/getBlocksData';

const getFns = async (data: any) => {
  return await getBlocksData(data);
};

export default getFns;
