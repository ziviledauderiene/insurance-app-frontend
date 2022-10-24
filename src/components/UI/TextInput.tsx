import { TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { capitalize } from 'helpers';
import { FormValues, InputTypes } from 'interfaces';
import { ChangeEvent } from 'react';

interface TextInputProps {
  name: string;
  inputType: InputTypes;
  formik: FormikProps<FormValues>;
  setFormError?: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput = ({
  name,
  formik,
  setFormError,
  inputType,
}: TextInputProps): JSX.Element => {
  const { handleBlur, handleChange, values, touched, errors } = formik;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChange(event);
    if (setFormError) {
      setFormError('');
    }
  };

  return (
    <TextField
      fullWidth
      name={name}
      label={capitalize(name)}
      value={values[name]}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        changeHandler(event);
      }}
      onBlur={handleBlur}
      error={touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
      type={inputType}
    />
  );
};

TextInput.defaultProps = {
  setFormError: undefined,
};

export default TextInput;
