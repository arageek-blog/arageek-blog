import {
  getItemsData,
  getTodayZodiacId,
  removeUndefinedFromObject
} from 'utls';

const allTypes = [
  'art',
  'bio',
  'edu',
  'l',
  'ibda3world',
  'listat',
  'news',
  'post',
  'tech',
  'tv',
  'podcast'
];

export const allTypresParams = allTypes.reduce((acc, type, index) => {
  return {
    ...acc,
    [`type[${index}]`]: type
  };
}, {});

const getPostType = (params: any) => {
  const { blockName, post_type } = params;

  if (post_type === 'page' || blockName === 'acf/pages-selector') {
    return 'pages';
  }

  if (blockName === 'acf/arageek-buzzfeed') {
    const { buzzfeed_id } = params;
    return `buzz-feed/${buzzfeed_id}`;
  }
  if (blockName === 'acf/arageek-bio-grid') {
    return 'bio';
  }

  if (
    blockName === 'acf/selective-users' ||
    blockName === 'acf/authors-archive'
  ) {
    return 'users';
  }

  if (
    blockName === 'acf/selective-users' ||
    blockName === 'acf/authors-archive'
  ) {
    return 'users';
  }

  if (
    blockName === 'acf/arageek-bio-person-of-day' ||
    blockName === 'acf/arageek-bio-born-today' ||
    blockName === 'acf/arageek-bio-zodiac'
  ) {
    return 'bio';
  }

  if (blockName === 'acf/arageek-movies-info') {
    return 'movies-info';
  }

  if (
    ['any', 'post'].includes(post_type) ||
    blockName === 'acf/homepage-hero'
  ) {
    return 'posts';
  }
  if (post_type === 'l') {
    return 'encyclopedia';
  }

  return post_type;
};

const getFetcherParams = (params: Record<string, unknown> = {}) => {
  const {
    blockName,
    post_type,
    offset: initialOffset,
    page,
    excluded_post_types,
    posts_count: per_page,
    exclude_specific_posts,
    specific_posts,
    category,
    tags,
    tag,
    art_category: arts_cat,
    bio_category,
    person_job,
    person_nationality,
    person_zodiac,
    person_country_of_birth,
    person_city_of_birth,
    person_graduate_school: person_graduated_school,
    encyclopedia_category: encyclopedia_cat,
    edu_category: edu_cat,
    ibda3_world_category: ibda3world_cat,
    listat_category: listat_cat,
    news_category: news_cat,
    tech_category: tech_cat,
    tv_category: tv_cat,
    podcast_category: podcast_cat,
    podcast_playlist,
    tag_selector,
    bio_person_of_day,
    ...rest
  } = params;
  const extraParams = {};
  const isHomePageHero = blockName === 'acf/homepage-hero';
  const isBioGrid = blockName === 'acf/arageek-bio-grid';

  const offset =
    Number(initialOffset ?? 0) +
    (Number(page ?? 1) - 1) * Number(per_page ?? 10);

  const isArt = post_type === 'art';
  const isBio = post_type === 'bio';
  const isedu = post_type === 'edu';
  const isEncyclopedia = post_type === 'l';
  const isIbda3world = post_type === 'ibda3world';
  const isListat = post_type === 'listat';
  const isNews = post_type === 'news';
  const isPost = post_type === 'post';
  const isTech = post_type === 'tech';
  const isTv = post_type === 'tv';
  const isPodcast = post_type === 'podcast';
  const isAny = post_type === 'any' || isHomePageHero;

  const anyTypes = allTypes.filter(type =>
    Array.isArray(excluded_post_types)
      ? !excluded_post_types.includes(type)
      : true
  );

  const anyTypesObj = anyTypes.reduce((acc, type, index) => {
    return {
      ...acc,
      [`type[${index}]`]: type
    };
  }, {});

  if (blockName === 'acf/pages-selector') {
    const { pages, ...postIds } = rest;
    const ids = Object.values(postIds) ?? [];
    return removeUndefinedFromObject({
      per_page: ids.length,
      include: ids,
      orderby: 'include'
    });
  }

  if (blockName === 'acf/selective-users') {
    const { users_list, ...postIds } = rest;
    const ids = Object.values(postIds) ?? [];
    return removeUndefinedFromObject({
      per_page: ids.length,
      include: ids,
      orderby: 'include'
    });
  }

  if (blockName === 'acf/authors-archive') {
    const { per_page } = rest;
    return removeUndefinedFromObject({
      per_page: per_page,
      offset
      // who: 'authors'
    });
  }

  if (blockName === 'acf/arageek-bio-person-of-day') {
    extraParams.include = bio_person_of_day;
  }

  if (blockName === 'acf/arageek-movies-info') {
    const { movies_selector } = rest;

    return {
      include: movies_selector
    };
  }

  if (blockName === 'acf/arageek-buzzfeed') {
    return {};
  }

  if (blockName === 'acf/arageek-bio-zodiac') {
    extraParams.person_zodiac = getTodayZodiacId();
  }

  const shouldExclude = exclude_specific_posts === '1';

  return removeUndefinedFromObject({
    offset,
    per_page,
    tags,
    tax_relation: 'AND',
    ...(Array.isArray(specific_posts) && {
      [shouldExclude ? 'exclude' : 'include']: specific_posts
    }),
    ...(isArt && { arts_cat }),
    ...(isedu && { edu_cat }),
    ...(isEncyclopedia && { encyclopedia_cat }),
    ...(isIbda3world && { ibda3world_cat }),
    ...(isListat && { listat_cat }),
    ...(isNews && { news_cat }),
    ...(isPost && { category }),
    ...(isTech && { tech_cat }),
    ...(isTv && { tv_cat }),
    ...(isPodcast && { podcast_cat, podcast_playlist }),
    ...(isBio && {
      ...(bio_category === 'person_job' && { person_job }),
      ...(bio_category === 'person_nationality' && { person_nationality }),
      ...(bio_category === 'person_zodiac' && { person_zodiac }),
      ...(bio_category === 'person_country_of_birth' && {
        person_country_of_birth
      }),
      ...(bio_category === 'person_city_of_birth' && { person_city_of_birth }),
      ...(bio_category === 'person_graduated_school' && {
        person_graduated_school
      })
    }),
    ...(isBioGrid && { orderby: 'rand', tags: tag, per_page: 21 }),

    ...(isAny && {
      ...anyTypesObj
    }),
    ...(isHomePageHero && {
      per_page: 1
    }),
    ...(tag_selector && {
      tags: tag_selector
    }),
    ...extraParams
  });
};

export const getAcfBlockFetchData = (
  defaultParams: Record<string, string> = {}
) => {
  const params = getFetcherParams(defaultParams);
  const name = getPostType(defaultParams);

  return {
    name,
    params
  };
};

export const getAcfBlockItems = async (
  defaultParams: Record<string, string> = {}
) => {
  const { name, params } = getAcfBlockFetchData(defaultParams);

  const items = await getItemsData(name, params);
  return items;
};
