import { getBlocksData } from 'ssr-data/extra-data/getBlocksData';

const getFns = async (data: any) => {
  const blockData = await getBlocksData(data);

  return {
    ...blockData
  };
};

export default getFns;
