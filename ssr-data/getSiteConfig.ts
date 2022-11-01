import { getAdsList } from 'utls';

export const getRouteConfig = (data: any) => {
  const { route_data, site_config } = data;
  const { next_posts = [], id, type } = route_data;
  const nextPosts = next_posts ?? [];

  const { menus, ads_settings, aniview } = site_config;
  const posts = [{ post_id: id, post_type: type }, ...nextPosts];
  const adsSlots = posts.flatMap(({ post_id, post_type }, index) => {
    const isMainPost = index === 0;
    return getAdsList(ads_settings, post_id, post_type, isMainPost);
  });

  return {
    menus,
    adsSlots,
    aniview
  };
};
