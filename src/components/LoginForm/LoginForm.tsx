import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { TextInput } from 'components';
import { endpoints } from 'consts';
import { FormikProps, useFormik } from 'formik';
import { saveInLocalStorage, sendRequest } from 'helpers';
import { FormValues, LoginFormNames } from 'interfaces';
import { useCallback, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
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
  const navigate: NavigateFunction = useNavigate();
  const tryToLogin = useCallback(
    async (values: FormValues) => {
      try {
        const { token }: { token: string } = await sendRequest(
          'post',
          endpoints.login,
          values
        );
        saveInLocalStorage('token', token);
        navigate('/admin');
      } catch (error) {
        setLoginError(
          'Your username and/or password is incorrect. Please try again.'
        );
      }
    },
    [sendRequest, saveInLocalStorage, navigate]
  );
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      tryToLogin(values);
      resetForm({ values: initialValues });
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
