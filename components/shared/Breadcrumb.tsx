import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  Icon,
  Text
} from '@chakra-ui/react';
import { ArrowLeft2, Home } from 'iconsax-react';
import { NextChakraIconButton, NextChakraLink } from '../wrappers';

export const Breadcrumb: React.FC = ({ breadcrumb }) => {
  if (!Array.isArray(breadcrumb)) {
    return null;
  }

  return (
    <ChakraBreadcrumb
      sx={{
        ol: {
          display: 'flex'
        }
      }}
      separator={<Icon display='block' as={ArrowLeft2} />}
    >
      {breadcrumb
        // ?.filter((_, index) => index < items.length - 1)
        ?.map(({ position, name, item = '/' }, index) => {
          const isLastItem = index === breadcrumb.length - 1;

          return (
            <BreadcrumbItem
              key={position}
              isCurrentPage={isLastItem}
              isLastChild={isLastItem}
              {...(isLastItem && {
                overflow: 'hidden'
              })}
            >
              {position === 1 ? (
                <NextChakraIconButton
                  variant={'ghost'}
                  icon={<Icon as={Home} />}
                  href={item}
                  aria-label={name}
                />
              ) : (
                <NextChakraLink
                  {...(isLastItem && {
                    'aria-current': 'page',
                    pointerEvents: 'none',
                    _before: { content: 'none' },
                    _hover: {
                      cursor: 'default'
                    }
                  })}
                  href={item}
                  noOfLines={1}
                >
                  <Text as='span' dangerouslySetInnerHTML={{ __html: name }} />
                </NextChakraLink>
              )}
            </BreadcrumbItem>
          );
        })}
    </ChakraBreadcrumb>
  );
};
