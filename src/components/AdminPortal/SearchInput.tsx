import { TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { capitalize } from 'helpers';
import { FormValues } from 'interfaces';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface SearchInputProps {
  name: string;
  formik: FormikProps<FormValues>;
  setDisableButton: Dispatch<SetStateAction<boolean>>;
}

const SearchInput = ({
  name,
  formik,
  setDisableButton,
}: SearchInputProps): JSX.Element => {
  const { handleChange, values } = formik;
  return (
    <TextField
      name={name}
      label={capitalize(name)}
      value={values[name]}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setDisableButton(false);
        handleChange(event);
      }}
      fullWidth
    />
  );
};

export default SearchInput;
