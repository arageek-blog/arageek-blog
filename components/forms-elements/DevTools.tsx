import { Box } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { ISPRODUCTION } from 'utls';

export const DevTools: React.FC = () => {
  const {
    submitCount,
    dirty,
    initialStatus,
    isSubmitting,
    isValid,
    isValidating,
    status,
    touched,
    values,
    errors,
    validateOnBlur,
    validateOnChange,
    validateOnMount,
  } = useFormikContext();

  if (ISPRODUCTION) {
    return null;
  }

  return (
    <Box maxW={'100%'}>
      <Box as='pre' my={10} bgColor='gray.50' dir='ltr' whiteSpace={'pre-wrap'}>
        {JSON.stringify(
          {
            submitCount,
            values,
            touched,
            errors,
            dirty,
            initialStatus,
            isSubmitting,
            isValid,
            isValidating,
            status,

            validateOnBlur,
            validateOnChange,
            validateOnMount,
          },
          null,
          2,
        )}
      </Box>
    </Box>
  );
};
