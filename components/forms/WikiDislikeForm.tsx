import { VStack } from '@chakra-ui/react';

import { useMutation } from '@tanstack/react-query';
import { Form, Radio, SubmitButton, Textarea } from 'components/forms-elements';
import { FormikConfig, useField } from 'formik';
import { useToast } from 'hooks';
import { mutationFn, validationRules } from 'utls';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  reason: validationRules.string,
  reasonText: validationRules.stringOptional.when('reason', {
    is: 'other',
    then: validationRules.string
  })
});

const options = {
  notIncludingWhatINeed: 'المقال لا يحتوي على المعلومات التي أبحث عنها',
  inclucingWrongInforamtions: 'المقال يحتوي معلومات خاطئة',
  other: 'سبب آخر'
};

export const WikiDislikeForm: React.FC = ({ id, callback }) => {
  const toast = useToast();
  const { mutateAsync: mutateAddComment } = useMutation(
    params => mutationFn({ name: `comments`, params }),
    {
      onSuccess: ({ data, params }) => {
        toast({
          title: 'شكرا لك',
          description: 'تم إرسال رأيك بنجاح'
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
    { reason, reasonText },
    { resetForm }
  ) => {
    try {
      const params = {
        post: id,
        content: reason === 'other' ? reasonText : options[reason]
      };

      await mutateAddComment(params);
    } catch (error) {
      resetForm();
    }
  };

  return (
    <Form
      initialValues={{
        reason: '',
        reasonText: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      hasDevTools={false}
      enableReinitialize
    >
      <VStack align={'stretch'} spacing={8}>
        <VStack align={'stretch'} spacing={4}>
          <Radio options={options} name='reason' />
          <ConditionalTextarea />
        </VStack>
        <VStack align={'stretch'} spacing={4}>
          <SubmitButton>إرسال</SubmitButton>
        </VStack>
      </VStack>
    </Form>
  );
};

const ConditionalTextarea = () => {
  const [{ value }] = useField('reason');

  if (value !== 'other') {
    return null;
  }

  return <Textarea name='reasonText' label='' />;
};
