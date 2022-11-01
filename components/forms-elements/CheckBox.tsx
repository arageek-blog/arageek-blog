import type { FormControlProps } from '@chakra-ui/react';
import {
  Checkbox as ChakraCheckBox,
  RequiredIndicator,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
  name: string;
  isBold?: boolean;
  value?: string;
  helpText?: string;
  children: React.ReactNode;
}

export const CheckBox: React.FC<Props & FormControlProps> = ({
  name,
  value,
  children,
  isDisabled,
  ...rest
}) => {
  const [field, { value: fieldValue, error, touched }] = useField(name);
  const { isRequired } = rest;

  return (
    <FormControl as='fieldset' name={name} isDisabled={isDisabled} {...rest}>
      <ChakraCheckBox
        {...field}
        value={value}
        isChecked={value ? fieldValue?.includes(value) : fieldValue}
        isInvalid={!!error && touched}
        isRequired={isRequired}
        isDisabled={isDisabled}
      >
        {children}
        {isRequired && <RequiredIndicator />}
      </ChakraCheckBox>
    </FormControl>
  );
};
