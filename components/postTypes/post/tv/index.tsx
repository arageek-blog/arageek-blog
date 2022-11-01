import { Grid } from '@chakra-ui/react';
import { useWpInfiniteItems } from 'hooks';
import { Content, Seo, Slider, TVProvider } from './components';

const TVTemplate: React.FC = ({ data }) => {
  const { id } = data;

  const { hasMore, loadMore, items } = useWpInfiniteItems('tv', {
    exclude: id,
    per_page: 5,
    _media_slider: 1
  });

  const slides = [data, ...(items ?? [])];

  const fetchMore = () => {
    if (hasMore) {
      loadMore();
    }
  };

  return (
    <TVProvider slides={slides} fetchMore={fetchMore}>
      <Grid
        gridTemplateColumns={{ base: '1fr', lg: '1fr 2fr' }}
        as='main'
        w={'100vw'}
        h='100vh'
        overflow={'hidden'}
      >
        <Content />
        <Slider />
      </Grid>
      <Seo />
    </TVProvider>
  );
};

export default TVTemplate;
