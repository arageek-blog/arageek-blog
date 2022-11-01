import type { FormControlProps, LayoutProps } from '@chakra-ui/react';
import { FormLabel, Textarea as ChakraTextarea } from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
  name: string;
  label: string;
  helpText?: string;
  height?: LayoutProps['height'];
}

export const Textarea: React.FC<Props & FormControlProps> = ({
  name,
  helpText,
  label,
  height,
  ...rest
}) => {
  const [field] = useField(name);

  return (
    <FormControl name={name} helpText={helpText} {...rest}>
      <ChakraTextarea
        {...field}
        borderRadius='none'
        minH={height}
        placeholder=' '
      />
      {label && <FormLabel>{label}</FormLabel>}
    </FormControl>
  );
};
