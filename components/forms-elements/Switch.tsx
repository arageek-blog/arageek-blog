import type { FormControlProps} from '@chakra-ui/react';
import { Flex, FormLabel, Switch as ChakraSwitch } from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
	name: string;
	helpText?: string;
	children: React.ReactNode;
}

export const Switch: React.FC<Props & FormControlProps> = ({
	name,
	children,
	helpText,
	...rest
}) => {
	const [field, { value, error, touched }] = useField(name);
	const { isRequired } = rest;
	return (
		<FormControl
			name={name}
			helpText={helpText}
			{...rest}
		>
			<Flex alignItems='flex-start'>
				<ChakraSwitch
					{...field}
					isInvalid={!!error && touched}
					isRequired={isRequired}
					mt={'.125rem'}
					id={`${name}-switch`}
					isChecked={value}
				/>
				<FormLabel
					htmlFor={`${name}-switch`}
					ml={2}
					fontWeight='normal'
				>
					{children}
				</FormLabel>
			</Flex>
		</FormControl>
	);
};
