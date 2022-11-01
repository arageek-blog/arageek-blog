import type { InputProps } from '@chakra-ui/react';
import {
  Box,
  FormLabel,
  PinInput as ChakraPinInput,
  PinInputField,
  SimpleGrid,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FormControl } from './';

interface Props {
  pinAmount?: number;
  name: string;
  label?: string;
  helpText?: string;
  inputProps?: InputProps;
}

export const PinInput: React.FC<Props & InputProps> = ({
  name,
  label,
  inputProps,
  pinAmount = 4,
  ...rest
}) => {
  const [field, , { setValue }] = useField(name);

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <FormControl name={name} {...rest}>
      <Box position='relative' w='full'>
        {label && <FormLabel className='isTop'>{label}</FormLabel>}
        <SimpleGrid columns={pinAmount} gap={4}>
          <ChakraPinInput otp {...field} onChange={onChange}>
            {Array(pinAmount)
              .fill(null)
              .map((_noop, i) => (
                <PinInputField key={i} w='full' />
              ))}
          </ChakraPinInput>
        </SimpleGrid>
      </Box>
    </FormControl>
  );
};
