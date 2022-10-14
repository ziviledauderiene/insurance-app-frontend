import { emailRegEx } from 'consts';
import { checkIfOnlyNumbers } from 'helpers';
import { FormNames, PayrollFrequency, Plan } from 'interfaces';
import * as Yup from 'yup';

export const editClaimValidationSchema = Yup.object().shape({
  date: Yup.date().nullable().required('Please choose the date'),
  amount: Yup.string()
    .required('Please enter the amount')
    .test(
      'Numbers only',
      'Please use only numbers',
      (value) => !!value && checkIfOnlyNumbers(value)
    ),
});

const yesterday = new Date(Date.now() - 86400000);
const oneDayLater = (date: Date) =>
  new Date(new Date(date).getTime() + 86400000);

export const addPlanYearValidationSchema = Yup.object().shape({
  plan: Yup.string()
    .oneOf(Object.values(Plan))
    .required('Please choose the plan'),
  name: Yup.string().required('Please enter the name'),
  startDate: Yup.date()
    .min(yesterday, 'Start Date date can not be earlier than today')
    .nullable()
    .required('Please choose the Start Date'),
  endDate: Yup.date()
    .min(
      Yup.ref('startDate', {
        map: (startDate) => oneDayLater(startDate as Date),
      }),
      'End Date can not be earlier than Start Date'
    )
    .nullable(),
  contributions: Yup.string()
    .required('Please enter the amount')
    .test(
      'Numbers only',
      'Please use only numbers',
      (value) => !!value && checkIfOnlyNumbers(value)
    ),
  payrollFrequency: Yup.string()
    .oneOf(Object.values(PayrollFrequency))
    .required('Please choose the payroll frequency'),
});

export const updateUserValidation = Yup.object().shape({
  [FormNames.firstName]: Yup.string().required('Please enter the First Name'),
  [FormNames.lastName]: Yup.string().required('Please enter the Last Name'),
  [FormNames.email]: Yup.string()
    .required('Please enter the email')
    .matches(emailRegEx, 'Please check the email'),

  [FormNames.username]: Yup.string().required('Please enter the username'),
});

export const addUserValidation = Yup.object().shape({
  [FormNames.firstName]: Yup.string().required('Please enter the First Name'),
  [FormNames.lastName]: Yup.string().required('Please enter the Last Name'),
  [FormNames.email]: Yup.string()
    .required('Please enter the email')
    .matches(emailRegEx, 'Please check the email'),

  [FormNames.username]: Yup.string().required('Please enter the username'),
  [FormNames.password]: Yup.string()
    .required('Please enter the password')
    .min(3, 'Password is too short. At least 3 chars required'),
});
