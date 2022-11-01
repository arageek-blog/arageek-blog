import * as Yup from 'yup';

export const errMessages = {
  required: 'هذا الحقل مطلوب, يرجى تعبئته',
  requiredSelect: 'يرجى إختيار أحد الخيارات',
  privacy: 'الموافقة مطلوبة للمتابعة',
  numb: 'يرجى إدخال رقم صالح',
  phone: 'يرجى إدخال رقم هاتف صالح',
  email: 'يرجى إدخال بريد إلكتروني صالح',
  userName: 'اسم المستخدم هذا مسجّل مسبقاً',
  onlyLatin: 'يسمح فقط بإستخدم الحروف الإنكليزية',
  url: 'يسمح بإدخال الروابط فقط',
};

export const validationRules = {
  number: Yup.number().required(errMessages?.required),
  string: Yup.string().required(errMessages?.required),
  stringOptional: Yup.string(),
  pin: Yup.number()
    .required(errMessages?.required)
    .min(4, errMessages?.required),
  select: Yup.string().required(errMessages.requiredSelect),
  email: Yup.string().email(errMessages.email).required(errMessages.required),
  emailOptional: Yup.string().email(errMessages.email),
  repeatable2: Yup.array()
    .of(Yup.number())
    .min(2, 'يجب إختيار موضوعين على الاقل'),
  repeatable3: Yup.array()
    .of(Yup.number())
    .min(3, 'يجب إختيار ٣ مواضيع على الاقل'),

  // phone: z
  //   .string()
  //   .matches(
  //     /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
  //     errMessages?.phone
  //   ),
  // trueOnly: z
  //   .boolean()
  //   .equals([true], errMessages?.privacy)
  //   .required(errMessages?.required),
  // array: z.array().min(1).required(),
};
