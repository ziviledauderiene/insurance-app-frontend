/* eslint-disable react/require-default-props */
import { TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { capitalize } from 'helpers';
import { FormValues } from 'interfaces';
import { ChangeEvent } from 'react';

interface TextInputProps {
  name: string;
  formik: FormikProps<FormValues>;
  setLoginError?: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput = ({
  name,
  formik,
  setLoginError,
  
}: TextInputProps): JSX.Element => {
  const { handleBlur, handleChange, values, touched, errors } = formik;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChange(event);
    if (setLoginError){
      setLoginError('')
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
      type={name === 'password' ? 'password' : 'text'}
    />
  );
};

export default TextInput;
