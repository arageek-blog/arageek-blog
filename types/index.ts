import React from 'react';

export type FluidItem = ['fluid'];
export type SizeItem = [number, number];
export type ResponsiveItem = {
  breakpoint: SizeItem;
  sizes: SizeItem | SizeItem[];
};

export type SizeMappings = FluidItem | SizeItem | SizeItem[] | ResponsiveItem[];

export type BackendSize = {
  ad_height: string;
  ad_width: string;
  screen_height: string;
  screen_width: string;
};

export type AdItem = {
  divId: string;
  slotId: string;
  sizeMappings: SizeMappings;
  sizes: BackendSize[];
};

// Context

export type AdsContextValue = null | {
  isLoading: boolean;
};

// Components

type AdsProviderProps = {
  ads: AdItem[];
  debug?: boolean;
  enableLazyload?: boolean;
};

export type AdsProviderComponent = React.FC<AdsProviderProps>;

type AdProps = {
  id: string;
  style: any;
  className: string;
  width: number | string;
  height: number | string;
};

export type AdComponent = React.FC<AdProps>;
