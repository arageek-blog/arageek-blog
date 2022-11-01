import type { FormControlProps } from '@chakra-ui/react';
import { FormLabel, Icon, Select as ChakraSelect } from '@chakra-ui/react';
import { useField } from 'formik';
import { ArrowDown2 } from 'iconsax-react';
import { FormControl } from './';

interface Props {
  name: string;
  label: string;
  helpText?: string;
  children: React.ReactNode;
}

export const Select: React.FC<Props & FormControlProps> = ({
  name,
  helpText,
  label,
  children,
  ...rest
}) => {
  const [field] = useField(name);

  return (
    <FormControl name={name} helpText={helpText} {...rest}>
      <ChakraSelect
        {...field}
        placeholder={' '}
        icon={<Icon as={ArrowDown2} />}
      >
        {children}
      </ChakraSelect>
      <FormLabel data-has-value={Boolean(field.value)}>{label}</FormLabel>
    </FormControl>
  );
};
