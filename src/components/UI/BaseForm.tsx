import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { Prompt, TextInput } from 'components';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { generatePassword } from 'helpers';
import { FormNames, FormValues, InputTypes } from 'interfaces';
import { useEffect, useState } from 'react';
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { dirty, handleSubmit, setFieldValue, setValues, isValid } = formik;

  useEffect(() => {
    if (prefillValues) {
      setValues(prefillValues);
    }
  }, [prefillValues]);

  const generatePassWordHandler = (): void => {
    const newPassword: string = generatePassword(8);
    setFieldValue(FormNames.password, newPassword);
  };
  const showPasswordHandler = () => setShowPassword((prevState) => !prevState);

  return (
    <>
      {addPrompt && <Prompt formIsDirty={dirty} />}
      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} direction="column" p={10}>
          {fieldNames.map((field) => {
            if (field === FormNames.password) {
              return (
                <Grid item key="password">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <TextInput
                        name="password"
                        formik={formik}
                        setFormError={setFormError}
                        inputType={
                          !showPassword ? InputTypes.password : InputTypes.text
                        }
                      />
                    </Box>
                    <Box sx={{ ml: '-70px', mt: '7px' }}>
                      <IconButton onClick={showPasswordHandler}>
                        {!showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              );
            }
            return (
              <Grid item key={field}>
                <TextInput
                  name={field}
                  formik={formik}
                  setFormError={setFormError}
                  inputType={InputTypes.text}
                />
              </Grid>
            );
          })}

          {generatePasswordButton && (
            <Grid item>
              <Button
                color="secondary"
                size="small"
                sx={{ textTransform: 'none' }}
                onMouseDown={generatePassWordHandler}
              >
                Generate new password
              </Button>
            </Grid>
          )}
          <Grid item mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={!(isValid && dirty)}
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
