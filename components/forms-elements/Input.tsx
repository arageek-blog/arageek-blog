import type { InputProps } from '@chakra-ui/react';
import {
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
  name: string;
  label: string;
  helpText?: string;
  inputmode?: InputProps['inputMode'];
  inputProps?: InputProps;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

export const Input: React.FC<Props & InputProps> = ({
  name,
  type = 'text',
  label,
  autoComplete,
  inputmode,
  inputProps,
  iconStart,
  iconEnd,
  ...rest
}) => {
  const [field] = useField(name);

  return (
    <FormControl name={name} {...rest}>
      <InputGroup>
        {iconStart && (
          <InputLeftElement pointerEvents='none' children={iconStart} />
        )}
        <ChakraInput
          {...field}
          value={field.value ?? ''}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputmode}
          placeholder=' '
        />
        {label && <FormLabel>{label}</FormLabel>}
        {iconEnd && (
          <InputRightElement pointerEvents='none' children={iconEnd} />
        )}
      </InputGroup>
    </FormControl>
  );
};
