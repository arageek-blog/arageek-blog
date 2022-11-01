import { getItemsData, getRelatedItems } from 'utls';

export const getBioBornToday = async () => {
  const params = {
    namespace: 'arageek/v1'
  };

  const { items } = await getItemsData('bio-person-born-today', params);

  const { title, persons: initialData } = items ?? {};

  return {
    title,
    initialData
  };
};

export const getBioGridItem = async id => {
  const initialData = await getRelatedItems(`${id}`, 20);

  return {
    initialData
  };
};
