import { Button, Container, Grid, Typography } from '@mui/material';
import { Prompt, TextInput } from 'components';
import { FormikHelpers, useFormik } from 'formik';
import { createEmployer, getEmployer, updateEmployer } from 'helpers';
import { FormActions, FormValues } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface AddEmployerFormProps {
  action: FormActions;
}

const initialValues: FormValues = {
  name: '',
  code: '',
  street: '',
  state: '',
  city: '',
  zipCode: '',
  phone: '',
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

const AddEmployerForm = ({ action }: AddEmployerFormProps): JSX.Element => {
  const { employerId } = useParams();
  const [formMessage, setFormMessage] = useState<string>('');

  const onSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      if (action === FormActions.add) {
        await createEmployer(values);
      }
      if (action === FormActions.update) {
        if (employerId) {
          await updateEmployer(values, employerId);
        }
      }
      resetForm(initialValues);
      setFormMessage(
        `Employer "${values.name}, ${values.code}" ${
          action === FormActions.add ? 'created' : 'updated'
        } successfully`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  const { handleSubmit, dirty, isValid, setValues } = formik;

  useEffect(() => {
    if (employerId) {
      (async () => {
        try {
          const employer = await getEmployer(employerId);
          const values = employer as unknown as FormValues;
          setValues(values);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  return (
    <Container>
      <Prompt formIsDirty={dirty} />
      <form onSubmit={handleSubmit}>
        <Typography align="center" mt={10}>
          {formMessage}
        </Typography>
        <Typography variant="h6" ml={10} mt={5} mb={-5}>
          {action === FormActions.add ? 'Add new' : 'Update'} Employer
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
              disabled={!(isValid && dirty)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddEmployerForm;
