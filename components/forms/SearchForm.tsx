import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  Input as ChakraInput,
  InputGroup,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react';
import { SearchResultCard } from 'components/search';
import { SearchNormal1 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { getItemsData } from 'utls';

export const SearchForm = ({ onClose }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(5);

  const fetchSearchResults = async searchTerm => {
    const params = {
      namespace: 'search-engine/v1',
      name: 'get-search-results',
      keyword: searchTerm,
      _headless: 1
    };
    const { items } = await getItemsData('search-result', params);
    setSearchResults(items?.data);
  };

  useEffect(() => {}, [searchResults]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        fetchSearchResults(searchTerm);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleSearchInput = e => {
    const { value } = e.target;
    const searchLength = value.length;
    setSearchTerm(value);
    if (searchLength > 0 && searchLength < 3) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  const loadMore = () => setPerPage(count);

  const data = searchResults?.hits;
  const count = data?.length;
  return (
    <VStack align={'stretch'} spacing={4}>
      <HStack spacing={4}>
        <Icon as={SearchNormal1} boxSize={'5'} />
        <FormControl>
          <InputGroup>
            <ChakraInput
              name='search'
              placeholder='اكتب هنا ما تبحث عنه ...'
              value={searchTerm}
              inputMode={'text'}
              onChange={handleSearchInput}
              isInvalid={isInvalid}
            />
          </InputGroup>
          {isInvalid && (
            <FormHelperText textAlign={'start'} color={'red'}>
              يجب أن يكون ٣ محارف على الأقل
            </FormHelperText>
          )}
        </FormControl>
      </HStack>

      <VStack
        spacing={4}
        divider={<StackDivider borderColor='light.100' />}
        pr={2}
        maxH={'75vh'}
        overflow={'auto'}
        sx={{
          '&::-webkit-scrollbar': {
            width: 1
          },
          '&::-webkit-scrollbar-track': {
            width: 3
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--arageek-colors-dark-300)',
            borderRadius: 'md'
          }
        }}
      >
        {count !== 0 ? (
          data?.slice(0, perPage).map((item: any) => {
            return (
              <SearchResultCard item={item} key={item.id} onClose={onClose} />
            );
          })
        ) : (
          <Center>
            {searchTerm.length >= 3 ? <Text>لا توجد نتائج</Text> : null}
          </Center>
        )}
        {count > perPage && <Button onClick={loadMore}>المزيد</Button>}
      </VStack>
    </VStack>
  );
};
