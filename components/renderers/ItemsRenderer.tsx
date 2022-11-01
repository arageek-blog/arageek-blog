import { Button, Center } from '@chakra-ui/react';
import { useGetPageProps } from 'context';
import { cloneElement } from 'react';

export const ItemsRenderer = ({ items, isLoading, perPage, item, skeleton, isDev }) => {
	return (
		<>
			{!isDev && getItems(item, items)}
			{getSkeletons(skeleton, perPage, isLoading, isDev)}
		</>
	);
};

export const getItemsList = ({ items, isLoading, perPage, item, skeleton, isDev }) => {
	if (isDev) {
		return [...getSkeletons(skeleton, perPage, isLoading, isDev)];
	}

	return [...getItems(item, items), ...getSkeletons(skeleton, perPage, isLoading, isDev)];
};

export const NoItemsRenderer = ({ items, isLoading, children }) => {
	if (items?.length === 0 && !isLoading) {
		return children;
	}

	return null;
};

export const MoreButton = ({ isLoading, loadMore, hasMore }) => {
	const btnText = useGetPageProps(
		'systemConfig.systemOptions.translations.global_translations.more'
	);

	if (!hasMore) return null;

	return (
		<Center mt={8}>
			<Button
				variant='outline'
				colorScheme={'dark'}
				onClick={loadMore}
				isDisabled={isLoading || !hasMore}
				isLoading={isLoading}
			>
				{btnText}
			</Button>
		</Center>
	);
};

const getItems = (Comp, items) =>
	Comp && Array.isArray(items)
		? items?.map(props => cloneElement(Comp, { ...props, key: props?.id }))
		: [];

const getSkeletons = (Comp, perPage, isLoading, isDev) => {
	if (!Comp) return [];
	if (!isLoading && !isDev) return [];

	return Array(perPage > 9 ? 9 : perPage)
		.fill('')
		.map(({}, index) => cloneElement(Comp, { key: index * -1 }));
};
