import {
  Center,
  SimpleGrid,
  Table,
  TableContainer,
  Text,
  VStack,
  Button
} from '@chakra-ui/react';
import { StarRating } from 'components/shared';
import { ArrowCircleDown } from 'iconsax-react';
import { useState } from 'react';
import { Features, Reviews, TableContent } from './components';
import { mobileTabs, tabletTabs } from './config';

const DeviceSpecification = ({ acf }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { site_reviews } = acf;

  if (!acf?.product_name_ar && !acf?.product_name_en) {
    return null;
  }

  const deviceTabs = acf?.product_name_ar
    ? { ...mobileTabs }
    : { ...tabletTabs };
  const deviceKey = `${acf?.product_name_ar ? 'mobile' : 'tablet'}_`;
  // const tabs = Object.keys(deviceTabs);

  const hasReviews = Array.isArray(site_reviews);

  const avrageRating = hasReviews
    ? (2 *
        site_reviews
          .map(({ rating }) => Number(rating))
          .reduce((a, b) => a + b, 0)) /
      site_reviews.length
    : false;

  return (
    <VStack align={'stretch'} spacing={4}>
      {acf?.[`${deviceKey}advantages`] && acf?.[`${deviceKey}disadvantages`] && (
        <>
          <Text align={'center'}>
            هذا ملخص مراجعات وآراء أشهر المواقع التقنية
          </Text>
          {avrageRating && (
            <VStack align={'stretch'} spacing={2}>
              <Text align={'center'} fontWeight={'bold'}>
                {Number(avrageRating.toFixed(1))}
              </Text>
              <Center>
                <StarRating max={5} value={avrageRating} />
              </Center>
            </VStack>
          )}
        </>
      )}
      {hasReviews && <Reviews items={site_reviews} />}
      {acf?.[`${deviceKey}advantages`] && acf?.[`${deviceKey}disadvantages`] && (
        <SimpleGrid gap={4} columns={{ md: 2 }}>
          <Features
            title={'مميزات'}
            items={acf?.[`${deviceKey}advantages`]}
            isCheck
          />
          <Features title={'عيوب'} items={acf?.[`${deviceKey}disadvantages`]} />
        </SimpleGrid>
      )}

      {Object.entries(deviceTabs)
        .slice(0, isOpen ? Object.entries(deviceTabs).length : 1)
        .map(([key, obj], i) => {
          const { title, fields } = obj;
          const data = fields
            .map(key => ({
              key,
              value: acf?.[key]
            }))
            .filter(({ value }) => Boolean(value));

          if (data.length === 0) {
            return null;
          }

          return (
            <TableContainer key={i}>
              <Table cellSpacing={0}>
                <TableContent title={title} data={data} deviceKey={deviceKey} />
              </Table>
            </TableContainer>
          );
        })}
      {!isOpen && (
        <Button rightIcon={<ArrowCircleDown />} onClick={() => setIsOpen(true)}>
          اقرأ المزيد{' '}
        </Button>
      )}
    </VStack>
  );
};

export default DeviceSpecification;
