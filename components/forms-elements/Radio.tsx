import {
  FormControlProps,
  FormLabel,
  Radio as ChakraRadio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
  name: string;
  placeholder: string;
  options: Record<string, any>;
  helpText?: string;
  spacing?: number;
}

export const Radio: React.FC<Props & FormControlProps> = ({
  name,
  placeholder,
  options,
  helpText,
  spacing = 4,
  ...rest
}) => {
  const [field, , { setValue }] = useField(name);

  return (
    <FormControl as='fieldset' name={name} helpText={helpText} {...rest}>
      <FormLabel as='legend'>{placeholder}</FormLabel>
      <RadioGroup {...field} onChange={(value: any) => setValue(value)}>
        <VStack align={'stretch'} spacing={2}>
          {Object.entries(options)?.map(([key, value]) => (
            <ChakraRadio className='isStatic' key={key} value={key}>
              {value}
            </ChakraRadio>
          ))}
        </VStack>
      </RadioGroup>
    </FormControl>
  );
};
