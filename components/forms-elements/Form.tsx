import { Box } from '@chakra-ui/react';
import { Form as FormikForm, Formik, FormikConfig } from 'formik';
import { DevTools } from './';

interface Props {
  hasDevTools?: boolean;
}

export const Form: React.FC<Props & FormikConfig<any>> = ({
  hasDevTools = true,
  children,
  ...rest
}) => {
  return (
    <Box w='full' sx={{ '& > form': { w: 'full', h: 'full' } }} h='full'>
      <Formik {...rest}>
        <FormikForm>
          {children}
          {hasDevTools && <DevTools />}
        </FormikForm>
      </Formik>
    </Box>
  );
};
