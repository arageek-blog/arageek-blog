import { getItemsData } from 'utls';

const taxonomies = {
  person_zodiac: 'bio',
  person_nationality: 'bio',
  person_country_of_birth: 'bio',
  person_city_of_birth: 'bio',
  person_job: 'bio',
  arts_cat: 'art',
  edu_cat: 'edu',
  encyclopedia_cat: 'encyclopedia',
  ibda3world_cat: 'ibda3world',
  listat_cat: 'listat',
  news_cat: 'news',
  tech_cat: 'tech',
  tv_cat: 'tv',
  category: 'posts'
};

export const getTaxParams = (data: any) => {
  const { id, taxonomy } = data;

  const name = taxonomies?.[taxonomy];

  const per_page = name === 'bio' ? 24 : 25;

  const params = {
    [taxonomy]: [id],
    per_page
  };
  return { name, params };
};

const getFns = async (data: any) => {
  const { name, params } = getTaxParams(data);

  const catInitialData = await getItemsData(name, params);

  return { catInitialData };
};

export default getFns;
