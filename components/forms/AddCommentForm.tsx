import { VStack } from '@chakra-ui/react';

import { useMutation } from '@tanstack/react-query';
import { Form, Input, SubmitButton, Textarea } from 'components/forms-elements';
import { FormikConfig } from 'formik';
import { useToast } from 'hooks';
import { mutationFn, validationRules } from 'utls';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  author_name: validationRules.string,
  author_email: validationRules.email,
  content: validationRules.string.min(50, 'يجب أن يكون على الأقل ٥٠ محرف')
});

export const AddCommentForm: React.FC = ({ id, callback }) => {
  const toast = useToast();
  const { mutateAsync: mutateAddComment } = useMutation(
    params => mutationFn({ name: `comments`, params }),
    {
      onSuccess: ({ data, params }) => {
        toast({
          title: 'شكرا لك',
          description: 'تم إضافة تعليقك بنجاح'
        });
        callback?.();
      },
      onError: error => {
        toast({
          title: 'خطأ',
          description: 'خطأ من طرف السيرفر, يرجى المحاولة لاحقاً',
          status: 'error'
        });
      }
    }
  );

  const onSubmit: FormikConfig<any>['onSubmit'] = async (
    values,
    { resetForm }
  ) => {
    try {
      await mutateAddComment({ post: id, ...values });
      resetForm();
    } catch (error) {
      resetForm();
    }
  };

  return (
    <Form
      initialValues={{
        author_name: '',
        author_email: '',
        content: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      hasDevTools={false}
      enableReinitialize
    >
      <VStack align={'stretch'} spacing={8}>
        <VStack align={'stretch'} spacing={4}>
          <Input name='author_name' label='الأسم' />
          <Input name='author_email' label='البريد الالكتروني' />
          <Textarea name='content' label='تعليقك اللطيف...' />
        </VStack>
        <VStack align={'stretch'} spacing={4}>
          <SubmitButton>إرسال</SubmitButton>
        </VStack>
      </VStack>
    </Form>
  );
};
