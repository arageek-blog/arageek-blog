import type {
	FormControlOptions} from '@chakra-ui/react';
import {
	Box,
	Flex,
	FormLabel,
	HStack,
	Slider as ChakraSlider,
	SliderThumb,
	SliderTrack,
	Spacer,
	Text
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
	name: string;
	label: string;
	helpText?: string;
	min: number;
	max: number;
}

export const Slider: React.FC<Props & FormControlOptions> = ({
	name,
	label,
	helpText,
	min,
	max,
	...rest
}) => {
	const [field, , { setValue }] = useField(name);

	function handleChange(value: number) {
		setValue(value);
	}
	// Does not behave like expected, so we manually handle it.
	function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
		(e.target as any).name = name;
		field.onBlur(e);
	}

	const nums = [min, 0, max];

	return (
		<FormControl
			name={name}
			helpText={helpText}
			{...rest}
		>
			<Box position='relative'>
				<HStack>
					{label && (
						<FormLabel
							mb={0}
							mr={0}
						>
							{label}
						</FormLabel>
					)}
					<Spacer />
					<Text>{field.value}</Text>
				</HStack>
				<ChakraSlider
					flex='1'
					focusThumbOnChange={false}
					min={min}
					max={max}
					{...field}
					onChange={handleChange}
					onBlur={handleBlur}
				>
					<SliderTrack>{/* <SliderFilledTrack /> */}</SliderTrack>
					<SliderThumb />
				</ChakraSlider>
				<Flex justify='space-between'>
					{nums.map(num => (
						<Text key={num}>{num}</Text>
					))}
				</Flex>
			</Box>
		</FormControl>
	);
};
