import { SimpleGrid } from '@chakra-ui/react';

export const FormWrapper: React.FC = ({ children }) => {
	return (
		<SimpleGrid
			position={'relative'}
			gridGap={8}
			bgColor={'white'}
			w='full'
			p={12}
			borderColor='light.500'
			borderWidth={2}
			borderRadius='2xl'
		>
			{children}
		</SimpleGrid>
	);
};
