import type {
	FormControlProps} from '@chakra-ui/react';
import {
	Center,
	chakra,
	Icon,
	SimpleGrid,
	Text,
	useCheckbox
} from '@chakra-ui/react';
import { AddCircle, TickCircle } from 'iconsax-react';
import { useField } from 'remix-validated-form';
import { FormControl } from './';

interface Props {
	name: string;
	isBold?: boolean;
	value?: string;
	helpText?: string;
	children: React.ReactNode;
}

export const TopicCheckBox: React.FC<Props & FormControlProps> = ({ name, value, children }) => {
	const { setTouched } = useField(name);
	const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox({
		value,
		name,
		onChange: () => {
			setTouched(true);
		}
	});

	return (
		<chakra.label
			className='isStatic'
			display='flex'
			flexDirection='row'
			alignItems='center'
			justifyContent={'center'}
			gridColumnGap={2}
			borderWidth={1}
			borderColor='dark.100'
			rounded='3xl'
			px={4}
			py={2}
			cursor='pointer'
			color={state.isChecked ? 'gray.400' : 'green.500'}
			{...htmlProps}
		>
			<input
				{...getInputProps()}
				hidden
			/>
			<Center {...getCheckboxProps()}>
				<Icon as={state.isChecked ? TickCircle : AddCircle} />
				{/* {state.isChecked ? <Tick /> : <Plus />} */}
			</Center>
			<Text {...getLabelProps()}>{children}</Text>
		</chakra.label>
	);
};

type Item = {
	value: string;
	label: string;
};

interface GroupProps {
	columns?: number;
	name: string;
	options: Item[];
}

export const TopicCheckBoxGroup: React.FC<GroupProps> = ({ name, options, columns = 3 }) => {
	return (
		<FormControl name={name}>
			<SimpleGrid
				columns={{ base: 2, md: columns }}
				gap={4}
			>
				{options?.map(({ value, label }) => (
					<TopicCheckBox
						key={value}
						name={name}
						value={value}
					>
						{label}
					</TopicCheckBox>
				))}
			</SimpleGrid>
		</FormControl>
	);
};
