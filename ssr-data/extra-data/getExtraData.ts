import { getDataDirectory } from './fns/directory';

export const getExtraData = async (data: any) => {
  const { route_data } = data;
  const { object_type, type } = route_data;

  const fns = getDataDirectory?.[object_type]?.[type];

  if (typeof fns !== 'function') {
    return {};
  }

  return await fns(route_data);
};
