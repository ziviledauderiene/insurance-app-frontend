import { Button, Grid } from '@mui/material';
import { Prompt, TextInput } from 'components';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { generatePassword } from 'helpers';
import { FormNames, FormValues } from 'interfaces';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

interface BaseFormProps {
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<any>;
  initialValues: FormValues;
  validationSchema: Yup.ObjectSchema<ObjectShape>;
  fieldNames: string[] | FormNames[];
  addPrompt: boolean;
  generatePasswordButton: boolean;
  setFormError?: React.Dispatch<React.SetStateAction<string>>;
  buttonName?: string;
  prefillValues?: FormValues;
}

const BaseForm = ({
  setFormError,
  onSubmit,
  initialValues,
  validationSchema,
  fieldNames,
  addPrompt,
  buttonName,
  generatePasswordButton,
  prefillValues,
}: BaseFormProps): JSX.Element => {
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { dirty, handleSubmit, setFieldValue, setValues } = formik;

  useEffect(() => {
    if (prefillValues) {
      setValues(prefillValues);
    }
  }, [prefillValues]);

  const clickHandler = (): void => {
    const newPassword: string = generatePassword(8);
    setFieldValue(FormNames.password, newPassword);
  };

  return (
    <>
      {addPrompt && <Prompt formIsDirty={dirty} />}
      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} direction="column" p={10}>
          {fieldNames.map((field) => (
            <Grid item key={field}>
              <TextInput
                name={field}
                formik={formik}
                setFormError={setFormError}
              />
            </Grid>
          ))}
          {generatePasswordButton && (
            <Grid item>
              <Button
                color="secondary"
                size="small"
                sx={{ textTransform: 'none' }}
                onClick={clickHandler}
              >
                Generate password
              </Button>
            </Grid>
          )}
          <Grid item mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth
            >
              {buttonName}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

BaseForm.defaultProps = {
  buttonName: 'Submit',
  prefillValues: undefined,
  setFormError: undefined,
};

export default BaseForm;
