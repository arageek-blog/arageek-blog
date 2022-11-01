import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  Icon
} from '@chakra-ui/react';
import { ArrowLeft2, Home } from 'iconsax-react';
import { getMonthName } from 'utls';
import { NextChakraIconButton, NextChakraLink } from '../wrappers';

export const SitemapBreadcurmb = ({ year, month }) => {
  return (
    <ChakraBreadcrumb
      sx={{
        ol: {
          display: 'flex'
        }
      }}
      separator={<Icon display='block' as={ArrowLeft2} />}
      pb={8}
    >
      <BreadcrumbItem key={1}>
        <NextChakraIconButton
          variant={'ghost'}
          icon={<Icon as={Home} />}
          href={'/'}
          aria-label={'home'}
        />
        <Icon display='block' as={ArrowLeft2} mr={2} />
        <NextChakraLink
          {...(year
            ? null
            : {
                'aria-current': 'page',
                pointerEvents: 'none',
                _before: { content: 'none' },
                _hover: {
                  cursor: 'default'
                }
              })}
          href={'/sitemap'}
          noOfLines={1}
        >
          خريطة الموقع
        </NextChakraLink>

        {year ? (
          <>
            <Icon display='block' as={ArrowLeft2} ml={2} mr={2} />
            <NextChakraLink href={`/sitemap#${year}`} noOfLines={1}>
              {year}
            </NextChakraLink>
            <Icon display='block' as={ArrowLeft2} mr={2} />
            <NextChakraLink
              pointerEvents='none'
              _before={{ content: 'none' }}
              _hover={{
                cursor: 'default'
              }}
              href={'#'}
              noOfLines={1}
            >
              {getMonthName(month)}
            </NextChakraLink>
          </>
        ) : null}
      </BreadcrumbItem>
    </ChakraBreadcrumb>
  );
};
