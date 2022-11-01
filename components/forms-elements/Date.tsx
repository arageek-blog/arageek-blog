import type { InputProps} from '@chakra-ui/react';
import { Box, FormLabel, Input as ChakraInput, useToken } from '@chakra-ui/react';
import type { RenderInputProps } from '@hassanmojab/react-modern-calendar-datepicker';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useField } from 'formik';
import React from 'react';
import {
	calenderDeLocale,
	getDateBefore,
	getFullDate,
	getISODate,
	getNowDate,
	getObjDate
} from 'utls';
import { FormControl } from './';

interface Props {
	name: string;
	label: string;
	placeholder: string;
	helpText?: string;
	maxDate?: number;
	isFutur?: boolean;
}

const locales = {
	en: 'en',
	de: calenderDeLocale
};

export const Date: React.FC<Props & InputProps> = ({
	name,
	placeholder,
	maxDate,
	isFutur,
	label,
	...rest
}) => {
	const [blue500, blue100] = useToken('colors', ['blue.500', 'blue.100']);
	const [{ value }, , { setValue }] = useField(name);

	const dateValue = getObjDate(value);

	const maximumDate = maxDate ? getObjDate(getDateBefore(maxDate)) : undefined;
	const minimumDate = isFutur ? getObjDate(getNowDate()) : undefined;

	return (
		<FormControl
			name={name}
			{...rest}
		>
			<Box
				sx={{
					'.DatePicker': {
						w: 'full'
					}
				}}
			>
				<FormLabel>{label}</FormLabel>
				<DatePicker
					value={dateValue || maximumDate}
					onChange={({ year, month, day }) => {
						setValue(getISODate(`${year}-${month}-${day}`));
					}}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					locale={locales?.['en']}
					renderInput={props => renderCustomInput({ name, placeholder, ...props })}
					colorPrimary={blue500}
					colorPrimaryLight={blue100}
					shouldHighlightWeekends
					slideAnimationDuration='0.3s'
				/>
			</Box>
		</FormControl>
	);
};

interface CustomInputProps {
	name: string;
	placeholder: string;
}
const renderCustomInput: React.FC<RenderInputProps & CustomInputProps> = ({
	name,
	placeholder,
	ref
}) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [{ value, onBlur }] = useField(name);

	return (
		<ChakraInput
			name={name}
			//@ts-ignore
			ref={ref}
			placeholder={placeholder}
			autoComplete={'off'}
			value={value ? getFullDate(value) : ''}
			onBlur={onBlur}
			readOnly
		/>
	);
};
