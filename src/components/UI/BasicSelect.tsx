import { Select, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { FormValues } from 'interfaces';
import { FormikProps } from 'formik';
import { capitalize } from 'helpers';
import { Dispatch, SetStateAction } from 'react';

interface BasicSelectProps {
  name: string;
  formik: FormikProps<FormValues>;
  children: JSX.Element[];
  setDisableButton: Dispatch<SetStateAction<boolean>>;
}

const BasicSelect = ({
  name,
  formik,
  children,
  setDisableButton,
}: BasicSelectProps): JSX.Element => {
  const { handleChange } = formik;

  return (
    <FormControl fullWidth>
      <InputLabel id="selectBoxName">{capitalize(name)}</InputLabel>
      <Select
        name={name}
        label={capitalize(name)}
        id="selectBoxName"
        onChange={(event: SelectChangeEvent<HTMLSelectElement>) => {
          setDisableButton(false);
          handleChange(event);
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
