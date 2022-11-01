import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { getPathInfo } from 'utls';

export type NextChakraButtonProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraButtonProps, 'as'>
>;

//  Has to be a new component because both chakra and next share the `as` keyword
export const NextChakraButton = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  children,
  ...chakraProps
}: NextChakraButtonProps) => {
  const { asPath } = useRouter();

  const { type, url } = getPathInfo(href);

  const isActive = asPath === url;
  return (
    <ChakraButton
      className={isActive ? 'active' : ''}
      as={NextLink}
      passHref={true}
      href={url}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={false}
      {...chakraProps}
    >
      {children}
    </ChakraButton>
  );
};
