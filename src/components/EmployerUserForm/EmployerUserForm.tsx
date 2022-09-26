import { Card, Container, Typography } from '@mui/material';
import { BaseForm } from 'components';
import { emailRegEx } from 'consts';
import { FormikHelpers } from 'formik';
import { createEmployerUser, getUser, updateEmployerUser } from 'helpers';
import { FormActions, FormNames, FormValues, UserTypes } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

interface EmployerUserFormProps {
  action: FormActions;
  userId?: string;
}

const fieldNames: FormNames[] = [
  FormNames.firstName,
  FormNames.lastName,
  FormNames.email,
  FormNames.username,
  FormNames.password,
];
const initialValues: FormValues = {
  [FormNames.firstName]: '',
  [FormNames.lastName]: '',
  [FormNames.email]: '',
  [FormNames.username]: '',
  [FormNames.password]: '',
};
const validationSchema = Yup.object().shape({
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

const EmployerUserForm = ({
  action,
  userId,
}: EmployerUserFormProps): JSX.Element => {
  const { employerId } = useParams();
  const [formError, setFormError] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formValues, setFormValues] = useState<FormValues | undefined>(
    undefined
  );

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const user = await getUser(userId);
          const prefillValues = user as FormValues;
          setFormValues(prefillValues);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  const onSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      const data = employerId && {
        ...values,
        employer: employerId,
        userType: UserTypes.employer,
      };
      if (action === FormActions.addUser) {
        if (data) {
          await createEmployerUser(data);
        }
      }
      if (action === FormActions.updateUser) {
        if (data && userId) {
          await updateEmployerUser(values, userId);
        }
      }
      resetForm(initialValues);
      setFormMessage(
        `User "${values.username}" ${
          action === FormActions.addUser ? 'created' : 'updated'
        } successfully`
      );
    } catch (error: any) {
      if (error.response.status === 400) {
        setFormError(
          `Username "${values.username}" already exists. Please choose a different one.`
        );
      }
    }
  };
  return (
    <Container>
      <Card variant="outlined">
        <Typography
          color={formError ? 'error' : 'success'}
          align="center"
          mt={10}
        >
          {formError || formMessage}
        </Typography>
        <Typography variant="h6" ml={10} mt={5} mb={-5}>
          {action === FormActions.addUser ? 'Add new' : 'Update'} User
        </Typography>
        <BaseForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          prefillValues={formValues}
          validationSchema={validationSchema}
          fieldNames={fieldNames}
          addPrompt
          generatePasswordButton
        />
      </Card>
    </Container>
  );
};

EmployerUserForm.defaultProps = {
  userId: undefined,
};

export default EmployerUserForm;
