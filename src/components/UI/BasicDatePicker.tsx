import { FormControl, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikProps } from 'formik';
import { StrictFormValues } from 'interfaces';

interface BasicDatePickerProps {
  label: string;
  formik: FormikProps<StrictFormValues>;
  fieldName: string;
}

const BasicDatePicker = ({
  formik,
  label,
  fieldName,
}: BasicDatePickerProps): JSX.Element => {
  const { values, setFieldValue, errors } = formik;
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={values[fieldName]}
          onChange={(newValue) => setFieldValue(fieldName, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!errors[fieldName]}
              helperText={
                fieldName === 'endDate' && !errors[fieldName]
                  ? 'Optional. It will be set to +1year after the Start Date if you will leave it blank.'
                  : errors[fieldName]
              }
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default BasicDatePicker;
