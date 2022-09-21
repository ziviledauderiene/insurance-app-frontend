import { useFormik } from 'formik';
import { Container, Card, Grid, Button } from '@mui/material';
import TextInput from 'components/LoginForm/TextInput';
import { FormValues } from 'interfaces';
import { createEmployer } from 'helpers/api';

const initialValues: FormValues = {
  name: '',
  code: '',
  street: '',
  state: '',
  city: '',
  zipCode: '',
  phone: '',
};

const onSubmit = async (values: FormValues) => {
  try {
    await createEmployer(values);
  } catch (error) {
    console.log(error);
  }
};

const validate = (values: FormValues) => {
  const errors: {
    [key: string]: string;
  } = {};

  Object.keys(initialValues).forEach((key) => {
    if (!values[key]) {
      errors[key] = 'required';
    }
  });

  return errors;
};

const EmployerForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const { handleSubmit } = formik;
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card variant="outlined">
          <Grid container rowSpacing={2} direction="column" p={10}>
            {Object.keys(initialValues).map((key) => (
              <Grid item>
                <TextInput name={key} formik={formik} />
              </Grid>
            ))}
            <Grid item mt={2}>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Container>
  );
};

export default EmployerForm;
