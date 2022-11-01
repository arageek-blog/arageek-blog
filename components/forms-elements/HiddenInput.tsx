import type { InputProps } from '@chakra-ui/react';
import { Input as ChakraInput } from '@chakra-ui/react';
import { useField } from 'formik';

interface Props {
  name: string;
}

export const HiddenInput: React.FC<Props & InputProps> = ({ name }) => {
  const [field] = useField(name);

  return <ChakraInput {...field} type={'hidden'} />;
};
