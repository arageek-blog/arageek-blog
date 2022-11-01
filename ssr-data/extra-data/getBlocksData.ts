import {
  filterQueryParamsFromObject,
  getAcfBlockItems,
  getBioBornToday,
  getBioGridItem,
  getWikiCategories
} from 'utls';

const ALLOWED_BLOCKS = [
  'acf/wide-cards',
  'acf/pages-selector',
  'acf/posts-selector',
  'acf/video-cards',
  'acf/bio-cards',
  'acf/video-cards',
  'acf/basic-cards',
  'acf/selective-users',
  'acf/authors-archive',
  'acf/posts-selector',
  'acf/full-cards',
  'acf/swiper-cards',
  'acf/wiki-box',
  'acf/swiper-cards',
  'acf/homepage-hero',
  'acf/arageek-bio-hero',
  'acf/arageek-bio-person-of-day',
  'acf/arageek-bio-zodiac',
  'acf/arageek-buzzfeed',
  'acf/arageek-movies-info',
  'acf/arageek-bio-grid'
];

export const getBlocksData = async (data: any) => {
  const { gutenberg_blocks, bio_person_of_day } = data;

  const blocks = gutenberg_blocks
    ?.filter(({ blockName, attrs }) => blockName !== null && attrs !== null)
    ?.map(async (props, i) => {
      const { blockName, attrs } = props;

      if (blockName === 'acf/wiki-box') {
        return {
          ...props,
          initialData: await Promise.all(getWikiCategories(attrs))
        };
      }

      if (blockName === 'acf/arageek-bio-born-today') {
        return {
          ...props,
          ...(await getBioBornToday())
        };
      }

      //TODO bioGrid delete this old section

      // if (blockName === 'acf/arageek-bio-grid') {
      //   return {
      //     ...props,
      //     ...(await getBioGridItem(bio_person_of_day))
      //   };
      // }

      if (ALLOWED_BLOCKS.includes(blockName) && attrs) {
        const { data } = attrs;

        const fetchParams = filterQueryParamsFromObject({
          blockName,
          ...data,
          bio_person_of_day,
          page: 1
        });

        return {
          ...props,
          initialData: await getAcfBlockItems(fetchParams)
        };
      }

      return props;
    });

  const gutenberg_blocks_data = await Promise.all(blocks);

  return { gutenberg_blocks: gutenberg_blocks_data };
};
