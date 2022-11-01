import type { FormControlProps as ChakraFormControlProps } from '@chakra-ui/react';
import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface Props {
  name: string;
  helpText?: string;
  isCenter?: boolean;
}

export const FormControl: React.FC<Props & ChakraFormControlProps> = ({
  name,
  children,
  helpText,
  isCenter,
  ...rest
}) => {
  const [, { error, touched }] = useField(name);

  const isInvalid = !!error && touched;

  return (
    <ChakraFormControl id={name} isInvalid={isInvalid} {...rest}>
      {children}
      {isInvalid ? (
        <FormErrorMessage textAlign={isCenter ? 'center' : 'start'}>
          {error}
        </FormErrorMessage>
      ) : (
        helpText && (
          <FormHelperText textAlign={isCenter ? 'center' : 'start'}>
            {helpText}
          </FormHelperText>
        )
      )}
    </ChakraFormControl>
  );
};
