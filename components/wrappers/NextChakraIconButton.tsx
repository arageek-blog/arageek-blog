import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps
} from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import { getPathInfo } from 'utls';

export type NextChakraIconButtonProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraIconButtonProps, 'as'>
>;

//  Has to be a new component because both chakra and next share the `as` keyword
export const NextChakraIconButton = ({
  href,
  as,
  replace,
  scroll,
  shallow,

  children,
  ...chakraProps
}: NextChakraIconButtonProps) => {
  const { type, url } = getPathInfo(href);
  return (
    <ChakraIconButton
      passHref={true}
      href={url}
      as={NextLink}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={false}
      {...chakraProps}
    />
  );
};
