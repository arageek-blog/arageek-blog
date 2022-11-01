import { Heading, SimpleGrid, Text } from '@chakra-ui/react';

interface Props {
	title: string;
	subtext: string;
}

export const FormHeading: React.FC<Props> = ({ title, subtext }) => {
	return (
		<SimpleGrid spacing={2}>
			<Heading as='h1'>{title}</Heading>
			{subtext ? <Text color='gray.500'>{subtext}</Text> : null}
		</SimpleGrid>
	);
};
