import { nanoid } from 'nanoid';
import { AdItem } from 'types';

const REFRESH_KEY = 'refresh';
const REFRESH_VALUE = 'true';

// Number of seconds to wait after the slot becomes viewable.
const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 60;

const googleTag = () => {
  const global = window as any;

  global.googletag = global.googletag || {};
  global.googletag.cmd = global.googletag.cmd || [];
  // console.log(global.googletag);

  return global.googletag;
};

export const dfp = {
  createSlots: (ads: AdItem[], enableLazyload: boolean) => {
    googleTag().cmd.push(() => {
      googleTag().pubads().collapseEmptyDivs();

      ads.forEach(
        ({ slotId, divId, sizeMappings = [], sizes = [] }: AdItem) => {
          if (Array.isArray(sizeMappings)) {
            const sizeMapping = googleTag().sizeMapping();

            sizes.forEach(
              ({ ad_height, ad_width, screen_height, screen_width }) => {
                sizeMapping.addSize(
                  [Number(screen_width), Number(screen_height)],
                  [Number(ad_width), Number(ad_height)]
                );
              }
            );

            const sizesForSlot = sizes.map(({ ad_height, ad_width }) => [
              Number(ad_width),
              Number(ad_height)
            ]);

            const responsiveMappings = sizeMapping.build();

            const slot = googleTag()
              .defineSlot(slotId, sizesForSlot, divId)
              .setTargeting(REFRESH_KEY, REFRESH_VALUE)
              .addService(googleTag().pubads())
              .defineSizeMapping(responsiveMappings);

            console.log({ slot });
          }
        }
      );

      googleTag()
        .pubads()
        .addEventListener('impressionViewable', event => {
          const slot = event.slot;

          if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
            setTimeout(() => {
              googleTag().pubads().refresh([slot]);
            }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
          }
        });

      if (!!enableLazyload) {
        // Enable lazyload with some good defaults
        googleTag().pubads().enableLazyLoad({
          fetchMarginPercent: 500,
          renderMarginPercent: 200,
          mobileScaling: 2.0
        });
      }

      googleTag().enableServices();
    });
  },
  showSlot: (divId: string) => {
    googleTag().cmd.push(() => {
      googleTag().display(divId);
    });
  },
  removeSlots: () => {
    googleTag().cmd.push(() => {
      googleTag().destroySlots();
    });
  }
};

export const getAdsList = (
  adsSetting: any,
  postId: string,
  routeType: string,
  isMainPost: boolean = false
): AdItem[] => {
  const { ads_set } = adsSetting ?? {};
  const routeAds =
    ads_set?.find(({ post_type }) => routeType === post_type) ??
    ads_set?.find(({ post_type }) => 'page' === post_type);

  if (!routeAds) {
    return [];
  }

  const { ads = [] } = routeAds;

  const adsList = ads
    .map((ad: any) => {
      const {
        // id,
        path: slotId,
        place: placeName,
        sizes,
        show_only,
        index
      } = ad;
      const id = nanoid();

      const sizes_ = [...sizes]?.sort(
        (a, z) => a.screen_width - z.screen_width
      );

      const sizeMappings = sizes_.map((size: any) => {
        const { ad_height, ad_width } = size;
        return [Number(ad_width), Number(ad_height)];
      });

      const shouldPrefix = ['post_content', 'before_post'].includes(placeName);

      return {
        slotId,
        divId: shouldPrefix ? `${postId}_${id}` : id,
        place: shouldPrefix
          ? `${postId}_${placeName}${index ? `_${index}` : ''}`
          : placeName,
        sizeMappings,
        sizes,
        show_only
      };
    })
    .filter(({ place, show_only }) => {
      if (show_only) {
        if (Number(show_only) !== Number(postId)) {
          return false;
        }
      }

      if (isMainPost) {
        return true;
      }

      return !['header', 'sidebar'].includes(place);
    });

  return adsList;
};
