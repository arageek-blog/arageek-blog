import type {
	InputProps} from '@chakra-ui/react';
import {
	Box,
	FormLabel,
	Input,
	Tag,
	TagCloseButton,
	TagLabel,
	VisuallyHiddenInput,
	Wrap,
	WrapItem
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { FormControl } from './';

interface Props {
	name: string;
	label: string;
	helpText?: string;
}

const Keys = {
	TAB: 9,
	SPACE: 32,
	COMMA: 188,
	ENTER: 13
};

const delimiters = [Keys.ENTER, Keys.TAB, Keys.COMMA];

export const Tags: React.FC<Props & InputProps> = ({ name, label, isRequired, ...rest }) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [{ value, onBlur }, { touched }, { setValue, setTouched }] = useField(name);

	const tags = value ? value?.split(',') : [];

	const handleDelete = i => {
		const newTags = tags.filter((tag, index) => index !== i);

		setValue(newTags.join(','));
	};

	const handleAddition = tag => {
		if (tag) {
			const newTags = [...tags, tag];

			if (!touched) {
				setTouched(true);
			}
			setValue(newTags.join(','));
		}
	};

	const handleInputChange = e => {
		if (!touched) {
			setTouched(true);
		}
		setInputValue(e.target.value);
	};

	return (
		<Box>
			<FormControl
				name={name}
				isRequired={isRequired}
				{...rest}
			>
				<FormLabel>{label}</FormLabel>
				<VisuallyHiddenInput
					name={name}
					value={value}
					required={isRequired}
				/>
				<Input
					value={inputValue}
					onChange={handleInputChange}
					placeholder={'Enter keyword'}
					onKeyDown={event => {
						if (delimiters.includes(event.keyCode) && event.shiftKey === false) {
							event.preventDefault();
							handleAddition(inputValue);
							setInputValue('');
						}
					}}
				/>
			</FormControl>
			<Wrap mt={4}>
				{tags?.map((item, i) => (
					<WrapItem key={i}>
						<Tag
							borderRadius='full'
							variant='solid'
							colorScheme='dark'
						>
							<TagLabel>{item}</TagLabel>
							<TagCloseButton onClick={() => handleDelete(i)} />
						</Tag>
					</WrapItem>
				))}
			</Wrap>
		</Box>
	);
};
