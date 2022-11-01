import {
  LinkOverlay as ChakraLinkOverlay,
  LinkOverlayProps as ChakraLinkOverlayProps
} from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import { getPathInfo } from 'utls';

export type NextChakraLinkOverlayProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkOverlayProps, 'as'>
>;

//  Has to be a new component because both chakra and next share the `as` keyword
export const NextChakraLinkOverlay = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  children,
  ...chakraProps
}: NextChakraLinkOverlayProps) => {
  const { type, url } = getPathInfo(href);
  return (
    <ChakraLinkOverlay
      passHref={true}
      href={url}
      as={NextLink}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={false}
      {...chakraProps}
    >
      {children}
    </ChakraLinkOverlay>
  );
};
