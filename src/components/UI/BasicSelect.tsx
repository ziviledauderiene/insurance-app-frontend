import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FormikProps } from 'formik';
import { capitalize } from 'helpers';
import { StrictFormValues } from 'interfaces';
import { Dispatch, SetStateAction } from 'react';

interface BasicSelectProps {
  name: string;
  formik: FormikProps<StrictFormValues>;
  children: JSX.Element[];
  setDisableButton?: Dispatch<SetStateAction<boolean>>;
}

const BasicSelect = ({
  name,
  formik,
  children,
  setDisableButton,
}: BasicSelectProps): JSX.Element => {
  const { handleChange, values } = formik;
  const selectValue = values[name];

  return (
    <FormControl fullWidth>
      <InputLabel id="selectBoxName">{capitalize(name)}</InputLabel>
      <Select
        labelId="selectBoxName"
        name={name}
        value={selectValue || ''}
        label={capitalize(name)}
        onChange={(event: SelectChangeEvent<typeof selectValue>) => {
          if (setDisableButton) {
            setDisableButton(false);
          }
          handleChange(event);
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

BasicSelect.defaultProps = {
  setDisableButton: undefined,
};

export default BasicSelect;
