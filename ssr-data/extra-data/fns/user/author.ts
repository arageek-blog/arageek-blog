import { allTypresParams, getItemsData } from 'utls';

export const getAuthorParams = (data: any) => {
  const { id } = data;

  const name = 'posts';

  const params = {
    author: [id],
    per_page: 25,
    ...allTypresParams
  };
  return { name, params };
};

const getFns = async (data: any) => {
  const { name, params } = getAuthorParams(data);
  const authorInitialData = await getItemsData(name, params);

  return { authorInitialData };
};

export default getFns;
