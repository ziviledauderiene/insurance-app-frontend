import { FormControl, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikProps } from 'formik';
import { StrictFormValues } from 'interfaces';

interface BasicDatePickerProps {
  date: string;
  formik: FormikProps<StrictFormValues>;
}

const BasicDatePicker = ({ formik }: BasicDatePickerProps): JSX.Element => {
  const { values, setFieldValue, errors } = formik;
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Service"
          value={values.date}
          onChange={(newValue) => setFieldValue('date', newValue)}
          renderInput={(params) => (
            <TextField {...params} error={!!errors.date} helperText={errors.date && "Please select the correct date"} />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default BasicDatePicker;
