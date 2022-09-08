import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { TextInput } from 'components';
import { FormikProps, useFormik } from 'formik';
import { FormValues, LoginFormNames } from 'interfaces';
import { useContext, useState } from 'react';
import { AuthContext, AuthContextConfig } from 'store';
import * as Yup from 'yup';

const initialValues: FormValues = {
  [LoginFormNames.username]: '',
  [LoginFormNames.password]: '',
};
const validationSchema = Yup.object().shape({
  [LoginFormNames.username]: Yup.string().required(
    'Please enter your username'
  ),
  [LoginFormNames.password]: Yup.string().required(
    'Please enter your password'
  ),
});

const LoginForm = (): JSX.Element => {
  const [loginError, setLoginError] = useState<string>('');
  const { login } = useContext<AuthContextConfig>(AuthContext);

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login(values);
      } catch (error) {
        resetForm({ values: initialValues });
        setLoginError(
          'Your username and/or password is incorrect. Please try again.'
        );
      }
    },
  });

  return (
    <Container sx={{ width: '40%' }}>
      <Box my={20}>
        <Card variant="outlined">
          <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={2} direction="column" p={10}>
              <Typography color="error" gutterBottom align="center">
                {loginError}
              </Typography>
              <Grid item>
                <TextInput
                  name={LoginFormNames.username}
                  formik={formik}
                  setLoginError={setLoginError}
                />
              </Grid>
              <Grid item>
                <TextInput
                  name={LoginFormNames.password}
                  formik={formik}
                  setLoginError={setLoginError}
                />
              </Grid>
              <Grid item mt={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
