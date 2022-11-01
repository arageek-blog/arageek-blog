import type {
	FormControlProps} from '@chakra-ui/react';
import {
	Box,
	Flex,
	FormLabel,
	Text,
	useFormControlContext,
	useRadio,
	useRadioGroup
} from '@chakra-ui/react';
import { useField } from 'formik';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { FormControl } from './';

interface Props {
	name: string;
	label?: string;
	options: Record<string, any>;
	helpText?: string;
	spacing?: number;
}

export const RadioCard: React.FC<Props & FormControlProps> = ({
	name,
	options,
	label,
	helpText,
	spacing = 4,
	...rest
}) => {
	const [, { value }, { setValue }] = useField(name);

	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
		value,
		onChange: setValue
	});

	const group = getRootProps();

	return (
		<FormControl
			as='fieldset'
			w='auto'
			name={name}
			helpText={helpText}
			{...rest}
		>
			{label && (
				<FormLabel
					as='legend'
					className='static'
					pos='static'
					fontSize='lg'
					transform='translate3d(0, 0, 0)'
					mb={4}
				>
					{label}
				</FormLabel>
			)}
			<AnimateSharedLayout>
				<Flex
					overflow='hidden'
					flexWrap='wrap'
					justifyContent='center'
					backgroundColor='gray.100'
					borderWidth={4}
					borderColor='gray.100'
					borderRadius='md'
					{...group}
				>
					{Object.entries(options)?.map(([value, label]) => {
						const radio = getRadioProps({ value });
						return (
							<RadioCardItem
								key={value}
								label={label}
								{...radio}
							/>
						);
					})}
				</Flex>
			</AnimateSharedLayout>
		</FormControl>
	);
};

const RadioCardItem = ({ label, ...props }) => {
	const { isRequired, onFocus, onBlur, isFocused } = useFormControlContext();
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const { isChecked, name } = props;

	const input = getInputProps();
	const checkbox = getCheckboxProps();
	const [field] = useField(name);

	return (
		<Box
			as='label'
			pos='relative'
		>
			<input
				{...input}
				required={isRequired}
				onFocus={onFocus}
				onBlur={e => {
					onBlur();
					field.onBlur(e);
				}}
				aria-required={isRequired ? 'true' : 'false'}
			/>
			<Box
				{...checkbox}
				cursor='pointer'
				px={6}
				py={2}
				color='gray.500'
				transition='color 300ms ease-in-out'
				_checked={{
					color: 'black'
				}}
				sx={{
					'& .isCheckedBg': {
						backgroundColor: 'white',
						borderRadius: 'md',
						position: 'absolute',
						inset: 0,
						w: 'full',
						h: 'full',
						boxShadow: 'md'
					}
				}}
			>
				{isChecked && (
					<motion.span
						className='isCheckedBg'
						layoutId='isCheckedBg'
					/>
				)}

				<Text
					fontWeight='bold'
					fontSize='lg'
					zIndex={1}
					position='relative'
				>
					{label}
				</Text>
			</Box>
		</Box>
	);
};
