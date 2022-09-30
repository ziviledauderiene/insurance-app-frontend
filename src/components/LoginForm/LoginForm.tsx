import { Box, Card, Container, Typography } from '@mui/material';
import { BaseForm } from 'components';
import { FormikHelpers } from 'formik';
import { FormValues, FormNames } from 'interfaces';
import { useContext, useState } from 'react';
import { AuthContext, AuthContextConfig } from 'store';
import * as Yup from 'yup';

const fieldNames: FormNames[] = [
  FormNames.username,
  FormNames.password,
];
const initialValues: FormValues = {
  [FormNames.username]: '',
  [FormNames.password]: '',
};
const validationSchema = Yup.object().shape({
  [FormNames.username]: Yup.string().required(
    'Please enter your username'
  ),
  [FormNames.password]: Yup.string().required(
    'Please enter your password'
  ),
});

const LoginForm = (): JSX.Element => {
  const [formError, setFormError] = useState<string>('');
  const { login } = useContext<AuthContextConfig>(AuthContext);

  const onSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      await login(values);
    } catch (error) {
      resetForm({ values: initialValues });
      setFormError(
        'Your username and/or password is incorrect. Please try again.'
      );
    }
  };

  return (
    <Container sx={{ width: '40%' }}>
      <Box my={20}>
        <Card variant="outlined">
          <Typography color="error" align="center" m={5} mb={-5}>
            {formError}
          </Typography>
          <BaseForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            fieldNames={fieldNames}
            addPrompt={false}
            setFormError={setFormError}
            generatePasswordButton={false}
            buttonName="Log In"
          />
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
