import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export const SubmitButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      {...rest}
      type='submit'
      isDisabled={isSubmitting}
      isLoading={isSubmitting}
    >
      {children}
    </Button>
  );
};
