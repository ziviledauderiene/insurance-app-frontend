import { Button, Container, Grid, Typography } from '@mui/material';
import { Prompt, TextInput } from 'components';
import { useFormik } from 'formik';
import {
  createEmployer,
  getEmployer,
  getFriendlyErrorOrFallback,
  updateEmployer,
} from 'helpers';
import { FormActions, FormValues, InputTypes } from 'interfaces';
import { useEffect } from 'react';
import { useParams } from 'react-router';

interface AddEmployerFormProps {
  action: FormActions;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  handleClose?: () => void;
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

const AddEmployerForm = ({
  action,
  onSuccess,
  handleClose,
  onError,
}: AddEmployerFormProps): JSX.Element => {
  const { employerId } = useParams();

  const onSubmit = async (values: FormValues) => {
    try {
      let message = '';
      if (action === FormActions.add) {
        const response = await createEmployer(values);
        message = response.message;
      }
      if (action === FormActions.update) {
        if (employerId) {
          const response = await updateEmployer(values, employerId);
          message = response.message;
        }
      }
      if (handleClose) {
        handleClose();
      }
      onSuccess(message);
    } catch (error: unknown) {
      onError(getFriendlyErrorOrFallback(error));
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
        <Typography variant="h6" ml={10} mt={5} mb={-5}>
          {action === FormActions.add ? 'Add new' : 'Update'} Employer
        </Typography>
        <Grid container rowSpacing={2} direction="column" p={10}>
          {Object.keys(initialValues).map((value) => (
            <Grid item key={value}>
              <TextInput
                name={value}
                formik={formik}
                inputType={InputTypes.text}
              />
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

AddEmployerForm.defaultProps = { handleClose: undefined };

export default AddEmployerForm;
