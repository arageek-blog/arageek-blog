import { usePageContext } from 'context';

export const usePageData = () => {
  const data = usePageContext(s => s);

  return data;
};

export const useRouteData = () => {
  const routeData = usePageContext(s => s.route_data);

  return routeData;
};

export const useSiteConfig = () => {
  const siteConfig = usePageContext(s => s.siteConfig);

  return siteConfig ?? {};
};

export const useMenu = (place: string) => {
  const { menus = {} } = useSiteConfig();

  const menu = menus?.[`arageek_${place}_menu`] ?? [];
  return menu;
};
