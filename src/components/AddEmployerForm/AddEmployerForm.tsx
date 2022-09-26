import { Button, Card, Container, Grid, Typography } from '@mui/material';
import { Prompt, TextInput } from 'components';
import { useFormik } from 'formik';
import { createEmployer } from 'helpers';
import { FormValues } from 'interfaces';

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

const AddEmployerForm = (): JSX.Element => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const { handleSubmit, dirty } = formik;
  return (
    <Container>
      <Prompt formIsDirty={dirty} />
      <form onSubmit={handleSubmit}>
        <Card variant="outlined">
          <Typography variant="h6" ml={10} mt={5} mb={-5}>
            Add new Employer
          </Typography>
          <Grid container rowSpacing={2} direction="column" p={10}>
            {Object.keys(initialValues).map((value) => (
              <Grid item key={value}>
                <TextInput name={value} formik={formik} />
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

export default AddEmployerForm;
